import GetMongo from "@/utility/Mongo";
import { VerifyRequest } from "@/utility/TokenUtility";
import { Document, WithId } from "mongodb";

export async function POST(request: Request) {
	if (!VerifyRequest(request)) {
		return new Response(undefined, { status: 401 });
	}

	const getRequest: GetNotesRequest = await request.json();

	const db = await GetMongo();
	const collection = db.collection("notes");

	const filter: any = {};

	if (getRequest.date != "") {
		filter["Game.Date"] = getRequest.date;
	}

	if (getRequest.hasNotes) {
		filter["Text"] = { $ne: "" };
	}

	console.log(filter);
	const cursor = collection
		.find(filter)
		.sort({ "Game.Date": -1, "Game.AddedTimestamp": -1 })
		.limit(getRequest.amount);
	const arr = await cursor.toArray();
	const games = arr.map((x) => getNote(x));

	const response: GetNotesResponse = {
		Notes: games,
	};

	return Response.json(response);
}

function getNote(doc: WithId<Document>): Note {
	return {
		_id: doc._id as unknown as string,
		Game: doc.Game,
		Text: doc.Text,
	};
}
