import { Db, MongoClient } from "mongodb";
import { env } from "process";

let db: Db | null = null;

export default async function GetMongo(): Promise<Db> {
	if (db != null) {
		return db;
	}

	if (!env.MONGODB) {
		throw Error();
	}

	const client = new MongoClient(env.MONGODB);
	await client.connect();

	db = client.db("htracker");

	return db;
}
