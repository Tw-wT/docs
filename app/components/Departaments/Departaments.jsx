import { useEffect, useContext, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Context } from "../Context/Context"
import { ChevronRightSVGIcon } from "react-md"
import Loader from "../Loader/Loader"
import { clear } from "../../../features/article/articleSlice"
import { createArticle, getArticles } from "../../../features/articles/articlesSlice"


const Departaments = () => {

	const [scale, setScale] = useState(false)
	const dispatch = useDispatch()
	const { departaments, isLoading } = useSelector(
		(state) => state.departaments
	)

	const { articleContext, editorContext, departContext, groupsContext } = useContext(Context)

	const [modeCreate, setModeCreate, editArticle, setEditArticle] = editorContext
	const [showArticles, setShowArticles] = articleContext
	const [activeDepIndex, setactiveDepIndex] = departContext
	const [activeGroupIndex, setGroupIndex, groupEditMode, setGroupEditMode] = groupsContext

	const handleSetDepartment = (i) => {
		setModeCreate(false)

		setactiveDepIndex(i)
		setShowArticles(false)
		setGroupIndex(null)

		const depId = departaments[i].id
		const data = {
			groupId: null,
			departamentId: depId
		}
		 dispatch(getArticles(data))

		setScale(true)
		setTimeout(() => setScale(false), 500)
	}

	useEffect(() => {
		dispatch(clear())
	}, [])

	return (
		<>
			{isLoading && departaments == null
				?
				<div className="w-92-p rounded-lg p-3 mt-14">
					<div className="animate-pulse flex">
						<div className="flex-1">
							<div className="h-10 p-3 mb-4  rounded" style={{ backgroundColor: "rgb(215 215 215)" }}></div>
							<div className="h-10 p-3 mb-4  rounded" style={{ backgroundColor: "rgb(215 215 215)" }}></div>
							<div className="h-10 p-3 rounded" style={{ backgroundColor: "rgb(215 215 215)" }}></div>
						</div>
					</div>
				</div>
				:
				<div className="mt-14">
					{departaments && departaments.map((department, i) => (
						<div key={department.id} onClick={() => handleSetDepartment(i)} className={`w-92-p mt-2 rounded-lg p-3 cursor-pointer list_hover ${scale && activeDepIndex === i ? "scale" : ""} ${activeDepIndex === i ? "departamentActive" : ""} flex justify-between`}>
							<div>
								{department.name}</div>
							<ChevronRightSVGIcon style={activeDepIndex === i ? { fill: "black" } : {}} />
						</div>
					))}
				</div>

			}
		</>
	)
}

export default Departaments