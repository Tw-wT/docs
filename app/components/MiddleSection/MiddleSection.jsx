import { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getArticles } from "../../../features/articles/articlesSlice"
import { Context } from "../Context/Context"
import { getDepartaments } from "../../../features/departaments/departamentsSlice"
import Groups from "./Groups/Groups"
import Articles from "./Articles/Articles"

const MiddleSection = ({ }) => {

	const { articleContext, departContext } = useContext(Context)
	const [showArticles] = articleContext
	const [activeDepIndex] = departContext

	const dispatch = useDispatch()
	const { departaments } = useSelector(state => state.departaments)


	useEffect(() => {
		departaments && dispatch(getArticles({ departamentId: departaments[activeDepIndex].id, groupId: null }))
	}, [departaments])


	useEffect(() => {
		dispatch(getDepartaments())
	}, [])

	return (
		<div className="p-6 w-1/2 " style={{ borderRightWidth: "1px" }}>
			<div className="flex h-full">
				{!showArticles ?
					<div className="w-full ">
						<Groups />

						<Articles  />
					</div>
					:
					showArticles &&
					<div className="w-full">
						<Articles />
					</div>
				}
			</div>

		</div>
	)
}

export default MiddleSection