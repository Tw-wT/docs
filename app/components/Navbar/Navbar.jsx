/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react"
import { Disclosure, Menu, Transition } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import { logout, reset } from "../../../features/auth/authSlice"
import Link from "next/link"

function classNames(...classes) {
	return classes.filter(Boolean).join(" ")
}

export default function Navbar() {
	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	)

	const dispatch = useDispatch()

	const onLogout = () => {
		dispatch(logout())
		dispatch(reset())
	}

	let userIsNotAuth = true

	if (typeof window !== "undefined") {
		const router = useRouter()
		const isNotLoginOrRegistrPage = window.location.pathname !== "/auth/login" && window.location.pathname !== "/auth/registration"
		userIsNotAuth = !user || !user.access_token


		if (userIsNotAuth && isNotLoginOrRegistrPage) {
			router.push("/auth/login")
		} else if (!userIsNotAuth && !isNotLoginOrRegistrPage) {
			// console.log(user)
			router.push("/")
		}
	}

	const menuItemsObj = [
		{
			path: userIsNotAuth ? "/auth/login" : "/profile",
			value: userIsNotAuth ? "Войти" : "Профиль"
		},
		{
			path: userIsNotAuth ? "/auth/registration" : "/logout",
			value: userIsNotAuth ? "Регистрация" : "Выйти"
		}
	]

	return (
		<Disclosure as="nav" className="bg-gray-800">
			{({ open }) => (
				<>
					<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
						<div className="relative flex items-center justify-between h-16">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									{open ? (
										<XIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<MenuIcon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
							<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
								<div className="flex-shrink-0 flex items-center">
									<img
										className="block lg:block h-8 w-auto"
										src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
										alt="Workflow"
									/>
									<span className="font-medium leading-tight text-3xl h-8 mt-0 ml-2 mb-2 text-white" >Багирапедия</span>

								</div>
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								{/* Profile dropdown */}
								<Menu as="div" className="ml-3 relative">
									<div>
										<Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
											<img
												className="h-8 w-8 rounded-full"
												src={`http://192.168.0.203:8787/${user?.foto_url || "/upload/img-profile/default.jpg"}`}
												alt=""
											/>
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">

											{menuItemsObj.map(item => (
												<Menu.Item>
													{({ active }) => (
														item.path === "/logout" ? <button onClick={onLogout} className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700 cursor-pointer")}>{item.value}</button>
															:
															<Link href={item.path}><a className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>{item.value}</a></Link>
													)}
												</Menu.Item>
											))}
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						</div>
					</div>
				</>
			)}
		</Disclosure>
	)
}
