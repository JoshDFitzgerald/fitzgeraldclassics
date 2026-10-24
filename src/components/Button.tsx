import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline";
  className?: string;
};

// Square gold buttons used across the site.
export default function Button({ href, children, variant = "primary", className = "" }: Props) {
  const external = /^https?:\/\//.test(href);
  const styles =
    variant === "primary"
      ? "bg-gold text-ink hover:bg-cream"
      : "border border-gold bg-ink text-gold hover:bg-gold hover:text-ink";
  const cls = `inline-block px-[27px] py-[13.5px] text-center text-[16px] leading-[1.6] transition-colors md:text-[18px] ${styles} ${className}`;
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
