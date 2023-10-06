import { MainContext } from "@/utility/Context";
import { useContext } from "react";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import { RiVerifiedBadgeFill } from "react-icons/ri";

export default function NoteSlider({ games }: { games: Note[] }) {
	const { setNote } = useContext(MainContext);
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
					className="keen-slider__slide w-full flex px-2 flex-row h-24 bg-slate-500 rounded-md gap-2 text-gray-200 hover:bg-slate-600 active:bg-slate-700 disabled:bg-slate-700 border-2 border-slate-900"
					onClick={() => setNote(x)}
				>
					<div className="h-full flex-grow flex flex-col gap-2 justify-center items-center">
						<span>Date</span>{" "}
						<input
							className="bg-slate-400 outline-none rounded-md px-1 w-28 text-center cursor-default"
							readOnly={true}
							value={x.Game.Date}
						/>
					</div>
					<div className="h-full flex-grow flex flex-col gap-2 justify-center items-center">
						<span>Agent</span>{" "}
						<input
							className="bg-slate-400 outline-none rounded-md px-1 w-20 text-center cursor-default"
							readOnly={true}
							value={x.Game.Agent}
						/>
					</div>
					<div className="h-full flex-grow flex flex-col gap-2 justify-center items-center">
						<span>Map</span>{" "}
						<input
							className="bg-slate-400 outline-none rounded-md px-1 w-16 text-center cursor-default"
							readOnly={true}
							value={x.Game.Map}
						/>
					</div>
					<div className="h-full flex-grow flex flex-col gap-2 justify-center items-center">
						<span>Result</span>{" "}
						<input
							className="bg-slate-400 outline-none rounded-md px-1 w-16 text-center cursor-default"
							readOnly={true}
							value={x.Game.Result}
						/>
					</div>
					<div className="h-full flex-grow flex flex-col gap-2 justify-center items-center">
						<span>Rounds</span>{" "}
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
					</div>
					<div className="h-full flex-grow flex flex-col gap-2 justify-center items-center">
						<span>K/D/A</span>{" "}
						<input
							className="bg-slate-400 outline-none rounded-md px-1 w-16 text-center cursor-default"
							readOnly={true}
							value={x.Game.Kills + "/" + x.Game.Deaths + "/" + x.Game.Assists}
						/>
					</div>
					<div className="h-full flex-grow flex flex-col gap-2 justify-center items-center">
						<span>KDR</span>{" "}
						<input
							className="bg-slate-400 outline-none rounded-md px-1 w-12 text-center cursor-default"
							readOnly={true}
							value={x.Game.Deaths == 0 ? 0 : x.Game.Kills / x.Game.Deaths}
						/>
					</div>
					<div className="h-full flex-grow flex flex-col gap-2 justify-center items-center">
						<span>DD</span>{" "}
						<input
							className="bg-slate-400 outline-none rounded-md px-1 w-12 text-center cursor-default"
							readOnly={true}
							value={x.Game.DD}
						/>
					</div>
					<div className="h-full flex-grow flex flex-col gap-2 justify-center items-center">
						<span>HS</span>{" "}
						<input
							className="bg-slate-400 outline-none rounded-md px-1 w-8 text-center cursor-default"
							readOnly={true}
							value={x.Game.Headshot}
						/>
					</div>
					<div className="h-full flex-grow flex flex-col gap-2 justify-center items-center">
						<span>ADR</span>{" "}
						<input
							className="bg-slate-400 outline-none rounded-md px-1 w-12 text-center cursor-default"
							readOnly={true}
							value={x.Game.ADR}
						/>
					</div>
					<div className="h-full flex-grow flex flex-col gap-2 justify-center items-center">
						<span>RR</span>{" "}
						<input
							pattern="^[0-9]+$"
							className="bg-slate-400 outline-none rounded-md px-1 w-12 text-center"
							readOnly={true}
							value={x.Game.RR}
						/>
					</div>
					<div className="h-full flex-grow flex flex-col gap-2 justify-center items-center">
						<span>Rank</span>
						<input
							className="bg-slate-400 outline-none rounded-md px-1 w-24 text-center"
							readOnly={true}
							value={x.Game.Rank}
						/>
					</div>
					<div className="h-full flex-grow flex flex-col gap-2 justify-center items-center">
						<span>Has Notes</span>
						{x.Text != "" ? (
							<RiVerifiedBadgeFill className="fill-slate-300 w-6 h-6" />
						) : (
							<div className="w-6 h-6"></div>
						)}
					</div>
				</button>
			))}
		</div>
	);
}
