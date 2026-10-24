import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, validateSession } from "./lib/session";

function secured(response: NextResponse) {
  const scriptSource = process.env.NODE_ENV === "development" ? "'self' 'unsafe-inline' 'unsafe-eval'" : "'self' 'unsafe-inline'";
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set("Content-Security-Policy", `default-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'; img-src 'self' data:; object-src 'none'; script-src ${scriptSource}; style-src 'self' 'unsafe-inline'`);
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/login") || pathname.startsWith("/api/")) return secured(NextResponse.next());

  const valid = await validateSession(request.cookies.get(ADMIN_COOKIE)?.value);
  if (valid) return secured(NextResponse.next());

  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.search = "";
  url.searchParams.set("next", pathname);
  return secured(NextResponse.redirect(url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
