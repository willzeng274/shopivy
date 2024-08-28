// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import "./animations.css";
import NextTopLoader from "nextjs-toploader";
// import ClientTest from "@/components/ClientTest";

// const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<title>ShopIvy</title>
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://shopivy.xyz" />
				<meta property="og:title" content="ShopIvy" />
				<meta property="og:description" content="The shop for students" />
				<meta property="og:image" content="/meta.jpg" />
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</head>
			<body>
				<NextTopLoader />
				{/* <ClientTest /> */}
				{children}
				<div id="modal-root" />
			</body>
		</html>
	);
}
