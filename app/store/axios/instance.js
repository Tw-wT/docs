import axios from "axios"
import Router from "next/router"

const instance = axios.create({
	baseURL: 'http://192.168.0.203:8787/',
	headers: {
		"content-type": "application/json",
		"mode": "cors",
	}
})

let store
export const injectStore = _store => {
	store = _store
}

instance.interceptors.request.use(config => {
	let token = store.getState().auth.user?.access_token
	if (token) {
		config.headers.authorization = `Bearer ${token}`
	}
	return config
})

instance.interceptors.response.use((response) => {
	return response
}, (error) => {
	if (error.response.status === 401) {
		Router.push('/auth/logout')
	}
	return Promise.reject(error)
})

export default instance