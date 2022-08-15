import LeftMenu from "../LeftMenu/LeftMenu"
import Navbar from "../Navbar/Navbar"

const MainLayout = ({ children }) => {
	return (
		<>
			<Navbar />
			<div className="mt-5 flex max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
				<LeftMenu />
				{children}
			</div>
		</>
	)

}

export default MainLayout