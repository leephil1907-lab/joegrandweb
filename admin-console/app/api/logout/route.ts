import { NextResponse } from "next/server";
import { ADMIN_COOKIE, requestOrigin } from "../../../lib/session";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/login", requestOrigin(request)), 303);
  response.cookies.set({ name: ADMIN_COOKIE, value: "", httpOnly: true, sameSite: "strict", path: "/", maxAge: 0 });
  return response;
}
