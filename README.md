# Fitzgerald Classics

Source for **www.fitzgeraldclassics.com**, rebuilt from the original Wix site.

- **Editing content:** see [AGENTS.md](AGENTS.md). Almost everything lives in `content/`, `public/images/`, and `site.config.ts`.
- **Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS 4. Every page is statically generated at build time.
- **Hosting:** Vercel (preview address until launch: https://fitzgerald-classics.vercel.app). Merging to `main` deploys. Every other pushed branch gets a preview at `https://fitzgerald-classics-git-<branch>-jdfitz2000-7582s-projects.vercel.app` (predictable only for branch names of 13 characters or fewer). Vercel Authentication is turned off for previews so they open without a Vercel login; if the Vercel team slug changes, update this link here and in AGENTS.md.
- **Auto-merge:** `.github/workflows/auto-merge.yml` lints and builds every pull request from a branch in this repo and squash-merges it when that passes. Fork pull requests are never auto-merged.
- **Fonts:** Libre Caslon Text and Inter are bundled in `src/fonts` (SIL Open Font License), so builds need no internet access.
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
