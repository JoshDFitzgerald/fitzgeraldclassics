"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@site-config";

// Fixed top bar with a "MENU" button that opens a slide-out drawer on the right.
export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 h-[48px] bg-ink md:h-[58px]">
        <div className="flex h-full items-center justify-center md:justify-end md:pr-[38px]">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="flex items-center gap-[22px] text-cream md:text-gold"
          >
            <span className="hidden text-[12px] uppercase tracking-[0.13em] md:inline">Menu</span>
            <HamburgerIcon />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <nav
        aria-label="Main menu"
        className={`fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-ink transition-transform duration-300 md:w-[33%] md:min-w-[420px] ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-end px-[24px] pt-[24px] md:px-[60px] md:pt-[110px]">
          <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="text-cream">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3l22 22M25 3L3 25" />
            </svg>
          </button>
        </div>
        <ul className="flex flex-1 flex-col items-center gap-[18px] overflow-y-auto pb-10 pt-6 md:gap-[26px] md:pt-0">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-serif text-[20px] font-bold uppercase tracking-[0.05em] text-gold hover:text-cream md:text-[30px]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

function HamburgerIcon() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <path d="M0 1h20M0 7h20M0 13h20" />
    </svg>
  );
}
