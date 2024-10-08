import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const gatedPages = ['/dashboard', '/auth/verify'];
const authPages = ['/auth/login', '/auth/signup', '/auth/recovery'];

export function middleware(request: NextRequest) {
  // Add a new header x-current-path which passes the path to downstream components
  const headers = new Headers(request.headers);
  // console.log("url", request.nextUrl);
  headers.set("x-current-path", request.nextUrl.pathname);
  headers.set("x-current-origin", request.nextUrl.origin);
  if (cookies().get("ivysess") && authPages.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } else if (!cookies().get("ivysess") && (gatedPages.includes(request.nextUrl.pathname) || request.nextUrl.pathname.startsWith("/dashboard"))) {
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