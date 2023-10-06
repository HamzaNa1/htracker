import GetMongo from "@/utility/Mongo";
import { VerifyRequest } from "@/utility/TokenUtility";
import { Document, WithId } from "mongodb";

export async function POST(request: Request) {
	if (!VerifyRequest(request)) {
		return new Response(undefined, { status: 401 });
	}

	const getRequest: GetGamesRequest = await request.json();

	const db = await GetMongo();
	const collection = db.collection("games");

	const cursor = collection
		.find({ "game.Date": getRequest.date })
		.sort({ "game.AddedTimestamp": -1 });
	const arr = await cursor.toArray();
	const games = arr.map((x) => getNote(x));

	const response: GetGamesResponse = {
		Games: games,
	};

	return Response.json(response);
}

function getNote(doc: WithId<Document>): NotesGame {
	return {
		_id: doc._id as unknown as string,
		Game: doc.game,
		Notes: doc.notes,
	};
}
