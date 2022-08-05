import { useToggle } from "@react-md/utils"
import { Form, TextField } from "@react-md/form"
import { Button } from "@react-md/button"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { register, reset } from "../../features/auth/authSlice"
import { useEffect } from "react"
import Link from "next/link"

function RegistrationForm() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: ''
	})

	const { name, email, password } = formData

	const dispatch = useDispatch()

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	)

	useEffect(() => {
		if (isError) {
			console.log(message)
		}

		if (isSuccess || user) {
			console.log("success")
		}

	}, [user, isError, isSuccess, message, dispatch])

	const [visible, enable, disable] = useToggle(false)

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}))
	}

	const onSubmit = (e) => {
		e.preventDefault()

		const userData = {
			name,
			email,
			psw: password
		}

		dispatch(register(userData))
	}

	return (
		<>
			<div className="w-1/3" style={{ margin: '0 auto' }}>
				<Form className="mt-10 "
					onSubmit={onSubmit}
				>
					<h1 className="font-bold text-center mb-10 text-lg">Авторизация</h1>
					<TextField
						theme="outline"
						label="Имя"
						type="text"
						className="mb-4"
						name="name"
						onChange={onChange}
						value={name}
					/>
					<TextField
						theme="outline"
						label="Email"
						type="email"
						name="email"
						className="mb-4"
						onChange={onChange}
						value={email}
					/>
					<TextField
						theme="outline"
						label="Пароль"
						type="password"
						className="mb-4"
						name="password"
						onChange={onChange}
						value={password}
					/>

					<div className="flex justify-between">
						<div className="links">							
							<Link href={'/auth/login'}><a style={{ marginLeft: "10px" }}>Уже есть аккаунт? Войти</a></Link>
						</div>
						<Button type="submit" aria-modal="true" themeType="contained" theme="primary" style={{ marginLeft: "10px" }}>Регистрация</Button>
					</div>

				</Form>
			</div>


		</>
	)
}

export default RegistrationForm