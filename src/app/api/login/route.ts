import { sign } from "jsonwebtoken";
import { env } from "process";

export async function POST(request: Request) {
	const info: LoginRequest = await request.json();

	if (
		info.username != env.LOGIN_USERNAME ||
		info.password != env.LOGIN_PASSWORD
	) {
		return new Response(undefined, { status: 400 });
	}

	if (!env.SECRET_KEY) {
		return new Response(undefined, { status: 500 });
	}

	const jwt = sign({}, env.SECRET_KEY, { expiresIn: "60m" });

	const jwtInfo: LoginResponse = {
		token: jwt,
	};

	return Response.json(jwtInfo);
}
