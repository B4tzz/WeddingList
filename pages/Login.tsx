import { LockClosedIcon } from "@heroicons/react/solid";
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ModalLoader } from "../components/loaderModal";

export default function Login() {
	const { data: session } = useSession();
	const [showLoader, setShowLoader] = useState(false);
	const route = useRouter();

	useEffect(() => {
		if (session) {
			setShowLoader(false);
			route.push("/dashboard");
		}
	}, []);

	useEffect(() => {
		if (session) {
			const userData = {
				name: session?.user?.name,
				email: session?.user?.email
			}
			localStorage.setItem('USER_DATA', JSON.stringify(userData));
			route.push("/dashboard");
		}
	}, [session]);

	const handleSignIn = () => {
		setShowLoader(true);
		signIn("google")
			.then(() => {
				setShowLoader(false);
			})
			.catch(() => {
				setShowLoader(false);
			});
	};

	return (
		<div className="bg-brown-100 text-brown-700">
			<Head>
				<title>WeddingList</title>
				<meta name="description" content="Listas de presentes" />
				<link rel="icon" href="/logo-white.png" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Roboto:wght@400;500;700&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<ModalLoader
				showLoader={showLoader}
				setShowLoader={setShowLoader}
				text="Aguarde..."
			/>

			<div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8">
					<div>
						<img
							className="mx-auto h-20 w-auto"
							src="logo.png"
							alt="Workflow"
						/>
						<h2 className="mt-6 text-center text-3xl font-ari">
							Bem-vindo ao Wedding List
						</h2>
						<p className="mt-2 text-center text-s">
							Crie e organize sua lista de presente de casamento e compartilhe
							com amigos!
						</p>
					</div>

					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brown-500 hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							onClick={() => handleSignIn()}
						>
							<span className="absolute left-0 inset-y-0 flex items-center pl-3">
								<LockClosedIcon
									className="h-5 w-5 text-gold-300 group-hover:text-gold-700"
									aria-hidden="true"
								/>
							</span>
							Entrar com sua conta do Google
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
