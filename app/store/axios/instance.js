import axios from "axios"
import { useRouter } from "next/router"

const instance = axios.create({
	baseURL: 'http://192.168.0.203:8787/',
	headers: {
		"content-type": "application/json",
		"mode": "cors"
	}
})

instance.interceptors.response.use((response) => {
	return response
}, (error) => {
	if (error.response.status === 401) {
		const router = useRouter()
		return router.push('/auth/login')
	}
	return Promise.reject(error)
})

export default instance