import { Context } from "../LeftMenu/Context"
import { useContext } from "react"

const Modal = ({ children }) => {
	const [showArticles, setShowArticles, showModal, setShowModal] = useContext(Context)
	console.log(showModal)
	return (
		<>
			{showModal ?
				<div onClick={() => setShowModal(false)} className="modal p-6 absolute top-0 left-0 z-20 w-full h-full" style={{ backdropFilter: "blur(4px)" }}>
					<div className="modal_wrapper p-6 rounded-xl w-1/2 h-1/2 bg-slate-200 absolute m-auto top-0 left-0 right-0 bottom-0 ">
						<div className="mt-10">
							{children}
						</div>
					</div>

				</div>
				:
				null}
		</>
	)
}

export default Modal