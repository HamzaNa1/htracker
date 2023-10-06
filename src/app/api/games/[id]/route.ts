import GetMongo from "@/utility/Mongo";
import VerifyToken from "@/utility/TokenUtility";
import { ObjectId } from "mongodb";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	if (!VerifyToken(request)) {
		return new Response(undefined, { status: 401 });
	}

	const db = await GetMongo();
	const collection = db.collection("games");

	const doc = await collection.findOne({
		_id: params.id as unknown as ObjectId,
	});

	if (doc == null) {
		return new Response(undefined, { status: 404 });
	}

	const response: GetGameResponse = {
		Game: { _id: params.id, Game: doc.game, Notes: doc.notes },
	};

	return Response.json(response);
}
