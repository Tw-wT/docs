import { Tree, useTreeItemExpansion, useTreeItemSelection } from "@react-md/tree"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { getArticles, reset } from "../../../features/articles/articlesSlice"
import { getDepartaments } from "../../../features/departaments/departamentsSlice"

const LeftMenu = () => {
	const selection = useTreeItemSelection([], false)
	const dispatch = useDispatch()
	const expansion = useTreeItemExpansion([])
	const [folders, setFolders] = useState({})

	const { departaments, isLoading, isSuccess, isError } = useSelector(
		(state) => state.departaments
	)

	const { user } = useSelector((state) => state.auth)

	selection.onItemSelect = (item) => {

		if (Number(item)) {
			let data = {
				groupId: item,
				departamentId: null
			}
			dispatch(getArticles(data))
		} else {
			let departamentId = departaments.filter((el) => {
				return el.name == item
			})[0].id
			let data = {
				groupId: null,
				departamentId
			}
			dispatch(getArticles(data))
			dispatch(reset())
		}
	}

	useEffect(() => {
		dispatch(getDepartaments())
	}, [])

	useEffect(() => {
		let newArr = {}
		if (user) {
			departaments?.map(departament => {
				newArr[`${departament.name}`] = {
					name: departament.name,
					itemId: `${departament.name}`,
					id: departament.id,
					parentId: null
				}
				setFolders(newArr)
				departament.groups && departament.groups.map(group => {
					newArr[`${group.id}`] = {
						name: group.name,
						itemId: `${group.id}`,
						id: departament.id,
						parentId: `${departament.name}`,

					}
					setFolders(newArr)
				})
			})
		} else {
			setFolders({ newArr })
		}
	}, [isSuccess])


	return (
		<>
			{user ?
				<Tree
					id="single-select-tree"
					aria-label="Tree"
					data={folders} 
					style={{ maxWidth: "20%", marginRight: "20px" }}
					{...selection}
					{...expansion}
				/>
				:
				""}
		</>
	)
}

export default LeftMenu