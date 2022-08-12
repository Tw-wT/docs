import instance from "../../app/store/axios/instance"

const get = async (token) => {
	const response = await instance.get(`departament`, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	})
	return response.data
}

const departamentsService = {
	get
}

export default departamentsService