import { MainContext } from "@/utility/Context";
import { agentNames, mapNames } from "@/utility/GameUtility";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function Game() {
	const { token, gameId, setToken, setGameId, setBlack } =
		useContext(MainContext);

	const [game, setGame] = useState<NotesGame | null>(null);
	const [kdr, setKDR] = useState(0);

	const dateRef = useRef<HTMLInputElement>(null);
	const agentRef = useRef<HTMLInputElement>(null);
	const mapRef = useRef<HTMLInputElement>(null);
	const resultRef = useRef<HTMLInputElement>(null);
	const roundsRef = useRef<HTMLInputElement>(null);
	const KDARef = useRef<HTMLInputElement>(null);
	const DDRef = useRef<HTMLInputElement>(null);
	const HSRef = useRef<HTMLInputElement>(null);
	const ADRRef = useRef<HTMLInputElement>(null);
	const notesRef = useRef<HTMLTextAreaElement>(null);

	async function LoadGame() {
		const response = await fetch("/api/games/" + gameId, {
			headers: {
				Accept: "application/json",
				Authorization: "Bearer " + token,
			},
		});

		if (response.status == 401) {
			setToken("");
			toast.error("Invalid token!");
			return;
		} else if (response.status == 404) {
			setGameId("");
			toast.error("Game not found!");
			return;
		} else if (response.status != 200) {
			toast.error("Unexpected error!");
			return;
		}

		const getResponse: GetGameResponse = await response.json();
		const game = getResponse.Game;

		setGame(game);
		setKDR(game.Game.Deaths == 0 ? 0 : game.Game.Kills / game.Game.Deaths);
	}

	async function DeleteGame() {
		if (game == null) {
			return;
		}

		const deleteRequest: DeleteGameRequest = {
			gameId: game._id,
		};

		const response = await fetch("/api/games/delete", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify(deleteRequest),
		});

		if (response.status == 401) {
			setToken("");
			toast.error("Invalid token!");
			return;
		} else if (response.status == 404) {
			toast.error("Note was not found!");
		} else if (response.status != 200) {
			toast.error("Unexpected error!");
		} else {
			toast.success("Deleted note!");
		}

		setGame(null);
		setGameId("");
	}

	async function UpdateGame() {
		if (
			game == null ||
			!notesRef.current ||
			!dateRef.current ||
			!agentRef.current ||
			!mapRef.current ||
			!resultRef.current ||
			!roundsRef.current ||
			!KDARef.current ||
			!DDRef.current ||
			!HSRef.current ||
			!ADRRef.current
		) {
			return;
		}

		game.Notes = notesRef.current.value;

		game.Game.Date = dateRef.current.value;

		if (!agentRef.current.checkValidity()) {
			toast.error("Invalid Agent!");
			return;
		}

		game.Game.Agent = agentRef.current.value;

		if (!mapRef.current.checkValidity()) {
			toast.error("Invalid Map!");
			return;
		}

		game.Game.Map = mapRef.current.value;

		if (!resultRef.current.checkValidity()) {
			toast.error("Invalid Result!");
			return;
		}

		game.Game.Result = resultRef.current.value as GameResult;

		if (!roundsRef.current.checkValidity()) {
			toast.error("Invalid Rounds!");
			return;
		}

		const roundsInput = roundsRef.current.value;
		const splitRounds = roundsInput.split("-").map((x) => Number(x));

		game.Game.RoundsWon = splitRounds[0];
		game.Game.RoundsLost = splitRounds[0];

		if (!KDARef.current.checkValidity()) {
			toast.error("Invalid KDA!");
			return;
		}

		const KDAInput = KDARef.current.value;
		const splitKDA = KDAInput.split("/").map((x) => Number(x));

		game.Game.Kills = splitKDA[0];
		game.Game.Deaths = splitKDA[1];
		game.Game.Assists = splitKDA[2];

		if (!DDRef.current.checkValidity()) {
			toast.error("Invalid DD!");
			return;
		}

		game.Game.DD = Number(DDRef.current.value);

		if (!HSRef.current.checkValidity()) {
			toast.error("Invalid HS!");
			return;
		}

		game.Game.Headshot = Number(HSRef.current.value);

		if (!ADRRef.current.checkValidity()) {
			toast.error("Invalid ADR!");
			return;
		}

		game.Game.ADR = Number(ADRRef.current.value);

		const updateRequest: UpdateGameRequest = {
			Game: game,
		};

		const response = await fetch("/api/games/update", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify(updateRequest),
		});

		if (response.status == 401) {
			setToken("");
			toast.error("Invalid token!");
			return;
		} else if (response.status == 404) {
			toast.error("Note was not found!");
			return;
		} else if (response.status != 200) {
			toast.error("Unexpected error!");
			return;
		}

		setGame(game);
		toast.success("Updated note!");
	}

	useEffect(() => {
		LoadGame();
	}, []);

	if (game) {
		const agentPattern = "^(" + agentNames.join("|") + ")$";
		const mapPattern = "^(" + mapNames.join("|") + ")$";

		return (
			<>
				<div className="h-full flex flex-col">
					<div className="w-full h-24 p-3 flex flex-row gap-4 bg-slate-500 rounded-md text-gray-200 border-2 border-slate-900">
						<div className="h-full flex items-center">
							<span>
								Date:{" "}
								<input
									type="date"
									className="bg-slate-600 outline-none rounded-md px-1 w-30 text-center"
									ref={dateRef}
									defaultValue={game.Game.Date}
								/>
							</span>
						</div>
						<div className="h-full flex items-center">
							<span>
								Agent:{" "}
								<input
									pattern={agentPattern}
									className="bg-slate-600 outline-none rounded-md px-1 w-20 text-center invalid:border-red-600 invalid:border-2"
									ref={agentRef}
									defaultValue={game.Game.Agent}
								/>
							</span>
						</div>
						<div className="h-full flex items-center">
							<span>
								Map:{" "}
								<input
									pattern={mapPattern}
									className="bg-slate-600 outline-none rounded-md px-1 w-16 text-center invalid:border-red-600 invalid:border-2"
									ref={mapRef}
									defaultValue={game.Game.Map}
								/>
							</span>
						</div>
						<div className="h-full flex items-center">
							<span>
								Result:{" "}
								<input
									pattern="^(D|W|L)$"
									className="bg-slate-600 outline-none rounded-md px-1 w-16 text-center invalid:border-red-600 invalid:border-2"
									ref={resultRef}
									defaultValue={game.Game.Result}
								/>
							</span>
						</div>
						<div className="h-full flex items-center">
							<span>
								Rounds:{" "}
								<input
									pattern="^[0-9]+-[0-9]+$"
									className="bg-slate-600 outline-none rounded-md px-1 w-16 text-center invalid:border-red-600 invalid:border-2"
									ref={roundsRef}
									defaultValue={
										(game.Game.RoundsWon < 10
											? "0" + game.Game.RoundsWon
											: game.Game.RoundsWon) +
										"-" +
										(game.Game.RoundsLost < 10
											? "0" + game.Game.RoundsLost
											: game.Game.RoundsLost)
									}
								/>
							</span>
						</div>
						<div className="h-full flex items-center">
							<span>
								K/D/A:{" "}
								<input
									pattern="^[0-9]+/[0-9]+/[0-9]+$"
									className="bg-slate-600 outline-none rounded-md px-1 w-16 text-center invalid:border-red-600 invalid:border-2"
									ref={KDARef}
									defaultValue={
										game.Game.Kills +
										"/" +
										game.Game.Deaths +
										"/" +
										game.Game.Assists
									}
									onChange={(e) => {
										if (!e.target.checkValidity()) {
											setKDR(0);
											return;
										}

										const splitKDA = e.target.value
											.split("/")
											.map((x) => Number(x));

										const kills = splitKDA[0];
										const deaths = splitKDA[1];

										setKDR(deaths == 0 ? 0 : kills / deaths);
									}}
								/>
							</span>
						</div>
						<div className="h-full flex items-center">
							<span>
								K/D Ratio:{" "}
								<input
									className="bg-slate-600 outline-none rounded-md px-1 w-12 text-center"
									readOnly={true}
									value={kdr.toFixed(2)}
								/>
							</span>
						</div>
						<div className="h-full flex items-center">
							<span>
								DD:{" "}
								<input
									pattern="^[0-9]+$"
									className="bg-slate-600 outline-none rounded-md px-1 w-12 text-center invalid:border-red-600 invalid:border-2"
									ref={DDRef}
									defaultValue={game.Game.DD}
								/>
							</span>
						</div>
						<div className="h-full flex items-center">
							<span>
								HS:{" "}
								<input
									pattern="^[0-9]+$"
									className="bg-slate-600 outline-none rounded-md px-1 w-8 text-center invalid:border-red-600 invalid:border-2"
									ref={HSRef}
									defaultValue={game.Game.Headshot}
								/>
							</span>
						</div>
						<div className="h-full flex items-center">
							<span>
								ADR:{" "}
								<input
									pattern="^[0-9]+$"
									className="bg-slate-600 outline-none rounded-md px-1 w-12 text-center invalid:border-red-600 invalid:border-2"
									ref={ADRRef}
									defaultValue={game.Game.ADR}
								/>
							</span>
						</div>
					</div>
					<div className="w-full h-3 bg-slate-500"></div>
					<textarea
						defaultValue={game.Notes}
						spellCheck="false"
						ref={notesRef}
						className="w-full h-full outline-none bg-transparent p-1 resize-none"
					/>
					<div className="w-full h-3 bg-slate-500"></div>
					<div className="flex flex-row h-32">
						<button
							className="w-full bg-green-600 hover:bg-green-700 active:m-1"
							onClick={async () => {
								setBlack(true);
								await UpdateGame();
								setBlack(false);
							}}
						>
							Submit
						</button>
						<button
							className="w-full bg-slate-600 hover:bg-slate-700 active:m-1"
							onClick={() => setGameId("")}
						>
							Back
						</button>
						<button
							className="w-full bg-red-800 hover:bg-red-900 active:m-1"
							onClick={async () => {
								setBlack(true);
								await DeleteGame();
								setBlack(false);
							}}
						>
							Delete
						</button>
					</div>
				</div>
			</>
		);
	} else {
		return (
			<div className="h-full flex flex-col gap-7 justify-center items-center">
				<span className="text-5xl drop-shadow-lg text-gray-300">Loading</span>
			</div>
		);
	}
}
