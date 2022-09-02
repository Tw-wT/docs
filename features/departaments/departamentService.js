import instance from "../../app/store/axios/instance"

//* Получить список отделов
const get = async () => {
	const response = await instance.get(`departament`)
	return response.data
}

const createGroup = async (groupData) => {
	const response = await instance.post(`api/v1/book/group-article`, groupData)
	return response.data
}

const deleteGroup = async (id) => {
	const response = await instance.delete(`api/v1/book/group-article/${id}`)
	
	return response.data
}

const changeGroup = async (id, data) => {
	const response = await instance.put(`api/v1/book/group-article/${id}`, data)

	return response.data
}

const departamentsService = {
	get,
	createGroup,
	changeGroup,
	deleteGroup
}

export default departamentsService