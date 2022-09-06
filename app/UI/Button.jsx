import { useState } from "react"


const Button = ({ onClickHandler, text, rightIcon = null, leftIcon = null, classNames }) => {
	const [scale, setScale] = useState(false)

	const onClickButton = () => {
		onClickHandler()
		setScale(true)

		setTimeout(() => { setScale(false) }, 500)
	}

	return (
		<button className={`${classNames} rounded-lg p-3 mt-10 mb-5  ${scale ? "button_click" : ""}`} onClick={onClickButton} style={{ backgroundColor: "#f6f6f6" }}>
			<div className="flex justify-between gap-3">
				{leftIcon && leftIcon}
				<span className="pr-2">{text}</span>
				{rightIcon && rightIcon}
			</div>
		</button>
	)
}

export default Button