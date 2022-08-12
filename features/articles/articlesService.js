import instance from "../../app/store/axios/instance"

// instance.defaults.baseURL = "http://192.168.0.203:8787/api/v1/book/"

const API_URL = "api/v1/book/"

const create = async (article, token) => {
	const response = await instance.post(`${API_URL}article`, article, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	})
	return response.data
}

const getArticles = async (token) => {
	const response = await instance.get(`${API_URL}article`, {
		params: {
			group_id: 1
		},
		headers: {
			'Authorization': `Bearer ${token}`
		}
	})
	return response.data
}

const getGroups = async (token, departament_id) => {
	const response = await instance.get(`${API_URL}group-article`, {
		params: {
			departament_id: departament_id
		},
		headers: {
			'Authorization': `Bearer ${token}`
		}
	})
	return response.data
}

const articlesService = {
	create,
	getArticles,
	getGroups
}

export default articlesService