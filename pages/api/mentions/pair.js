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
    const { countryA, countryB } = req.query
    if (!countryA || !countryB) {
      return res.status(400).json({ error: 'countryA and countryB are required' })
    }

    // Fetch interactions for both countries via indexed query to keep it efficient
    const [aResult, bResult] = await Promise.all([
      mentionsService.tryIndexedQuery(countryA),
      mentionsService.tryIndexedQuery(countryB)
    ])

    if (!aResult.success && !bResult.success) {
      return res.status(200).json({ series: [], total: 0 })
    }

    const countryAId = mentionsService.getCountryIdFromCode(countryA)
    const countryBId = mentionsService.getCountryIdFromCode(countryB)

    const all = [
      ...(aResult.success ? aResult.data : []),
      ...(bResult.success ? bResult.data : [])
    ]

    // Deduplicate by interaction id
    const uniqueById = new Map()
    for (const item of all) {
      if (!item || !item.id) continue
      uniqueById.set(item.id, item)
    }

    // Filter to interactions between A and B (either direction)
    const between = Array.from(uniqueById.values()).filter((i) => {
      const r = i.reporting
      const d = i.reported
      return (
        (r === countryAId && d === countryBId) ||
        (r === countryBId && d === countryAId)
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

    const total = between.length

    res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=600')
    return res.status(200).json({ series, total, countryA, countryB })
  } catch (error) {
    console.error('Error computing pair mentions series:', error)
    return res.status(500).json({ error: 'Failed to compute series' })
  }
}


