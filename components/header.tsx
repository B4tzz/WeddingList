import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { MenuIcon, XIcon } from "@heroicons/react/solid";

const navigation = [{ name: "Dashboard", href: "/dashboard", current: true }];

function classNames(...classes: any) {
	return classes.filter(Boolean).join(" ");
}

const userNavigation = [{ name: "Sign out", href: "#" }];

export default function Header(props: any) {
	const { data: session } = useSession();

	return (
		<>
			<div className="flex bg-green-700 max-h-16 w-full">
				<div className="flex w-full">
					<Disclosure as="nav" className="flex flex-1">
						{({ open }) => (
							<div className="w-full">
								<div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
									<div className="flex items-center justify-between h-16 flex-1">
										<div className="flex items-center ">
											<div className="flex flex-shrink-0 font-semibold text-white flex-row items-center text-2xl">
												WeddingList
												<img
													className="h-10 w-10"
													src="/logo-white.png"
													alt="WeddingList icon"
												/>
											</div>
											<div className="hidden md:block">
												<div className="ml-10 flex items-baseline space-x-4">
													{navigation.map((item) => (
														<a
															key={item.name}
															href={item.href}
															className={classNames(
																item.name === props.page
																	? "bg-green-900 text-white"
																	: "text-gray-300 hover:bg-green-700 hover:text-white",
																"px-3 py-2 rounded-md text-sm font-medium"
															)}
															aria-current={
																item.name === props.page ? "page" : undefined
															}
														>
															{item.name}
														</a>
													))}
												</div>
											</div>
										</div>
										<div className="hidden md:block">
											<div className="ml-4 flex items-center md:ml-6">
												{/* Profile dropdown */}
												<Menu as="div" className="ml-3 relative">
													<div>
														<Menu.Button className="max-w-xs bg-green-900 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
															<span className="sr-only">Open user menu</span>
															<p className="m-2 text-white">
																{session?.user?.name ? session?.user?.name : "Anônimo"}
															</p>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																className="h-8 w-8 rounded-full"
																viewBox="0 0 20 20"
																fill="white"
															>
																<path
																	fillRule="evenodd"
																	d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
																	clipRule="evenodd"
																/>
															</svg>
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
															{userNavigation.map((item) => (
																<Menu.Item key={item.name}>
																	{({ active }: { active: any }) => (
																		<Link href={item.href}>
																			<a
																				onClick={() => signOut()}
																				className={classNames(
																					active ? "bg-green-700" : "",
																					"block px-4 py-2 text-sm text-brown-700"
																				)}
																			>
																				{item.name}
																			</a>
																		</Link>
																	)}
																</Menu.Item>
															))}
														</Menu.Items>
													</Transition>
												</Menu>
											</div>
										</div>
										<div className="-mr-2 flex md:hidden">
											{/* Mobile menu button */}
											<Disclosure.Button className="bg-green-900 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
												<span className="sr-only">Open main menu</span>
												{open ? (
													<XIcon className="block h-6 w-6" aria-hidden="true" />
												) : (
													<MenuIcon
														className="block h-6 w-6"
														aria-hidden="true"
													/>
												)}
											</Disclosure.Button>
										</div>
									</div>
								</div>

								<Disclosure.Panel className="md:hidden">
									<nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
										{navigation.map((item) => (
											<Link href={item.href} key={item.name}>
												<a
													className={classNames(
														item.name == props.page
															? "bg-green-900 text-white"
															: "text-gray-300 hover:bg-green-700 hover:text-white",
														"block px-3 py-2 rounded-md text-base font-medium"
													)}
													aria-current={
														item.name == props.page ? "page" : undefined
													}
												>
													{item.name}
												</a>
											</Link>
										))}
									</nav>
									<div className="mx-2 rounded-md pt-4 pb-3 border-t border-gray-300 bg-green-700">
										<div className="flex items-center px-5">
											<div className="flex-shrink-0">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-8 w-8 rounded-full"
													viewBox="0 0 20 20"
													fill="white"
												>
													<path
														fillRule="evenodd"
														d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
														clipRule="evenodd"
													/>
												</svg>
											</div>
										</div>
										<div className="mt-3 px-2 space-y-1">
											{userNavigation.map((item) => (
												<Link href={item.href} key={item.name}>
													<a className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-white hover:bg-gray-700">
														{item.name}
													</a>
												</Link>
											))}
										</div>
									</div>
								</Disclosure.Panel>
							</ div>
						)}
					</Disclosure>
				</div>
			</div>
		</>
	);
}
