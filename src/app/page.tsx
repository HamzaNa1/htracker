"use client";

import { useEffect, useState } from "react";
import SignIn from "./components/SignIn";
import { Toaster } from "sonner";
import Menu from "./components/Menu";
import Game from "./components/Game";
import { useCookies } from "react-cookie";
import { MainContext } from "@/utility/Context";

export default function Home() {
	const [cookies] = useCookies(["token"]);
	const [token, setToken] = useState("");
	const [gameId, setGameId] = useState("");
	const [black, setBlack] = useState(false);

	useEffect(() => {
		if (!cookies.token) {
			return;
		}

		setToken(cookies.token);
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
						{token == "" ? <SignIn /> : gameId == "" ? <Menu /> : <Game />}
					</div>
				</main>
			</>
		</MainContext.Provider>
	);
}
