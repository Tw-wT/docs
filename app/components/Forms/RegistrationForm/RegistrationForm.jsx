import { Button } from "@react-md/button"
import {
	Dialog,
	DialogHeader,
	DialogTitle,
	DialogContent,
	DialogFooter,
} from "@react-md/dialog"
import { Typography } from "@react-md/typography"
import { useToggle } from "@react-md/utils"
import { Form, TextField } from "@react-md/form"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { register, reset } from "../../../../features/auth/authSlice"
import { useEffect } from "react"

function RegistrationForm() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: ''
	})

	const { name, email, password } = formData

	const dispatch = useDispatch()

	const {user, isLoading, isError, isSuccess, message} = useSelector(
		(state) => state.auth
	)

	useEffect(() => {
		if(isError) {
			console.log(message)
		}

		if(isSuccess || user) {
			console.log("success")
		}

	},[user, isError, isSuccess, message, dispatch])

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
			<Button id="registration-dialog" onClick={enable}>
				Регистрация
			</Button>
			<Dialog
				id="registration-dialog"
				visible={visible}
				onRequestClose={disable}
				aria-labelledby="dialog-title"
				type="centered"
				style={{ width: "900px", height: "auto", margin: "0 auto", borderRadius: "10px" }}
			>
				<DialogHeader>
					<DialogTitle id="dialog-title">Авторизация</DialogTitle>
				</DialogHeader>
				<DialogContent>
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
							<DialogFooter style={{ justifyContent: 'center', }}>
								<Button aria-modal="true" themeType="contained" theme="clear" style={{ marginLeft: "10px" }}>Уже есть аккаунт? Войти</Button>
								<Button type="submit" aria-modal="true" themeType="contained" theme="primary" style={{ marginLeft: "10px" }}>Регистрация</Button>
							</DialogFooter>
						</Form>
					</div>
				</DialogContent>

			</Dialog>
		</>
	)
}

export default RegistrationForm