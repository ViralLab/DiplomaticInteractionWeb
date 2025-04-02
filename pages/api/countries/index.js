export default function handler(req, res) {
	const method = req.method
	switch (method) {
		case 'GET':
			try {
				const interactionData = require('../../../data/interactionData')
				res.status(200).json(interactionData)
				break
			} catch (error) {
				res.status(500).json({ message: error.message })
			}
		default:
			res.setHeader('Allow', ['GET'])
			res.status(405).json({ message: `Method ${method} not allowed.` })
	}
}
