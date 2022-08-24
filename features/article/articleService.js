import instance from "../../app/store/axios/instance"

const API_URL = "api/v1/book/"

const getArticle = async (id) => {
	const response = await instance.get(`${API_URL}article/${id}`)

	return response.data
}

const articleService = {
	getArticle
}

export default articleService