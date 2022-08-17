import Navbar from "../Navbar/Navbar"

const MainLayout = ({ children }) => {
	return (
		<>
			<Navbar />
			<div className="flex mt-5 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
				{children}
			</div>

		</>
	)

}

export default MainLayout