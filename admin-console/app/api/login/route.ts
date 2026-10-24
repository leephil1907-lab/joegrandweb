import { NextResponse } from "next/server";
import { ADMIN_COOKIE, createSession, hasAdminConfiguration, requestOrigin, verifyCredentials } from "../../../lib/session";

export async function POST(request: Request) {
  const formData = await request.formData();
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");
  const origin = requestOrigin(request);

  if (!hasAdminConfiguration() || !(await verifyCredentials(username, password))) {
    return NextResponse.redirect(new URL("/login?error=invalid", origin), 303);
  }

  const session = await createSession(username);
  const response = NextResponse.redirect(new URL("/", origin), 303);
  response.cookies.set({
    name: ADMIN_COOKIE,
    value: session.value,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: Math.max(0, session.expiresAt - Math.floor(Date.now() / 1000)),
  });
  return response;
}
