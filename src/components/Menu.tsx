"use client";

import { MainContext } from "@/utility/Context";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import GameSlider from "./NoteSlider";

export default function Menu() {
	const { token, setToken, setNote, setBlack } = useContext(MainContext);

	const createButtonRef = useRef<HTMLButtonElement>(null);

	const [searchDate, setSearchDate] = useState<string>("");
	const [amount, setAmount] = useState<number>(10);
	const [hasNotes, setHasNotes] = useState<boolean>(false);

	const [games, setGames] = useState<Note[] | null>(null);

	async function CreateNote() {
		if (createButtonRef.current == null) {
			return;
		}

		createButtonRef.current.disabled = true;

		let response = await fetch("/api/notes/create", {
			headers: {
				Accept: "application/json",
				Authorization: "Bearer " + token,
			},
		});

		if (response.status == 401) {
			setToken("");
			toast.error("Invalid token!");
			return;
		} else if (response.status != 200) {
			toast.error("Unexpected error! code: " + response.status);
			return;
		}

		const createResponse: CreateResponse = await response.json();
		setNote(createResponse.Note);

		createButtonRef.current.disabled = false;

		toast.success("Note Created!");
	}

	async function LoadGames(signal: AbortSignal) {
		const getRequest: GetNotesRequest = {
			date: searchDate,
			amount: amount,
			hasNotes: hasNotes,
		};

		try {
			const response = await fetch("/api/notes/", {
				method: "POST",
				headers: {
					Accept: "application/json",
					Authorization: "Bearer " + token,
				},
				body: JSON.stringify(getRequest),
				signal: signal,
			});

			if (response.status == 401) {
				setToken("");
				toast.error("Invalid token!");
				return;
			} else if (response.status != 200) {
				toast.error("Failed to load games!");
				setGames([]);
				return;
			}

			const getResponse: GetNotesResponse = await response.json();
			const games = getResponse.Notes;

			setGames(games);
		} catch {
			setGames([]);
		}
	}

	useEffect(() => {
		console.log("RELOADING");
		setGames(null);

		let ac = new AbortController();
		LoadGames(ac.signal);
		return () => {
			setGames([]);
			ac.abort();
		};
	}, [searchDate, amount, hasNotes]);

	return (
		<div className="flex flex-col w-full h-full">
			<button
				className="w-full h-24 text-2xl bg-slate-500 rounded-md text-gray-200 hover:bg-slate-600 active:bg-slate-700 disabled:bg-slate-700 border-2 border-slate-900"
				ref={createButtonRef}
				onClick={async () => {
					setBlack(true);
					await CreateNote();
					setBlack(false);
				}}
			>
				Create Note
			</button>
			{games && games.length > 0 ? (
				<GameSlider games={games}></GameSlider>
			) : (
				<div className="h-full flex flex-col justify-center items-center">
					<span className="text-5xl drop-shadow-lg text-gray-300">
						{games && games.length == 0 ? "No Games" : "Loading"}
					</span>
				</div>
			)}
			<div className="w-full h-3 bg-slate-500 z-10"></div>
			<div className="w-full h-fit bg-slate-500 flex flex-row gap-2 items-center justify-end z-10">
				<input
					type="date"
					className="bg-slate-600 outline-none rounded-md px-1 w-30 h-8 text-center"
					value={searchDate}
					onChange={(e) => {
						setSearchDate(e.target.value);
					}}
				/>
				<input
					className="bg-slate-600 outline-none rounded-md px-1 w-20 h-8 text-center"
					defaultValue={amount}
					onBlur={(e) => {
						let amount = Number(e.target.value);

						if (isNaN(amount)) {
							amount = 10;
						} else if (amount < 0) {
							amount = 1;
						}

						setAmount(amount);
					}}
					onKeyDown={(e) => {
						if (e.key != "Enter") {
							return;
						}

						e.currentTarget.blur();
					}}
				/>
				<div className="bg-slate-600 outline-none rounded-md px-2 w-28 h-8 text-center flex items-center text-sm">
					<span className="flex-grow">Has Notes</span>
					<input
						type="checkbox"
						onChange={(e) => {
							setHasNotes(e.target.checked);
						}}
					/>
				</div>
			</div>
		</div>
	);
}
