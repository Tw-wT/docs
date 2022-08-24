import instance from "../../app/store/axios/instance"

const API_URL = "api/v1/book/"

//* Создать запись
const create = async (article) => {
	const response = await instance.post(`${API_URL}article`, article)
	return response.data
}

//* Получить список записей
const getArticles = async (groupId = null, departamentId = null) => {
	const response = await instance.get(`${API_URL}article`, {
		params: {
			group_id: groupId ? groupId : null,
			departament_id: departamentId || departamentId ===0 ? departamentId : null
		}
	})
	return response.data
}

//* Получить отдельную запись


const articlesService = {
	create,
	getArticles
}

export default articlesService