import instance from "../../app/store/axios/instance"

//register user
const register = async (userData) => {
	const response = await instance.post(`registration`, userData)

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data))
	}

	return response.data
}

//login user
const login = async (userData) => {
	const response = await instance.post(`login`, {}, {
		auth: {
			username: userData.email,
			password: userData.password
		}
	})

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data))
	}

	return response.data
}

//logout user
const logout = () => {
	localStorage.removeItem('user')
}

const authService = {
	register,
	logout,
	login
}

export default authService