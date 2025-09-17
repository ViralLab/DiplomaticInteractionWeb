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
    const { countryCode } = req.query
    const { limit = 50, offset = 0 } = req.query
    
    console.log('=== DYNAMIC API CALL START ===')
    console.log('Requested country code:', countryCode)
    console.log('Query params:', req.query)
    
    if (!countryCode) {
      return res.status(400).json({ error: 'Country code is required' })
    }
    
    // Get countries to find the country name
    const countries = await mentionsService.getCountries()

    console.log('Countries:', countries)
    const country = countries.find(c => c.code === countryCode)
    
    if (!country) {
      console.log('Country not found in dataset, returning empty data')
      return res.status(200).json({
        country: countryCode,
        countryName: countryCode,
        data: [],
        pagination: { total: 0, limit: parseInt(limit), offset: parseInt(offset), hasMore: false },
        filters: {},
        message: 'Country not found in dataset'
      })
    }
    
    console.log('Found country:', country)
    
    // Get interactions for this country from Firebase
    const result = await mentionsService.getInteractionsForCountry(
      countryCode, 
      parseInt(limit), 
      parseInt(offset)
    )
    
    console.log('Firebase interactions count:', result.data.length)
    
    // Enrich data with country names
    const enrichedData = result.data.map(interaction => ({
      ...interaction,
      reporterName: countries.find(c => c.code === interaction.reporter)?.name,
      reportedName: countries.find(c => c.code === interaction.reported)?.name,
      reporterCode: interaction.reporter,
      reportedCode: interaction.reported
    }))
    
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
    
    console.log('=== DYNAMIC API RESPONSE ===')
    console.log('Response data count:', enrichedData.length)
    console.log('Response:', JSON.stringify(response, null, 2))
    
    // Set cache headers
    res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=600')
    
    res.status(200).json(response)
    
  } catch (error) {
    console.error('Error reading country mentions data:', error)
    console.error('Error stack:', error.stack)
    
    // Return a proper response even on error
    res.status(500).json({ 
      error: 'Failed to load country mentions data',
      message: error.message,
      country: req.query.countryCode || 'unknown'
    })
  }
}