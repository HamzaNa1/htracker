import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "HTracker",
	description: "",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<Toaster richColors position="bottom-left" />

			<body className={inter.className}>
				<main className="bg-slate-800 w-screen h-screen p-10">
					<div className="container h-full mx-auto border-slate-500 border-8 rounded-lg drop-shadow-2xl">
						{children}
					</div>
				</main>
			</body>
		</html>
	);
}
