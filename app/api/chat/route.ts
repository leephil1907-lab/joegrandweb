import OpenAI from "openai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const systemPrompt = `You are the AI support assistant for Joe Grand’s website.
Joe Grand is a computer engineer, hardware hacker, inventor, and educator. His work includes hardware hacking, electronics, security research, product design, videos, talks, training, and engineering projects.

Be concise, friendly, professional, and technically credible. Use Markdown where useful. Do not invent private contact details, prices, availability, or claims. If uncertain, direct the visitor to https://joegrand.com/. You are an AI assistant, not Joe Grand or a human team member. Keep most replies under 150 words.`;

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return new Response("The AI assistant is not configured yet. Please use Joe’s official website for enquiries: https://joegrand.com/.", { status: 503 });
  }

  try {
    const payload: unknown = await request.json();
    if (!payload || typeof payload !== "object" || !Array.isArray((payload as { messages?: unknown }).messages)) {
      return new Response("Invalid messages format.", { status: 400 });
    }

    const incoming = (payload as { messages: unknown[] }).messages
      .slice(-10)
      .filter((item): item is { sender: string; text: string } =>
        !!item && typeof item === "object" &&
        (((item as { sender?: unknown }).sender === "user") || ((item as { sender?: unknown }).sender === "bot")) &&
        typeof (item as { text?: unknown }).text === "string"
      )
      .map((item) => ({
        role: (item.sender === "user" ? "user" : "assistant") as "user" | "assistant",
        content: item.text.slice(0, 2000),
      }));

    if (!incoming.length || incoming[incoming.length - 1].role !== "user") {
      return new Response("Please send a message to begin.", { status: 400 });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const stream = await client.chat.completions.create({
      model: process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini",
      temperature: 0.5,
      max_tokens: 450,
      stream: true,
      messages: [{ role: "system", content: systemPrompt }, ...incoming],
    });

    const encoder = new TextEncoder();
    const body = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const delta = chunk.choices[0]?.delta?.content;
            if (typeof delta === "string" && delta) controller.enqueue(encoder.encode(delta));
          }
        } catch (error) {
          console.error("AI chat stream failed:", error);
          controller.enqueue(encoder.encode("\n\nThe response was interrupted. Please try again."));
        } finally {
          controller.close();
        }
      },
      cancel() {
        stream.controller.abort();
      },
    });

    return new Response(body, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("AI chat request failed:", error);
    return new Response("The assistant is temporarily unavailable. Please try again later.", { status: 500 });
  }
}
