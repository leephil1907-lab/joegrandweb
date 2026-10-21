export const runtime = "nodejs";

const emailPattern = /^\S+@\S+\.\S+$/;

type ContactPayload = { name?: unknown; email?: unknown; topic?: unknown; message?: unknown; company?: unknown };

function asText(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

export async function POST(request: Request) {
  const endpoint = process.env.CONTACT_WEBHOOK_URL;
  if (!endpoint) {
    return Response.json({ error: "Contact delivery is not configured yet. Please use the official website contact route." }, { status: 503 });
  }

  try {
    const payload = await request.json() as ContactPayload;
    const name = asText(payload.name, 120);
    const email = asText(payload.email, 254);
    const topic = asText(payload.topic, 100);
    const message = asText(payload.message, 5000);
    const company = asText(payload.company, 200);

    if (company) return Response.json({ ok: true });
    if (!name || !emailPattern.test(email) || !message) return Response.json({ error: "Please provide a name, valid email address, and message." }, { status: 400 });

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CONTACT_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}` } : {}),
      },
      body: JSON.stringify({ name, email, topic: topic || "Other", message, source: "joegrandweb.vercel.app/contact" }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Contact delivery failed", response.status);
      return Response.json({ error: "The contact route is temporarily unavailable. Please try again later." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Unable to process this request. Please try again." }, { status: 400 });
  }
}
