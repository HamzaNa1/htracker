import { ObjectId } from "mongodb";
import GetMongo from "@/utility/Mongo";
import { VerifyRequest } from "@/utility/TokenUtility";
import { GetDayAsString } from "@/utility/MiscUtility";

export async function GET(request: Request) {
	if (!VerifyRequest(request)) {
		return new Response(undefined, { status: 401 });
	}

	const note = await createNote();

	if (!note) {
		return new Response(undefined, { status: 500 });
	}

	const response: CreateResponse = {
		Game: note,
	};

	return Response.json(response);
}

async function createNote(): Promise<Note | null> {
	const db = await GetMongo();
	const collection = db.collection("notes");

	const game: Game = {
		Date: GetDayAsString(),
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
		RR: 0,
		Rank: "",
	};

	for (let i = 0; i < 10; i++) {
		try {
			const id = generateId();
			const notesGame: Note = {
				_id: id,
				Game: game,
				Text: "",
			};

			await collection.insertOne({
				_id: id as unknown as ObjectId,
				Game: game,
				Notes: "",
			});

			return notesGame;
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
