import {
	Tree,
	useTreeItemExpansion,
	useTreeItemSelection,
} from "@react-md/tree"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Loader from "../Loader/Loader"

export default function LeftMenu() {

	const selection = useTreeItemSelection([], false)
	const expansion = useTreeItemExpansion([])
	const [folders, setFolders] = useState({})

	selection.onItemSelect = (item) => {
		console.log(item)
	}

	const { departaments, isLoading, isSuccess, isError } = useSelector(
		(state) => state.departaments
	)

	const { user } = useSelector((state) => state.auth)
	// console.log(user)

	useEffect(() => {
		let newArr = {}
		if (user) {
			departaments?.map(departament => {
				setFolders()
				newArr[`${departament.name}`] = {
					name: departament.name,
					itemId: `${departament.name}`,
					parentId: null
				}
				setFolders(newArr)
				departament.groups && departament.groups.map(group => {
					newArr[`${group.name}`] = {
						name: group.name,
						itemId: `${group.name}`,
						parentId: `${departament.name}`
					}
					setFolders(newArr)
				})
			})
		}

	}, [isSuccess])

	return (
		<>

			{Object.keys(folders).length !== 0 ?
				<div className="w-1/4 mr-5">
					<Tree
						id="single-select-tree"
						aria-label="Tree"
						data={folders}
						inputMode="text"
						{...selection}
						{...expansion}
					/>
				</div>
				:
				""
			}

		</>
	)
}

// export default LeftMenu