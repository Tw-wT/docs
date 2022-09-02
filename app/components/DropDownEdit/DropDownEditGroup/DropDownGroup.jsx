import { useState, useRef, useEffect } from "react"
import { EditSVGIcon, DeleteSVGIcon, MoreHorizSVGIcon } from "@react-md/material-icons"
import { useContext } from "react"
import { Context } from "../../MainWrapper/Context"
import { useDispatch, useSelector } from "react-redux"
import { deleteGroup, getDepartaments } from "../../../../features/departaments/departamentsSlice"

export default function DropdownEditGroup({ index, setDeleteStart }) {
	const container = useRef()
	const { groupsContext, departContext } = useContext(Context)
	const [activeDepIndex, setactiveDepIndex] = departContext
	const [activeGroupIndex, setGroupIndex, groupEditMode, setGroupEditMode] = groupsContext
	const [dropdownState, setDropdownState] = useState({ open: false })
	const dispatch = useDispatch()

	const { departaments } = useSelector(state => state.departaments)

	const handleDropdownClick = (e) => {
		e.stopPropagation()
		setGroupIndex(index)
		setDropdownState({ open: !dropdownState.open })
	}
	const handleClickOutside = (e) => {
		if (container.current && !container.current.contains(e.target)) {
			setDropdownState({ open: false })
		}
	}

	const handleEditClick = (e) => {
		e.stopPropagation()
		setGroupEditMode(true)
	}

	const handleDeleteClick = (e) => {
		e.stopPropagation()
		setGroupEditMode(false)
		setDropdownState(false)
		setDeleteStart(true)
		
		const groupId = departaments[activeDepIndex].groups[index].id
		dispatch(deleteGroup(groupId)).then(() => {
			dispatch(getDepartaments()).then(() => {
				setDeleteStart(false)
				setGroupIndex(null)
			})
		})
	}

	// attaches an eventListener to listen when componentDidMount
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside)
		// optionally returning a func in useEffect runs like componentWillUnmount to cleanup
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [])

	return (
		<div className="flex" ref={container}>
			<button
				type="button"
				onClick={handleDropdownClick}
			>
				<MoreHorizSVGIcon />
			</button>
			{dropdownState.open && (
				<div className="menu_opened absolute z-50 overflow-visible rounded right-3 sm p-3 flex flex-col gap-2" style={{ backgroundColor: "rgb(239, 239, 239)", minWidth: "150px" }}>
					<button onClick={handleEditClick} className="pr-2 flex justify-between pl-2 pt-1 pb-1 bg-white rounded-sm ">
						Изменить
						<EditSVGIcon style={{ fill: "green" }} />
					</button>
					<button onClick={handleDeleteClick} className="pr-2 flex justify-between pl-2 pt-1 pb-1 bg-white rounded-sm">
						Удалить
						<DeleteSVGIcon style={{ fill: "red" }} />
					</button>
				</div>
			)}
		</div>
	)
}