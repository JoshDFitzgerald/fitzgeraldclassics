"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@site-config";

// TODO(backend): connect to a real AI chat. For now this shows a friendly
// greeting and points visitors to the contact form.
export default function AskFitz() {
  const [teaser, setTeaser] = useState(true);
  const [open, setOpen] = useState(false);
  const { label, teaser: teaserText, greeting } = siteConfig.askFitz;

  return (
    <div className="fixed bottom-[10px] right-[10px] z-30 flex flex-col items-end gap-[12px]">
      {open && (
        <div className="w-[300px] border border-line bg-surface p-5 text-[15px] leading-[1.5] text-cream shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-serif text-[18px] font-bold">Fitz</p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="text-muted hover:text-cream">
              ✕
            </button>
          </div>
          <p>{greeting}</p>
          <p className="mt-3 text-muted">Live chat is coming soon. In the meantime, send us your question and we’ll get back to you.</p>
          <Link href="/contact" onClick={() => setOpen(false)} className="mt-4 inline-block bg-gold px-4 py-2 text-ink">
            Ask on the contact page
          </Link>
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
        onClick={() => {
          setOpen((o) => !o);
          setTeaser(false);
        }}
        className="relative flex items-center gap-[10px] rounded-[90px] bg-gold px-[22px] py-[12px] text-[18px] text-black shadow-lg"
      >
        <SparkleIcon />
        {label}
        {teaser && <span className="absolute right-[2px] top-[2px] h-[10px] w-[10px] rounded-full border-2 border-white bg-red-600" />}
      </button>
    </div>
  );
}

function SparkleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M10 3l1.8 5.2L17 10l-5.2 1.8L10 17l-1.8-5.2L3 10l5.2-1.8L10 3zM18 14l.9 2.1L21 17l-2.1.9L18 20l-.9-2.1L15 17l2.1-.9L18 14zM18 2l.7 1.6L20.3 4.3l-1.6.7L18 6.6l-.7-1.6-1.6-.7 1.6-.7L18 2z" />
    </svg>
  );
}
