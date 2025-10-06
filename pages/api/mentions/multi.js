import { mentionsService } from '../../../lib/firebase'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return handleGet(req, res)
  }
  res.setHeader('Allow', ['GET'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}

async function handleGet(req, res) {
  try {
    const { countries, baseCountry } = req.query
    
    if (!countries || !baseCountry) {
      return res.status(400).json({ error: 'countries and baseCountry are required' })
    }

    // Parse countries parameter (comma-separated)
    const countryList = Array.isArray(countries) ? countries : countries.split(',')
    
    if (countryList.length === 0) {
      return res.status(400).json({ error: 'At least one country is required' })
    }

    // Get base country ID
    const baseCountryId = mentionsService.getCountryIdFromCode(baseCountry)

    // Fetch data for all countries in parallel
    const countryResults = await Promise.all(
      countryList.map(countryCode => 
        mentionsService.tryIndexedQuery(countryCode)
          .then(result => ({ countryCode, result }))
      )
    )

    // Process each country's data
    const countrySeries = []
    
    for (const { countryCode, result } of countryResults) {
      if (!result.success) {
        countrySeries.push({
          countryCode,
          countryId: mentionsService.getCountryIdFromCode(countryCode),
          series: [],
          total: 0
        })
        continue
      }

      const countryId = mentionsService.getCountryIdFromCode(countryCode)
      
      // Filter to interactions between base country and this country
      const between = result.data.filter((i) => {
        const r = i.reporting
        const d = i.reported
        return (
          (r === baseCountryId && d === countryId) ||
          (r === countryId && d === baseCountryId)
        )
      })

      // Aggregate by year
      const byYear = new Map()
      for (const i of between) {
        const dateStr = String(i.date || '')
        const year = dateStr.slice(0, 4)
        if (!/^[0-9]{4}$/.test(year)) continue
        byYear.set(year, (byYear.get(year) || 0) + 1)
      }

      const series = Array.from(byYear.entries())
        .map(([year, count]) => ({ year: Number(year), count }))
        .sort((a, b) => a.year - b.year)

      countrySeries.push({
        countryCode,
        countryId,
        series,
        total: between.length
      })
    }

    res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=600')
    return res.status(200).json({ 
      countrySeries, 
      baseCountry,
      totalCountries: countryList.length 
    })
  } catch (error) {
    console.error('Error computing multi-country mentions series:', error)
    return res.status(500).json({ error: 'Failed to compute series' })
  }
}
