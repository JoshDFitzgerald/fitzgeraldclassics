# Fitzgerald Classics

Source for **www.fitzgeraldclassics.com**, rebuilt from the original Wix site.

- **Editing content:** see [AGENTS.md](AGENTS.md). Almost everything lives in `content/`, `public/images/`, and `site.config.ts`.
- **Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS 4. Every page is statically generated at build time.
- **Hosting:** Vercel. Merging to `main` deploys.
- **Reference:** `reference/INVENTORY.md` documents the original Wix site (pages, text, design tokens, images). Screenshots are git-ignored.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # must pass before merging
npm run lint
```

## Not built yet (stubs)

- Contact form submission (`src/components/ContactForm.tsx`)
- "Ask Fitz" AI chat (`src/components/AskFitz.tsx`)
- Live eBay store listings (`src/app/ebay-ecommerce/page.tsx`; set `ebayStoreUrl` in `site.config.ts` for a store link)
- Blog comments and likes
