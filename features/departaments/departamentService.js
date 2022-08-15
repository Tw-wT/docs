import instance from "../../app/store/axios/instance"

const get = async () => {
	const response = await instance.get(`departament`)
	return response.data
}

const departamentsService = {
	get
}

export default departamentsService