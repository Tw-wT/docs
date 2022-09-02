import { useContext, useEffect } from "react"
import { useState } from "react"
import { DeleteSVGIcon, EditSVGIcon, MoreHorizSVGIcon } from "react-md"
import { Context } from "../../MainWrapper/Context"
import { useDispatch } from "react-redux"
import { deleteArticle } from "../../../../features/article/articleSlice"
import { useSelector } from "react-redux"
import { getArticles } from "../../../../features/articles/articlesSlice"

const DropDownEdit = ({ type, fill = "black" }) => {
	const [buttonClick, setButtonClick] = useState(false)
	const [menuActive, setMenuActive] = useState(false)
	const { departContext, editorContext, groupsContext } = useContext(Context)
	const [activeDepIndex, setactiveDepIndex] = departContext
	const [activeGroupIndex] = groupsContext
	const [modeCreate, setModeCreate, editArticle, setEditArticle] = editorContext
	const dispatch = useDispatch()
	const { article, isLoading, isError, isSuccess } = useSelector(state => state.article)
	const { departaments } = useSelector(state => state.departaments)

	const editHandler = (e) => {
		e.stopPropagation()

		setEditArticle(true)
		setMenuActive(false)
	}

	const deleteHandler = (e) => {
		e.stopPropagation()

		const depId = departaments[activeDepIndex].id
		const groupId = activeGroupIndex !== null ? departaments[activeDepIndex].groups[activeGroupIndex].id : null
		dispatch(deleteArticle(article.id)).then(
			setTimeout(() => {
				dispatch(getArticles({ groupId, departamentId: groupId ? null : depId }))
			}, 500)
		)
	}

	const openHandler = (e) => {
		e.stopPropagation()
		menuActive ? setMenuActive(false) : setMenuActive(true)
		setButtonClick(true)
		setTimeout(() => {
			setButtonClick(false)
		}, 500)

	}

	const groupsStyle = {
		backgroundColor: "rgb(239 239 239)", minWidth: "200px",
	}
	const articleEditStyle = { backgroundColor: "rgb(239 239 239)", minWidth: "200px", right: "6%" }

	useEffect(() => {

		const closeDropdown = e => {
			setMenuActive(false)
		}

		document.body.addEventListener('click', closeDropdown)

		return () => document.body.removeEventListener('click', closeDropdown)
	}, [])

	return (
		<div className={``} >
			<div className={`${buttonClick ? "smallMenu" : ""} edit`} onClick={openHandler}>
				<MoreHorizSVGIcon className="w-5 h-5" style={{ fill: fill, transform: "scale(1.5)" }} />
			</div>
			<div className={`${menuActive ? "menu_opened_small" : "hidden"} flex flex-col  justify-between  z-10 rounded-lg fixed  p-3 gap-3`} style={articleEditStyle}>
				<div onClick={editHandler} className="bg-white p-3 flex justify-between rounded-md cursor-pointer ">
					Изменить
					<EditSVGIcon />
				</div>
				<div onClick={deleteHandler} className="bg-white p-3 flex justify-between rounded-md cursor-pointer">
					Удалить
					<DeleteSVGIcon />
				</div>
			</div>
		</div>
	)
}

export default DropDownEdit