"use client";

import Image from "next/image";
import { useState } from "react";
import type { EbayListing } from "@/lib/ebay-parser";

export default function EbayCatalog({ listings }: { listings: EbayListing[] }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const terms = search.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const shown = listings.filter((listing) => terms.every((term) => `${listing.name} ${listing.condition}`.toLowerCase().includes(term)));
  if (sort === "price-asc") shown.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") shown.sort((a, b) => b.price - a.price);
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
            <option value="newest">Newest listings</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="name">Name: A–Z</option>
          </select>
        </label>
      </div>
      <p role="status" className="my-[20px] text-[14px] text-muted">Showing {shown.length} of {listings.length} items</p>
      {shown.length ? (
        <div className="grid gap-[24px] sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((listing) => (
            <article key={listing.id} className="flex min-w-0 flex-col border border-gold/30 bg-surface p-[16px]">
              <a href={listing.link} target="_blank" rel="noopener noreferrer sponsored" className="relative block aspect-[4/3] bg-white">
                <Image src={listing.image} alt={listing.name} fill unoptimized={listing.image.startsWith("https:")} sizes="(min-width: 1024px) 340px, (min-width: 640px) 50vw, 100vw" className="object-contain" />
              </a>
              <h3 className="mb-[12px] mt-[18px] font-serif text-[20px] font-bold leading-[1.25]">
                <a href={listing.link} target="_blank" rel="noopener noreferrer sponsored" className="hover:text-gold">{listing.name}</a>
              </h3>
              <p className="text-[14px] text-muted">{listing.condition}</p>
              <p className="mt-[12px] text-[22px] font-bold text-gold">{listing.priceLabel}</p>
              {listing.acceptsOffers && <p className="mt-[4px] text-[13px] text-muted">or Best Offer</p>}
              <div className="mt-auto pt-[20px]">
                <a href={listing.link} target="_blank" rel="noopener noreferrer sponsored" className="inline-block bg-gold px-[22px] py-[12px] text-[15px] font-bold text-ink hover:bg-cream">View on eBay</a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="border-y border-line py-[36px] text-center">{listings.length ? "No items match your search. Try another term or clear the search." : "There are no items listed right now. Please check back soon."}</p>
      )}
    </div>
  );
}
