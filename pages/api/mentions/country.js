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
    const { countryCode, limit = 50, offset = 0 } = req.query
    
    if (!countryCode) {
      return res.status(400).json({ error: 'Country code is required' })
    }
    
    const countries = await mentionsService.getCountries()
    const country = countries.find(c => c.code === countryCode || c.countryCode === countryCode)
    
    if (!country) {
      return res.status(200).json({
        country: countryCode,
        countryName: countryCode,
        data: [],
        pagination: { total: 0, limit: parseInt(limit), offset: parseInt(offset), hasMore: false },
        filters: {},
        message: 'Country not found in dataset'
      })
    }
    
    // 🔑 Pull interactions with server-side sort defaults
    const result = await mentionsService.getInteractionsForCountry(
      countryCode,
      { limit: parseInt(limit), offset: parseInt(offset), sort: 'date', order: 'desc' }
    )
    
    const enrichedData = result.data.map(interaction => {
      const reporterCode = mentionsService.getCountryCodeFromId(interaction.reporting)
      const reportedCode = mentionsService.getCountryCodeFromId(interaction.reported)
      
      return {
        ...interaction,
        reporterCode,
        reportedCode,
        reporterName: reporterCode,
        reportedName: reportedCode,
      }
    })
    
    const response = {
      country: countryCode,
      countryName: country.name,
      data: enrichedData,
      pagination: {
        total: result.total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: result.hasMore
      },
      filters: {}
    }
    
    res.status(200).json(response)
    
  } catch (error) {
    console.error('Error reading country mentions data:', error)
    res.status(500).json({ 
      error: 'Failed to load country mentions data',
      message: error.message,
      country: req.query.countryCode || 'unknown'
    })
  }
}
