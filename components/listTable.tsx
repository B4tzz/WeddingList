import * as React from "react";
import { useCallback, useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Link from "next/link";
import { HandPalm, PlusCircle, X } from "phosphor-react";
import { NextRouter, useRouter } from "next/router";
import {
	GetListsByIdQuery,
	Gift,
	useGetListsByIdQuery,
	usePickGiftByIdMutation,
} from "../graphql/generated";
var cache = require('memory-cache');
import { UserDataModal } from "./userDataModal";
import CreateItemModal from "./createItemModal";

interface Column {
	id: "itemName" | "link" | "contributor";
	label: string;
	minWidth?: number;
	maxWidth?: number;
	align?: "right" | "center";
	format?: (value: any) => any;
}

const columns: readonly Column[] = [
	{ id: "itemName", label: "Item", minWidth: 170 },
	{
		id: "link",
		label: "Link",
		minWidth: 170,
		maxWidth: 170,
		align: "center",
		format: (value) => {
			return (
				<Link passHref href={value} target={"_blank"}>
					<a target="_blank" className="underline ">
						{value}
					</a>
				</Link>
			);
		},
	},
	{
		id: "contributor",
		label: "Contribuidor",
		minWidth: 170,
		align: "center",
	},
];

interface Data {
	id: string;
	itemName: string;
	link: string;
	contributor?: string;
}

function createData(
	id: string,
	itemName: string,
	link: string,
	contributor?: string
): Data {
	return { id, itemName, link, contributor };
}

const rows = [
	createData(
		"1",
		"Jogo de copos (6 unidades)",
		"https://www.magazineluiza.com.br/jogo-de-copos-de-vidro-300ml-6-pecas-nadir-oca-long-drink/p/142260600/ud/cpdk/?&seller_id=magazineluiza&utm_source=google&utm_medium=pla&utm_campaign=&partner_id=67192&gclid=Cj0KCQjwn4qWBhCvARIsAFNAMiggGx0isnI3FeoDEzyVeZXqUKh29Guyr4xVBhk2FQG2268SSebqaG0aAksGEALw_wcB&gclsrc=aw.ds",
		"Gabriel Batista"
	),
	createData(
		"2",
		"Jogo de copos (6 unidades)",
		"https://www.magazineluiza.com.br/jogo-de-copos-de-vidro-300ml-6-pecas-nadir-oca-long-drink/p/142260600/ud/cpdk/?&seller_id=magazineluiza&utm_source=google&utm_medium=pla&utm_campaign=&partner_id=67192&gclid=Cj0KCQjwn4qWBhCvARIsAFNAMiggGx0isnI3FeoDEzyVeZXqUKh29Guyr4xVBhk2FQG2268SSebqaG0aAksGEALw_wcB&gclsrc=aw.ds",
		undefined
	),
];

export default function ListTable(props: any) {
	const router = useRouter();
	const { data: listInfo, refetch: refetchListInfo } = useGetListsByIdQuery({
		variables: {
			id: router.query.listId?.toString() || undefined,
		},
	});
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [editableComponents, setEditableComponentes] = useState(
		router.route === "/list/manage/[listId]"
	);
	const [userData, setUserData] = useState<JSON>();
	const [showUserModal, setShowUserModal] = useState(false);
	const [showCreateItemModal, setShowCreateItemModal] = useState(false);

	useEffect(() => {
    readCacheData()
		if (!userData || userData == null) {
			console.log("solicitar info do usuário");
			setShowUserModal(true)
		}
		else{
			setShowUserModal(false)
		}
	}, [listInfo]);

	useEffect(() => {
    readCacheData()
	}, []);

  

  function readCacheData() {
		const userData = localStorage.getItem('USER_DATA');
		console.log('readCacheData: ' + userData)
		if(userData){
			setUserData(JSON.parse(userData));
			console.log(userData)
		}
  }

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const handleEditItem = (row: Gift | undefined | any) => {
		if (editableComponents) {
		}
	};

	const handleDeleteItem = (row: Gift | undefined | any) => {
		if (editableComponents) {
		}
	};

	const handlePickItem = (row: Gift | undefined | any) => {
		if (row) {
			const updatedRow = usePickGiftByIdMutation({
				variables: {
					id: row.id,
				},
			});


		}
	};

	const handleGiveUpItem = (row: Gift | undefined | any) => {};

	const handleCloseCreateItemModal = async () => {
		if (showCreateItemModal) {
			setShowCreateItemModal(false);
      await refetchListInfo();
		}
	};

	return (
		<>
			<UserDataModal
				showLoader={showUserModal}
				setShowLoader={setShowUserModal}
			/>
			<CreateItemModal
				showLoader={showCreateItemModal}
				setShowLoaderProps={handleCloseCreateItemModal}
			/>
      <div className="flex flex-row items-center w-full justify-center">
			  <button
			  	className="flex flex-row items-center gap-3  text-green-700 hover:bg-gray-400 hover:opacity-70 rounded-full  group transition-all ease-out duration-300 transform w-11 h-11 my-5 hover:w-auto"
			  	onClick={() => setShowCreateItemModal(true)}
			  >
			  	<PlusCircle className="text-green-500 text-4xl ml-1" />
			  	<span className="invisible group-hover:visible hidden group-hover:contents text-lg mr-1">
			  		Adicionar item
			  	</span>
			  </button>
      </div>
			<Paper sx={{ width: "100%", overflow: "hidden" }}>
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								<TableCell
									key={`itemName`}
									align={"left"}
									width={170}
									style={{
										flexWrap: "wrap",
										overflowX: "hidden",
										maxWidth: "170px",
									}}
								>
									Item
								</TableCell>
								<TableCell
									key={`link`}
									align={"left"}
									width={170}
									style={{
										flexWrap: "wrap",
										overflowX: "hidden",
										maxWidth: "170px",
									}}
								>
									Link
								</TableCell>
								<TableCell
									key={`contributor`}
									align={"left"}
									width={170}
									style={{
										flexWrap: "wrap",
										overflowX: "hidden",
										maxWidth: "170px",
										textAlign: "center",
									}}
								>
									Contribuidor
								</TableCell>
								{router.route === "/list/manage/[listId]" && (
									<TableCell
										key="edit-controls"
										align={"center"}
										width={40}
										style={{
											flexWrap: "wrap",
											overflowX: "hidden",
											maxWidth: "170px",
										}}
									>
										-
									</TableCell>
								)}
							</TableRow>
						</TableHead>
						<TableBody>
							{listInfo?.list?.listGifts
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, i) => {
									return (
										<TableRow hover role="checkbox" tabIndex={-1} key={row?.id}>
											<TableCell
												key={`itemName-${row?.id}`}
												align={"left"}
												width={170}
												style={{
													flexWrap: "wrap",
													overflowX: "hidden",
													maxWidth: "170px",
												}}
											>
												{row?.title}
											</TableCell>
											<TableCell
												key={`link-${row?.id}`}
												align={"left"}
												width={170}
												style={{
													flexWrap: "wrap",
													overflowX: "hidden",
													maxWidth: "170px",
												}}
											>
												<Link
													passHref
													href={row?.link || "#"}
													target={"_blank"}
												>
													<a target="_blank" className="underline ">
														{row?.link}
													</a>
												</Link>
											</TableCell>
											<TableCell
												key={`contributor-${row?.id}`}
												align={"left"}
												width={170}
												style={{
													flexWrap: "wrap",
													overflowX: "hidden",
													maxWidth: "170px",
													textAlign: "center",
												}}
											>
												{row?.contributorName ? (
													<div className="flex justify-center items-center m-auto gap-2">
														<p className="font-semibold">
															{row?.contributorName}
														</p>
														<button
															className="flex flex-col justify-center items-center"
															onClick={() => handleGiveUpItem(row)}
														>
															<X className="text-lg font-semibold text-red-500 cursor-pointer" />
														</button>
													</div>
												) : (
													<button
														className="flex flex-col justify-center items-center m-auto"
														onClick={() => handlePickItem(row)}
													>
														<HandPalm className="text-2xl text-gray-900 cursor-pointer" />
														<span className="font-semibold text-xs">
															{" "}
															Escolher presente
														</span>
													</button>
												)}
											</TableCell>
											{router.route === "/list/manage/[listId]" && (
												<TableCell
													key={`manage-${row?.id}`}
													align={"center"}
													width={40}
													style={{
														flexWrap: "wrap",
														overflowX: "hidden",
														maxWidth: "170px",
													}}
												>
													<button
														className="mx-1"
														onClick={() => handleEditItem(row)}
													>
														Edit
													</button>
													<button
														className="mx-1"
														onClick={() => handleDeleteItem(row)}
													>
														Delete
													</button>
												</TableCell>
											)}
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={listInfo?.list?.listGifts?.length || 0}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</>
	);
}
