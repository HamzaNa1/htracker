import { verify } from "jsonwebtoken";
import { env } from "process";

export function VerifyRequest(request: Request): boolean {
	let token = extractToken(request);

	if (token == null) {
		return false;
	}

	return VerifyToken(token);
}

export function VerifyToken(token: string): boolean {
	if (!env.SECRET_KEY) {
		return false;
	}

	try {
		verify(token, env.SECRET_KEY);

		return true;
	} catch {
		return false;
	}
}

function extractToken(req: Request): string | null {
	const authHeader = req.headers.get("Authorization");
	if (authHeader && authHeader.startsWith("Bearer ")) {
		return authHeader.substring(7);
	}
	return null;
}
