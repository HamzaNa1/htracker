import GetMongo from "@/utility/Mongo";
import VerifyToken from "@/utility/TokenUtility";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
	if (!VerifyToken(request)) {
		return new Response(undefined, { status: 401 });
	}

	const deleteRequest: DeleteGameRequest = await request.json();

	const db = await GetMongo();
	const collection = db.collection("games");

	const result = await collection.deleteOne({
		_id: deleteRequest.gameId as unknown as ObjectId,
	});

	if (result.deletedCount == 0) {
		return new Response(undefined, { status: 404 });
	}

	return new Response(undefined, { status: 200 });
}
