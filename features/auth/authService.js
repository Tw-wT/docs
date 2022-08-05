import axios from 'axios'

const API_URL = 'http://192.168.0.203:8787/'

const headers = {
	'content-type': 'application/json',
	'mode': 'cors'
}

//register user
const register = async (userData) => {
	const response = await axios.post(`${API_URL}registration`, userData, headers)

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data))
	}

	return response.data
}

//login user
const login = async (userData) => {
	const response = await axios.post(`${API_URL}login`, {}, {
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