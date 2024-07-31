import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import "./animations.css";
// import ClientTest from "@/components/ClientTest";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopIvy",
  description: "The shop for students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <link rel="icon" href="/logo.svg" sizes="any" />
      <body>
        {/* <ClientTest /> */}
        {children}
      </body>
    </html>
  );
}
