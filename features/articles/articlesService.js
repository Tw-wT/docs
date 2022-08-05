import axios from "axios"

const API_URL = 'http://192.168.0.203:8787/'

const headers = {
	'content-type': 'application/json',
	'mode': 'cors'
}

const create = async (article, token) => {
	console.log(token)
	const response = await axios.post(`${API_URL}`, article, {
		headers: {
			...headers,
			'Authorization': `Bearer ${token}`
		}
	})
}

const articlesService = {
	create
}

export default articlesService