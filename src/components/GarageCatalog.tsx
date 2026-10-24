"use client";

import Image from "next/image";
import { useState } from "react";
import type { GarageProduct } from "@/lib/content";

type Props = {
  products: GarageProduct[];
  perPage: number;
  filterLabel: string;
  allLabel: string;
  buttonLabel: string;
};

// Amazon product grid with a category menu and Previous/Next pages.
export default function GarageCatalog({ products, perPage, filterLabel, allLabel, buttonLabel }: Props) {
  const categories = [...new Set(products.map((p) => p.category))].sort();
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(0);
  const list = category ? products.filter((p) => p.category === category) : products;
  const pages = Math.max(1, Math.ceil(list.length / perPage));
  const shown = list.slice(page * perPage, page * perPage + perPage);

  return (
    <div className="mx-auto max-w-[1200px] px-[20px] pb-[30px] pt-[24px]">
      <div className="mb-[26px] flex flex-wrap items-center justify-between gap-[18px]">
        <label className="flex flex-wrap items-center gap-[12px]">
          <span className="text-[17px] font-bold text-gold">{filterLabel}</span>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(0);
            }}
            className="min-w-[280px] border border-gold bg-[#181818] px-[14px] py-[12px] text-[16px] text-cream"
          >
            <option value="">{allLabel}</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-center gap-[12px]">
          <button type="button" disabled={page === 0} onClick={() => setPage(page - 1)} className="bg-gold px-[18px] py-[11px] text-[15px] font-bold text-ink disabled:opacity-40">
            ← Previous
          </button>
          <span className="min-w-[70px] text-center text-[15px]">
            {page + 1} of {pages}
          </span>
          <button type="button" disabled={page >= pages - 1} onClick={() => setPage(page + 1)} className="bg-gold px-[18px] py-[11px] text-[15px] font-bold text-ink disabled:opacity-40">
            Next →
          </button>
        </div>
      </div>
      <div className="grid gap-[20px] md:grid-cols-3">
        {shown.map((p) => (
          <article key={p.name} className="flex min-w-0 flex-col border border-[#2a2a2a] bg-[#171717] p-[18px]">
            <p className="text-center text-[12px] font-bold uppercase tracking-[0.12em] text-gold">{p.category}</p>
            <h3 className="mb-[16px] mt-[8px] text-center font-serif text-[20px] font-bold leading-[1.15]">{p.name}</h3>
            <div className="relative mb-[18px] h-[245px] bg-white">
              <Image src={p.image} alt={p.name} fill sizes="(min-width: 768px) 320px, 100vw" unoptimized={p.image.startsWith("http")} className="object-contain" />
            </div>
            <p className="mb-[18px] flex-1 text-center text-[14px] leading-[1.5]">{p.description}</p>
            <a href={p.link} target="_blank" rel="noopener noreferrer sponsored" className="block bg-gold py-[12px] text-center text-[15px] font-bold text-ink hover:bg-cream">
              {buttonLabel}
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
