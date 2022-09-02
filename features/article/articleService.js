import instance from "../../app/store/axios/instance"

const API_URL = "api/v1/book/"

const getArticle = async (id) => {
	const response = await instance.get(`${API_URL}article/${id}`)

	return response.data
}

const deleteArticle = async(id) => {
	const response = await instance.delete(`${API_URL}article/${id}`)
	return response.data
}

const editArticleById = async(id, article) => {
	const response = await instance.put(`${API_URL}article/${id}`, article)

	return response.data
}

const articleService = {
	getArticle,
	deleteArticle,
	editArticleById
}

export default articleService