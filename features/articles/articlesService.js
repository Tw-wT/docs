import axios from "axios"

const API_URL = 'http://192.168.0.203:8787/'

const headers = {
	'content-type': 'application/json',
	'mode': 'cors'
}

const create = async (article, token) => {
	const response = await axios.post(`${API_URL}`, article, {
		headers: {
			...headers,
			'Authorization': `Bearer ${token}`
		}
	})
	return response.data
}

const getArticles = async (token) => {
	const response = await axios.get(`${API_URL}`, {
		headers: {
			...headers,
			'Authorization': `Bearer ${token}`
		}
	})
	console.log("response")
	console.log(response.data)
	return response.data
}

const articlesService = {
	create,
	getArticles
}

export default articlesService