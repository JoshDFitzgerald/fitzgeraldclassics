"use client";

import Image from "next/image";
import { useState } from "react";

export type CatalogItem = {
  key: string;
  name: string;
  link: string;
  image: string;
  imageContain?: boolean;
  description?: string;
  condition?: string;
  price?: number;
  priceLabel?: string;
  acceptsOffers?: boolean;
  buttonLabel?: string;
};

export default function PartsCatalog({ items }: { items: CatalogItem[] }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const terms = search.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const shown = items.filter((item) => terms.every((term) => `${item.name} ${item.description || ""} ${item.condition || ""}`.toLowerCase().includes(term)));
  if (sort === "price-asc") shown.sort((a, b) => (a.price ?? Number.POSITIVE_INFINITY) - (b.price ?? Number.POSITIVE_INFINITY));
  if (sort === "price-desc") shown.sort((a, b) => (b.price ?? Number.NEGATIVE_INFINITY) - (a.price ?? Number.NEGATIVE_INFINITY));
  if (sort === "name") shown.sort((a, b) => a.name.localeCompare(b.name, "en"));

  return (
    <div className="mt-[24px]">
      <div className="flex flex-wrap items-end gap-[20px]">
        <label className="flex min-w-0 flex-1 basis-[260px] flex-col gap-[8px] text-[15px] font-bold text-gold">
          Search items
          <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Try Corvette, Nash, or Ford" className="w-full border border-gold bg-surface px-[14px] py-[12px] text-[16px] font-normal text-cream" />
        </label>
        <label className="flex max-w-full flex-col gap-[8px] text-[15px] font-bold text-gold">
          Sort by
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="max-w-full border border-gold bg-surface px-[14px] py-[12px] text-[16px] font-normal text-cream">
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="name">Name: A–Z</option>
          </select>
        </label>
      </div>
      <p role="status" className="my-[20px] text-[14px] text-muted">Showing {shown.length} of {items.length} items</p>
      {shown.length ? (
        <div className="grid gap-[24px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shown.map((item) => (
            <article key={item.key} className="flex min-w-0 flex-col border border-gold/30 bg-surface p-[16px]">
              <a href={item.link} target="_blank" rel="noopener noreferrer sponsored" className={`relative block aspect-[4/3] ${item.imageContain ? "bg-white" : "bg-[#161616]"}`}>
                <Image src={item.image} alt={item.name} fill unoptimized={item.image.startsWith("https:")} sizes="(min-width: 1280px) 270px, (min-width: 1024px) 340px, (min-width: 640px) 50vw, 100vw" className={item.imageContain ? "object-contain" : "object-cover"} />
              </a>
              <h3 className="mb-[12px] mt-[18px] font-serif text-[20px] font-bold leading-[1.25]">
                <a href={item.link} target="_blank" rel="noopener noreferrer sponsored" className="hover:text-gold">{item.name}</a>
              </h3>
              {item.condition && <p className="text-[14px] text-muted">{item.condition}</p>}
              {item.description && <p className="text-[14px] leading-[1.55] text-[#f2f2f2]">{item.description}</p>}
              {item.priceLabel && <p className="mt-[12px] text-[22px] font-bold text-gold">{item.priceLabel}</p>}
              {item.acceptsOffers && <p className="mt-[4px] text-[13px] text-muted">or Best Offer</p>}
              <div className="mt-auto pt-[20px]">
                <a href={item.link} target="_blank" rel="noopener noreferrer sponsored" className="inline-block bg-gold px-[22px] py-[12px] text-[15px] font-bold text-ink hover:bg-cream">{item.buttonLabel || "View on eBay"}</a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="border-y border-line py-[36px] text-center">{items.length ? "No items match your search. Try another term or clear the search." : "There are no items listed right now. Please check back soon."}</p>
      )}
    </div>
  );
}
