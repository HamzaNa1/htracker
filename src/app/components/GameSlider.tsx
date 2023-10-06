import { MainContext } from "@/utility/Context";
import { useContext } from "react";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

export default function GameBanner({ games }: { games: NotesGame[] }) {
	const { setGameId } = useContext(MainContext);
	const [sliderRef, instanceRef] = useKeenSlider(
		{
			vertical: true,
			mode: "free",
			slides: {
				perView: 10,
			},
		},
		[]
	);

	return (
		<div ref={sliderRef} className="keen-slider w-full h-full overflow-hidden">
			{games.map((x, i) => (
				<button
					key={i}
					className="keen-slider__slide w-full flex px-2 flex-row gap-2 h-24 bg-slate-500 rounded-md text-gray-200 hover:bg-slate-600 active:bg-slate-700 disabled:bg-slate-700 border-2 border-slate-900"
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
}
