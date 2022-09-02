import instance from "../../app/store/axios/instance"

const getGroupsByDepId = async(id) => {
	const response = await instance.get(`api/v1/book/group-article`, {
		params: {
			departament_id: id
		}
	})

	return response.data
}

const groupsService = {
	getGroupsByDepId
}

export default groupsService