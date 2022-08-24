import Navbar from "../Navbar/Navbar"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { reset } from "../../../features/auth/authSlice"
import toast, { Toaster } from "react-hot-toast"
import Modal from "../Modal/Modal"
import RegistrationForm from "../../../pages/auth/registration"

const MainLayout = ({ children }) => {
	const dispatch = useDispatch()

	const { auth, departaments, articles } = useSelector((state) => state)

	useEffect(() => {
		let message = auth.message || departaments.message || articles.message

		if (departaments.isError || articles.isError || auth.isError) {
			toast.error(message)
		}

		dispatch(reset())
	}, [auth, departaments, articles])
	return (
		<>
			{/* <Navbar /> */}

			<div className="flex shadow-2xl rounded-3xl" style={{ height: "800px", backgroundColor: "white" }}>
				{children}
			</div>
			<Toaster />
		</>
	)
}

export default MainLayout