import loaderSVG from "../../../public/loader.svg"

const Loader = () => {


	return (
		<div className="block fixed z-20 " style={{ left: "44%", top: "25%" }}>
			<img src={loaderSVG.src} alt="test" />
		</div>
	)
}

export default Loader