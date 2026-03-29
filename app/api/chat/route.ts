import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

const SYSTEM_PROMPT = `You are SurgeX's AI assistant on their website (surgex.pt). Be helpful, concise, and friendly.

About SurgeX:
- AI-driven agency based in Lisbon, Portugal
- We build bespoke AI solutions for businesses — not generic products
- Our process: we sit down with clients, listen to how their business works, and together identify where AI can make a real difference
- We then build the full solution: AI components, UI (websites/apps), backend, middleware, databases — everything needed for a working product
- After delivery, we host, maintain, keep models updated, fix bugs, and ensure legal compliance
- Once the first solution is running, we move to the next use case for the same client — long-term partnerships
- We DON'T push AI for the sake of AI. We listen to what clients actually need.

Services:
- Bespoke AI Solutions (workshops, custom builds, full integration, ongoing support)
- Websites & Apps (premium custom design, fast delivery, SEO optimized)
- Automation & Chatbots (smart chatbots, auto follow-ups, email sequences, process automation)
- Digital Marketing (Google Ads, social media, content creation, lead generation)

Key selling points:
- Premium quality at fair prices — 98% cheaper than traditional agencies
- Average delivery in 48 hours
- 10x faster than traditional development
- 15+ projects delivered

Contact: contact@surgex.pt
Location: Lisbon, Portugal

Rules:
- Answer in the same language the user writes in (Portuguese or English)
- Keep responses short (2-3 sentences max unless they ask for detail)
- If they want to start a project or have specific questions about pricing, encourage them to reach out via the contact form or email contact@surgex.pt
- Never make up specific prices — say we tailor pricing to each project and to get in touch for a quote
- Be conversational and approachable, not corporate
- You can mention you're an AI assistant — this is an AI agency after all`;

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Missing messages" }, { status: 400 });
    }

    // Validate messages
    for (const msg of messages) {
      if (
        !msg.role ||
        !msg.content ||
        typeof msg.content !== "string" ||
        msg.content.length > 1000
      ) {
        return NextResponse.json(
          { error: "Invalid message" },
          { status: 400 }
        );
      }
    }

    // Keep only last 10 messages to limit costs
    const trimmedMessages = messages.slice(-10);

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: trimmedMessages,
    });

    const reply =
      response.content[0].type === "text"
        ? response.content[0].text
        : "Sorry, something went wrong.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[chat] Error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
