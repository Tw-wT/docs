import { Form, TextField } from "@react-md/form"
import { Button } from "@react-md/button"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { login, reset } from "../../features/auth/authSlice"
import { useEffect } from "react"
import Link from "next/link"

const LoginPage = () => {

	const [formData, setFormData] = useState({
		email: '',
		password: ''
	})

	const { email, password } = formData

	console.log(formData)

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}))
	}

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

	const onSubmit = (e) => {
		e.preventDefault()

		const userData = {
			email,
			password
		}

		dispatch(login(userData))
	}

	return (
		<div className="w-1/3" style={{ margin: '0 auto' }}>
			<Form className="mt-10 " onSubmit={onSubmit}>
				<h1 className="font-bold text-center mb-10 text-lg">Авторизация</h1>

				<TextField
					theme="outline"
					label="Email"
					type="email"
					className="mb-4"
					name="email"
					value={email}
					onChange={onChange}
				/>
				<TextField
					theme="outline"
					label="Пароль"
					type="password"
					className="mb-4"
					name="password"
					value={password}
					onChange={onChange}
				/>
				<div className="flex justify-between">
					<div className="links">
						<Link href={'/auth/forgot-password'}><a>Забыли пароль?</a></Link>
						<Link href={'/auth/registration'}><a style={{ marginLeft: "10px" }}>Регистрация</a></Link>
					</div>
					<Button type="submit" aria-modal="true" themeType="contained" theme="primary" style={{ marginLeft: "10px" }}>Войти</Button>
				</div>

			</Form>
		</div>
	)
}

export default LoginPage