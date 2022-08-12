import {
	Tree,
	useTreeItemExpansion,
	useTreeItemSelection,
} from "@react-md/tree"
import { useEffect } from "react"
import { useSelector } from "react-redux"

let folders = {
	"folder-1": {
		name: "Folder 1",
		itemId: "folder-1",
		parentId: null,
	},
	"folder-2": {
		name: "Folder 2",
		itemId: "folder-2",
		parentId: null,
	},
	"folder-3": {
		name: "Folder 3",
		itemId: "folder-3",
		parentId: null,
	},
	"folder-2-1": {
		name: "Folder 2 Child 1",
		itemId: "folder-2-1",
		parentId: "folder-2",
	},
	"folder-2-2": {
		name: "Folder 2 Child 2",
		itemId: "folder-2-2",
		parentId: "folder-2",
	},
	"folder-2-3": {
		name: "Folder 2 Child 3",
		itemId: "folder-2-3",
		parentId: "folder-2",
	},
}

export default function LeftMenu() {
	const selection = useTreeItemSelection([], false)
	const expansion = useTreeItemExpansion([])

	selection.onItemSelect = (item) => {
		console.log(item)
	}

	const { departaments, isLoading, isSuccess, isError } = useSelector(
		(state) => state.departaments
	)

	useEffect(() => {
		departaments?.map(departament => {
			console.log(departament)
		})
	}, [isSuccess])

	return (
		<Tree
			id="single-select-tree"
			aria-label="Tree"
			data={folders}
			{...selection}
			{...expansion}
		/>
	)
}

// export default LeftMenu