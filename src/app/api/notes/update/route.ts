import GetMongo from "@/utility/Mongo";
import { VerifyRequest } from "@/utility/TokenUtility";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
	if (!VerifyRequest(request)) {
		return new Response(undefined, { status: 401 });
	}

	const updateRequest: UpdateNoteRequest = await request.json();

	const db = await GetMongo();
	const collection = db.collection("notes");

	const result = await collection.updateOne(
		{
			_id: updateRequest.Note._id as unknown as ObjectId,
		},
		{
			$set: { Game: updateRequest.Note.Game, Text: updateRequest.Note.Text },
		}
	);

	if (result.matchedCount == 0) {
		return new Response(undefined, { status: 404 });
	}

	return new Response(undefined, { status: 200 });
}
