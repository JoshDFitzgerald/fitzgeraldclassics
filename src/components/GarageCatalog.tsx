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

// Amazon product grid with category filtering, sorting, and pagination.
export default function GarageCatalog({ products, perPage, filterLabel, allLabel, buttonLabel }: Props) {
  const categories = [...new Set(products.map((p) => p.category))].sort();
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("recommended");
  const [page, setPage] = useState(0);
  const list = products.filter((p) => !category || p.category === category);
  if (sort === "name-asc") {
    list.sort((a, b) => a.name.localeCompare(b.name, "en"));
  } else if (sort === "name-desc") {
    list.sort((a, b) => b.name.localeCompare(a.name, "en"));
  } else if (sort === "category") {
    list.sort((a, b) => a.category.localeCompare(b.category, "en") || a.name.localeCompare(b.name, "en"));
  }
  const pages = Math.max(1, Math.ceil(list.length / perPage));
  const shown = list.slice(page * perPage, page * perPage + perPage);

  return (
    <div className="mx-auto max-w-[1400px] px-[20px] pb-[30px] pt-[24px]">
      <div className="mb-[20px] flex flex-wrap items-end gap-[18px]">
        <label className="flex flex-wrap items-center gap-[12px]">
          <span className="text-[17px] font-bold text-gold">{filterLabel}</span>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(0);
            }}
            className="w-full border border-gold bg-[#181818] px-[14px] py-[12px] text-[16px] text-cream sm:w-auto sm:min-w-[240px]"
          >
            <option value="">{allLabel}</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-wrap items-center gap-[12px]">
          <span className="text-[17px] font-bold text-gold">Sort by:</span>
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(0);
            }}
            className="w-full border border-gold bg-[#181818] px-[14px] py-[12px] text-[16px] text-cream sm:w-auto"
          >
            <option value="recommended">Recommended</option>
            <option value="name-asc">Name: A–Z</option>
            <option value="name-desc">Name: Z–A</option>
            <option value="category">Category: A–Z</option>
          </select>
        </label>
      </div>
      <div className="mb-[20px] flex flex-wrap items-center justify-between gap-[12px]">
        <p role="status" className="text-[14px] text-[#ddd]">
          Showing {list.length ? page * perPage + 1 : 0}–{Math.min((page + 1) * perPage, list.length)} of {list.length} products
        </p>
        <nav aria-label="Product pages" className="flex items-center gap-[12px]">
          <button type="button" disabled={page === 0} onClick={() => setPage(page - 1)} className="bg-gold px-[18px] py-[11px] text-[15px] font-bold text-ink disabled:opacity-40">
            ← Previous
          </button>
          <span className="min-w-[70px] text-center text-[15px]">
            {page + 1} of {pages}
          </span>
          <button type="button" disabled={page >= pages - 1} onClick={() => setPage(page + 1)} className="bg-gold px-[18px] py-[11px] text-[15px] font-bold text-ink disabled:opacity-40">
            Next →
          </button>
        </nav>
      </div>
      <div className="grid gap-[20px] sm:grid-cols-2 lg:grid-cols-4">
        {shown.map((p) => (
          <article key={p.name} className="flex min-w-0 flex-col border border-[#2a2a2a] bg-[#171717] p-[16px]">
            <p className="text-center text-[12px] font-bold uppercase tracking-[0.12em] text-gold">{p.category}</p>
            <h3 className="mb-[12px] mt-[8px] text-center font-serif text-[18px] font-bold leading-[1.2]">{p.name}</h3>
            <div className="relative mb-[14px] h-[180px] bg-white">
              <Image src={p.image} alt={p.name} fill sizes="(min-width: 1400px) 291px, (min-width: 1024px) calc((100vw - 228px) / 4), (min-width: 640px) calc((100vw - 124px) / 2), calc(100vw - 74px)" unoptimized={p.image.startsWith("http")} className="object-contain" />
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
