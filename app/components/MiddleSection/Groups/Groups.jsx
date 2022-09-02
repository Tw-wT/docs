import { useContext, useState } from "react"
import { AddSVGIcon, ChevronRightSVGIcon } from "react-md"
import { useDispatch, useSelector } from "react-redux"
import { getArticles } from "../../../../features/articles/articlesSlice"
import { changeGroup, createGroup, getDepartaments } from "../../../../features/departaments/departamentsSlice"
import Button from "../../../UI/Button"
import Title from "../../../UI/Title"
import DropdownEditGroup from "../../DropDownEdit/DropDownEditGroup/DropDownGroup"
import { Context } from "../../MainWrapper/Context"

const Groups = ({ }) => {
	const dispatch = useDispatch()
	const [groupName, setGroupName] = useState()
	const [activeInput, setActiveInput] = useState(false)
	const [inputValue, setInputValue] = useState('')
	const [deleteStart, setDeleteStart] = useState(false)
	const [changeStart, setChangeStart] = useState(false)

	const { articleContext, departContext, groupsContext, editorContext } = useContext(Context)
	const [showArticles, setShowArticles] = articleContext
	const [activeDepIndex, setactiveDepIndex] = departContext
	const [activeGroupIndex, setGroupIndex, groupEditMode, setGroupEditMode] = groupsContext
	const [modeCreate, setModeCreate] = editorContext

	const { departaments, isLoading } = useSelector(state => state.departaments)

	const groups = departaments && departaments[activeDepIndex]?.groups

	const handleClickGroup = (groupIndex) => {
		setShowArticles(true)
		setGroupIndex(groupIndex)
		const groupId = departaments[activeDepIndex].groups[groupIndex].id
		const data = {
			groupId,
			departamentId: null
		}
		dispatch(getArticles(data))
	}

	const handleChangeInputValue = (e) => {
		setInputValue(e.target.value)
	}

	const changeGroupName = (e) => {
		setGroupName(e.target.value)
	}

	const handleSubmitForm = (e) => {
		e.preventDefault()
		const departamentId = departaments[activeDepIndex].id
		const name = e.target[0].value
		const data = {
			departament_id: departamentId,
			name: name
		}
		setActiveInput(false)
		setInputValue("")
		dispatch(createGroup(data)).then(() => {
			dispatch(getDepartaments())
		})
	}

	const handleSubmitChangeGroup = (e) => {
		e.preventDefault()
		setChangeStart(true)

		const id = departaments[activeDepIndex].groups[activeGroupIndex].id
		const result = {
			id,
			data: {
				group_name: groupName
			}
		}
		setGroupEditMode(false)
		setGroupName("")
		dispatch(changeGroup(result)).then(() => {
			dispatch(getDepartaments()).then(() => {
				setChangeStart(false)
				setGroupIndex(null)
			})
		})
	}

	const onBlurInput = () => {
		setActiveInput(false)
		setGroupIndex(null)
	}

	return (
		<>
			<Title text="Группы" />
			<Button onClickHandler={() => setActiveInput(true)} text="Добавить группу" rightIcon={<AddSVGIcon />} />
			{activeInput && <form className="fadeAnimation" onSubmit={handleSubmitForm} id="addGroup">
				<input autoFocus onBlur={onBlurInput} className="p-3 mt-3 rounded-lg outline-none" style={{ border: "0px", width: "93%", backgroundColor: "rgb(246, 246, 246)" }} value={inputValue} placeholder="Введите название группы" onChange={handleChangeInputValue} />
			</form>}

			<div className="overflow-y-scroll overflow-x-hidden relative mt-3 mb-2 " style={{ maxHeight: "25%", minHeight: "116px" }}>

				{groups?.map((group, i) => (
					<div>
						{groupEditMode && activeGroupIndex == i ?
							<form onSubmit={handleSubmitChangeGroup}>
								<input autoFocus onBlur={() => setGroupEditMode(false)} placeholder={group.name} value={groupName} onChange={changeGroupName} className="w-full rounded-lg fadeAnimation  outline-none font-medium list_hover_whiteBG text-black p-3 mt-2 mr-1" />
							</form>
							:
							changeStart && activeGroupIndex === i || deleteStart && activeGroupIndex === i ?
								<div className="w-full  rounded-lg mt-2 bg-white">
									<div className="animate-pulse items-center flex space-x-4">
										<div className="flex-1 items-center space-y-6 py-1">
											<div className="h-10 w-full rounded " style={{ backgroundColor: "rgb(215 215 215)" }}></div>
										</div>
									</div>
								</div>
								:
								<div onClick={() => handleClickGroup(i)} className="flex w-full mr-1 mt-2 rounded-lg p-3 cursor-pointer list_hover_whiteBG justify-between ">
									<div key={group.id} className="fadeAnimation flex items-center ">
										<div className={``}>
											<div className="flex items-center">
												{group.name}
											</div>
										</div>
									</div>
									<div className="flex gap-1 items-center">
										<DropdownEditGroup index={i} setDeleteStart={setDeleteStart} />
										<ChevronRightSVGIcon />
									</div>
								</div>
						}
					</div>
				))}

				{isLoading && !deleteStart && !changeStart ?
					<div className="w-full  rounded-lg mt-2 bg-white fadeAnimation">
						<div className="animate-pulse items-center flex space-x-4">
							<div className="flex-1 items-center space-y-6 py-1">
								<div className="h-10 w-full rounded " style={{ backgroundColor: "rgb(215 215 215)" }}></div>
							</div>
						</div>
					</div>
					:
					null
				}

			</div>


		</>
	)
}

export default Groups