import { ObjectId } from "mongodb";
import GetMongo from "@/utility/Mongo";
import { VerifyRequest } from "@/utility/TokenUtility";

export async function GET(request: Request) {
	if (!VerifyRequest(request)) {
		return new Response(undefined, { status: 401 });
	}

	const id = await createGame();

	if (!id) {
		return new Response(undefined, { status: 500 });
	}

	const response: CreateResponse = {
		id: id,
	};

	return Response.json(response);
}

async function createGame(): Promise<string | null> {
	const db = await GetMongo();
	const collection = db.collection("games");

	const date = new Date();
	const day = ("0" + date.getDate()).slice(-2);
	const month = ("0" + (date.getMonth() + 1)).slice(-2);
	const year = date.getFullYear();

	const gameDate = year + "-" + month + "-" + day;

	const game: Game = {
		Date: gameDate,
		AddedTimestamp: Date.now(),
		Agent: "",
		Map: "",
		Result: "D",
		RoundsWon: 0,
		RoundsLost: 0,
		Kills: 0,
		Deaths: 0,
		Assists: 0,
		DD: 0,
		Headshot: 0,
		ADR: 0,
	};

	for (let i = 0; i < 10; i++) {
		try {
			const id = generateId();
			await collection.insertOne({
				_id: id as unknown as ObjectId,
				game: game,
				notes: "",
			});

			return id;
		} catch {}
	}

	return null;
}

function generateId(): string {
	const characters = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

	let id = "";

	for (let i = 0; i < 7; i++) {
		const random = Math.floor(Math.random() * characters.length);

		id += characters[random];
	}

	return id;
}
