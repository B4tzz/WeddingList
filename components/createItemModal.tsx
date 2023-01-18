/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ThreeDots } from "react-loader-spinner";
import {
	Gift,
	GiftCreateInput,
	useAddItemToListMutation,
	usePublishToListMutation,
} from "../graphql/generated";
import { GitBranch } from "phosphor-react";
import { useRouter } from "next/router";
import { ModalLoader } from "./loaderModal";
import { SuccessLoader } from "./successModal";

export default function CreateItemModal(props: {
	showLoader: boolean;
	setShowLoaderProps: Function;
}) {
	const router = useRouter();
	const [gift, setGift] = useState<GiftCreateInput>();
	const [createItem] = useAddItemToListMutation();
	const [publishItem] = usePublishToListMutation();
	const [showLoader, setShowLoader] = useState<boolean>(false);
	const [showPositiveLoader, setShowPositiveLoader] = useState<boolean>(false);

	const cancelButtonRef = useRef(null);

	const handleRenameGiftTitle = (text: string) => {
		let auxGift = { title: text };

		setGift((gift) => ({
			...gift,
			...auxGift,
		}));
	};

	const handleRenameGiftLink = (text: string) => {
		let auxGift = { link: text };

		//@ts-ignore
		setGift((gift) => ({
			...gift,
			...auxGift,
		}));
	};

	const handleCancel = (e: any) => {
		console.log("chamou cancel");
		props.setShowLoaderProps();
		e.preventDefault();
	};

	const handleCreateItem = async (e: any) => {
		try {
			setShowLoader(true);
			e.preventDefault();
			const result = await createItem({
				variables: {
					title: gift?.title,
					link: gift?.link,
					listId: router.query.listId?.toString(),
				},
			});

			console.log(result);

			const publishResult = await publishItem({
				variables: {
					id: result.data?.createGift?.id,
				},
			});

			console.log(publishResult);
			if (result && publishResult) {
				setShowPositiveLoader(true);
				setTimeout(() => {
					setShowPositiveLoader(false);
					props.setShowLoaderProps();
				}, 2000);
			}
		} catch (e) {
			console.log(e);
		} finally {
			setShowLoader(false);
		}
	};

	return (
		<div>
			<ModalLoader showLoader={showLoader} setShowLoader={setShowLoader} text={"Carregando..."} />
			<SuccessLoader text="Item criado com sucesso." setShowLoader={setShowPositiveLoader} showLoader={showPositiveLoader} />
			<Transition.Root show={props.showLoader} as={Fragment}>
				<Dialog
					as="div"
					className="fixed z-10 inset-0 overflow-y-auto"
					initialFocus={cancelButtonRef}
					onClose={() => {}}
				>
					<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
						</Transition.Child>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className="hidden sm:inline-block sm:align-middle sm:h-screen"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<div className="inline-block align-bottom bg-white rounded-lg text-center shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
								<div className="bg-white px-8 pt-5 pb-4 sm:p-8 sm:pb-4 rounded-lg border border-gray-200">
									<div className="flex flex-col sm:flex sm:items-center ">
										<h3 className="text-xl">Criar item</h3>
										<form className="flex flex-col items-start w-full m-4">
											<label htmlFor="itemName">Título do presente</label>
											<input
												className="my-3 border border-gray-300 rounded-md text-lg bg-gray-100 p-1 pl-2 w-full"
												type="text"
												id="itemName"
												name="itemName"
												placeholder="Titulo do presente"
												value={gift?.title || undefined}
												onChange={(e) => handleRenameGiftTitle(e.target.value)}
											/>
											<label htmlFor="link" className="mt-5">
												Link
											</label>
											<input
												className="my-3 border border-gray-300 rounded-md text-lg bg-gray-100 p-1 pl-2 w-full"
												type="text"
												id="link"
												name="link"
												placeholder="Link do presente"
												value={gift?.link || undefined}
												onChange={(e) => handleRenameGiftLink(e.target.value)}
											/>

											<div className="flex items-end justify-end w-full mt-5  gap-3">
												<button
													type="submit"
													className="flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-gray-600 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
													onClick={(e) => handleCancel(e)}
												>
													Cancelar
												</button>
												<button
													type="submit"
													className="flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-green-700 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
													onClick={async (e) => await handleCreateItem(e)}
												>
													Criar
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>
		</div>
	);
}
