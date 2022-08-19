import instance from "../../app/store/axios/instance"

//* Получить список отделов
const get = async () => {
	const response = await instance.get(`departament`)
	return response.data
}

const departamentsService = {
	get
}

export default departamentsService