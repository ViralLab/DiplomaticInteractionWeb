import { mentionsService } from '../../../lib/firebase'

export default async function handler(req, res) {
  // Handle different HTTP methods
  if (req.method === 'GET') {
    return handleGet(req, res)
  }
  
  res.setHeader('Allow', ['GET'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}

async function handleGet(req, res) {
  try {
    // Extract query parameters
    const { 
      country, 
      year, 
      type, 
      limit = 50, 
      offset = 0,
      sort = 'year',
      order = 'desc',
      overview = false  // New parameter for map overview
    } = req.query
    
    // For map overview, return countries and limited interactions
    if (overview === 'true') {
      const overviewData = await mentionsService.getOverviewData()
      return res.status(200).json(overviewData)
    }
    
    // Get filtered interactions from Firebase
    const result = await mentionsService.getInteractionsForCountry(
      country,
      { limit: parseInt(limit), offset: parseInt(offset), sort, order }
    )
    
    // Return response
    res.status(200).json({
      data: result.data,
      pagination: {
        total: result.total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: result.hasMore
      }
    })
    
  } catch (error) {
    console.error('Error reading mentions data:', error)
    res.status(500).json({ error: 'Failed to load mentions data' })
  }
}