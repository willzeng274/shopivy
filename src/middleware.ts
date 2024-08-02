import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const gatedPages = ['/profile', '/shop', '/auth/verify'];
const authPages = ['/auth/login', '/auth/signup'];

export function middleware(request: NextRequest) {
  // Add a new header x-current-path which passes the path to downstream components
  const headers = new Headers(request.headers);
  // console.log("url", request.nextUrl);
  headers.set("x-current-path", request.nextUrl.pathname);
  if (cookies().get("ivysess") && authPages.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/profile', request.url));
  } else if (!cookies().get("ivysess") && gatedPages.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  return NextResponse.next({ headers });
}

export const config = {
  // match all routes except static files and APIs
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "next-action" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};