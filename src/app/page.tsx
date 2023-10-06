"use client";

import { useEffect, useState } from "react";
import SignIn from "./components/SignIn";
import { Toaster, toast } from "sonner";
import Menu from "./components/Menu";
import Game from "./components/Game";
import { useCookies } from "react-cookie";
import { MainContext } from "@/utility/Context";

export default function Home() {
	const [cookies] = useCookies(["token"]);
	const [isLoading, setLoading] = useState(true);
	const [token, setToken] = useState("");
	const [gameId, setGameId] = useState("");
	const [black, setBlack] = useState(false);

	async function ValidateToken(token: string) {
		const validateRequest: ValidateRequest = {
			token: token,
		};

		const response = await fetch("/api/validate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(validateRequest),
		});

		if (response.status != 200) {
			toast.error("Unexpected Error! Refresh the page to try again");
			return;
		}

		const validateResponse: ValidateResponse = await response.json();

		if (validateResponse.valid) {
			setToken(token);
		}

		setLoading(false);
	}

	useEffect(() => {
		if (!cookies.token) {
			setLoading(false);
			return;
		}

		ValidateToken(cookies.token);
	}, []);

	return (
		<MainContext.Provider
			value={{ token, setToken, gameId, setGameId, black, setBlack }}
		>
			<>
				{black ? (
					<div className="absolute top-0 left-0 right-0 bottom-0 z-10 overflow-hidden pointer-events-[all] w-full h-full bg-black opacity-30"></div>
				) : (
					<></>
				)}
				<main className="bg-slate-800 w-screen h-screen p-10">
					<Toaster richColors />
					<div className="container h-full mx-auto border-slate-500 border-8 rounded-lg drop-shadow-2xl">
						{isLoading ? (
							<div className="h-full flex flex-col gap-7 justify-center items-center">
								<span className="text-5xl drop-shadow-lg text-gray-300">
									Loading
								</span>
							</div>
						) : token == "" ? (
							<SignIn />
						) : gameId == "" ? (
							<Menu />
						) : (
							<Game />
						)}
					</div>
				</main>
			</>
		</MainContext.Provider>
	);
}
