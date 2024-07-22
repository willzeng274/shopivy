import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import StoreInitializer from "@/utils/initStore";
import { cookies } from "next/headers";

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
  const cookieStore = cookies();

  const session = cookieStore.get("session");

  return (
    <html lang="en">
      <link rel="icon" href="/logo.svg" sizes="any" />
      <body>
        <StoreInitializer session={session?.value || null}>
          {children}
        </StoreInitializer>
      </body>
    </html>
  );
}
