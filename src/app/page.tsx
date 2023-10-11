"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import Menu from "@/components/Menu";
import Game from "@/components/Note";
import { useCookies } from "react-cookie";
import { MainContext } from "@/utility/Context";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();

	const [cookies, , removeCookie] = useCookies(["token"]);
	const [token, setToken] = useState<string>(cookies.token);
	const [note, setNote] = useState<Note | null>(null);
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
			return;
		}

		removeCookie("token", { secure: true });
		router.replace("/login");
	}

	useEffect(() => {
		if (cookies.token) {
			return;
		}

		router.replace("/login");
	}, []);

	useEffect(() => {
		if (token == "") {
			router.replace("/login");
			return;
		}

		ValidateToken(token);
	}, [token]);

	return (
		<MainContext.Provider
			value={{
				token,
				setToken,
				note,
				setNote,
				black,
				setBlack,
			}}
		>
			<>
				{black && (
					<div className="absolute top-0 left-0 right-0 bottom-0 z-10 overflow-hidden pointer-events-[all] w-full h-full bg-black opacity-30"></div>
				)}
				{note == null ? <Menu /> : <Game />}
			</>
		</MainContext.Provider>
	);
}
