import { useEffect, useState } from "react"
import { ChevronRightSVGIcon } from "react-md"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { getArticles } from "../../../features/articles/articlesSlice"
import { getDepartaments } from "../../../features/departaments/departamentsSlice"
import RegistrationForm from "../../../pages/auth/registration"
import Groups from "../MiddleSection/MiddleSection"
import Modal from "../Modal/Modal"
import Profile from "../Profile/Profile"
import Search from "../Search/Search"
import { Context } from "./Context"

const LeftMenu = () => {
	const dispatch = useDispatch()
	const [showArticles, setShowArticles] = useState(false)
	const [showModal, setShowModal] = useState(false)
	const [scale, setScale] = useState(false)
	const [activeItemIndex, setActiveItemIndex] = useState(0)
	
	const { departaments } = useSelector(
		(state) => state.departaments
	)

	useEffect(() => {
		dispatch(getDepartaments())
	}, [])

	const handleSetDepartment = (i) => {
		setActiveItemIndex(i)
		setShowArticles(false)

		const depId = departaments[i].id
		const data = {
			groupId: null,
			departamentId: depId
		}
		dispatch(getArticles(data))

		setScale(true)
		setTimeout(() => setScale(false), 500)
	}

	

	console.log(showModal)

	return (
		<Context.Provider value={[showArticles, setShowArticles, showModal, setShowModal]}>
			<Modal showModal={showModal}><RegistrationForm /></Modal>
			<div className="w-2/5  flex" >
				<div className="p-6 w-1/2 rounded-l-2xl" style={{ backgroundColor: "#f5f5f5" }}>
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
				<Groups departamentIndex={activeItemIndex} groups={departaments && departaments[activeItemIndex].groups} />
			</div>

		</Context.Provider>
	)
}

export default LeftMenu