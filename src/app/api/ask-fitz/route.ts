// Ask Fitz chat endpoint.
//
// Answers visitor questions with an AI model reached through Vercel AI
// Gateway. On Vercel the gateway signs in by itself with the deployment's
// OIDC token, so there is no API key anywhere in this project. The model
// name lives in site.config.ts (askFitz.model) and must stay on the AI
// Gateway free tier, because the free credit is what pays for this chat.
//
// Answers are grounded in the site's own content first (see
// src/lib/askFitzSearch.ts): the best-matching excerpts are sent with the
// question, and the model links to those pages. Anything that goes wrong —
// gateway rate limit, out of free credit, bad request — is answered with a
// friendly fallback message, never a raw error.
import { APICallError, streamText } from "ai";
import { siteConfig } from "@site-config";
import { findSiteExcerpts } from "@/lib/askFitzSearch";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const { askFitz } = siteConfig;
const FALLBACK = askFitz.breakMessage;

const SYSTEM_PROMPT = `You are Fitz, the voice of Fitzgerald Classics, Dan Fitzgerald's classic-car site. You answer visitors' questions the way Dan would: friendly, practical, first person ("I", "my"), plain-spoken and warm, like a knowledgeable friend in the garage. Never say you are an AI or a language model; you are Fitz, the site's assistant.

WHAT YOU ANSWER
- Classic cars, restoration, preservation, parts, tools, garage work, buying and owning classics — that's your world.
- If a question is not about cars at all, politely decline in one sentence and steer back: offer to help with anything classic-car related.
- Fitzgerald Classics is an education-and-parts site. Dan does NOT take on customer restoration work. If someone asks about hiring Dan, booking work, or a price/quote for a job, don't quote anything and don't offer the work — warmly point them to the Contact page (${siteConfig.url}/contact) and say they can reach out there.
- Never invent prices, availability, phone numbers or services. Vintage parts and Garage products mentioned in the site material below are the only ones you may name as available.

HOW YOU ANSWER
- The "From my site" material below is searched from fitzgeraldclassics.com for this question. When it covers the question, base your answer on it first and link to the page with a Markdown link using the exact web address given, e.g. [Winter Storage Done Right](https://www.fitzgeraldclassics.com/post/winter-storage-done-right). Prefer linking the one or two most relevant pages rather than listing them all.
- Read the excerpt text itself, not just its title: some pages (like the Contact page) answer questions that their titles don't obviously match.
- When the site material doesn't cover the question, give a helpful, correct general answer from your own classic-car and restoration knowledge, in the same voice.
- Keep it short: a few short paragraphs at most, and only use a small list if it truly helps. No headings, no long lectures.
- Write in plain text with Markdown links only — no other formatting tricks.`;

// ---- Simple per-visitor guard (protects the free credit) ----
// In-memory on this server instance: at most RATE_MAX questions per
// RATE_WINDOW per visitor address. Server instances come and go, so this is
// a speed bump, not a wall — the per-visitor counter in the chat box itself
// (askFitz.maxQuestionsPerVisitor) is the steadier limit.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 20;
const recentQuestions = new Map<string, number[]>();

function rateLimited(visitor: string): boolean {
  const now = Date.now();
  const kept = (recentQuestions.get(visitor) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  kept.push(now);
  recentQuestions.set(visitor, kept);
  if (recentQuestions.size > 500) {
    for (const [key, times] of recentQuestions) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) recentQuestions.delete(key);
    }
  }
  return kept.length > RATE_MAX;
}

type ChatMessage = { role: "user" | "assistant"; content: string };

function textResponse(text: string, status = 200) {
  return new Response(text, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return textResponse("Please ask a question about a classic car.", 400);
  }

  const raw = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(raw)) return textResponse("Please ask a question about a classic car.", 400);

  const messages: ChatMessage[] = raw
    .filter(
      (m): m is ChatMessage =>
        typeof m === "object" && m !== null &&
        ((m as ChatMessage).role === "user" || (m as ChatMessage).role === "assistant") &&
        typeof (m as ChatMessage).content === "string",
    )
    .slice(-6);

  const question = messages.filter((m) => m.role === "user").at(-1)?.content.trim() ?? "";
  if (!question) return textResponse("Please ask a question about a classic car.", 400);
  if (question.length > askFitz.maxQuestionLength) {
    return textResponse(
      `That question is a little long for me — please keep it under ${askFitz.maxQuestionLength} characters and ask again.`,
      413,
    );
  }

  const visitor =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(visitor)) return textResponse(FALLBACK, 429);

  const excerpts = findSiteExcerpts(question);
  const siteMaterial = excerpts.length
    ? excerpts.map((e) => `### ${e.title}\nWeb address: ${e.url}\n${e.text}`).join("\n\n")
    : "(Nothing on the site matches this question directly.)";

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let sentAny = false;
      try {
        const result = streamText({
          model: askFitz.model,
          system: SYSTEM_PROMPT,
          messages: [
            ...messages.slice(0, -1),
            {
              role: "user",
              content: `From my site:\n\n${siteMaterial}\n\n---\n\nVisitor question: ${question}`,
            },
          ],
          maxOutputTokens: askFitz.maxAnswerTokens,
          temperature: 0.6,
          maxRetries: 1,
          abortSignal: request.signal,
        });
        // fullStream, not textStream: textStream quietly swallows errors,
        // while fullStream reports them as an "error" part we can catch.
        for await (const part of result.fullStream) {
          if (part.type === "text-delta" && part.text) {
            sentAny = true;
            controller.enqueue(encoder.encode(part.text));
          } else if (part.type === "error") {
            throw part.error;
          } else if (part.type === "abort") {
            break;
          }
        }
        // A stream that ends with no words at all is a failure too.
        if (!sentAny && !request.signal.aborted) {
          controller.enqueue(encoder.encode(FALLBACK));
        }
      } catch (error) {
        // Rate limit (429), out of credit (402), missing gateway sign-in
        // (401/403) or any other failure: one friendly message, no errors.
        const status = APICallError.isInstance(error) ? error.statusCode : undefined;
        console.error("Ask Fitz gateway error", status ?? "", error);
        if (!request.signal.aborted) {
          controller.enqueue(encoder.encode(sentAny ? `\n\n${FALLBACK}` : FALLBACK));
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
