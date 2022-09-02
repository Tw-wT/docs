import { useEffect } from "react"
import { WbSunnySVGIcon, Brightness3SVGIcon } from "react-md"
import { useDispatch, useSelector } from "react-redux"
import { setBlackTheme, setWhiteTheme } from "../../../features/theme/themeSlice"

const Toggle = () => {
	const { black, white } = useSelector(state => state.theme)
	const dispatch = useDispatch()

	useEffect(() => {
		if (localStorage.getItem('theme') == "black") {
			dispatch(setBlackTheme())
			changeTheme(true, "black")
		} else {
			dispatch(setWhiteTheme())
		}
	}, [])

	const changeTheme = (initial, theme = null) => {
		if (white && theme == null) {
			if (initial == false) {
				document.body.classList.remove("changeThemeToWhite")
				document.body.classList.add("changeThemeToBlack")
				dispatch(setBlackTheme())
				localStorage.setItem("theme", "black")
			} else {
				document.body.classList.add("changeThemeToWhite")
				dispatch(setWhiteTheme())
				localStorage.setItem("theme", "white")
			}
		} else if (black || theme == "black") {
			if (initial == false) {
				document.body.classList.remove("changeThemeToBlack")
				document.body.classList.add("changeThemeToWhite")
				dispatch(setWhiteTheme())
				localStorage.setItem("theme", "white")
			} else {
				document.body.classList.add("changeThemeToBlack")
				dispatch(setBlackTheme())
				localStorage.setItem("theme", "black")
			}
		}
	}

	return (
		<div onClick={() => { changeTheme(false) }} className="absolute bottom-2 cursor-pointer">
			{black ? <WbSunnySVGIcon style={{ fill: "black", transform: "scale(1.2)" }} /> : <Brightness3SVGIcon style={{ fill: "black", transform: "scale(1.2)"}} />}
		</div>
	)
}

export default Toggle