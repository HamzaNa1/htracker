import GetMongo from "@/utility/Mongo";
import VerifyToken from "@/utility/TokenUtility";
import { Document, WithId } from "mongodb";

export async function GET(request: Request) {
	if (!VerifyToken(request)) {
		return new Response(undefined, { status: 401 });
	}

	const db = await GetMongo();
	const collection = db.collection("games");

	const cursor = collection.find({}).sort({ _id: -1 }).limit(5);
	const arr = await cursor.toArray();
	if (arr.length == 0) {
		return new Response(undefined, { status: 404 });
	}

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
