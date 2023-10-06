import { VerifyToken } from "@/utility/TokenUtility";

export async function POST(request: Request) {
	const validateRequest: ValidateRequest = await request.json();

	const valid = VerifyToken(validateRequest.token);

	const response: ValidateResponse = {
		valid: valid,
	};

	return Response.json(response);
}
