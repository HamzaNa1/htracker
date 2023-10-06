import { MainContext } from "@/utility/Context";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function Menu() {
	const { token, setToken, setGameId, setBlack } = useContext(MainContext);

	const createButtonRef = useRef<HTMLButtonElement>(null);
	const [games, setGames] = useState<NotesGame[] | null>(null);

	async function CreateNote() {
		if (createButtonRef.current == null) {
			return;
		}

		createButtonRef.current.disabled = true;

		let response = await fetch("/api/games/create", {
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

		let createResponse: CreateResponse = await response.json();
		setGameId(createResponse.id);

		createButtonRef.current.disabled = false;

		toast.success("Created Note!");
	}

	async function LoadGames() {
		const response = await fetch("/api/games/", {
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
			toast.error("Failed to load games!");
			setGames([]);
			return;
		}

		const getResponse: GetGamesResponse = await response.json();
		const games = getResponse.Games;

		setGames(games);
	}

	useEffect(() => {
		LoadGames();
	}, []);

	if (games) {
		return (
			<div className="flex flex-col">
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
				{games.map((x) => (
					<button
						className="w-full flex px-2 flex-row gap-2 h-24 bg-slate-500 rounded-md text-gray-200 hover:bg-slate-600 active:bg-slate-700 disabled:bg-slate-700 border-2 border-slate-900"
						onClick={() => setGameId(x._id)}
					>
						<div className="h-full flex items-center">
							<span>
								Date:{" "}
								<input
									type="date"
									className="bg-slate-400 outline-none rounded-md px-1 w-30 text-center cursor-default"
									readOnly={true}
									value={x.Game.Date}
								/>
							</span>
						</div>
						<div className="h-full flex items-center">
							<span>
								Agent:{" "}
								<input
									className="bg-slate-400 outline-none rounded-md px-1 w-20 text-center cursor-default"
									readOnly={true}
									value={x.Game.Agent}
								/>
							</span>
						</div>
						<div className="h-full flex items-center">
							<span>
								Map:{" "}
								<input
									className="bg-slate-400 outline-none rounded-md px-1 w-16 text-center cursor-default"
									readOnly={true}
									value={x.Game.Map}
								/>
							</span>
						</div>
						<div className="h-full flex items-center">
							<span>
								Result:{" "}
								<input
									className="bg-slate-400 outline-none rounded-md px-1 w-16 text-center cursor-default"
									readOnly={true}
									value={x.Game.Result}
								/>
							</span>
						</div>
						<div className="h-full flex items-center">
							<span>
								Rounds:{" "}
								<input
									className="bg-slate-400 outline-none rounded-md px-1 w-16 text-center cursor-default"
									readOnly={true}
									value={
										(x.Game.RoundsWon < 10
											? "0" + x.Game.RoundsWon
											: x.Game.RoundsWon) +
										"-" +
										(x.Game.RoundsLost < 10
											? "0" + x.Game.RoundsLost
											: x.Game.RoundsLost)
									}
								/>
							</span>
						</div>
						<div className="h-full flex items-center">
							<span>
								K/D/A:{" "}
								<input
									className="bg-slate-400 outline-none rounded-md px-1 w-16 text-center cursor-default"
									readOnly={true}
									value={
										x.Game.Kills + "/" + x.Game.Deaths + "/" + x.Game.Assists
									}
								/>
							</span>
						</div>
						<div className="h-full flex items-center">
							<span>
								K/D Ratio:{" "}
								<input
									className="bg-slate-400 outline-none rounded-md px-1 w-12 text-center cursor-default"
									readOnly={true}
									value={x.Game.Deaths == 0 ? 0 : x.Game.Kills / x.Game.Deaths}
								/>
							</span>
						</div>
						<div className="h-full flex items-center">
							<span>
								DD:{" "}
								<input
									className="bg-slate-400 outline-none rounded-md px-1 w-12 text-center cursor-default"
									readOnly={true}
									value={x.Game.DD}
								/>
							</span>
						</div>
						<div className="h-full flex items-center">
							<span>
								HS:{" "}
								<input
									className="bg-slate-400 outline-none rounded-md px-1 w-8 text-center cursor-default"
									readOnly={true}
									value={x.Game.Headshot}
								/>
							</span>
						</div>
						<div className="h-full flex items-center">
							<span>
								ADR:{" "}
								<input
									className="bg-slate-400 outline-none rounded-md px-1 w-12 text-center cursor-default"
									readOnly={true}
									value={x.Game.ADR}
								/>
							</span>
						</div>
					</button>
				))}
			</div>
		);
	} else {
		return (
			<div className="h-full flex flex-col gap-7 justify-center items-center">
				<span className="text-5xl drop-shadow-lg text-gray-300">Loading</span>
			</div>
		);
	}
}
