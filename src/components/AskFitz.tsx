"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@site-config";

// "Ask Fitz" chat: a working chat box in the corner of every page. It sends
// questions to /api/ask-fitz, which answers from the site's own content
// first (see src/lib/askFitzSearch.ts). Replies stream in as they are
// written. If anything goes wrong, visitors see the friendly "taking a
// break" message from site.config.ts instead of an error.
type Message = { role: "user" | "assistant"; content: string; intro?: boolean };

const COUNT_KEY = "askFitzQuestionCount";

const STARTERS = [
  "How should I store my classic car for winter?",
  "What tools should every classic car owner have?",
  "Tell me about your 1966 Corvette.",
];

export default function AskFitz() {
  const [teaser, setTeaser] = useState(true);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { label, teaser: teaserText, greeting, maxQuestionLength, maxQuestionsPerVisitor, breakMessage } =
    siteConfig.askFitz;

  // How many questions this visitor has already asked in this sitting.
  function askedSoFar(): number {
    try {
      return Number(sessionStorage.getItem(COUNT_KEY) ?? 0) || 0;
    } catch {
      // Private browsing can block storage; the counter just starts at 0.
      return 0;
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, open]);

  function openChat() {
    setOpen(true);
    setTeaser(false);
    if (askedSoFar() >= maxQuestionsPerVisitor) setLimitReached(true);
    setMessages((prev) => (prev.length ? prev : [{ role: "assistant", content: greeting, intro: true }]));
  }

  async function send(raw?: string) {
    const question = (raw ?? input).trim();
    if (!question || busy || limitReached) return;
    setInput("");

    const history: Message[] = [...messages, { role: "user", content: question }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setBusy(true);

    const newCount = askedSoFar() + 1;
    if (newCount >= maxQuestionsPerVisitor) setLimitReached(true);
    try {
      sessionStorage.setItem(COUNT_KEY, String(newCount));
    } catch {
      // See above.
    }

    const setAnswer = (content: string) =>
      setMessages((prev) => prev.map((m, i) => (i === prev.length - 1 ? { ...m, content } : m)));

    try {
      const res = await fetch("/api/ask-fitz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.filter((m) => !m.intro).map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!res.ok || !res.body) {
        const note = (await res.text().catch(() => "")).trim();
        setAnswer(note || breakMessage);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        setAnswer(answer);
      }
      if (!answer.trim()) setAnswer(breakMessage);
    } catch {
      setAnswer(breakMessage);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed bottom-[10px] right-[10px] z-30 flex flex-col items-end gap-[12px]">
      {open && (
        <div className="flex max-h-[70vh] w-[340px] max-w-[calc(100vw-20px)] flex-col border border-line bg-surface text-[15px] leading-[1.5] text-cream shadow-xl">
          <div className="flex items-center justify-between border-b border-line p-4 pb-3">
            <p className="font-serif text-[18px] font-bold text-gold">Fitz</p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="text-muted hover:text-cream">
              ✕
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "ml-8 border border-gold/40 bg-ink px-3 py-2"
                    : "mr-4 px-1 py-1"
                }
              >
                {m.content ? (
                  <AnswerText text={m.content} />
                ) : (
                  <span className="text-muted">Fitz is thinking…</span>
                )}
              </div>
            ))}

            {messages.length <= 1 && !busy && (
              <div className="space-y-2 pt-1">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="block w-full border border-line px-3 py-2 text-left text-[14px] text-muted hover:border-gold hover:text-cream"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {limitReached ? (
            <div className="border-t border-line p-4 text-[14px] text-muted">
              That’s all the questions I can take in one sitting. For anything else, please{" "}
              <Link href="/contact" onClick={() => setOpen(false)} className="text-gold underline">
                use the Contact page
              </Link>
              .
            </div>
          ) : (
            <form
              className="flex gap-2 border-t border-line p-3"
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={maxQuestionLength}
                placeholder="Ask about your classic car…"
                aria-label="Your question"
                className="min-w-0 flex-1 border border-line bg-ink px-3 py-2 text-cream placeholder:text-muted focus:border-gold focus:outline-none"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="bg-gold px-4 py-2 text-ink disabled:opacity-50"
              >
                Ask
              </button>
            </form>
          )}
        </div>
      )}
      {teaser && !open && (
        <div className="relative max-w-[220px] bg-ink py-2 pl-3 pr-8 text-[14px] leading-[1.3] text-cream shadow-lg">
          {teaserText}
          <button
            type="button"
            onClick={() => setTeaser(false)}
            aria-label="Dismiss"
            className="absolute right-2 top-1 text-[12px] text-cream"
          >
            ✕
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openChat())}
        className="relative flex items-center gap-[10px] rounded-[90px] bg-gold px-[22px] py-[12px] text-[18px] text-black shadow-lg"
      >
        <SparkleIcon />
        {label}
        {teaser && <span className="absolute right-[2px] top-[2px] h-[10px] w-[10px] rounded-full border-2 border-white bg-red-600" />}
      </button>
    </div>
  );
}

// Renders an answer: paragraphs, **bold**, and links written as
// [text](address) or bare addresses. Only http(s) links and site paths
// become clickable, so a stray address can never turn into something odd.
function AnswerText({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n{2,}/).map((para, i) => (
        <p key={i} className={i > 0 ? "mt-2" : undefined}>
          {renderInline(para.replace(/\n/g, " "))}
        </p>
      ))}
    </>
  );
}

function renderInline(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)\s]+\)|\*\*[^*]+\*\*|https?:\/\/[^\s)]+)/g);
  return parts.map((part, i) => {
    const md = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (md) return <AnswerLink key={i} href={md[2]} label={md[1]} />;
    if (/^https?:\/\//.test(part)) return <AnswerLink key={i} href={part} label={part.replace(/^https?:\/\/(www\.)?/, "")} />;
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    return <span key={i}>{part}</span>;
  });
}

function AnswerLink({ href, label }: { href: string; label: string }) {
  const safe = href.startsWith("/") || /^https?:\/\//.test(href);
  if (!safe) return <span>{label}</span>;
  if (href.startsWith("/")) {
    return (
      <Link href={href} className="text-gold underline">
        {label}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" className="text-gold underline">
      {label}
    </a>
  );
}

function SparkleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M10 3l1.8 5.2L17 10l-5.2 1.8L10 17l-1.8-5.2L3 10l5.2-1.8L10 3zM18 14l.9 2.1L21 17l-2.1.9L18 20l-.9-2.1L15 17l2.1-.9L18 14zM18 2l.7 1.6L20.3 4.3l-1.6.7L18 6.6l-.7-1.6-1.6-.7 1.6-.7L18 2z" />
    </svg>
  );
}
