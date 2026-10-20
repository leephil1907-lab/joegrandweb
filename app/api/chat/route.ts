import OpenAI from "openai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const systemPrompt = `You are the official AI support assistant for Joe Grand's website.

Joe Grand, also known as Kingpin, is a computer engineer, hardware hacker, inventor, product designer, and educator. He founded Grand Idea Studio, was a member of L0pht Heavy Industries, created the first electronic badges for DEF CON, and co-hosted Discovery Channel's Prototype This!

His work includes:
- Hardware hacking and reverse engineering
- Electronics and product design
- Hardware security research, embedded systems, fault injection, and firmware extraction
- STM32 fault injection and cryptocurrency wallet security research
- DEF CON electronic badges
- YouTube videos, conference talks, interviews, and training
- Grand Idea Studio: technology development, licensing, and consulting
- Hacker pLANeT: a video series exploring hacker culture and places

Rules:
- Be concise, friendly, professional, and technically credible.
- Use Markdown: short paragraphs, bullet points, and bold key points.
- Recommend relevant website sections such as Projects, Videos, Training, About, or Contact.
- Do not invent private contact details, pricing, availability, or claims.
- If you do not know something, say so and recommend the contact form or Joe's official site at https://joegrand.com/.
- Make clear you are an AI assistant, not Joe Grand or a human team member.
- Keep most answers under 150 words.`;

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
