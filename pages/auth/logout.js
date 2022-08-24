import { logout } from "../../features/auth/authSlice"
import { clearData, reset } from "../../features/departaments/departamentsSlice"
import { useDispatch } from "react-redux"
import Router from "next/router"

const Logout = () => {
	if (typeof window !== "undefined") {
		const dispatch = useDispatch()
		dispatch(logout())
		dispatch(clearData())
		dispatch(reset())
		Router.push('/auth/login')
	}

	return null
}

export default Logout