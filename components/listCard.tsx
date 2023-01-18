import Link from "next/link";
import { ShareNetwork, PencilSimple, X, ArrowSquareOut } from "phosphor-react";
import { useState } from "react";
import { List } from "../graphql/generated";
import { SuccessLoader } from "./successModal";

export default function ListCard(props: {list: List;}) {
	const [showPositiveLoader, setShowPositiveLoader] = useState(false);

	const handleShareListButton = () => {
		setShowPositiveLoader(true);
		navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}${props.list.shareSlug.replace(':listId', props.list.id)}`)
		setTimeout(() => {
			setShowPositiveLoader(false);
		}, 1000);
	}

	return (
		<div className="flex flex-col rounded-md bg-gray-900 p-3 m-4 text-white text-center min-w-[15rem] min-h-[9rem] justify-between items-center">
			<SuccessLoader text="Link copiado com sucesso!" setShowLoader={setShowPositiveLoader} showLoader={showPositiveLoader} />
			<button className="flex h-5 w-full justify-end p-0 m-0 font-semibold">
				<X className="hover:text-red-600 cursor-pointer" />
			</button>
			<div className="flex flex-1 flex-col justify-around items-center">
				<span className="text-xl">{props.list.listName}</span>
				<div className="flex flex-row gap-6 text-xl">
					<button onClick={handleShareListButton}>
						<ShareNetwork className="hover:text-green-300 cursor-pointer" />
					</button>
					<Link passHref={true} href={props.list.manageSlug.replace(':listId', props.list.id)} target="_blank">
						<a target="_blank">
							<ArrowSquareOut className="hover:text-green-300 cursor-pointer" />
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
}
