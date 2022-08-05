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

export default function LoginForm() {

	return (
		<>

			<Button id="simple-dialog-toggle" onClick={enable}>
				Войти
			</Button>
			<Dialog
				id="login-dialog"
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

				</DialogContent>
				<DialogFooter style={{ justifyContent: 'center',  }}>

				</DialogFooter>
			</Dialog>

		</>

	)
}