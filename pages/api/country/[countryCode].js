import { mentionsService } from '../../../lib/firebase'
import countriesData from '../../../data/countries'

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
    
    if (!countryCode) {
      return res.status(400).json({ error: 'Country code is required' })
    }
    
    // 🔍 Match on `code`, not `countryCode`
    const country = countriesData.find(
      c => c.code === countryCode || c.countryCode === countryCode
    );    
    console.log('country', country)
    
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
    
    // 🔑 Get interactions for this country from Firebase
    const result = await mentionsService.getInteractionsForCountry(
      countryCode, 
      parseInt(limit), 
      parseInt(offset)
    )
    
    if (result.error) {
      console.warn(`Warning: ${result.error} for country ${countryCode}`)
    }
    
    // The data is already enriched by the Firebase service, so we can use it directly
    const enrichedData = result.data || []

    
    const response = {
      country: countryCode,
      countryName: country.name,
      data: enrichedData,
      pagination: {
        total: result.total || 0,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: result.hasMore || false
      },
      filters: {},
      ...(result.error && { warning: result.error })
    }
    
    // ⏱ Cache headers
    res.setHeader('Cache-Control', 'public, max-age=600, stale-while-revalidate=1200')
    
    res.status(200).json(response)
    
  } catch (error) {
    console.error('Error reading country mentions data:', error)
    console.error('Error stack:', error.stack)
    
    res.status(200).json({ 
      country: req.query.countryCode || 'unknown',
      countryName: req.query.countryCode || 'unknown',
      data: [],
      pagination: { 
        total: 0, 
        limit: parseInt(req.query.limit) || 50, 
        offset: parseInt(req.query.offset) || 0, 
        hasMore: false 
      },
      filters: {},
      warning: 'Service temporarily unavailable, please try again'
    })
  }
}
