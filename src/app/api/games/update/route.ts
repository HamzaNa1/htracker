import GetMongo from "@/utility/Mongo";
import VerifyToken from "@/utility/TokenUtility";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
	if (!VerifyToken(request)) {
		return new Response(undefined, { status: 401 });
	}

	const updateRequest: UpdateGameRequest = await request.json();

	const db = await GetMongo();
	const collection = db.collection("games");

	const result = await collection.updateOne(
		{
			_id: updateRequest.Game._id as unknown as ObjectId,
		},
		{
			$set: { game: updateRequest.Game.Game, notes: updateRequest.Game.Notes },
		}
	);

	if (result.matchedCount == 0) {
		return new Response(undefined, { status: 404 });
	}

	return new Response(undefined, { status: 200 });
}
