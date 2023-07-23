import { withSessionRoute } from '@/utils/session-wrapper'
import apiService from '@/utils/apiService'

export default withSessionRoute(async (req, res) => {
	const token = req.session?.auth?.access_token
	if (req.method === 'POST') {
		try {
			const response = await apiService.request({
				method: 'post',
				url: `/api/v1/gallery/add`,
				data: {
					...req.body
				},
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			res.status(200).send(response.data)
		} catch (error) {
			res.status(error.response.status ?? 500).send(error.response.data ?? error)
		}
	} else {
		res.status(405).send({ message: 'Method not allowed' })
	}
})