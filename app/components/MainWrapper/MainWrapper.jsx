import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { clear, editArticleById, getArticle, reset } from "../../../features/article/articleSlice"
import { createArticle, getArticles } from "../../../features/articles/articlesSlice"
import { getDepartaments } from "../../../features/departaments/departamentsSlice"
import Editor from "../Editor/Editor"
import MiddleSection from "../MiddleSection/MiddleSection"
import Profile from "../Profile/Profile"
import Search from "../Search/Search"
import { Context } from "./Context"
import Toggle from "../Theme/ThemeToggle"
import Departaments from "../Departaments/Departaments"

const MainWrapper = () => {
	const dispatch = useDispatch()
	const [showArticles, setShowArticles] = useState(false)
	const [showModal, setShowModal] = useState(false) //TODO сделать авторизацию в модальном окне
	const [activeDepIndex, setactiveDepIndex] = useState(0)
	const [activeGroupIndex, setGroupIndex] = useState(null)
	const [modeCreate, setModeCreate] = useState(false)
	const [editArticle, setEditArticle] = useState(false)
	const [groupEditMode, setGroupEditMode] = useState(false)
	const { article } = useSelector(state => state.article)
	const { departaments } = useSelector(
		(state) => state.departaments
	)

	const onSaveHandler = async (blogData, title, description, type) => {
		const depId = departaments[activeDepIndex].id
		const groupId = activeGroupIndex !== null ? departaments[activeDepIndex].groups[activeGroupIndex].id : null
		switch (type) {
			case "create":
				let toSaveData = {
					title,
					blogData,
					description,
					departament_id: depId,
					group_id: groupId
				}

				let result = {
					article: toSaveData
				}
				setModeCreate(false)
				dispatch(createArticle(result)).then(() => {
					dispatch(getArticles({ groupId, departamentId: groupId ? null : depId }))
				})
				break
			case "edit":
				toSaveData = {
					title,
					description,
					blogData,
				}
				result = {
					id: article.id,
					article: toSaveData
				}
				dispatch(editArticleById(result)).then(
					setTimeout(() => {
						dispatch(getArticle(result.id)).then(() => {
							setEditArticle(false)
							dispatch(reset())

						})
						dispatch(getArticles({ groupId, departamentId: groupId ? null : depId }))
					}, 500)
				)
		}
	}

	const editorContext = [modeCreate, setModeCreate, editArticle, setEditArticle]
	const articleContext = [showArticles, setShowArticles]
	const departContext = [activeDepIndex, setactiveDepIndex]
	const groupsContext = [activeGroupIndex, setGroupIndex, groupEditMode, setGroupEditMode]

	return (
		<>
			<Context.Provider value={{ editorContext, articleContext, departContext, groupsContext }}  >
				{/* <Modal showModal={showModal}><RegistrationForm /></Modal> */}
				<div className="w-2/5  flex" >
					<div className="p-6 w-1/2 rounded-l-2xl relative" style={{ backgroundColor: "#f5f5f5" }}>
						<Profile />
						<Search />
						<Departaments />
						<Toggle />
					</div>
					<MiddleSection />
				</div>
				<Editor
					onSave={(editorData, title, description, type) =>
						onSaveHandler(editorData, title, description, type)
					}
				/>
			</Context.Provider>
		</>

	)
}

export default MainWrapper