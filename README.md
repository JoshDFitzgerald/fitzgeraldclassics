# Fitzgerald Classics

Source for **www.fitzgeraldclassics.com**, rebuilt from the original Wix site.

- **Editing content:** see [AGENTS.md](AGENTS.md). Almost everything lives in `content/`, `public/images/`, and `site.config.ts`.
- **Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS 4. Pages are generated at build time; the eBay catalog also revalidates hourly.
- **Hosting:** Vercel, live at https://www.fitzgeraldclassics.com (the bare domain redirects to www; https://fitzgerald-classics.vercel.app also serves production). DNS is at GoDaddy: `@` A records point to Vercel and `www` is a CNAME to Vercel; the MX/TXT records are Microsoft 365 email, so leave them alone. Merging to `main` deploys. Every other pushed branch gets a preview at `https://fitzgerald-classics-git-<branch>-jdfitz2000-7582s-projects.vercel.app` (predictable only for branch names of 13 characters or fewer). Vercel Authentication is turned off for previews so they open without a Vercel login; if the Vercel team slug changes, update this link here and in AGENTS.md.
- **Auto-merge:** `.github/workflows/auto-merge.yml` lints and builds every pull request from a branch in this repo and squash-merges it when that passes. Fork pull requests are never auto-merged.
- **Fonts:** Libre Caslon Text and Inter are bundled in `src/fonts` (SIL Open Font License), so builds need no internet access.
- **Reference:** `reference/INVENTORY.md` documents the original Wix site (pages, text, design tokens, images). Screenshots are git-ignored.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # must pass before merging
npm run lint
npm run test:ebay
```

## eBay store cards

The Vintage Parts page displays one combined parts inventory with search and sorting: listings from the public `fitzgerald-classics` seller catalog interleaved with the curated parts in `content/vintage-parts.json`. (The old standalone eBay page at `/ebay-ecommerce` now redirects to `/vintage-hard-to-find-parts`.) It attempts to refresh hourly and falls back to the verified catalog in `content/ebay-listings.json` if eBay cannot be reached or changes its markup. The page shows the catalog's check date and asks shoppers to confirm prices and availability on eBay. No seller credentials are required. Live refresh depends on eBay continuing to serve its public catalog; this is not an eBay API integration.

To update the saved catalog and item photos with the provided Node.js 24 runtime, run `npm run refresh:ebay`. In a cloud session using an HTTP proxy, use `NODE_USE_ENV_PROXY=1 npm run refresh:ebay`. The command validates the seller, complete result count and downloaded JPEG photos before overwriting the saved catalog. Photos are copied without alteration into `public/images/ebay` with content hashes for cache invalidation. Matching listings use these local copies; new or changed photos from hourly refreshes use their eBay image addresses until the next saved refresh. The public catalog at `www.ebay.com` and item photos at `i.ebayimg.com` must be reachable. Keep TLS verification enabled. Item links retain the configured eBay affiliate campaign.

## Not built yet (stubs)

- Contact form submission (`src/components/ContactForm.tsx`)
- "Ask Fitz" AI chat (`src/components/AskFitz.tsx`)
- Blog comments and likes
