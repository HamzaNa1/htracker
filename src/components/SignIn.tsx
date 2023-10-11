"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function SignIn() {
	const router = useRouter();
	const [, setCookie] = useCookies(["token"]);
	const [buttonDisabled, setButtonDisabled] = useState(false);

	const usernameElement = useRef<HTMLInputElement>(null);
	const passwordElement = useRef<HTMLInputElement>(null);
	const buttonElement = useRef<HTMLButtonElement>(null);

	async function Login() {
		const username = usernameElement.current?.value;
		const password = passwordElement.current?.value;

		if (
			username == "" ||
			username == undefined ||
			password == "" ||
			password == undefined
		) {
			toast.error("Username or password is invalid");
			return;
		}

		const loginRequest: LoginRequest = {
			username: username,
			password: password,
		};

		const response = await fetch("/api/login", {
			method: "POST",
			headers: {
				Accept: "application/json",
			},
			body: JSON.stringify(loginRequest),
		});

		if (response.status != 200) {
			toast.error("Username or password is wrong");
			return;
		}

		toast.success("Logged In Successfully!");

		const jwtInfo: LoginResponse = await response.json();
		setCookie("token", jwtInfo.token, { secure: true });
		router.replace("/");
	}

	useEffect(() => {
		async function handleKey(event: KeyboardEvent) {
			if (event.key != "Enter") {
				return;
			}

			setButtonDisabled(true);
			await Login();
			setButtonDisabled(false);
		}

		document.addEventListener("keydown", handleKey);

		return () => {
			document.removeEventListener("keydown", handleKey);
		};
	}, []);

	useEffect(() => {
		if (!buttonElement.current) {
			return;
		}

		buttonElement.current.disabled = buttonDisabled;
	}, [buttonDisabled]);

	return (
		<>
			<div className="flex flex-col">
				<span className="text-sm text-gray-300 px-1">Username</span>
				<input
					className="bg-slate-500 outline-none border-2 border-slate-900 px-1"
					ref={usernameElement}
				/>
			</div>
			<div className="flex flex-col">
				<span className="text-sm text-gray-300 px-1">Password</span>
				<input
					className="bg-slate-500 outline-none border-2 border-slate-900 px-1"
					type="password"
					ref={passwordElement}
				/>
			</div>
			<button
				className={
					"bg-slate-500 w-48 h-8 rounded-md text-gray-200 hover:bg-slate-600 active:bg-slate-700 border-2 border-slate-900 disabled:bg-slate-700"
				}
				ref={buttonElement}
				onClick={async (e) => {
					setButtonDisabled(true);
					await Login();
					setButtonDisabled(false);
				}}
			>
				Login
			</button>
		</>
	);
}
