import GetMongo from "@/utility/Mongo";
import { VerifyRequest } from "@/utility/TokenUtility";
import { ObjectId } from "mongodb";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	if (!VerifyRequest(request)) {
		return new Response(undefined, { status: 401 });
	}

	const db = await GetMongo();
	const collection = db.collection("notes");

	const doc = await collection.findOne({
		_id: params.id as unknown as ObjectId,
	});

	if (doc == null) {
		return new Response(undefined, { status: 404 });
	}

	const response: GetNoteResponse = {
		Note: { _id: params.id, Game: doc.game, Text: doc.notes },
	};

	return Response.json(response);
}
