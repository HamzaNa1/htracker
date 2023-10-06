"use client";

import { MainContext } from "@/utility/Context";
import { useContext, useRef } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function SignIn() {
	const [cookies, setCookie] = useCookies(["token"]);

	const { setToken } = useContext(MainContext);

	const usernameElement = useRef<HTMLInputElement>(null);
	const passwordElement = useRef<HTMLInputElement>(null);

	async function Login() {
		let username = usernameElement.current?.value;
		let password = passwordElement.current?.value;

		if (
			username == "" ||
			username == undefined ||
			password == "" ||
			password == undefined
		) {
			toast.error("Username or password is invalid");
			return;
		}

		let loginRequest: LoginRequest = {
			username: username,
			password: password,
		};

		let response = await fetch("/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(loginRequest),
		});

		if (response.status != 200) {
			toast.error("Username or password is wrong");
			return;
		}

		toast.success("Logged In Successfully!");

		let jwtInfo: LoginResponse = await response.json();
		setToken(jwtInfo.token);
		setCookie("token", jwtInfo.token);
	}

	return (
		<div className="h-full flex flex-col gap-7 justify-center items-center">
			<span className="text-5xl drop-shadow-lg text-gray-300">Sign In</span>
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
				className="bg-slate-500 w-48 h-8 rounded-md text-gray-200 hover:bg-slate-600 active:bg-slate-700 border-2 border-slate-900"
				onClick={Login}
			>
				Login
			</button>
		</div>
	);
}
