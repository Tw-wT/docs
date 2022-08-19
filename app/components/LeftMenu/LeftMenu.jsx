import { Tree, useTreeItemExpansion, useTreeItemSelection } from "@react-md/tree"
import { useEffect, useState } from "react"
import { ChevronRightSVGIcon } from "react-md"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { getArticles, reset } from "../../../features/articles/articlesSlice"
import { getDepartaments } from "../../../features/departaments/departamentsSlice"
import ArticlesList from "../ArticlesList/ArticlesList"
import Groups from "../Groups/Groups"
import Profile from "../Profile/Profile"
import Search from "../Search/Search"
import { useContext } from "react"
import { Context } from "./Context"

const LeftMenu = () => {
	const dispatch = useDispatch()
	const [showArticles, setShowArticles] = useState(false)
	const [scale, setScale] = useState(false)
	const [activeItemIndex, setActiveItemIndex] = useState(0)
	const [viewGroups, setGroups] = useState({})
	const { departaments, isLoading, isSuccess, isError } = useSelector(
		(state) => state.departaments
	)

	useEffect(() => {
		dispatch(getDepartaments())
	}, [])

	const handleSetDepartment = (i) => {
		setActiveItemIndex(i)
		setShowArticles(false)
		setScale(true)
		setTimeout(() => setScale(false), 500)
	}

	return (
		<Context.Provider value={[showArticles, setShowArticles]} >
			<div className="w-2/5  flex" >
				<div className="p-6 w-1/2 rounded-l-2xl" style={{ backgroundColor: "#fbfbfb" }}>
					<Profile />
					<Search />
					<div className="mt-14">
						{departaments && departaments.map((department, i) => (
							<div key={department.id} onClick={() => handleSetDepartment(i)} className={`w-72 mt-2 rounded-lg p-3 cursor-pointer list_hover ${scale && activeItemIndex === i ? "scale" : ""} ${activeItemIndex === i ? "departamentActive" : ""} flex justify-between`}>
								<div>
									{department.name}</div>
								<ChevronRightSVGIcon style={activeItemIndex === i ? { fill: "black" } : {}} />
							</div>
						))}
					</div>
				</div>
				{/* {user ?
				<Tree
					id="single-select-tree"
					aria-label="Tree"
					data={folders}
					style={{ maxWidth: "20%", marginRight: "20px" }}
					{...selection}
					{...expansion}
				/>
				:
				""} */}
				<Groups departamentIndex={activeItemIndex} groups={departaments && departaments[activeItemIndex].groups} />
			</div>
		</Context.Provider>
	)
}

export default LeftMenu