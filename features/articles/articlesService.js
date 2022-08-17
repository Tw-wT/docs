import instance from "../../app/store/axios/instance"

const API_URL = "api/v1/book/"

const create = async (article) => {
	const response = await instance.post(`${API_URL}article`, article)
	return response.data
}

const getArticles = async (groupId = null, departamentId = null) => {
	const response = await instance.get(`${API_URL}article`, {
		params: {
			group_id: groupId ? groupId : null,
			departament_id: departamentId ? departamentId : null
		}
	})
	return response.data
}

const getArticle = async (id) => {
	const response = await instance.get(`${API_URL}article/${id}`)

	return response.data
}

const articlesService = {
	create,
	getArticles,
	getArticle
}

export default articlesService