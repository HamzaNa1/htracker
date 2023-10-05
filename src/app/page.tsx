"use client";

import { useState } from "react";
import SignIn from "./components/SignIn";
import { Main } from "next/document";

export default function Home() {
	let [token, setToken] = useState("");

	return (
		<main className="bg-slate-800 w-screen h-screen">
			<Toaster richColors />
			{token == "" ? <SignIn /> : <Main />}
		</main>
	);
}
