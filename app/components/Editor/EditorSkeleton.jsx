import { ChevronRightSVGIcon } from "react-md"


const EditorSkeleton = () => {
	return (
		<div className="overflow-y-scroll p-8 w-3/5 fadeAnimation">
			<nav className="flex justify-between border-b-2 border-gray-200">
				<div className="flex items-end mb-2">
					<div className="fadeAnimation font-normal leading-tight text-2xl   text-black">Записи</div>
					<div><ChevronRightSVGIcon style={{ fill: "black", transform: "scale(1.2)" }} /></div>
					<div className="rounded-lg w-32">
						<div className="animate-pulse items-center flex ">
							<div className="flex-1 items-center space-y-6 py-1">
								<div className="h-5 w-full rounded " style={{ backgroundColor: "rgb(215 215 215)" }}></div>
							</div>
						</div>
					</div>
				</div>
			</nav>
			<section className="p-4">
				<div>
					<div className="fadeAnimation font-medium leading-tight text-4xl text-black">
						<div className="rounded-lg w-60">
							<div className="animate-pulse items-center flex ">
								<div className="flex-1 items-center space-y-6 py-1">
									<div className="h-10 w-full rounded " style={{ backgroundColor: "rgb(215 215 215)" }}></div>
								</div>
							</div>
						</div>
					</div>
					<div className="fadeAnimation font-normal leading-tight text-2xl mb-8  text-black">
						<div className="rounded-lg w-96">
							<div className="animate-pulse items-center flex ">
								<div className="flex-1 items-center space-y-6 py-1">
									<div className="h-8 w-full rounded " style={{ backgroundColor: "rgb(215 215 215)" }}></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div className="flex border-b-2 border-gray-200">
				<div className=" flex gap-10 items-center">
					<div className="text-gray-500 flex flex-col gap-5">
						<div>Кем создана (изменена)</div>
						<div>Дата последнего изменения</div>
						<div>Тэги</div>
					</div>
					<div className="flex flex-col gap-5 text-black text-base font-normal">
						<div className="flex gap-2 items-center">
							<div>
								<div className="rounded-lg w-8">
									<div className="animate-pulse items-center flex ">
										<div className="flex-1 items-center space-y-6 py-1">
											<div className="h-8 w-full rounded " style={{ backgroundColor: "rgb(215 215 215)" }}></div>
										</div>
									</div>
								</div>
							</div>
							<div>
								<div className="rounded-lg w-32">
									<div className="animate-pulse items-center flex ">
										<div className="flex-1 items-center space-y-6 py-1">
											<div className="h-8 w-full rounded " style={{ backgroundColor: "rgb(215 215 215)" }}></div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div>
							<div className="rounded-lg w-32">
								<div className="animate-pulse items-center flex ">
									<div className="flex-1 items-center space-y-6 py-1">
										<div className="h-8 w-full rounded " style={{ backgroundColor: "rgb(215 215 215)" }}></div>
									</div>
								</div>
							</div>
						</div>
						<div>
							<div className="rounded-lg w-32">
								<div className="animate-pulse items-center flex ">
									<div className="flex-1 items-center space-y-6 py-1">
										<div className="h-8 w-full rounded " style={{ backgroundColor: "rgb(215 215 215)" }}></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full mt-4">
				<div className="rounded-lg">
					<div className="animate-pulse items-center flex ">
						<div className="flex-1 items-center space-y-6 py-1">
							<div className="w-full rounded " style={{ backgroundColor: "rgb(215 215 215)", height: "350px" }}></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EditorSkeleton