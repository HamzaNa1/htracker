import SignIn from "@/components/SignIn";

export default function Login() {
	return (
		<div className="h-full flex flex-col gap-7 justify-center items-center">
			<span className="text-5xl drop-shadow-lg text-gray-300">Sign In</span>
			<SignIn />
		</div>
	);
}
