export const runtime = "nodejs";

const emailPattern = /^\S+@\S+\.\S+$/;

export async function POST(request: Request) {
  const endpoint = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!endpoint) {
    return Response.json({ error: "Updates are not configured yet. Please check back soon." }, { status: 503 });
  }

  try {
    const payload = await request.json() as { email?: unknown };
    const email = typeof payload.email === "string" ? payload.email.trim().slice(0, 254) : "";
    if (!emailPattern.test(email)) return Response.json({ error: "Enter a valid email address to continue." }, { status: 400 });

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.NEWSLETTER_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.NEWSLETTER_WEBHOOK_TOKEN}` } : {}),
      },
      body: JSON.stringify({ email, source: "joegrandweb.vercel.app/community" }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Newsletter delivery failed", response.status);
      return Response.json({ error: "Updates are temporarily unavailable. Please try again later." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Unable to process this request. Please try again." }, { status: 400 });
  }
}
