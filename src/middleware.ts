import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const gatedPages = ['/profile', '/shop'];
const authPages = ['/login', 'signup'];

export function middleware(request: NextRequest) {
    // Add a new header x-current-path which passes the path to downstream components
    const headers = new Headers(request.headers);
    headers.set("x-current-path", request.nextUrl.pathname);
    if (cookies().get("session") && authPages.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/profile', request.url));
    } else if (!cookies().get("session") && gatedPages.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next({ headers });
}

export const config = {
    matcher: [
        // match all routes except static files and APIs
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};