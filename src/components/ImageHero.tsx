import Image from "next/image";
import type { ReactNode } from "react";

// Full-width photo banner with text on top.
export default function ImageHero({ image, alt, children, className = "", overlay = "bg-black/35" }: { image: string; alt: string; children: ReactNode; className?: string; overlay?: string }) {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" />
      <div className={`absolute inset-0 ${overlay}`} />
      <div className="relative h-full">{children}</div>
    </section>
  );
}
