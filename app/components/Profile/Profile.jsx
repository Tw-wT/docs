
import { useState } from "react"
import { KeyboardArrowDownSVGIcon } from "react-md"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/router"
import Link from "next/link"

const Profile = () => {
	const [scale, setScale] = useState(false)
	const [rotate, setRotate] = useState(false)
	const [menu, setProfileMenu] = useState(false)
	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	)

	const dispatch = useDispatch()

	let userIsNotAuth = true

	if (typeof window !== "undefined") {
		const router = useRouter()
		const isNotLoginOrRegistrPage = window.location.pathname !== "/auth/login" && window.location.pathname !== "/auth/registration"
		userIsNotAuth = !user || !user.access_token

		if (!userIsNotAuth && !isNotLoginOrRegistrPage) {
			router.push("/")
		}
	}

	const menuItemsObj = [
		{
			id: 1,
			path: userIsNotAuth ? "/auth/login" : "/profile",
			value: userIsNotAuth ? "Войти" : "Профиль"
		},
		{
			id: 2,
			path: userIsNotAuth ? "/auth/registration" : "auth/logout",
			value: userIsNotAuth ? "Регистрация" : "Выйти"
		}
	]

	const animate = () => {
		setScale(true)
		setTimeout(() => menu ? setProfileMenu(false) : setProfileMenu(true), 100)
		setTimeout(() => rotate ? setRotate(false) : setRotate(true), 100)
		setTimeout(() => setScale(false), 500)
	}

	return (
		<>
			<button onClick={animate} className={`w-72 rounded-lg p-3 ${scale ? "button_click" : ""}`} style={{ backgroundColor: "#ffffff" }}>
				<div className="flex justify-between items-center">
					<img
						className="h-8 w-8"
						src={`http://192.168.0.203:8787${user ? user.foto_url : "/upload/img-profile/default.jpg"}`}
						alt="Фото пользователя"
					/>
					<span className="font-semibold">{user ? user.name : "Имя пользователя"}</span>
					<KeyboardArrowDownSVGIcon className={`${rotate ? "rotateUp" : "rotateDown"}`} aria-setsize={"12"} style={{ transform: "scale(1.1)", fill: "black" }} />
				</div>
			</button>
			<div className={`${menu ? "menu_opened" : "hidden"} flex flex-col mt-4 justify-between  p-5 z-10 fixed  w-72 rounded-lg `} style={{ minHeight: "150px", backgroundColor: "rgb(245 245 245)" }}>
				{menuItemsObj.map(item => (
					<Link key={item.id} href={item.path}><button className={`w-64 rounded-lg p-3 ${scale ? "button_click" : ""}`} style={{ backgroundColor: "#ffffff" }}>{item.value}</button></Link>
				))}
			</div>
		</>
	)
}

export default Profile