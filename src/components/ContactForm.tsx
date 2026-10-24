"use client";

import { useState, type FormEvent } from "react";

type Props = { reasons: string[]; photoHelp: string; thankYou: string };

const field = "w-full border border-muted/80 bg-transparent px-[12px] py-[9px] text-[16px] text-cream placeholder:text-muted focus:border-gold focus:outline-none";
const label = "mb-[8px] block text-[14px]";

// TODO(backend): send the message somewhere (email service + photo storage).
// For now the form checks the required fields and shows a friendly note.
export default function ContactForm({ reasons, photoHelp, thankYou }: Props) {
  const [sent, setSent] = useState(false);
  const [photo, setPhoto] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return <p className="border border-gold/60 bg-surface p-6 text-[18px] leading-[1.6]">{thankYou}</p>;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-[20px]">
      <div>
        <label htmlFor="name" className={label}>Name *</label>
        <input id="name" name="name" required placeholder="Your full name" className={field} />
      </div>
      <div>
        <label htmlFor="email" className={label}>Email *</label>
        <input id="email" name="email" type="email" required placeholder="your@email.com" className={field} />
      </div>
      <div>
        <label htmlFor="reason" className={label}>Reason for contacting us *</label>
        <div className="relative">
          <select id="reason" name="reason" required defaultValue="" className={`${field} appearance-none pr-[44px]`}>
            <option value="" disabled />
            {reasons.map((r) => (
              <option key={r} value={r} className="bg-ink">
                {r}
              </option>
            ))}
          </select>
          <svg className="pointer-events-none absolute right-[16px] top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
            <path d="M1 4l6 6 6-6" />
          </svg>
        </div>
      </div>
      <div className="grid gap-[20px] md:grid-cols-3 md:gap-[23px]">
        <div>
          <label htmlFor="year" className={label}>Vehicle year</label>
          <input id="year" name="year" placeholder="e.g. 1965" className={field} />
        </div>
        <div>
          <label htmlFor="make" className={label}>Vehicle make</label>
          <input id="make" name="make" placeholder="e.g. Ford" className={field} />
        </div>
        <div>
          <label htmlFor="model" className={label}>Vehicle model</label>
          <input id="model" name="model" placeholder="e.g. Mustang" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="message" className={label}>Message *</label>
        <textarea id="message" name="message" required rows={3} placeholder="Tell us what's on your mind…" className={field} />
      </div>
      <div>
        <span className={label}>Photo</span>
        <label className="inline-block cursor-pointer bg-gold px-[15px] py-[8px] pl-[42px] text-[16px] text-ink">
          Upload a photo
          <input type="file" accept="image/*" className="sr-only" onChange={(e) => setPhoto(e.target.files?.[0]?.name ?? "")} />
        </label>
        {photo && <span className="ml-3 text-[14px]">{photo}</span>}
        <p className="mt-[10px] text-[14px] text-muted">{photoHelp}</p>
      </div>
      <button type="submit" className="w-full bg-gold py-[9px] text-[16px] text-ink hover:bg-cream">
        Send Message
      </button>
    </form>
  );
}
