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

const departamentsService = {
	get,
	createGroup
}

export default departamentsService