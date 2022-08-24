import { Form, TextField } from "@react-md/form"
import { Button } from "@react-md/button"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { login, reset } from "../../features/auth/authSlice"
import Link from "next/link"
import { useSelector } from "react-redux"
import  Router  from "next/router"

const LoginPage = () => {
	const dispatch = useDispatch()

	const [formData, setFormData] = useState({
		email: '',
		password: ''
	})

	const { email, password } = formData

	const { user, isSuccess } = useSelector((state) => state.auth)

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}))
	}

	useEffect(() => {
		if(user){
			Router.push("/")
		}
	}, [isSuccess])

	const onSubmit = (e) => {
		e.preventDefault()

		const userData = {
			email,
			password
		}

		dispatch(login(userData))
		dispatch(reset())
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