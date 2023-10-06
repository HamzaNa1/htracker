import GetMongo from "@/utility/Mongo";
import { VerifyRequest } from "@/utility/TokenUtility";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
	if (!VerifyRequest(request)) {
		return new Response(undefined, { status: 401 });
	}

	const deleteRequest: DeleteNoteRequest = await request.json();

	const db = await GetMongo();
	const collection = db.collection("notes");

	const result = await collection.deleteOne({
		_id: deleteRequest.noteId as unknown as ObjectId,
	});

	if (result.deletedCount == 0) {
		return new Response(undefined, { status: 404 });
	}

	return new Response(undefined, { status: 200 });
}
