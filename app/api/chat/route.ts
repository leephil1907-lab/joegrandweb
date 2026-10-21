import OpenAI from "openai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type IncomingMessage = { sender: "user" | "bot"; text: string };

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
- Recommend relevant website sections such as Projects, Videos, Training, Pricing & Booking, About, Badge Lab, or Contact.
- Do not invent private contact details, pricing, availability, or claims.
- If you do not know something, say so and recommend the in-site Contact page.
- Do not direct visitors to another website, except approved public social channels such as YouTube, GitHub, or Discord when directly relevant.
- Make clear you are an AI assistant, not Joe Grand or a human team member.
- Keep most answers under 150 words.`;

function textResponse(text: string, status = 200, mode: "ai" | "guide" = "guide") {
  return new Response(text, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "X-Joegrand-Assistant-Mode": mode,
    },
  });
}

function publicGuideReply(question: string) {
  const value = question.toLowerCase();

  if (/(badge|kingpin protocol|badge lab|png|download)/.test(value)) {
    return "**Badge Lab** lets you create a custom Kingpin Badge locally in your browser. Choose a handle, style, accent signal, and level, then download a PNG or copy a share link. Complete the on-site Kingpin Protocol to unlock the Kingpin level.\n\nOpen **Badge Lab** from the main navigation to get started.";
  }
  if (/(price|pricing|quote|billing|cost|rate)/.test(value)) {
    return "The **Pricing & Booking** page helps you build a training brief before requesting dates, availability, or pricing. Choose a course, format, group size, and request type; the site then carries those choices into the **Contact** page.\n\nNo card details are collected on the site. Pricing is discussed after the training scope is clear.";
  }
  if (/(collab|collaborat|speak|speaker|talk|interview|partner|book)/.test(value)) {
    return "For collaborations, talks, interviews, partnerships, or unusual technical questions, use the **Contact** page and include your goal, timing, and relevant context.\n\nThe enquiry route stays inside this site so you can start the conversation without being redirected elsewhere.";
  }
  if (/(train|workshop|course|learn|class)/.test(value)) {
    return "Joe's work includes hands-on hardware-hacking learning focused on observation, testing, and understanding electronic systems. Visit the **Training** page for the course overview and the official training route for current availability.\n\nA useful starting point is to learn how to read a board, follow signals, and validate assumptions with focused experiments.";
  }
  if (/(video|youtube|watch|hacker planet|prototype this)/.test(value)) {
    return "The **Videos** page is a curated entry point to Joe Grand's public archive: hardware research, cryptocurrency wallet investigations, workshops, talks, and engineering stories.\n\nFor the newest uploads and the full catalog, visit the official Joe Grand YouTube channel.";
  }
  if (/(project|hardware|security|electronics|fault injection|wallet|jtag|firmware|reverse)/.test(value)) {
    return "Joe Grand's public work spans **hardware hacking, reverse engineering, embedded systems, hardware security, fault injection, cryptocurrency-wallet research, tools, and electronic badges**.\n\nThe **Projects** page is the best starting point for links to STM32 fault injection research, JTAGulator, wallet security work, and more.";
  }
  if (/(community|discord|github|social)/.test(value)) {
    return "The **Community** page collects Joe's public channels, including Discord, YouTube, and GitHub. It is the best route for following projects, joining technical conversations, and finding public material.";
  }
  if (/(who|about|biograph|l0pht|def con)/.test(value)) {
    return "Joe Grand—also known as **Kingpin**—is a computer engineer, hardware hacker, inventor, and educator. He is known for work with L0pht Heavy Industries, creating the first electronic badges for DEF CON, co-hosting *Prototype This!*, and founding Grand Idea Studio.\n\nVisit the **About** page for the fuller field guide.";
  }
  if (/(contact|email|reach|help)/.test(value)) {
    return "For a collaboration, talk, training, or project enquiry, use the **Contact** page. It includes the direct enquiry route and support options inside this site.";
  }

  return "I can help you explore Joe Grand's public work. Try asking about **projects**, **hardware security**, **videos**, **training**, **community**, **collaborations**, or the **Kingpin Badge Lab**.\n\nI’m a website guide, not Joe Grand or a human support team.";
}

function parseMessages(payload: unknown): IncomingMessage[] | null {
  if (!payload || typeof payload !== "object" || !Array.isArray((payload as { messages?: unknown }).messages)) return null;

  return (payload as { messages: unknown[] }).messages
    .slice(-10)
    .filter((item): item is IncomingMessage =>
      !!item && typeof item === "object" &&
      (((item as { sender?: unknown }).sender === "user") || ((item as { sender?: unknown }).sender === "bot")) &&
      typeof (item as { text?: unknown }).text === "string",
    )
    .map((item) => ({ sender: item.sender, text: item.text.trim().slice(0, 2000) }))
    .filter((item) => item.text.length > 0);
}

export async function POST(request: Request) {
  let question = "";

  try {
    const incoming = parseMessages(await request.json());
    if (!incoming || !incoming.length || incoming[incoming.length - 1].sender !== "user") {
      return textResponse("Please send a message to begin.", 400);
    }

    question = incoming[incoming.length - 1].text;

    // The public guide keeps the chat useful before an AI-provider key is configured.
    if (!process.env.OPENAI_API_KEY) return textResponse(publicGuideReply(question));

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const stream = await client.chat.completions.create({
      model: process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini",
      temperature: 0.5,
      max_tokens: 450,
      stream: true,
      messages: [
        { role: "system", content: systemPrompt },
        ...incoming.map((item) => ({ role: (item.sender === "user" ? "user" : "assistant") as "user" | "assistant", content: item.text })),
      ],
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
        "X-Joegrand-Assistant-Mode": "ai",
      },
    });
  } catch {
    console.warn("AI chat unavailable; serving the public site guide instead.");
    if (question) return textResponse(publicGuideReply(question));
    return textResponse("The assistant could not process that message. Please try again, or use the Contact page for a formal enquiry.", 500);
  }
}
