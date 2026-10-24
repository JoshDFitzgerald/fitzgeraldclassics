# Fitzgerald Classics: Site Inventory (Phase 1)

Reference crawl of **https://www.fitzgeraldclassics.com** (Wix), taken 2026‑10‑24.
The live site is read-only reference. Nothing below was copied from Wix's generated HTML/CSS/JS.

**What's in `/reference`**

| Path | Contents |
|---|---|
| `INVENTORY.md` | This file |
| `screenshots/` (git-ignored) | Full-page renders at 1440px and 390px for every URL (`<page>--1440.png`, `<page>--390.png`). Also `_menu-open--*.png` (nav drawer) and `_embed-*--*.png` (Garage/Parts catalogs rendered standalone). |
| `text/pages/*.md` | All visible text per static page, in order, with headings, links, buttons, form fields, title and meta description |
| `text/posts/*.md` | All 19 blog posts converted to Markdown with frontmatter (date, author, categories, excerpt, cover, SEO) |
| `text/portfolio/*.md` | The 3 portfolio projects with every gallery photo's caption, in order |
| `text/how-to-videos.md` | The 22 How-To Video records (YouTube IDs, creator, blurb) |
| `text/site-header-footer.md` | Shared nav and footer text |
| `data/` | Raw crawl JSON (per page), plus extracted datasets: `embeds/garage-products.json` (33 Amazon products), `embeds/vintage-parts.json` (18 eBay parts), `_videos.json`, `_portfolio.json`, `_posts.json`, `_images.json`, `_blog-feed.xml` |

---

## 0. Decisions taken for the Phase 2 build (lift-and-shift)

Josh's direction: reuse every existing asset and make a one-to-one copy first; improve later. The open questions in §11 were resolved like this:

1. How-To Videos moved to `/how-to-videos` (301 from `/blank`). `/portfolio-collections/portfolio` → 301 `/portfolio`. Unknown or broken `/how-to-videos/*` addresses (including the 6 dead Wix ones) → 301 `/how-to-videos`.
2. How-To Videos were built from the real CMS data using the site's existing look (the Wix pages were broken placeholders).
3. eBay store: `ebayStoreUrl` in `site.config.ts` is empty until we know the seller's store link; the page shows a "coming soon" panel that links to Vintage Parts.
4. `vintage-parts.json` now lives in this repo (`content/vintage-parts.json`). The old GitHub data repo is no longer read.
5. All 181 Wix-hosted images were copied into `public/images/` as-is. The 10 third-party hotlinked product/part images stay hotlinked.
6. Royal Plating keeps the gear icon. Uncategorized posts stay uncategorized. The blog lists all posts.

---

## 1. Headline findings

1. **The site is small and mostly static.** It has 10 real pages, a 19-post blog, a 3-project portfolio, and a curated video list. There are no Wix Stores products, bookings or members area.
2. **The How-To Videos section is broken on the live site.** The listing page (`/blank`) and all detail pages show unbound Wix template placeholders ("Add The Title Text Here", "Heading 1", "Embark on extraordinary adventures…"). The CMS data does exist, and I captured it: 22 YouTube videos, all from *Kenley's Car Stories*. 6 more URLs in the sitemap 404 on the live site.
3. **Two pages are already hand-built HTML embeds**, not Wix widgets. They are easy to port:
   - **The Garage** is an Amazon-affiliate product grid (33 products, category filter, pagination). Its data is inline in the embed.
   - **Vintage Parts** is an eBay-affiliate parts grid (18 parts). Its data is fetched at runtime from `raw.githubusercontent.com/fitzgeraldrei2021-ctrl/fitzgerald-classics-data/main/vintage-parts.json`, so your dad already keeps one data file on GitHub.
4. **None of the site's images are Wix stock.** Every content image is your dad's own upload (Wix media prefix `b5fa70`). But most hero, about and blog-cover images look AI-generated. His real photos are the 110 iPhone shots in the portfolio. See §8.
5. **No custom favicon** (Wix default) and **almost no social preview images**. Only portfolio pages and blog posts have `og:image`.
6. **There's a Google Search Console verification tag** that must be carried over:
   `<meta name="google-site-verification" content="vj-8FEwO3GEryTsRNbFFo6UxjWj6YL2Z2HaHuZWjeiU">`
7. **The live mobile layout drops body text.** For example, the About page paragraphs don't show at 390px because Wix's reveal animations never fire. The rebuild should just show the text, not copy this.

---

## 2. Pages and URL paths

### 2a. Static pages (from `pages-sitemap.xml` + nav)

| Path | Nav label | `<title>` | Meta description | What's on it | Proposed |
|---|---|---|---|---|---|
| `/` | Home | Classic Car Restoration & Preservation \| Fitzgerald Classics Online | Fitzgerald Classics brings classic car restoration to life with stories, how-tos, and gear from our online hub for enthusiasts across the United States. | Full-width hero image (1966 Corvette in vintage garage) with "Fitzgerald Classics" gold serif title + tagline overlaid top-left. Nothing else above the footer. | Keep path |
| `/about-us` | About Us | About Fitzgerald Classics \| Preserving Automotive History | Learn about Fitzgerald Classics, our approach to classic American automobiles, craftsmanship, preservation, and our mission to preserve Americana one car at a time. | 3 sections: (1) photo of Dan left / "OUR STORY" eyebrow + h1 "Restoring the Soul of America" + intro; (2) on #1A1A1A: h2 "Heritage & Restoration Philosophy", two text columns, outline button "View Our Projects" → /portfolio, steering-wheel image right; (3) centered gold h2 "INTERESTED IN BECOMING A TRUSTED PARTNER?" + text + gold button "Contact Fitzgerald Classics" → /contact | Keep |
| `/portfolio` | Projects | Classic Car Restoration Projects \| Fitzgerald Classics | Explore classic car restoration projects by Fitzgerald Classics, with photos, build details, and ideas to inspire your next garage build. | h2 "Portfolio" + gold intro line "Every classic has a story. Click a car photo to follow its restoration journey." + 3-column grid of project cards (cover photo, serif title, full description) | Keep |
| `/blog` | Blog | Classic Car Restoration Guides & Advice \| Fitzgerald Classics | Classic car restoration guides, troubleshooting tips, and project lessons—get practical advice from Fitzgerald Classics. | Category tab bar + "All Posts" + 3-column post cards (cover, author/date/read time, serif title, excerpt). The live page only renders 6 posts. | Keep (list all posts) |
| `/contact` | Contact Us | Contact Fitzgerald Classics \| Classic Car Restoration | Contact Fitzgerald Classics with questions about classic car restoration, preservation, project stories, trusted resources, or the Fitzgerald Classics website. | Form only (no heading): Name*, Email*, Reason for contacting us* (Restoration Question / Share a Project / Vendor Recommendation / Media or Partnership / Website Feedback / Other), Vehicle year / make / model (3 columns), Message*, Photo upload ("Optional. Upload images only (JPG, PNG, etc.)."), full-width "Send Message". Disclaimer paragraph below. | Keep; form stubbed |
| `/trusted-partners` | Trusted Partners | Trusted Classic Car Partners & Resources \| Fitzgerald Classics | Explore classic car partners, trusted parts suppliers, restoration specialists, and recommended resources from Fitzgerald Classics for classic American cars. | Gold h1 "Trusted Car Partners" + intro, then 7 partner cards: "FITZGERALD CLASSICS RECOMMENDED" gold badge, big serif name, gold "CATEGORY: …" line, description; right column has logo, phone, address, gold "Visit Website" button. Partners: Corvette Central, Zip Corvette, Top Flight Automotive, Al Knoch Interiors, Royal Plating, Kenley's Kustoms, Metropolitan Pit Stop. | Keep; data file |
| `/ebay-ecommerce` | eBay eCommerce | eBay eCommerce \| Fitzgerald Classics | *(none)* | Gold h2 "Parts with a Purpose" + text with link "Tunnel to Towers Foundation". Below is a third-party **"eBay Store" Wix app (mindbulbs)** that shows live listings (search, sort, categories, pagination). | Keep; widget becomes TODO |
| `/fitzgerald-classics-garage` | The Garage | Classic Car Restoration Tools \| Fitzgerald Classics Garage | Shop classic car restoration tools we trust, plus parts and guides from Fitzgerald Classics. | Hero (toolbox image, gold h1 "The Fitzgerald Classics Garage", subtitle). Below is the Amazon product grid: "Shop by category" dropdown, Prev/Next pager ("1 of 11"), 3 cards per page (gold category eyebrow, serif title, white image box, description, gold "View on Amazon"), affiliate disclaimer. | Keep; rebuild grid natively |
| `/vintage-hard-to-find-parts` | Vintage Parts | Vintage Car Parts \| Fitzgerald Classics | Shop curated vintage car parts, NOS, and rare finds—browse our rotating inventory today. | Hero (parts image, h1 "Vintage &(gold) Hard-to-Find Parts", serif subtitle). Intro paragraph. Embed: gold "PARTS CATALOG" heading, 3-column cards (image, serif name, recommendation, gold "View on eBay"). | Keep; rebuild grid natively |
| `/blank` | How-To Videos | Classic Car Restoration How-To Videos \| Fitzgerald Classics | *(none)* | h1 "How-To Videos" + 3 intro paragraphs, then a **broken** repeater of placeholder cards | **Move to `/how-to-videos`**, with a 301 from `/blank` (see §2d) |
| `/blank-0cusaw` | *(not in nav)* | Home \| Fitzgerald Classics | *(none)* | Wix's "Page not found (Error 404)" template, accidentally published and listed in the sitemap | 301 → `/`; build a real 404 page instead |
| `/portfolio-collections/portfolio` | *(not in nav)* | Portfolio | *(none)* | Wix Portfolio app's collection page: "Back" link, h1 "Portfolio", numbered list 01/02/03 of the projects. Duplicates `/portfolio`. Its `og:image` is a **Wix template marketing mockup**. | Keep path as a simple list, or 301 → `/portfolio` (recommended) |

### 2b. Blog (`/post/<slug>`, `/blog/categories/<slug>`)

**19 posts.** All are by "Dan Fitzgerald", published weekly on Fridays from 2026‑07‑10 to 2026‑10‑23. Every post has one cover image and no inline images. Bodies are headings (h2/h3), paragraphs, lists, a few blockquotes, internal links, and occasionally a "button" link (rust-red `#7A2F23`). Most posts end with "Coming Next" and "About the Author" sections and the line "Preserving Americana… one classic car at a time." The live posts also show share icons (Facebook, X, LinkedIn, copy link), view and comment counts, a like heart, a comments box (Wix members), and a "Recent Posts" row of 3 cards.

| Date | Title | URL path | Categories | Read |
|---|---|---|---|---|
| 2026-10-23 | Classic Car Documentation and NCRS: Proving the Story Behind the Restoration | /post/classic-car-documentation-ncrs | — | 13 min |
| 2026-10-16 | Classic Car Paint Preparation: The Finish Is Only as Good as What Lies Beneath | /post/classic-car-paint-preparation | — | 14 min |
| 2026-10-10 | Five Restoration Habits That Save Time, Money, and Original Parts | /post/five-restoration-habits-that-save-time-money-and-original-parts | — | 2 min |
| 2026-10-09 | Restoration Philosophy: What Does It Mean to Preserve a Classic Car? | /post/restoration-philosophy-preserve-classic-car | — | 12 min |
| 2026-10-07 | 10 Tools Every Classic-Car Owner Should Have | /post/10-tools-every-classic-car-owner-should-have | — | 3 min |
| 2026-10-07 | 7 Electrical Tools Every Classic-Car Owner Should Have | /post/7-electrical-tools-every-classic-car-owner-should-have | — | 2 min |
| 2026-10-02 | Hands-On Tool Reviews: What Earns a Place in the Restoration Garage | /post/hands-on-tool-reviews-restoration-garage | — | 14 min |
| 2026-09-25 | Classic Car Electrical Troubleshooting: Find the Fault Before Replacing Parts | /post/classic-car-electrical-troubleshooting | — | 11 min |
| 2026-09-18 | Classic Car Body Panel Alignment: Why Gaps Tell the Story of a Restoration | /post/classic-car-body-panel-alignment | — | 14 min |
| 2026-09-11 | Buying Your First Corvette: How to Buy the Right Car Before You Buy the Wrong One | /post/buying-your-first-corvette | Buying & Ownership | 14 min |
| 2026-09-04 | Gauge Restoration: Repair, Recalibrate or Replace? | /post/gauge-restoration-repair-recalibrate-or-replace | Electrical & Instruments, Interior & Finishing | 8 min |
| 2026-08-28 | Dash Restoration: Where a Classic Car Comes Back to Life | /post/dash-restoration-where-a-classic-car-comes-back-to-life | Interior & Finishing | 8 min |
| 2026-08-21 | Engine Paint Correctness | /post/engine-paint-correctness | Engines & Mechanical, Interior & Finishing | 7 min |
| 2026-08-14 | Bench Testing Classic-Car Electrical Components Without Destroying Them | /post/bench-testing-classic-car-electrical-components-without-destroying-them | Electrical & Instruments, Tools & Shop | 10 min |
| 2026-08-07 | Restore It or Replace It? | /post/restore-it-or-replace-it | Restoration Planning | 8 min |
| 2026-07-31 | The Value of Good Tools: Why the Right Equipment Saves Time, Money, and Frustration | /post/the-value-of-good-tools-why-the-right-equipment-saves-time-money-and-frustration | Tools & Shop | 4 min |
| 2026-07-24 | How to Build a Classic Car Restoration Budget That Actually Works | /post/how-to-build-a-classic-car-restoration-budget-that-actually-works | Restoration Planning | 6 min |
| 2026-07-17 | When a 1957 Positive-Ground Car Meets a Modern Negative-Ground Radio | /post/when-a-1957-positive-ground-car-meets-a-modern-negative-ground-radio | Electrical & Instruments | 5 min |
| 2026-07-10 | Buying Your First Classic Car | /post/buying-your-first-classic-car | Buying & Ownership | 15 min |

The **9 newest posts have no category in Wix**. That's real data, not a crawl gap: the API returns `categoryIds: []`.

**6 category pages** (keep all paths). Each has a title, a one-line description, and the same card grid filtered by category:

| Path | Title | Description |
|---|---|---|
| `/blog/categories/buying-ownership` | Buying & Ownership | Classic-car buying guidance, ownership considerations, and informed purchase decisions. |
| `/blog/categories/restoration-planning` | Restoration Planning | Planning, budgeting, preservation decisions, and restoration strategy. |
| `/blog/categories/electrical-instruments` | Electrical & Instruments | Classic-car electrical systems, gauges, radios, testing, wiring, and troubleshooting. |
| `/blog/categories/engines-mechanical` | Engines & Mechanical | Engine, drivetrain, mechanical systems, finishes, and factory-correct details. |
| `/blog/categories/interior-finishing` | Interior & Finishing | Dash, trim, interior, cosmetic restoration, and finishing details. |
| `/blog/categories/tools-shop` | Tools & Shop | Tools, equipment, workshop practices, and practical restoration techniques. |

(The blog tab bar shows "All Posts" plus these 6 categories, with "Tools & Shop" under "More" at desktop width.)

The RSS feed at **`/blog-feed.xml`** has 19 items. The rebuild should keep serving RSS at this path.

### 2c. Portfolio projects (`/portfolio-collections/portfolio/<slug>`)

| Path | Title | Photos | Notes |
|---|---|---|---|
| `/portfolio-collections/portfolio/1963-ford-galaxie-500-convertible` | 1963 Ford Galaxie 500 Convertible | 63 | Complete before→after story, every photo captioned |
| `/portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress` | 1957 Nash Metropolitan — Restoration in Progress | 47 | Long, regularly updated description with dated milestones ("Updated October 12, 2026") |
| `/portfolio-collections/portfolio/1966-corvette-convertible-—-updates-coming-soon` | 1966 Corvette Convertible — Updates Coming Soon | 0 | Cover photo only. **The slug contains a literal em dash (—)**, so the route has to match the URL-encoded form `%E2%80%94`. |

Project page layout: a sticky left column (serif title, description, details such as "Project type: Restoration" / "Date: September 2026") and a right column of large photos stacked vertically, each with a small caption title and description underneath. Each project has its own SEO title and description (in `text/portfolio/*.md`).

### 2d. How-To Videos (`/how-to-videos/<slug>`)

This is a CMS collection "HowToVideos" with fields title, slug, videoUrl, youtubeVideoId, thumbnail, creator, channelHandle, sourceType ("Recommended"), videoFormat (Short / Long-form), category, recommendation (1–2 sentence blurb), featured, published, publishedDate, sortOrder, seoTitle, seoDescription. All 22 working records are by **Kenley's Car Stories** (`@KenleysCarStories`), mostly about the 1971 Pontiac GTO "Ragged Out to Restored" series. Kenley's Kustoms is also a Trusted Partner. **Every detail page is currently a broken template** titled "Video Detail Template | Fitzgerald Classics".

| # | Title | URL path | Format | YouTube ID |
|---|---|---|---|---|
| 9 | 1971 GTO ragged out to restored episode 3 | /how-to-videos/1971-gto-ragged-out-to-restored-episode-3 | Short | gi4ZOahe5Do |
| 2 | 2004 Dodge Viper Oil Change, Battery Replacement | /how-to-videos/2004-dodge-viper-oil-change-battery-replacement | Short | QHgTnzFswIY |
| 3 | Oldsmobile Hurst Edition preview | /how-to-videos/oldsmobile-hurst-edition-preview | Long-form | OLhLM_ZNIZ8 |
| 4 | 1975 Oldsmobile Hurst Edition first start | /how-to-videos/1975-oldsmobile-hurst-edition-first-start | Short | kAcCEvVP2lk |
| 6 | Arizona Survivor GTO: What Sandblasting exposed- Rust & damage ( episode 2) | /how-to-videos/arizona-survivor-gto-what-sandblasting-exposed-rust-damage-episode-2 | Long-form | 2_GlAqpwGH0 |
| 11 | 1971 PONTIAC GTO - RAGGED OUT TO RESTORED    #gto455#pontiacgto | /how-to-videos/1971-pontiac-gto-ragged-out-to-restored-gto455pontiacgto | Short | rvOwDKqZL8M |
| 12 | 71' GTO Ragged out to Restored- Testing Vice Grip Garage Rebuild Black #pontiacgto | /how-to-videos/71-gto-ragged-out-to-restored-testing-vice-grip-garage-rebuild-black-pontiacgto | Short | fJMgMBTW60c |
| 13 | 71' GTO  #pontiacgto #gto455 #carrestorationproject | /how-to-videos/71-gto-pontiacgto-gto455-carrestorationproject | Short | E9VnlLuqQBw |
| 14 | 71' GTO- POWER STEERING HOSE REBUILD   #pontiacgto #carrestorationproject #diy #oldschool #mechanic | /how-to-videos/71-gto-power-steering-hose-rebuild-pontiacgto-carrestorationproject-diy-oldschool-mechanic | Short | gu7ZMak627k |
| 15 | Vintage Air installation: Firewall & Engine prep (plus engine & core support install) | /how-to-videos/vintage-air-installation-firewall-engine-prep-plus-engine-core-support-install | Long-form | Scce_bIus6Y |
| 16 | 71  Pontiac GTO Ragged out to Restored  series recap | /how-to-videos/71-pontiac-gto-ragged-out-to-restored-series-recap | Short | 6cRccAj1qp0 |
| 17 | 71' GTO- POWER GRIP HOSE CLAMP..  #gto455 #automobile #carrestorationproject #repair | /how-to-videos/71-gto-power-grip-hose-clamp..-gto455-automobile-carrestorationproject-repair | Short | cFJAun_pmdM |
| 18 | 71' GTO- Henry can't wait to fire up the #holley EFI #holley #gto455 #carrestorationproject | /how-to-videos/71-gto-henry-cant-wait-to-fire-up-the-holley-efi-holley-gto455-carrestorationproject | Short | CrfULkXtMDk |
| 19 | 71' GTO- EFI PROGRESS #holley #holleyefi  #gto455 #carrestorationproject | /how-to-videos/71-gto-efi-progress-holley-holleyefi-gto455-carrestorationproject | Short | mRGGkMl9hcE |
| 20 | 71' GTO-  Building A Custom MSD Plug wire How-To | /how-to-videos/71-gto-building-a-custom-msd-plug-wire-how-to | Short | MtfjZ_h6kSA |
| 21 | 71' GTO-The Struggle Is Real!(spark plug wires ) | /how-to-videos/71-gto-the-struggle-is-realspark-plug-wires | Short | RfQkKPc7t9A |
| 22 | Ragged out to Restored Series -71' PONTIAC GTO- FIRST ENGINE CRANK SINCE ENGINE INSTALL | /how-to-videos/ragged-out-to-restored-series-71-pontiac-gto-first-engine-crank-since-engine-install | Short | 4DZZZ4jSJOY |
| 23 | Ragged out to Restored Series -71' PONTIAC GTO- FIRST START- Holley EFI(maybe choke it?) | /how-to-videos/ragged-out-to-restored-series-71-pontiac-gto-first-start-holley-efimaybe-choke-it | Short | p2JdZqZIj24 |
| 24 | 71' PONTIAC GTO- FAN vs GOPRO-FAIL | /how-to-videos/71-pontiac-gto-fan-vs-gopro-fail | Short | M_Gux-lY3bY |
| 25 | Holley Sniper 2 & Hyperspark Guide ( plus Vintage Air Wiring) | /how-to-videos/holley-sniper-2-hyperspark-guide-plus-vintage-air-wiring | Long-form | k363UCYPdEc |
| 26 | 71'GM Door Hinges Rebuild- Pontiac GTO | /how-to-videos/71gm-door-hinges-rebuild-pontiac-gto | Short | 58Z3tw3j6Qw |
| 27 | Repairing Door Hinges.. It's pretty easy! 1971 Pontiac GTO ragged out to restoed series video. | /how-to-videos/repairing-door-hinges..-its-pretty-easy-1971-pontiac-gto-ragged-out-to-restoed-series-video. | Long-form | VoxaRUH5dFw |

**6 sitemap URLs that 404 on the live site.** Wix generated their slugs from titles with emoji or curly punctuation and then can't resolve them. No data was retrievable, so these will become 301 redirects to `/how-to-videos`:
- `/how-to-videos/4th-of-july-cars-coffee-1966-gt-40-1970-ford-torino-cj-and-of-course-a-few-pontiacs🚗`
- `/how-to-videos/valve-cover-restoration-on-71’-gto`
- `/how-to-videos/1971-pontiac-gto-455-–-ragged-out-to-restored-revival-part-3`
- `/how-to-videos/1971-pontiac-gto-455-–-holley-sniper-efi-parts-arrived-why-vintage-air`
- `/how-to-videos/1971-pontiac-gto-455-restoration-begins-–-arizona-survivor-story-episode-1`
- `/how-to-videos/my-first-flight-✈️-can-flight-simulator-prepare-you-for-a-real-cessna-172`

### 2e. Redirects the rebuild needs

| From | To | Why |
|---|---|---|
| `/blank` | `/how-to-videos` (301) | Meaningless Wix slug; the detail pages already live under `/how-to-videos/…` |
| `/blank-0cusaw` | `/` (301) | Accidentally published 404 template |
| `/portfolio-collections/portfolio` | `/portfolio` (301) | Duplicate listing (optional; can keep the path instead) |
| The 6 broken video URLs above | `/how-to-videos` (301) | Dead on Wix too |
| `/pages-sitemap.xml`, `/blog-posts-sitemap.xml`, `/blog-categories-sitemap.xml`, `/portfolio-projects-sitemap.xml`, `/portfolio-collections-sitemap.xml`, `/dynamic-how-to-videos_p_1xxbfwz_0_5000-sitemap.xml` | `/sitemap.xml` (301) | Wix child sitemaps Google already knows about |

Everything else keeps its exact path.

---

## 3. Header, nav and footer

**Header:** a fixed bar, 58px tall, background `#0A0A0A`, no logo.
- At desktop, the right side shows a gold "MENU" label (Inter 12px, letter-spaced) and a thin 3-line hamburger icon in gold.
- At mobile, a centered hamburger with no label.
- The menu opens a **right-side drawer** (about ⅓ of the width on desktop, full screen on mobile) on `#0A0A0A`, with a close "X" and centered links in **Libre Caslon Text, bold, uppercase, gold `#C5A059`, letter-spacing 0.05em**, about 30px desktop and 16px mobile.
- Links, in order: Home `/`, Projects `/portfolio`, Blog `/blog`, About Us `/about-us`, Contact Us `/contact`, Trusted Partners `/trusted-partners`, eBay eCommerce `/ebay-ecommerce`, The Garage `/fitzgerald-classics-garage`, Vintage Parts `/vintage-hard-to-find-parts`, How-To Videos `/blank`.

**Footer** (same on every page), background `#0A0A0A`:
1. A thin full-width rule (`#F5F5F0` at about 1px), inset about 45px from the page edges.
2. A row with the round **Fitzgerald Classics "Route 66" logo** (about 140px wide) and "Fitzgerald Classics" (Libre Caslon Text bold, 30px, `#F5F5F0`).
3. A row with "Preserving Americana, one car at a time." | "Education first. Commerce supports the mission." (Inter 18px) | Facebook and Instagram round brand-color icons on the right.
4. Another rule.
5. "© 2026 Fitzgerald Classics. Veteran Owned. 10% of merchandise and eBay profits support Tunnel to Towers Foundation. As an Amazon Associate, Fitzgerald Classics earns from qualifying purchases." (Inter about 15.75px, muted `#B8B8B0`).

On mobile everything stacks and centers.

**Social links:** Facebook `https://www.facebook.com/profile.php?id=61594520112307` · Instagram `https://instagram.com/fitzgeraldclassics`

**Floating "Ask Fitz" button** (bottom-right on every page): a gold pill (radius 90px) with a sparkle icon and the label "Ask Fitz", plus a dismissible bubble "Have a question about your classic car?". It's Wix's AI site-chat. See §7.

**Affiliate IDs to preserve:** Amazon tag `fitzgeraldcla-20`; eBay Partner Network `campid=5339219494`.

---

## 4. Reusable sections and components

| Component | Where | Notes |
|---|---|---|
| `SiteHeader` + `MenuDrawer` | all | See §3 |
| `SiteFooter` | all | See §3 |
| `AskFitzButton` | all | Visual stub only |
| `ImageHero` | Home, Garage, Vintage Parts | Full-bleed image, about 650–700px tall at desktop, big serif title (gold or cream), optional subtitle. Home: title top-left. Garage: centered, darkened image. Parts: top-left, "&" in gold. |
| `PageIntro` | Trusted Partners, eBay, How-To Videos, Portfolio | Centered (or inline) big serif h1/h2 + 1–3 intro paragraphs, max width about 760px |
| `SplitSection` (image + text) | About | Image one side, eyebrow/heading/body/button the other; alternate background `#1A1A1A` |
| `CtaBand` | About | Centered uppercase gold serif heading, paragraph, gold button |
| `Button` | everywhere | `primary` (gold fill, dark text) and `outline` (gold 1px border, gold text). Square corners. |
| `PartnerCard` | Trusted Partners | Badge, name, category, description, logo, phone, address, button |
| `ProductCard` + `ProductGrid` (category filter + pager) | Garage | Gold category eyebrow, serif title, white image well, text, full-width gold "View on Amazon" |
| `PartCard` + grid | Vintage Parts | Image, serif title, text, small gold "View on eBay" |
| `PostCard` + grid | Blog, category pages, "Recent Posts" | Cover image 3:2, author/date/read-time row, serif title (3-line clamp), excerpt (3-line clamp) |
| `CategoryTabs` | Blog pages | Horizontal list; active tab gold |
| `ArticleLayout` | Post pages | About 740px text column inside a bordered card. Meta row, serif h1 about 40px, "Updated:" date, body Inter 18px/1.5, h2 serif 28px, h3 serif 22px. Share icons at the end, then Recent Posts. |
| `ProjectCard` + grid | Portfolio | Cover photo 4:3, serif title, description |
| `ProjectGallery` | Project pages | Sticky info column + stacked captioned photos |
| `VideoCard` + `VideoEmbed` | How-To Videos | New design (live one is broken). Built from the existing tokens: dark card, YouTube thumbnail, title, creator, blurb, "Watch Video" |
| `ContactForm` | Contact | Fields as listed in §2a. Labels Inter 14px, inputs 1px `#B8B8B0`-ish border on transparent, 16px text. |

---

## 5. Design tokens

### Colors (from the Wix theme palette, confirmed on rendered elements)

| Token | Hex | Use |
|---|---|---|
| `ink` / background | `#0A0A0A` | Page, header, footer, drawer background |
| `surface` | `#1A1A1A` | Alternate section background (About), partner cards, post cards |
| `line` | `#383838` | Subtle borders and dividers |
| `muted` | `#B8B8B0` | Secondary text, eyebrow "OUR STORY", addresses, disclaimers, copyright |
| `cream` | `#F5F5F0` | Primary text and headings |
| `gold` | `#C5A059` | Accent: buttons, nav links, gold headings, category labels, "MENU" |
| `rust` (minor) | `#7A2F23` | In-article button links inside a couple of posts |
| `parchment` (minor) | `#F5F1E8` | Vintage Parts hero title and subtitle |

The Garage and Parts embeds used their own similar golds (`#D9AD50`, `#D2AA5D`) and backgrounds (`#0D0D0D`, `#181818`). **Proposal:** fold them into the site `gold` and `surface` tokens.

### Typography

| Role | Font | Desktop | Mobile |
|---|---|---|---|
| Hero / page h1 | Libre Caslon Text 700, line-height about 1.0–1.1 | 103.5px (Home, About, Partners, Garage); 76.5px (eBay, Portfolio); 72.9px (Parts) | 36px |
| Section h2 | Libre Caslon Text 700 | 58.5px (About); 76.5px (partner names, CTA); often uppercase | 28–30px |
| Card title | Libre Caslon Text 700 | 22–28px | 22px |
| Post h1 / h2 / h3 | Libre Caslon Text 700 | 40 / 28 / 22px | 26 / 24 / 20px |
| Nav drawer links | Libre Caslon Text 700, uppercase, 0.05em tracking | about 30px | 16px |
| Eyebrow ("OUR STORY") | Inter 400, uppercase, 0.1em tracking, `muted` | 27px | 20px |
| Lead paragraph | Inter 400 | 22.5px / 1.5 | 18px |
| Body | Inter 400 | 18px / 1.5 | 16px |
| Small / meta / labels | Inter 400 | 14–15.75px | 14px |
| "MENU" label | Inter 400, uppercase, tracked | 12px | — |
| Buttons | Inter 400 | 18px (16px on forms) | 16px |

### Spacing and layout (approximate, from renders)
- Page side gutter: about 45px desktop (footer and content edge), 16–24px mobile.
- Content max-widths: text blocks 760px; post column 740px inside a 940px bordered card; card grids about 1100–1300px.
- Section vertical padding: about 80–100px desktop, 48–64px mobile.
- Card grids: 3 columns desktop, 1 column mobile; gutters about 16–24px.
- Header 58px tall; hero about 625–680px tall on desktop.

### Radius and borders
- **Buttons and inputs: square (0px).** The only rounded elements are the Ask Fitz pill (90px) and the in-article rust buttons (4px).
- Partner cards: 1px border in a muted gold/brown tone, square corners.
- Post cards: subtle 1px border, square.

### Buttons
| Variant | Background | Text | Border | Padding | Example |
|---|---|---|---|---|---|
| Primary | `#C5A059` | `#0A0A0A`, Inter 18px | none | 13.5px 27px | "Contact Fitzgerald Classics", "Visit Website" |
| Outline | transparent / `#0A0A0A` | `#C5A059`, Inter 18px | 1px `#C5A059` | 13.5px 27px | "View Our Projects" |
| Form | `#C5A059` | `#0A0A0A`, Inter 16px | none | 11px 15px (full width) | "Send Message" |
| Pill (Ask Fitz) | `#C5A059` | `#000`, 18px | none, radius 90px | 12px 22px | floating chat |

---

## 6. Fonts

| Font | Where used | License | Plan |
|---|---|---|---|
| **Libre Caslon Text** (700) | All headings, nav drawer, card titles, footer name | Free (Google Fonts, OFL) | Use via `next/font/google` |
| **Inter** (400) | All body text, labels, buttons | Free (Google Fonts, OFL) | Use via `next/font/google` |
| Wix Madefor Display / Text | Only Wix's blog-widget chrome (category h1, descriptions) | Free (OFL, on Google Fonts), but it's Wix's house font | Don't use; Libre Caslon and Inter cover these roles |
| DIN Next W01 Light, Helvetica Neue W01 | Loaded by the Wix theme defaults; not visible in any rendered text | **Wix-licensed (Monotype)** | Not needed. If a role ever needs it, use Inter (or Barlow for DIN). |
| Almarai, Manrope | Only on the broken How-To Video template placeholders | Free (Google Fonts) | Drop |
| Custom uploaded fonts `wfont_0d6674_…` | Only the accidental 404 template page | Wix template asset | Drop |
| Georgia / Arial | Garage and Parts HTML embeds | System fonts | Replace with Libre Caslon and Inter for consistency |

No paid fonts are actually visible on the site, so nothing needs licensing.

---

## 7. Non-static features (stub visually + TODO in Phase 2)

| Feature | Where | What it is on Wix | Phase 2 plan |
|---|---|---|---|
| **Contact form** | `/contact` | Custom Wix form with required fields, dropdown, and photo upload | Build the form UI; the submit handler is a TODO (e.g. Resend or Formspree + upload storage) |
| **"Ask Fitz" AI chat** | every page | Wix AI Site-Chat. Greeting: "Welcome to Fitzgerald Classics. I'm Fitz, your classic car restoration assistant. What are you working on today?" Falls back to a contact form (name/email/phone/message). | Floating button + bubble only. Clicking it opens a small "coming soon" panel that links to `/contact`. TODO: real chatbot. |
| **eBay store widget** | `/ebay-ecommerce` | mindbulbs "eBay Store" app showing live listings (35 items: eBay Motors 17, Parts & Accessories 17, Collectibles 1) | TODO. Interim: a "Shop our eBay store" button. **Needs the eBay seller username.** Later: eBay Browse API or EPN widget. |
| **Garage product catalog** | `/fitzgerald-classics-garage` | Hand-written HTML/JS embed (filter + pager) | Rebuild natively from `content/garage-products.json` (client-side filter and pager, no backend) |
| **Vintage parts catalog** | `/vintage-hard-to-find-parts` | Hand-written embed that fetches JSON from his GitHub repo | Rebuild natively from `content/vintage-parts.json` in this repo (see question Q4) |
| **Blog comments, likes, view counts** | posts | Wix Members + Blog | Drop (stats are 0–11 views, 1 like, 0 comments). TODO if he wants comments later (e.g. Giscus). |
| **Blog share buttons** | posts | Wix | Rebuild as plain share links (no backend) |
| **Blog RSS** | `/blog-feed.xml` | Wix | Rebuild as a static route |
| **How-To Videos CMS** | `/blank`, `/how-to-videos/*` | Wix CMS dataset (unbound, so broken) | Rebuild from `content/how-to-videos.json` with YouTube embeds (`youtube-nocookie.com`) |
| **Portfolio app** | `/portfolio*` | Wix Portfolio | Static Markdown + photos |
| **Analytics / Search Console** | site-wide | Wix analytics + GSC verification meta | Keep the GSC meta tag. TODO: Vercel Analytics (one line) if wanted. |

There's no store/cart, booking, members area or paid content.

---

## 8. Images

**218 unique images** (full list with proposed filenames in **Appendix A**):

| Group | Count | Origin |
|---|---|---|
| Portfolio gallery photos (Galaxie 63, Nash 47) + Corvette cover | 111 | **His own photos** (iPhone `IMG_xxxx.jpeg`, 1152×1536 or 1536×2048). Keep. |
| Page art: home hero, About photos (2), Garage hero, Parts hero | 5 | Owner uploads, but they **look AI-generated** (the About "Dan in workshop" portrait looks AI-stylized) |
| Blog covers | 19 | Owner uploads, **AI-generated look** (consistent illustrated "restorer in a warm garage" style, 1536×1024) |
| Logo (Route 66 badge) | 1 | Owner upload, 1536×1024 webp. Keep; also use for the favicon. |
| Partner logos | 6 | Owner uploads of partner trademarks. The **Royal Plating one is a generic gear icon, not their logo.** Al Knoch's is only 400px wide. |
| Garage product photos | 31 + 2 hotlinked | Owner uploads that are evidently **Amazon/manufacturer product shots**. 2 more are hotlinked from kleintools.com and gearwrench.com. |
| Vintage-parts photos | 10 + 8 hotlinked | 10 owner uploads (some look like his own eBay listing photos); **8 are hotlinked** from bigcommerce, ss396.com, luttyschevy.com, classicbodyparts.com, thepartsplaceinc.com, and i.ebayimg.com |
| YouTube thumbnails | 22 | Load from `i.ytimg.com`; don't copy |
| Blog author avatar | 1 | Google account photo |
| Wix template leftovers | 4 | Hidden "LOGO" placeholder, broken-video placeholder, 404 background, and the **Wix marketing mockup used as `og:image`** on `/portfolio-collections/portfolio`. **Drop all four.** |

**Wix stock check:** nothing on the site comes from Wix's media library. Every content image has the owner's Wix media prefix `b5fa70` (it matches his member ID `b5fa70e0-…`). The only other Wix-prefixed files (`2e2a49`, `913019`, `0d6674`) are the template leftovers above, which we're dropping. **So no Wix-licensed stock needs replacing.**

**Licensing flags (not Wix-related, but worth deciding):**
1. **Amazon product images (31):** Amazon's Associates Program Operating Agreement only allows product images served via SiteStripe or the Product Advertising API, not downloaded copies. Keeping them is a compliance risk. Options: (a) keep them as-is (same as today), (b) switch to SiteStripe image links, or (c) use his own photos of the tools.
2. **8 third-party hotlinked part photos:** these belong to other sellers and can disappear. I'd suggest replacing them with his own eBay listing photos.
3. **AI-generated art:** fine to keep if he made it. It just isn't "his own photos" in the way the portfolio is.

**Highest-resolution originals:** Wix serves the original upload at `https://static.wixstatic.com/media/<media-id>` (no `/v1/fill/...` resize suffix). All 149 originals I probed returned HTTP 200; their sizes are in Appendix A.

---

## 9. SEO carry-over

- Page titles and meta descriptions: captured per page (§2a, `text/pages/*.md`), per post (frontmatter in `text/posts/*.md`), per project (`text/portfolio/*.md`) and per video (`seoTitle` and `seoDescription` in `_videos.json`).
- `og:image`: only posts (cover image) and portfolio projects (cover) have one. **Proposal:** default to the home hero for all other pages, and posts and projects keep their covers.
- Favicon: none (Wix default `pfavico.ico`). **Proposal:** generate from the Route 66 logo.
- Canonicals: self-referencing on `https://www.fitzgeraldclassics.com/...` → keep the `www` host as canonical.
- `robots.txt`: allow all and point to the sitemap. Wix-specific rules can be dropped.
- GSC verification meta tag: carry over (§1).
- `og:site_name` "Fitzgerald Classics", `twitter:card` summary_large_image.

---

## 10. Proposed stack and folder structure

**Stack:** Next.js (App Router) + TypeScript + Tailwind CSS, deployed on Vercel. **I see no reason to deviate.** Every page can be statically generated at build time; nothing needs a server until the contact form and chat are built, and those fit Next's route handlers when the time comes.

Libraries, kept minimal:
- `gray-matter` (Markdown frontmatter)
- `remark`, `remark-gfm` and `remark-html` (Markdown → HTML)
- `next/font/google` (Libre Caslon Text, Inter)
- `next/image`

No CMS, database or UI kit.

```
/
├── AGENTS.md                  # instructions for Codex (Phase 3)
├── CLAUDE.md                  # @AGENTS.md + note for Claude
├── site.config.ts             # ONE file: business name, tagline, nav, footer text, contact/social links,
│                              #   affiliate IDs, GSC tag, colors (fed to Tailwind via CSS variables)
├── content/
│   ├── posts/                 # one Markdown file per blog post (frontmatter: title, date, categories,
│   │   └── buying-your-first-classic-car.md   #   excerpt, coverImage, seoTitle, metaDescription)
│   ├── projects/              # one Markdown file per portfolio car (frontmatter incl. ordered gallery list
│   │   └── 1963-ford-galaxie-500-convertible.md  #   of {image, title, caption})
│   ├── pages/                 # editable text for each static page (frontmatter fields + Markdown body)
│   │   ├── home.md  about-us.md  contact.md  trusted-partners.md  ebay-ecommerce.md
│   │   ├── garage.md  vintage-parts.md  how-to-videos.md  portfolio.md  blog.md
│   ├── blog-categories.json   # slug, name, description
│   ├── partners.json          # Trusted Partners list
│   ├── garage-products.json   # Amazon products (name, category, description, url, image)
│   ├── vintage-parts.json     # eBay parts (name, recommendation, image, ebayUrl, sortOrder)
│   └── how-to-videos.json     # videos (slug, title, youtubeId, creator, blurb, format, sortOrder, seo)
├── public/
│   └── images/                # descriptive filenames, e.g. portfolio-galaxie-01-the-starting-point-for-sale.jpg
│       ├── site/  blog/  portfolio/  partners/  garage/  parts/     # (subfolders by area)
├── src/
│   ├── app/                   # routes mirror the live URLs exactly
│   │   ├── layout.tsx  page.tsx  not-found.tsx  sitemap.ts  robots.ts
│   │   ├── about-us/  contact/  trusted-partners/  ebay-ecommerce/
│   │   ├── fitzgerald-classics-garage/  vintage-hard-to-find-parts/  portfolio/
│   │   ├── blog/page.tsx  blog/categories/[slug]/page.tsx  post/[slug]/page.tsx
│   │   ├── blog-feed.xml/route.ts
│   │   ├── portfolio-collections/portfolio/[slug]/page.tsx
│   │   └── how-to-videos/page.tsx  how-to-videos/[slug]/page.tsx
│   ├── components/            # SiteHeader, MenuDrawer, SiteFooter, Button, ImageHero, PostCard, …
│   └── lib/                   # content loaders (posts.ts, projects.ts, …), seo helpers
├── next.config.ts             # redirects from §2e
└── reference/                 # this inventory (screenshots git-ignored)
```

How an edit works: "add an article" means dropping a new `.md` in `content/posts/` and an image in `public/images/blog/`. "Change the phone or Instagram" means editing `site.config.ts`. "Add a part" means appending to `content/vintage-parts.json`. Page layouts live in components, which agents rarely need to touch.

---

## 11. Questions for you before Phase 2

1. **How-To Videos URL:** OK to move the listing from `/blank` to `/how-to-videos` (with a 301 from `/blank`)? And `/portfolio-collections/portfolio` → `/portfolio` (301)?
2. **How-To Videos design:** the live page is broken, so there's nothing to match. OK if I design it from the site's existing look (dark cards, gold buttons, YouTube embed on each detail page)?
3. **eBay store:** what's the eBay seller username, so I can link "Shop our eBay store"? The live widget is a paid third-party app.
4. **Vintage parts data:** move `vintage-parts.json` from `fitzgeraldrei2021-ctrl/fitzgerald-classics-data` into this repo's `content/` so everything is edited the same way? That's my recommendation. Or should the site keep reading his GitHub file?
5. **Amazon product images:** keep the 31 uploaded copies as they are, or switch to SiteStripe image links (policy-compliant)? And should the 8 hotlinked part photos be replaced or kept?
6. **Royal Plating logo:** it's currently a generic gear icon. Keep, replace with their real logo, or show the name only?
7. **Uncategorized posts:** the 9 newest posts have no category. Leave them that way, or should I suggest categories (e.g. Paint Prep → Interior & Finishing)?
8. **Blog listing:** the live `/blog` shows only 6 posts. I plan to show all posts (newest first). OK?

---

## Appendix A: Every image

Wix originals are at `https://static.wixstatic.com/media/<id>` (resize parameters stripped). "Size" is the original's pixel size. Template leftovers marked "DROP" won't be migrated.

| # | Proposed file in `/public/images/` | Original (highest-res) URL | Size (px) | Used on | Origin / notes |
|---|---|---|---|---|---|
| 1 | about-dan-fitzgerald-workshop.png | https://static.wixstatic.com/media/b5fa70_a87c06e5a7cb4d25a6f6933d0aceb8fd~mv2.png | 1084×1451 | /about-us | Portrait of Dan, stylized/AI-enhanced look (owner upload) |
| 2 | about-wood-steering-wheel.jpg | https://static.wixstatic.com/media/b5fa70_80b29c3c58754fab8f4e509419113784~mv2.jpg | 1536×2048 | /about-us | AI-generated look (owner upload) |
| 3 | author-dan-fitzgerald-avatar.jpg | https://lh3.googleusercontent.com/a/ACg8ocK5a46jyaOz8hXDsdDGcBgqv5Uem_MfjbpO9W3I_qwhGil9aQ%3Ds96-c | ? | /blog; /blog/categories/buying-ownership; /blog/categories/electrical-instruments; /blog/categories/engines-mechanical; /blog/categories/int… | Google account avatar (blog author) |
| 4 | blog-10-tools-every-classic-car-owner-should-have.png | https://static.wixstatic.com/media/b5fa70_16fb2f5839194a47bb2594a05cdd5f43~mv2.png | 1536×1024 | /blog; /post/10-tools-every-classic-car-owner-should-have; /post/10-tools-every-classic-car-owner-should-have (cover); /post/10-tools-every-… | AI-generated look (owner upload) |
| 5 | blog-bench-testing-classic-car-electrical-components-without-dest.png | https://static.wixstatic.com/media/b5fa70_550806b5589044cb860e117d3682c075~mv2.png | 1536×1024 | /blog; /blog/categories/electrical-instruments; /blog/categories/tools-shop; /post/bench-testing-classic-car-electrical-components-without-d… | AI-generated look (owner upload) |
| 6 | blog-buying-your-first-classic-car.png | https://static.wixstatic.com/media/b5fa70_2c928163aba94e6ebc3da742535962fc~mv2.png | 1536×1024 | /blog; /blog/categories/buying-ownership; /post/buying-your-first-classic-car; /post/buying-your-first-classic-car (cover); /post/buying-you… | AI-generated look (owner upload) |
| 7 | blog-buying-your-first-corvette.jpg | https://static.wixstatic.com/media/b5fa70_e1edc8a737f9499e840e8d7e6d9ea2da~mv2.jpg | 1536×1024 | /blog; /blog/categories/buying-ownership; /post/buying-your-first-classic-car; /post/buying-your-first-corvette; /post/buying-your-first-cor… | AI-generated look (owner upload) |
| 8 | blog-classic-car-body-panel-alignment.jpg | https://static.wixstatic.com/media/b5fa70_9786bbdbbb134eef8494066d7e0ab70a~mv2.jpg | 1536×1024 | /blog; /post/classic-car-body-panel-alignment; /post/classic-car-body-panel-alignment (cover); /post/classic-car-body-panel-alignment [og:im… | AI-generated look (owner upload) |
| 9 | blog-classic-car-documentation-ncrs.jpg | https://static.wixstatic.com/media/b5fa70_ee53399489b74d36b94ae6524ee6e041~mv2.jpg | 1536×1024 | /blog; /post/10-tools-every-classic-car-owner-should-have; /post/7-electrical-tools-every-classic-car-owner-should-have; /post/classic-car-b… | AI-generated look (owner upload) |
| 10 | blog-classic-car-electrical-troubleshooting.jpg | https://static.wixstatic.com/media/b5fa70_a886d70b624047138b45c524e042e76f~mv2.jpg | 1536×1024 | /blog; /post/7-electrical-tools-every-classic-car-owner-should-have; /post/7-electrical-tools-every-classic-car-owner-should-have (cover); /… | AI-generated look (owner upload) |
| 11 | blog-classic-car-paint-preparation.jpg | https://static.wixstatic.com/media/b5fa70_85caa0fd090c49879ff62365084e4b59~mv2.jpg | 1536×1024 | /blog; /post/10-tools-every-classic-car-owner-should-have; /post/7-electrical-tools-every-classic-car-owner-should-have; /post/classic-car-b… | AI-generated look (owner upload) |
| 12 | blog-dash-restoration-where-a-classic-car-comes-back-to-life.png | https://static.wixstatic.com/media/b5fa70_4b571a952c7a464aa3f5f90cec71bee0~mv2.png | 1536×1024 | /blog; /blog/categories/interior-finishing; /post/dash-restoration-where-a-classic-car-comes-back-to-life; /post/dash-restoration-where-a-cl… | AI-generated look (owner upload) |
| 13 | blog-engine-paint-correctness.png | https://static.wixstatic.com/media/b5fa70_af9c1e7143364a08a716f1e4e3f42163~mv2.png | 1536×1024 | /blog; /blog/categories/engines-mechanical; /blog/categories/interior-finishing; /post/dash-restoration-where-a-classic-car-comes-back-to-li… | AI-generated look (owner upload) |
| 14 | blog-gauge-restoration-repair-recalibrate-or-replace.png | https://static.wixstatic.com/media/b5fa70_c2635ee221d94ce59be6aa504b7afd98~mv2.png | 1536×1024 | /blog; /blog/categories/electrical-instruments; /blog/categories/interior-finishing; /post/bench-testing-classic-car-electrical-components-w… | AI-generated look (owner upload) |
| 15 | blog-hands-on-tool-reviews-restoration-garage.jpg | https://static.wixstatic.com/media/b5fa70_290200943be6488a9cb096725863ce18~mv2.jpg | 1536×1024 | /blog; /post/10-tools-every-classic-car-owner-should-have; /post/7-electrical-tools-every-classic-car-owner-should-have; /post/classic-car-b… | AI-generated look (owner upload) |
| 16 | blog-how-to-build-a-classic-car-restoration-budget-that-actually.png | https://static.wixstatic.com/media/b5fa70_7684fe290ca24813930e974e7504799a~mv2.png | 1536×1024 | /blog; /blog/categories/restoration-planning; /post/how-to-build-a-classic-car-restoration-budget-that-actually-works; /post/how-to-build-a-… | AI-generated look (owner upload) |
| 17 | blog-restoration-philosophy-preserve-classic-car.jpg | https://static.wixstatic.com/media/b5fa70_563af2b354e6493aad91aaae15301e32~mv2.jpg | 1536×1024 | /blog; /post/classic-car-documentation-ncrs; /post/classic-car-paint-preparation; /post/five-restoration-habits-that-save-time-money-and-ori… | AI-generated look (owner upload) |
| 18 | blog-restore-it-or-replace-it.png | https://static.wixstatic.com/media/b5fa70_4bd257a82d58493a966b01e657275f1c~mv2.png | 1536×1024 | /blog; /blog/categories/restoration-planning; /post/how-to-build-a-classic-car-restoration-budget-that-actually-works; /post/restore-it-or-r… | AI-generated look (owner upload) |
| 19 | blog-the-value-of-good-tools-why-the-right-equipment-saves-time-m.png | https://static.wixstatic.com/media/b5fa70_080271d939eb4d8484adaa13ef1c7595~mv2.png | 1672×941 | /blog; /blog/categories/tools-shop; /post/bench-testing-classic-car-electrical-components-without-destroying-them; /post/the-value-of-good-t… | AI-generated look (owner upload) |
| 20 | blog-when-a-1957-positive-ground-car-meets-a-modern-negative-grou.png | https://static.wixstatic.com/media/b5fa70_195ec909cf1740d088e7187a3abc2fa3~mv2.png | 1536×1024 | /blog; /blog/categories/electrical-instruments; /post/bench-testing-classic-car-electrical-components-without-destroying-them; /post/when-a-… | AI-generated look (owner upload) |
| 21 | garage-hero-vintage-toolboxes.jpg | https://static.wixstatic.com/media/b5fa70_20746d3ba9c9470eb9c51036ddc014be~mv2.jpg | 2048×896 | /fitzgerald-classics-garage | AI-generated look (owner upload) |
| 22 | garage-product-303-aerospace-protectant.jpg | https://static.wixstatic.com/media/b5fa70_5847d9be820a488c9c6885ffa0cd2a1d~mv2.jpg | 1500×1500 | /fitzgerald-classics-garage (product: 303 Aerospace Protectant) | Product photo (owner upload; likely copied from Amazon/manufacturer — licensing risk) |
| 23 | garage-product-3m-performance-yellow-masking-tape-301.jpg | https://static.wixstatic.com/media/b5fa70_b22b2c1ba0c94480bb8b2942873edea4~mv2.jpg | 750×750 | /fitzgerald-classics-garage (product: 3M Performance Yellow Masking Tape 301+) | Product photo (owner upload; likely copied from Amazon/manufacturer — licensing risk) |
| 24 | garage-product-3m-scotch-brite-7447-general-purpose-hand-pads.jpg | https://static.wixstatic.com/media/b5fa70_80bc73dd1de3423fa88ecfa08f95ebe5~mv2.jpg | 1180×1200 | /fitzgerald-classics-garage (product: 3M Scotch-Brite 7447 General Purpose Hand Pads) | Product photo (owner upload; likely copied from Amazon/manufacturer — licensing risk) |
| 25 | garage-product-automotive-dry-guide-coat-kit.jpg | https://static.wixstatic.com/media/b5fa70_495a9698f96046e0b94dce8faecf09d1~mv2.jpg | 500×500 | /fitzgerald-classics-garage (product: Automotive Dry Guide Coat Kit) | Product photo (owner upload; likely copied from Amazon/manufacturer — licensing risk) |
| 26 | garage-product-automotive-paint-preparation-tack-cloths.jpg | https://static.wixstatic.com/media/b5fa70_b3190078467748b9a252367ae538953a~mv2.jpg | 532×532 | /fitzgerald-classics-garage (product: Automotive Paint Preparation Tack Cloths) | Product photo (owner upload; likely copied from Amazon/manufacturer — licensing risk) |
| 27 | garage-product-automotive-trim-removal-tool-kit.jpg | https://static.wixstatic.com/media/b5fa70_d077ce1961ae4389b91e19bd4823fa03~mv2.jpg | 1459×1448 | /fitzgerald-classics-garage (product: Automotive Trim Removal Tool Kit) | Product photo (owner upload; likely copied from Amazon/manufacturer — licensing risk) |
| 28 | garage-product-battery-tender-3a-battery-charger-maintainer.jpg | https://static.wixstatic.com/media/b5fa70_203b4c3ae4004a28b2dfdd00657120e8~mv2.jpg | 1920×1440 | /fitzgerald-classics-garage (product: Battery Tender 3A Battery Charger & Maintainer) | Product photo (owner upload; likely copied from Amazon/manufacturer — licensing risk) |
| 29 | garage-product-custom-shop-complete-paint-mixing-kit-kus-dmk.jpg | https://static.wixstatic.com/media/b5fa70_b44f755064024f3c9530d05968b5413a~mv2.jpg | 416×416 | /fitzgerald-classics-garage (product: Custom Shop Complete Paint Mixing Kit - KUS DMK) | Product photo (owner upload; likely copied from Amazon/manufacturer — licensing risk) |
| 30 | garage-product-dewalt-atomic-dcf921b-20v-max-1-2-inch-impact-wrench.jpg | https://static.wixstatic.com/media/b5fa70_21a9b909bbe14d78b3508447d29f5d87~mv2.jpg | 500×500 | /fitzgerald-classics-garage (product: DEWALT ATOMIC DCF921B 20V MAX 1/2-Inch Impact Wrench) | Product photo (owner upload; likely copied from Amazon/manufacturer — licensing risk) |
| 31 | garage-product-flexible-automotive-sanding-block-set.png | https://static.wixstatic.com/media/b5fa70_41e12d3af68b4194ac99492dd98d597d~mv2.png | 1600×1200 | /fitzgerald-classics-garage (product: Flexible Automotive Sanding Block Set) | Product photo (owner upload; likely copied from Amazon/manufacturer — licensing risk) |
| 32 | garage-product-fluke-117-true-rms-digital-multimeter.jpg | https://static.wixstatic.com/media/b5fa70_f558572fda504d6da28d0d69d625bb25~mv2.jpg | 477×856 | /fitzgerald-classics-garage (product: Fluke 117 True-RMS Digital Multimeter) | Product photo (owner upload; likely copied from Amazon/manufacturer — licensing risk) |
| 33 | garage-product-gearwrench-24-inch-1-2-inch-drive-breaker-bar.jpg | https://static.wixstatic.com/media/b5fa70_da085457cf644419896af5543ed00daf~mv2.jpg | 1600×1600 | /fitzgerald-classics-garage (product: GEARWRENCH 24-Inch 1/2-Inch Drive Breaker Bar) | Product photo (owner upload; likely copied from Amazon/manufacturer — licensing risk) |
| 34 | garage-product-gearwrench-85077-1-2-inch-electronic-torque-wrench.jpg | https://www.gearwrench.com/sites/gearwrench/files/styles/product_medium/public/pim_images/GW_85077_IMG_ANG_01.jpg?itok=Rm0rWKmC | 720×720 | /fitzgerald-classics-garage (product: GEARWRENCH 85077 1/2-Inch Electronic Torque Wrench) | Product photo hotlinked from manufacturer site |
| 35 | garage-product-griot-s-garage-pfm-edgeless-detailing-towels.png | https://static.wixstatic.com/media/b5fa70_eeb1342ab3d64980ada2808a0d6b6847~mv2.png | 499×500 | /fitzgerald-classics-garage (product: Griot's Garage PFM Edgeless Detailing Towels) | Product photo (owner upload; likely copied from Amazon/manufacturer — licensing risk) |
| 36 | garage-product-griot-s-garage-pfm-terry-weave-drying-towel.jpg | https://static.wixstatic.com/media/b5fa70_42ba657a2cbc47d8ac2fe95e61968de8~mv2.jpg | 1500×1500 | /fitzgerald-classics-garage (product: Griot's Garage PFM Terry Weave Drying Towel) | Product photo (owner upload; likely copied from Amazon/manufacturer — licensing risk) |
| 37 | garage-product-heat-shrink-electrical-connector-assortment.jpg | https://static.wixstatic.com/media/b5fa70_b217e633d4f94ee1bc8fa4f05c3381fd~mv2.jpg | 3000×3000 | /fitzgerald-classics-garage (product: Heat-Shrink Electrical Connector Assortment) | Product photo (owner upload; likely copied from Amazon/manufacturer — licensing risk) |
| 38 | garage-product-klein-tools-11055-wire-stripper-cutter.png | https://data.kleintools.com/sites/all/product_assets/png/klein/11055ep.png | 1000×1000 | /fitzgerald-classics-garage (product: Klein Tools 11055 Wire Stripper/Cutter) | Product photo hotlinked from manufacturer site |
| 39 | garage-product-klein-tools-3005cr-ratcheting-crimper.png | https://static.wixstatic.com/media/b5fa70_bc23420285584c53b7a13966e047ee58~mv2.png | 1500×1200 | /fitzgerald-classics-garage (product: Klein Tools 3005CR Ratcheting Crimper) | Product photo (owner upload; likely copied from Amazon/manufacturer — licensing risk) |
| 40 | garage-product-lisle-28800-digital-test-light.jpg | https://static.wixstatic.com/media/b5fa70_b1664891a9f04593a62622dafb03c7c4~mv2.jpg | 3000×2100 | /fitzgerald-classics-garage (product: Lisle 28800 Digital Test Light) | Product photo (owner upload; likely copied from Amazon/manufacturer — licensing risk) |
| 41 | garage-product-lisle-63600-oil-filter-tool.png | https://static.wixstatic.com/media/b5fa70_d907f9c272a54cf5af87bf653816b04b~mv2.png | 1200×1200 | /fitzgerald-classics-garage (product: Lisle 63600 Oil Filter Tool) | Product photo (owner upload; likely copied from Amazon/manufacturer — licensing risk) |
| 42 | garage-product-magnetic-parts-tray-set.jpg | https://static.wixstatic.com/media/b5fa70_93fa7258ccd549ce94aced7c1f2f4caf~mv2.jpg | 1280×662 | /fitzgerald-classics-garage (product: Magnetic Parts Tray Set) | Product photo (owner upload; likely copied from Amazon/manufacturer — licensing risk) |
| 43 | garage-product-mayhew-pro-brass-drift-punch-set.jpg | https://static.wixstatic.com/media/b5fa70_b8b03d25635c440e9c4610fbed05597f~mv2.jpg | 536×536 | /fitzgerald-classics-garage (product: Mayhew Pro Brass Drift Punch Set) | Product photo (owner upload; likely copied from Amazon/manufacturer — licensing risk) |
| 44 | garage-product-meguiar-s-smooth-surface-clay-kit-g191700.png | https://static.wixstatic.com/media/b5fa70_655b48d59e6c48398345eca53d185c0c~mv2.png | 650×650 | /fitzgerald-classics-garage (product: Meguiar's Smooth Surface Clay Kit G191700) | Product photo (owner upload; likely copied from Amazon/manufacturer — licensing risk) |
| 45 | garage-product-meguiar-s-ultimate-compound-g17216.webp | https://static.wixstatic.com/media/b5fa70_fa03846b0f1a4113b61a55cd93f330b7~mv2.webp | 512×512 | /fitzgerald-classics-garage (product: Meguiar's Ultimate Compound G17216) | Product photo (owner upload; likely copied from Amazon/manufacturer — licensing risk) |
| 46 | garage-product-mityvac-mv8000-automotive-test-bleeding-kit.jpg | https://static.wixstatic.com/media/b5fa70_797782359eb041ed85400ef5e93887ea~mv2.jpg | 1800×1880 | /fitzgerald-classics-garage (product: Mityvac MV8000 Automotive Test & Bleeding Kit) | Product photo (owner upload; likely copied from Amazon/manufacturer — licensing risk) |
| 47 | garage-product-noco-boost-plus-gb40-jump-starter.webp | https://static.wixstatic.com/media/b5fa70_561393255d8a417d9b310f6ffa279358~mv2.webp | 1800×1800 | /fitzgerald-classics-garage (product: NOCO Boost Plus GB40 Jump Starter) | Product photo (owner upload; likely copied from Amazon/manufacturer — licensing risk) |
| 48 | garage-product-noco-genius1-smart-battery-charger-maintainer.jpg | https://static.wixstatic.com/media/b5fa70_83b95d0f638a43cf9ce3f79a72edff62~mv2.jpg | 1280×1301 | /fitzgerald-classics-garage (product: NOCO GENIUS1 Smart Battery Charger & Maintainer) | Product photo (owner upload; likely copied from Amazon/manufacturer — licensing risk) |
| 49 | garage-product-noco-genius5-5a-smart-battery-charger-maintainer.jpg | https://static.wixstatic.com/media/b5fa70_41478a8f2a9f40029bd6571305ffd444~mv2.jpg | 1500×1324 | /fitzgerald-classics-garage (product: NOCO GENIUS5 5A Smart Battery Charger & Maintainer) | Product photo (owner upload; likely copied from Amazon/manufacturer — licensing risk) |
| 50 | garage-product-otc-5610-transmission-engine-oil-pressure-kit.jpg | https://static.wixstatic.com/media/b5fa70_1e635589fe194f3bb4e298f0a98c243a~mv2.jpg | 928×1015 | /fitzgerald-classics-garage (product: OTC 5610 Transmission/Engine Oil Pressure Kit) | Product photo (owner upload; likely copied from Amazon/manufacturer — licensing risk) |
| 51 | garage-product-power-probe-iii-circuit-tester.jpg | https://static.wixstatic.com/media/b5fa70_d915e3bef71342989018012f40a1b26b~mv2.jpg | 1500×1206 | /fitzgerald-classics-garage (product: Power Probe III Circuit Tester) | Product photo (owner upload; likely copied from Amazon/manufacturer — licensing risk) |
| 52 | garage-product-rechargeable-magnetic-led-work-light.jpg | https://static.wixstatic.com/media/b5fa70_c728b1d742764a61a7c2c692e9732790~mv2.jpg | 470×470 | /fitzgerald-classics-garage (product: Rechargeable Magnetic LED Work Light) | Product photo (owner upload; likely copied from Amazon/manufacturer — licensing risk) |
| 53 | garage-product-sunex-1848-3-8-inch-drive-master-impact-socket-set.jpg | https://static.wixstatic.com/media/b5fa70_5f18a4a6f2af4c5b8d41ee29de85a0ce~mv2.jpg | 1200×1200 | /fitzgerald-classics-garage (product: Sunex 1848 3/8-Inch Drive Master Impact Socket Set) | Product photo (owner upload; likely copied from Amazon/manufacturer — licensing risk) |
| 54 | garage-product-telescoping-magnetic-pickup-tool.jpg | https://static.wixstatic.com/media/b5fa70_cd711d48a1704bd88770eadbdb9cda08~mv2.jpg | 524×524 | /fitzgerald-classics-garage (product: Telescoping Magnetic Pickup Tool) | Product photo (owner upload; likely copied from Amazon/manufacturer — licensing risk) |
| 55 | home-hero-1966-corvette-garage.png | https://static.wixstatic.com/media/b5fa70_eb2d724ab809481dae7d18217402f6dc~mv2.png | 1678×937 | / | AI-generated look (owner upload) |
| 56 | logo-fitzgerald-classics-route-66.webp | https://static.wixstatic.com/media/b5fa70_2dbe98366738478597606747140a3d66~mv2.webp | 1536×1024 | /blog; /ebay-ecommerce; /fitzgerald-classics-garage; /portfolio; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /vintag… | Logo (owner upload) — keep |
| 57 | partner-logo-al-knoch-interiors.png | https://static.wixstatic.com/media/b5fa70_4e43652fbfd044c3b5f7bcbef3a16413~mv2.png | 400×103 | /trusted-partners | Partner logo (partner trademark) — only 400px wide |
| 58 | partner-logo-corvette-central.png | https://static.wixstatic.com/media/b5fa70_e45b9deec6a84d3188195d2f367ce423~mv2.png | 2091×752 | /trusted-partners | Partner logo (partner trademark) |
| 59 | partner-logo-metropolitan-pit-stop.png | https://static.wixstatic.com/media/b5fa70_a334d871e4724a12bf9e5e7dfe3bcbb9~mv2.png | 750×179 | /trusted-partners | Partner logo (partner trademark) |
| 60 | partner-logo-royal-plating.png | https://static.wixstatic.com/media/b5fa70_0fb4349ab29b40aaab571151dc64cfda~mv2.png | 1600×1600 | /trusted-partners | Generic gear icon, NOT Royal Plating's real logo — replace |
| 61 | partner-logo-top-flight-automotive.png | https://static.wixstatic.com/media/b5fa70_9ddd6acd4a37490cb1b8deca13049f8e~mv2.png | 1945×808 | /trusted-partners | Partner logo (partner trademark) |
| 62 | partner-logo-zip-corvette.png | https://static.wixstatic.com/media/b5fa70_60f24340ca2849609c4e2f1514f2b4a5~mv2.png | 1618×971 | /trusted-partners | Partner logo (partner trademark) |
| 63 | parts-1956-62-nash-metropolitan-oem-exterior-door-panel-trim-set.jpg | https://static.wixstatic.com/media/b5fa70_3cb13508c41649e0b28261d02392c2df~mv2.jpg | 1000×1000 | /vintage-hard-to-find-parts (part: 1956–62 Nash Metropolitan OEM Exterior Door Panel Trim Set) | Part photo (owner upload) |
| 64 | parts-1963-64-ford-galaxie-500-oem-heater-control-assembly.jpg | https://static.wixstatic.com/media/b5fa70_6885c825f1b543ca963b978ebc48f3ec~mv2.jpg | 1600×1200 | /vintage-hard-to-find-parts (part: 1963–64 Ford Galaxie 500 OEM Heater Control Assembly) | Part photo (owner upload) |
| 65 | parts-1963-65-corvette-nos-gm-rear-deck-emblem-3797414.webp | https://static.wixstatic.com/media/b5fa70_4d58ed5769254c31b59f6b4a238e6642~mv2.webp | 1600×1066 | /vintage-hard-to-find-parts (part: 1963–65 Corvette NOS GM Rear Deck Emblem #3797414) | Part photo (owner upload) |
| 66 | parts-1963-67-chevrolet-corvette-oem-fuel-door-emblem.jpg | https://cdn11.bigcommerce.com/s-k7t0gh8c4f/images/stencil/2000x2000/products/101572/1742/5016-0__23181.1654787337.JPG?c=1 | 1100×1100 | /vintage-hard-to-find-parts (part: 1963–67 Chevrolet Corvette OEM Fuel Door Emblem) | Hotlinked from third-party seller site — fragile + copyright risk |
| 67 | parts-1963-ford-galaxie-500-oem-tail-light-lens-nos-listing.jpg | https://static.wixstatic.com/media/b5fa70_a5c62adbbe7949bbae5f3b814760efc8~mv2.jpg | 2500×1875 | /vintage-hard-to-find-parts (part: 1963 Ford Galaxie 500 OEM Tail Light Lens — NOS Listing) | Part photo (owner upload) |
| 68 | parts-1964-65-oldsmobile-cutlass-442-f85-oem-dash-bezel.jpg | https://www.thepartsplaceinc.com/images/productphotos/_9684_IN3409T.jpg | 600×600 | /vintage-hard-to-find-parts (part: 1964–65 Oldsmobile Cutlass / 442 / F85 OEM Dash Bezel) | Hotlinked from third-party seller site — fragile + copyright risk |
| 69 | parts-1964-65-pontiac-gto-lemans-oem-lower-dash-trim-bezel.jpg | https://images.classicbodyparts.com/2025/12/IN12664G_main-01.jpg | 1000×1000 | /vintage-hard-to-find-parts (part: 1964–65 Pontiac GTO / LeMans OEM Lower Dash Trim Bezel) | Hotlinked from third-party seller site — fragile + copyright risk |
| 70 | parts-1964-66-ford-mustang-oem-radio-face-plate.jpg | https://cdn11.bigcommerce.com/s-40yxrxspnl/images/stencil/original/products/311869/11719263/cad-cam-ms-usa-740-f3ed2b8153a7d3418e101c76d197aaaf57fc63fd__52577.1772227630.jpg | 1000×1000 | /vintage-hard-to-find-parts (part: 1964–66 Ford Mustang OEM Radio Face Plate) | Hotlinked from third-party seller site — fragile + copyright risk |
| 71 | parts-1965-chevrolet-chevelle-oem-analog-clock.jpg | https://www.ss396.com/graphics/00000001/3863459.jpg | 720×720 | /vintage-hard-to-find-parts (part: 1965 Chevrolet Chevelle OEM Analog Clock) | Hotlinked from third-party seller site — fragile + copyright risk |
| 72 | parts-1965-ford-galaxie-nos-oem-hood-emblem-o-c5az-15505-f.webp | https://static.wixstatic.com/media/b5fa70_7d0518c24a4f422797a85a7448102b2e~mv2.webp | 1600×1200 | /vintage-hard-to-find-parts (part: 1965 Ford Galaxie NOS OEM Hood Emblem “O” C5AZ-15505-F) | Part photo (owner upload) |
| 73 | parts-1966-c2-corvette-delco-am-fm-radio-w-control-knobs-for-parts.jpg | https://static.wixstatic.com/media/b5fa70_0ef4c2bd01544a30aeff10b8dbf54922~mv2.jpg | 1200×1600 | /vintage-hard-to-find-parts (part: 1966 C2 Corvette Delco AM/FM Radio w/ Control Knobs — For Parts/Repair) | Part photo (owner upload) |
| 74 | parts-1966-corvette-crossed-flags-nose-emblem-3872929-original-gm.webp | https://static.wixstatic.com/media/b5fa70_82077c9f87284092b8a6dd31accc053d~mv2.webp | 140×140 | /vintage-hard-to-find-parts (part: 1966 Corvette Crossed Flags Nose Emblem 3872929 — Original GM) | Part photo (owner upload) |
| 75 | parts-1967-68-ford-mustang-steering-wheel-3-spoke-center-with-horn.webp | https://static.wixstatic.com/media/b5fa70_21e80f93283e4ae6923308c68020aa5f~mv2.webp | 1443×1105 | /how-to-videos/1971-gto-ragged-out-to-restored-episode-3; /how-to-videos/1971-pontiac-gto-ragged-out-to-restored-gto455pontiacgto; /how-to-v… | Part photo (owner upload) |
| 76 | parts-1967-72-chevrolet-gmc-c10-oem-instrument-cluster-bezel.jpg | https://i.ebayimg.com/images/g/MkwAAOSwyhNjUsKj/s-l1200.jpg | 1000×1000 | /vintage-hard-to-find-parts (part: 1967–72 Chevrolet / GMC C10 OEM Instrument Cluster Bezel) | Hotlinked from third-party seller site — fragile + copyright risk |
| 77 | parts-1967-camaro-center-dash-ashtray.jpg | https://www.luttyschevy.com/images/F145051829.jpg | 800×467 | /vintage-hard-to-find-parts (part: 1967 Camaro Center Dash Ashtray) | Hotlinked from third-party seller site — fragile + copyright risk |
| 78 | parts-1969-dodge-charger-right-side-tail-light-assembly.jpg | https://i.ebayimg.com/images/g/c2cAAOSw8qxnrJq9/s-l2400.jpg | 1600×707 | /vintage-hard-to-find-parts (part: 1969 Dodge Charger Right-Side Tail Light Assembly) | Hotlinked from third-party seller site — fragile + copyright risk |
| 79 | parts-hero-vintage-parts-shelf.png | https://static.wixstatic.com/media/b5fa70_6ff0f31718b94cb1afc558f9a4309d18~mv2.png | 2070×760 | /vintage-hard-to-find-parts | AI-generated look (owner upload) |
| 80 | parts-late-model-nash-metropolitan-grille-used-original.jpg | https://static.wixstatic.com/media/b5fa70_b8624ab88f024a5a9894c15ed490f443~mv2.jpg | 500×500 | /vintage-hard-to-find-parts (part: Late-Model Nash Metropolitan Grille — Used Original) | Part photo (owner upload) |
| 81 | parts-nash-metropolitan-front-turn-signal-parking-light-glass-lens.webp | https://static.wixstatic.com/media/b5fa70_aad1d4e2a0ae4f5ca897dc5bbe07fd7b~mv2.webp | 1497×1015 | /vintage-hard-to-find-parts (part: Nash Metropolitan Front Turn Signal / Parking Light Glass Lens & Bezel Set — OEM) | Part photo (owner upload) |
| 82 | portfolio-1966-corvette-cover.jpg | https://static.wixstatic.com/media/b5fa70_f0ed0edf9c2e4fd8adfb395c33be41c9~mv2.jpg | 1536×1152 | /portfolio; /portfolio (cover: 1966 Corvette Convertible — Updates Coming Soon); /portfolio-collections/portfolio; /portfolio-collections/po… | Own photo (owner upload) |
| 83 | portfolio-galaxie-01-the-starting-point-for-sale.jpg | https://static.wixstatic.com/media/b5fa70_dc2ad70d3e024e66acf77a2f2c0a9b28~mv2.jpeg | 1152×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (IMG_1343(1).jpeg) |
| 84 | portfolio-galaxie-02-original-profile.jpg | https://static.wixstatic.com/media/b5fa70_0f50a098373f4b51a479b6ab787cfb2c~mv2.jpeg | 1152×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (IMG_1344(1).jpeg) |
| 85 | portfolio-galaxie-03-original-front-end.jpg | https://static.wixstatic.com/media/b5fa70_acb0bf2c4971499ebd6784922a8a1db7~mv2.jpeg | 1152×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (IMG_1585(1).jpeg) |
| 86 | portfolio-galaxie-04-original-galaxie-500-trim.jpg | https://static.wixstatic.com/media/b5fa70_314184079806412c98ec2071342a4ab3~mv2.jpeg | 1152×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (IMG_1592.jpeg) |
| 87 | portfolio-galaxie-05-original-interior.jpg | https://static.wixstatic.com/media/b5fa70_9e003d5fd9dc4bdd8960770ec01eca82~mv2.jpeg | 1152×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (IMG_1347(1).jpeg) |
| 88 | portfolio-galaxie-06-interior-wear-before-restoration.jpg | https://static.wixstatic.com/media/b5fa70_7e1811e2fe004b98b8b26386afa45a84~mv2.jpeg | 1152×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (IMG_2161(1).jpeg) |
| 89 | portfolio-galaxie-07-original-engine-bay.jpg | https://static.wixstatic.com/media/b5fa70_b92c77e746aa485db31e579c589f1073~mv2.jpeg | 1152×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (IMG_1587.jpeg) |
| 90 | portfolio-galaxie-08-underhood-condition.jpg | https://static.wixstatic.com/media/b5fa70_39c0ee620dce4e87afa2c701ac50363f~mv2.jpeg | 1152×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (IMG_2033.jpeg) |
| 91 | portfolio-galaxie-09-mechanical-work-begins.jpg | https://static.wixstatic.com/media/b5fa70_e82b341036054129bd68a7365fe3902c~mv2.jpeg | 1536×1024 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (3F8A0523.jpeg) |
| 92 | portfolio-galaxie-10-engine-tear-down-and-service.jpg | https://static.wixstatic.com/media/b5fa70_a031f36315444bbda13a11ce3f023fa2~mv2.jpeg | 1536×1024 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (3F8A0537.jpeg) |
| 93 | portfolio-galaxie-11-engine-out-bay-ready.jpg | https://static.wixstatic.com/media/b5fa70_89249743e2e249e48b7f6b6849b65fda~mv2.jpeg | 1152×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (IMG_2346(1).jpeg) |
| 94 | portfolio-galaxie-12-289-rebuild-fresh-block.jpg | https://static.wixstatic.com/media/b5fa70_8c1aec3d5f154931b212cbacbe3a46c8~mv2.jpeg | 1152×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (IMG_2553(1).jpeg) |
| 95 | portfolio-galaxie-13-new-pistons-installed.jpg | https://static.wixstatic.com/media/b5fa70_4bf5fccbece847dd944e106f567a1a19~mv2.jpeg | 1152×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (IMG_2554(1).jpeg) |
| 96 | portfolio-galaxie-14-cylinder-head-rebuilt.jpg | https://static.wixstatic.com/media/b5fa70_fe1d161357ad4247a21229316fe0797d~mv2.jpeg | 1152×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (IMG_2556(1).jpeg) |
| 97 | portfolio-galaxie-15-cylinder-head-finished-surface.jpg | https://static.wixstatic.com/media/b5fa70_0c10d2c47a4142498f4f30705a213801~mv2.jpeg | 1152×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (IMG_2557.jpeg) |
| 98 | portfolio-galaxie-16-289-v8-reassembled.jpg | https://static.wixstatic.com/media/b5fa70_3b28266c541b489392b9bebd7e97d387~mv2.jpeg | 1152×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (IMG_0255(1).jpeg) |
| 99 | portfolio-galaxie-17-289-powered-by-ford.jpg | https://static.wixstatic.com/media/b5fa70_7d1109ae89a6475688bf3770c98ff5cf~mv2.jpeg | 1152×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (IMG_0259(1).jpeg) |
| 100 | portfolio-galaxie-18-engine-ready-for-installation.jpg | https://static.wixstatic.com/media/b5fa70_294e74e9608943d2a851edf97ed3cf14~mv2.jpeg | 892×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (IMG_2597(1).jpeg) |
| 101 | portfolio-galaxie-19-final-engine-detail.jpg | https://static.wixstatic.com/media/b5fa70_3f2321a149d74e42bc1b0e6529c8c981~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (IMG_2600(1).jpeg) |
| 102 | portfolio-galaxie-20-brightwork-restored.jpg | https://static.wixstatic.com/media/b5fa70_0e77a48bba714bedb9f6851186ca4596~mv2.jpeg | 1152×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (IMG_0263(1).jpeg) |
| 103 | portfolio-galaxie-21-rear-panel-final-bodywork.jpg | https://static.wixstatic.com/media/b5fa70_93ea5162679f410e8f5a6d5fa7a5318a~mv2.jpg | 1536×1152 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration - Paint and Reassembly.jpg) |
| 104 | portfolio-galaxie-22-color-goes-on.jpg | https://static.wixstatic.com/media/b5fa70_9c5fb65c397d4d3a9f239f7ac7c582e7~mv2.jpg | 1536×1152 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration - Paint and Reassembly.jpg) |
| 105 | portfolio-galaxie-23-fresh-from-the-booth.jpg | https://static.wixstatic.com/media/b5fa70_abd8daad89f140d2aa723dab7b92d70c~mv2.jpg | 1536×1152 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration - Paint and Reassembly.jpg) |
| 106 | portfolio-galaxie-24-trunk-lid-finished-inside-and-out.jpg | https://static.wixstatic.com/media/b5fa70_74f2e32bc2cd4133a1557f5cd964cf32~mv2.jpg | 1536×1152 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration - Paint and Reassembly.jpg) |
| 107 | portfolio-galaxie-25-rear-body-in-fresh-paint.jpg | https://static.wixstatic.com/media/b5fa70_6f517aef02b242fbb61b719c86bb95dd~mv2.jpg | 1152×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration - Paint and Reassembly.jpg) |
| 108 | portfolio-galaxie-26-paint-finish-final-inspection.jpg | https://static.wixstatic.com/media/b5fa70_2361e924346644399dbd468332625171~mv2.jpg | 1152×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration - Paint and Reassembly.jpg) |
| 109 | portfolio-galaxie-27-tail-lamp-and-quarter-trim-return.jpg | https://static.wixstatic.com/media/b5fa70_9fca77c9733b4630a5c9962afc2a0afd~mv2.jpg | 1536×1152 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration - Paint and Reassembly.jpg) |
| 110 | portfolio-galaxie-28-chrome-reassembly.jpg | https://static.wixstatic.com/media/b5fa70_5eeba833c7b74a0cb5cc95328b8727d6~mv2.jpg | 1536×1152 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration - Paint and Reassembly.jpg) |
| 111 | portfolio-galaxie-29-galaxie-500-details-return.jpg | https://static.wixstatic.com/media/b5fa70_c77339341d8145abbd2eedfb06a76a72~mv2.jpg | 1536×1152 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration - Paint and Reassembly.jpg) |
| 112 | portfolio-galaxie-30-rebuilt-289-back-home.jpg | https://static.wixstatic.com/media/b5fa70_dd63b23ae2f54daab67966838f9b696f~mv2.jpg | 1152×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration - Paint and Reassembly.jpg) |
| 113 | portfolio-galaxie-31-reassembly-begins.jpg | https://static.wixstatic.com/media/b5fa70_982bc1b857c5475aba9b0097d1630584~mv2.jpg | 1536×1152 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 114 | portfolio-galaxie-32-fresh-paint-bare-details.jpg | https://static.wixstatic.com/media/b5fa70_0bd12ae000844864a5c13f93ee388f9f~mv2.jpg | 1024×768 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 115 | portfolio-galaxie-33-brightwork-returns.jpg | https://static.wixstatic.com/media/b5fa70_90131da12cb64d2bbd058c14a6b5c57b~mv2.jpg | 1024×768 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 116 | portfolio-galaxie-34-chrome-and-trim-fitment.jpg | https://static.wixstatic.com/media/b5fa70_7bb17028419d4927a4cfef4059b74752~mv2.jpg | 1536×1152 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 117 | portfolio-galaxie-35-rear-details-rebuilt.jpg | https://static.wixstatic.com/media/b5fa70_c8d0cc9543574d548156c93aacac39df~mv2.jpg | 1152×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 118 | portfolio-galaxie-36-front-end-comes-together.jpg | https://static.wixstatic.com/media/b5fa70_36e8592a7b6346db8d2299536c4a2f57~mv2.jpg | 1536×1152 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 119 | portfolio-galaxie-37-galaxie-500-identity.jpg | https://static.wixstatic.com/media/b5fa70_c26bd4e664d244ec838735a2c61bafa7~mv2.jpg | 1398×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 120 | portfolio-galaxie-38-mechanical-reassembly.jpg | https://static.wixstatic.com/media/b5fa70_18198948d25c4fde87fc062d14a5eb89~mv2.jpg | 1536×1152 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 121 | portfolio-galaxie-39-engine-bay-finalization.jpg | https://static.wixstatic.com/media/b5fa70_346d39191a1a40169b9d8c120822137b~mv2.jpg | 1152×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 122 | portfolio-galaxie-40-systems-back-online.jpg | https://static.wixstatic.com/media/b5fa70_ad69e52de884478d93d111a040cb27b4~mv2.jpg | 1152×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 123 | portfolio-galaxie-41-interior-restoration-begins.jpg | https://static.wixstatic.com/media/b5fa70_93c76525b33449a493882b4e9cb4844f~mv2.jpg | 1152×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 124 | portfolio-galaxie-42-dash-and-controls.jpg | https://static.wixstatic.com/media/b5fa70_ecaba15eb7ec4ac880c55a6af7268f50~mv2.jpg | 1152×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 125 | portfolio-galaxie-43-cabin-details-return.jpg | https://static.wixstatic.com/media/b5fa70_75c75ce810364ed28a59ff35c828e09b~mv2.jpg | 1152×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 126 | portfolio-galaxie-44-seating-restored.jpg | https://static.wixstatic.com/media/b5fa70_83a7ebbf0d4548eeb9a7770a065669fa~mv2.jpg | 1152×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 127 | portfolio-galaxie-45-door-panels-and-trim.jpg | https://static.wixstatic.com/media/b5fa70_83c1a730b15b4aa8b146166b37b4b541~mv2.jpg | 1536×1152 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 128 | portfolio-galaxie-46-turquoise-cabin-returns.jpg | https://static.wixstatic.com/media/b5fa70_00742a69147349d4a54bbeffe31ba5d0~mv2.jpg | 1152×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 129 | portfolio-galaxie-47-convertible-details.jpg | https://static.wixstatic.com/media/b5fa70_4fa0c13ad1d74fe29a9d1f84254b7c5d~mv2.jpg | 1152×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 130 | portfolio-galaxie-48-final-exterior-assembly.jpg | https://static.wixstatic.com/media/b5fa70_826857bb5b614dbcb3d2ed7dd2669941~mv2.jpg | 1536×1152 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 131 | portfolio-galaxie-49-wheels-and-stance.jpg | https://static.wixstatic.com/media/b5fa70_622d0c719921498f95914d90c593b77e~mv2.jpg | 1152×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 132 | portfolio-galaxie-50-the-transformation-takes-shape.jpg | https://static.wixstatic.com/media/b5fa70_2d41ed2a1da54fc19b6fb92a534a03ae~mv2.jpg | 1536×1152 | /portfolio; /portfolio (cover: 1963 Ford Galaxie 500 Convertible); /portfolio-collections/portfolio; /portfolio-collections/portfolio/1963-f… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 133 | portfolio-galaxie-51-final-fit-and-finish.jpg | https://static.wixstatic.com/media/b5fa70_19948a4d2a69402f892217b0f6fcf056~mv2.jpg | 1536×1152 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 134 | portfolio-galaxie-52-detailing-the-finished-car.jpg | https://static.wixstatic.com/media/b5fa70_f7c878d7cddf4c9bb09c8fb93e452587~mv2.jpg | 1536×1152 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 135 | portfolio-galaxie-53-engine-bay-complete.jpg | https://static.wixstatic.com/media/b5fa70_fc6b22f00ec74c678f904f6dc8e58bda~mv2.jpg | 1536×1152 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 136 | portfolio-galaxie-54-interior-complete.jpg | https://static.wixstatic.com/media/b5fa70_9b8c8a5f1e9b41a1a71b0c0aabd409bd~mv2.jpg | 1536×1152 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 137 | portfolio-galaxie-55-front-three-quarter-reveal.jpg | https://static.wixstatic.com/media/b5fa70_fb228ab99197404a88b5d8266a843f7c~mv2.jpg | 1536×1152 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 138 | portfolio-galaxie-56-rear-three-quarter-reveal.jpg | https://static.wixstatic.com/media/b5fa70_f5d692620dff49e79726fa78c32dc4ca~mv2.jpg | 1536×1152 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 139 | portfolio-galaxie-57-top-down-classic.jpg | https://static.wixstatic.com/media/b5fa70_e59bc683ae284ab5a340b8e92d81948b~mv2.jpg | 1536×1152 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 140 | portfolio-galaxie-58-full-side-profile.jpg | https://static.wixstatic.com/media/b5fa70_0e685572733a46a89614efd831ef782d~mv2.jpg | 1536×1152 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 141 | portfolio-galaxie-59-finished-front-detail.jpg | https://static.wixstatic.com/media/b5fa70_166f3d02b3384b009077303327784d21~mv2.jpg | 1536×1152 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 142 | portfolio-galaxie-60-finished-rear-detail.jpg | https://static.wixstatic.com/media/b5fa70_7f33ce7f8b2c443499fdf7e04dc795ed~mv2.jpg | 1152×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 143 | portfolio-galaxie-61-preserving-the-details.jpg | https://static.wixstatic.com/media/b5fa70_2df7f7d50cde407d8bdbc067f6b7b42d~mv2.jpg | 1152×1536 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 144 | portfolio-galaxie-62-ready-for-the-road.jpg | https://static.wixstatic.com/media/b5fa70_d1caab41b6754766bf76d79c3ffc25e8~mv2.jpg | 1536×1350 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 145 | portfolio-galaxie-63-1963-ford-galaxie-500-restored.jpg | https://static.wixstatic.com/media/b5fa70_371a704559564a28b74e435abdbe504a~mv2.jpg | 1536×1246 | /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible (gall… | Own photo (1963 Ford Galaxie Restoration Portfolio.jpg) |
| 146 | portfolio-nash-01-the-vision.jpg | https://static.wixstatic.com/media/b5fa70_1527cc7a137d4497823e002e6719e0cd~mv2.jpg | 1206×877 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo (1957 Nash Metropolitan - The Vision.jpg) |
| 147 | portfolio-nash-02-the-starting-point.jpg | https://static.wixstatic.com/media/b5fa70_f23e487e791f473f9cffb0ce6d4f9b35~mv2.jpg | 285×500 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo (tiny_IMG_0610.jpg) |
| 148 | portfolio-nash-03-interior-a-solid-foundation.jpg | https://static.wixstatic.com/media/b5fa70_2c2730b237f64b9d88162acef9d76858~mv2.jpg | 384×500 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo (tiny_IMG_0614.jpg) |
| 149 | portfolio-nash-04-rebuilt-1500cc-engine.jpg | https://static.wixstatic.com/media/b5fa70_37f2ec55873d46aebc31fb34adb5706c~mv2.jpg | 278×500 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo (tiny_IMG_0616.jpg) |
| 150 | portfolio-nash-05-establishing-the-body-line.jpg | https://static.wixstatic.com/media/b5fa70_9983a0df8e9b4f80a29fb8c327619732~mv2.jpg | 500×375 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo (tiny_IMG_1528.jpg) |
| 151 | portfolio-nash-06-current-status-september-2026.jpg | https://static.wixstatic.com/media/b5fa70_156e16cd7b084bb5b15b20a6cc227fee~mv2.jpg | 600×450 | /portfolio; /portfolio (cover: 1957 Nash Metropolitan — Restoration in Progress); /portfolio-collections/portfolio; /portfolio-collections/p… | Own photo (1957 Nash Metropolitan - Bodywork Current Status.jpg) |
| 152 | portfolio-nash-07-test-fitting-the-side-trim.jpg | https://static.wixstatic.com/media/b5fa70_0bbcf228ddfe4e16a30bcea936c8c973~mv2.jpg | 2048×1536 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo (1957 Nash Metropolitan - Side Trim Test Fit.jpg) |
| 153 | portfolio-nash-08-paint-line-layout-and-bodywork-detail.jpg | https://static.wixstatic.com/media/b5fa70_07b1aade400e4e6eac5676d863db80aa~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo (b5fa70_07b1aade400e4e6eac5676d863db80aa~mv2.jpeg) |
| 154 | portfolio-nash-09-final-body-preparation.jpg | https://static.wixstatic.com/media/b5fa70_735fc3a8e0974fa998f4430e182aa5d6~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo (b5fa70_735fc3a8e0974fa998f4430e182aa5d6~mv2.jpeg) |
| 155 | portfolio-nash-10-hood-preparation.jpg | https://static.wixstatic.com/media/b5fa70_425753355f5340ce82deb200d3b9dbad~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo (b5fa70_425753355f5340ce82deb200d3b9dbad~mv2.jpeg) |
| 156 | portfolio-nash-11-bodywork-refinement.jpg | https://static.wixstatic.com/media/b5fa70_4edfa5db0aa54901b85592d14fe526bd~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo (b5fa70_4edfa5db0aa54901b85592d14fe526bd~mv2.jpeg) |
| 157 | portfolio-nash-12-bodywork-refinement.jpg | https://static.wixstatic.com/media/b5fa70_a9e0e7b06a01428c9a8943401ca657b0~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo (b5fa70_a9e0e7b06a01428c9a8943401ca657b0~mv2.jpeg) |
| 158 | portfolio-nash-13-primer-stage-begins.jpg | https://static.wixstatic.com/media/b5fa70_a85d709ba30b40ee8a58f5e5ca77fd26~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo (b5fa70_a85d709ba30b40ee8a58f5e5ca77fd26~mv2.jpeg) |
| 159 | portfolio-nash-14-body-in-primer.jpg | https://static.wixstatic.com/media/b5fa70_3827380bfdd74b0d8d1167f29460bf7e~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo (b5fa70_3827380bfdd74b0d8d1167f29460bf7e~mv2.jpeg) |
| 160 | portfolio-nash-15-body-in-primer.jpg | https://static.wixstatic.com/media/b5fa70_11afb8524ada4495887cbcd1f7768173~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo (b5fa70_11afb8524ada4495887cbcd1f7768173~mv2.jpeg) |
| 161 | portfolio-nash-16-primer-preparation-complete.jpg | https://static.wixstatic.com/media/b5fa70_36cf3b8778c04a3689b519653fb90de2~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo (b5fa70_36cf3b8778c04a3689b519653fb90de2~mv2.jpeg) |
| 162 | portfolio-nash-17-hood-in-primer.jpg | https://static.wixstatic.com/media/b5fa70_2535585976f54a46a408920972a67787~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo (b5fa70_2535585976f54a46a408920972a67787~mv2.jpeg) |
| 163 | portfolio-nash-18-final-bodywork-correction.jpg | https://static.wixstatic.com/media/b5fa70_59df33aba2cb41cc8d936286c231750a~mv2.jpg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo () |
| 164 | portfolio-nash-19-final-surface-correction.jpg | https://static.wixstatic.com/media/b5fa70_16395b2636dd43a39955ab82f5d6f715~mv2.jpg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo () |
| 165 | portfolio-nash-20-preparing-the-hood.jpg | https://static.wixstatic.com/media/b5fa70_2b1727a9771749fa8f06774d90368e61~mv2.jpg | 1152×1536 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo () |
| 166 | portfolio-nash-21-flying-goddess-test-fit.jpg | https://static.wixstatic.com/media/b5fa70_c4838562bdc74f13904955b251e916c0~mv2.jpg | 1152×1536 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo () |
| 167 | portfolio-nash-22-checking-alignment.jpg | https://static.wixstatic.com/media/b5fa70_273a7a1a4db24e938baeae4369c4d80c~mv2.jpg | 1152×1536 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo () |
| 168 | portfolio-nash-23-final-positioning.jpg | https://static.wixstatic.com/media/b5fa70_5e070636af2047b5949607b18739231f~mv2.jpg | 1152×1536 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo () |
| 169 | portfolio-nash-24-flying-goddess-fitted.jpg | https://static.wixstatic.com/media/b5fa70_8812ff8d8f934befb224b1f3e9fbdfbf~mv2.jpg | 1152×1536 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo () |
| 170 | portfolio-nash-25-original-seat-restored-ready-for-upholstery.jpg | https://static.wixstatic.com/media/b5fa70_4dfb8a521fe84965a33c12c2ae0b67bb~mv2.jpg | 2048×1536 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo (1957-nash-metropolitan-restored-original-seat.jpg) |
| 171 | portfolio-nash-26-october-10-2026-bodywork-and-paint-prep-complete.jpg | https://static.wixstatic.com/media/b5fa70_a7e3d34851984055939227f0738c6371~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo (IMG_5195.jpeg) |
| 172 | portfolio-nash-27-october-10-2026-hood-masked-for-the-first-color.jpg | https://static.wixstatic.com/media/b5fa70_5c7d97d14a1a4439866861f0496d7485~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo (IMG_5202.jpeg) |
| 173 | portfolio-nash-28-october-10-2026-ready-to-spray.jpg | https://static.wixstatic.com/media/b5fa70_4ec85ecd550a46538bd06631819939f9~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo (IMG_5203.jpeg) |
| 174 | portfolio-nash-29-october-10-2026-four-coats-of-white.jpg | https://static.wixstatic.com/media/b5fa70_c45d2c1f4ce14fde88abc021271a740f~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo (IMG_3555.jpeg) |
| 175 | portfolio-nash-30-october-10-2026-fresh-white-from-the-opposite-side.jpg | https://static.wixstatic.com/media/b5fa70_43343b58eb18431aa42ec4d36f454bf5~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo (IMG_3556.jpeg) |
| 176 | portfolio-nash-31-october-10-2026-the-white-roof.jpg | https://static.wixstatic.com/media/b5fa70_cd8b3eeb1e544564a8673c460071ea44~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo (IMG_3557.jpeg) |
| 177 | portfolio-nash-32-october-10-2026-white-paint-around-the-rear.jpg | https://static.wixstatic.com/media/b5fa70_ebe71023bf21455b992cd5421d6526ad~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo (IMG_3558.jpeg) |
| 178 | portfolio-nash-33-october-10-2026-phase-one-complete-second-color-to-come.jpg | https://static.wixstatic.com/media/b5fa70_ab4789b7901c4723a1150ed8d5743181~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo (IMG_3559.jpeg) |
| 179 | portfolio-nash-34-hood-prepared-for-yellow-paint.jpg | https://static.wixstatic.com/media/b5fa70_92cc08bf9c904db48be88e9a71293b40~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo () |
| 180 | portfolio-nash-35-final-masking-before-yellow-front-view.jpg | https://static.wixstatic.com/media/b5fa70_5de581b2b2d145ed8c9f7d2476deffac~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo () |
| 181 | portfolio-nash-36-primer-preparation-opposite-front-view.jpg | https://static.wixstatic.com/media/b5fa70_665ec9d5c7874d6fb770e9a936b5307c~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo () |
| 182 | portfolio-nash-37-rear-body-prepared-for-yellow.jpg | https://static.wixstatic.com/media/b5fa70_70ffd6ae9d60495c8fcabd3c210b1400~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo () |
| 183 | portfolio-nash-38-rear-quarter-preparation-opposite-view.jpg | https://static.wixstatic.com/media/b5fa70_cbbc112648924decb577c098871877b2~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo () |
| 184 | portfolio-nash-39-yellow-hood-freshly-painted.jpg | https://static.wixstatic.com/media/b5fa70_029f50e3ca414b8b903e2f633ed9af3f~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo () |
| 185 | portfolio-nash-40-yellow-applied-masked-front-view.jpg | https://static.wixstatic.com/media/b5fa70_d348e44b5d434741830d2e36df47c6e5~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo () |
| 186 | portfolio-nash-41-fresh-yellow-front-fender-close-up.jpg | https://static.wixstatic.com/media/b5fa70_0220ae2b1d994eedbe3973a1f9a00991~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo () |
| 187 | portfolio-nash-42-yellow-applied-rear-quarter-view.jpg | https://static.wixstatic.com/media/b5fa70_1adb84c0a9a44feb9ad6ef72b2ca48f2~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo () |
| 188 | portfolio-nash-43-fresh-yellow-opposite-rear-quarter-view.jpg | https://static.wixstatic.com/media/b5fa70_86492fe8e23f4b5ab313bf03845d5ba3~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo () |
| 189 | portfolio-nash-44-freshly-painted-hood-close-view.jpg | https://static.wixstatic.com/media/b5fa70_ad199a8ff6af40e092e2d48454efaefd~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo () |
| 190 | portfolio-nash-45-yellow-and-white-revealed-front-view.jpg | https://static.wixstatic.com/media/b5fa70_64e60bd5f2e445aa95852e2df9318079~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo () |
| 191 | portfolio-nash-46-two-tone-reveal-front-fender-detail.jpg | https://static.wixstatic.com/media/b5fa70_c5879c837f2d40caaf600e14d765e531~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo () |
| 192 | portfolio-nash-47-two-tone-reveal-side-profile.jpg | https://static.wixstatic.com/media/b5fa70_ed22cfc046494039a9e012e58c0bbdd5~mv2.jpeg | 1536×1152 | /portfolio-collections/portfolio/1957-nash-metropolitan-restoration-in-progress (gallery) | Own photo () |
| 193 | — | https://i.ytimg.com/vi/2_GlAqpwGH0/maxresdefault.jpg | ? | /how-to-videos/arizona-survivor-gto-what-sandblasting-exposed-rust-damage-episode-2 (thumbnail) | YouTube thumbnail — load from YouTube, don't copy |
| 194 | — | https://i.ytimg.com/vi/4DZZZ4jSJOY/maxresdefault.jpg | ? | /how-to-videos/ragged-out-to-restored-series-71-pontiac-gto-first-engine-crank-since-engine-install (thumbnail) | YouTube thumbnail — load from YouTube, don't copy |
| 195 | — | https://i.ytimg.com/vi/58Z3tw3j6Qw/maxresdefault.jpg | ? | /how-to-videos/71gm-door-hinges-rebuild-pontiac-gto (thumbnail) | YouTube thumbnail — load from YouTube, don't copy |
| 196 | — | https://i.ytimg.com/vi/6cRccAj1qp0/maxresdefault.jpg | ? | /how-to-videos/71-pontiac-gto-ragged-out-to-restored-series-recap (thumbnail) | YouTube thumbnail — load from YouTube, don't copy |
| 197 | — | https://i.ytimg.com/vi/CrfULkXtMDk/maxresdefault.jpg | ? | /how-to-videos/71-gto-henry-cant-wait-to-fire-up-the-holley-efi-holley-gto455-carrestorationproject (thumbnail) | YouTube thumbnail — load from YouTube, don't copy |
| 198 | — | https://i.ytimg.com/vi/E9VnlLuqQBw/maxresdefault.jpg | ? | /how-to-videos/71-gto-pontiacgto-gto455-carrestorationproject (thumbnail) | YouTube thumbnail — load from YouTube, don't copy |
| 199 | — | https://i.ytimg.com/vi/M_Gux-lY3bY/maxresdefault.jpg | ? | /how-to-videos/71-pontiac-gto-fan-vs-gopro-fail (thumbnail) | YouTube thumbnail — load from YouTube, don't copy |
| 200 | — | https://i.ytimg.com/vi/MtfjZ_h6kSA/maxresdefault.jpg | ? | /how-to-videos/71-gto-building-a-custom-msd-plug-wire-how-to (thumbnail) | YouTube thumbnail — load from YouTube, don't copy |
| 201 | — | https://i.ytimg.com/vi/OLhLM_ZNIZ8/maxresdefault.jpg | ? | /how-to-videos/oldsmobile-hurst-edition-preview (thumbnail) | YouTube thumbnail — load from YouTube, don't copy |
| 202 | — | https://i.ytimg.com/vi/QHgTnzFswIY/maxresdefault.jpg | ? | /how-to-videos/2004-dodge-viper-oil-change-battery-replacement (thumbnail) | YouTube thumbnail — load from YouTube, don't copy |
| 203 | — | https://i.ytimg.com/vi/RfQkKPc7t9A/maxresdefault.jpg | ? | /how-to-videos/71-gto-the-struggle-is-realspark-plug-wires (thumbnail) | YouTube thumbnail — load from YouTube, don't copy |
| 204 | — | https://i.ytimg.com/vi/Scce_bIus6Y/maxresdefault.jpg | ? | /how-to-videos/vintage-air-installation-firewall-engine-prep-plus-engine-core-support-install (thumbnail) | YouTube thumbnail — load from YouTube, don't copy |
| 205 | — | https://i.ytimg.com/vi/VoxaRUH5dFw/maxresdefault.jpg | ? | /how-to-videos/repairing-door-hinges..-its-pretty-easy-1971-pontiac-gto-ragged-out-to-restoed-series-video. (thumbnail) | YouTube thumbnail — load from YouTube, don't copy |
| 206 | — | https://i.ytimg.com/vi/cFJAun_pmdM/maxresdefault.jpg | ? | /how-to-videos/71-gto-power-grip-hose-clamp..-gto455-automobile-carrestorationproject-repair (thumbnail) | YouTube thumbnail — load from YouTube, don't copy |
| 207 | — | https://i.ytimg.com/vi/fJMgMBTW60c/maxresdefault.jpg | ? | /how-to-videos/71-gto-ragged-out-to-restored-testing-vice-grip-garage-rebuild-black-pontiacgto (thumbnail) | YouTube thumbnail — load from YouTube, don't copy |
| 208 | — | https://i.ytimg.com/vi/gi4ZOahe5Do/maxresdefault.jpg | ? | /how-to-videos/1971-gto-ragged-out-to-restored-episode-3 (thumbnail) | YouTube thumbnail — load from YouTube, don't copy |
| 209 | — | https://i.ytimg.com/vi/gu7ZMak627k/maxresdefault.jpg | ? | /how-to-videos/71-gto-power-steering-hose-rebuild-pontiacgto-carrestorationproject-diy-oldschool-mechanic (thumbnail) | YouTube thumbnail — load from YouTube, don't copy |
| 210 | — | https://i.ytimg.com/vi/k363UCYPdEc/maxresdefault.jpg | ? | /how-to-videos/holley-sniper-2-hyperspark-guide-plus-vintage-air-wiring (thumbnail) | YouTube thumbnail — load from YouTube, don't copy |
| 211 | — | https://i.ytimg.com/vi/kAcCEvVP2lk/maxresdefault.jpg | ? | /how-to-videos/1975-oldsmobile-hurst-edition-first-start (thumbnail) | YouTube thumbnail — load from YouTube, don't copy |
| 212 | — | https://i.ytimg.com/vi/mRGGkMl9hcE/maxresdefault.jpg | ? | /how-to-videos/71-gto-efi-progress-holley-holleyefi-gto455-carrestorationproject (thumbnail) | YouTube thumbnail — load from YouTube, don't copy |
| 213 | — | https://i.ytimg.com/vi/p2JdZqZIj24/maxresdefault.jpg | ? | /how-to-videos/ragged-out-to-restored-series-71-pontiac-gto-first-start-holley-efimaybe-choke-it (thumbnail) | YouTube thumbnail — load from YouTube, don't copy |
| 214 | — | https://i.ytimg.com/vi/rvOwDKqZL8M/maxresdefault.jpg | ? | /how-to-videos/1971-pontiac-gto-ragged-out-to-restored-gto455pontiacgto (thumbnail) | YouTube thumbnail — load from YouTube, don't copy |
| 215 | — | https://static.wixstatic.com/media/0d6674_95c96d34f16749b48e4a2059c7482799~mv2.png | 1920×1120 | /blank-0cusaw | Wix 404-page template background — DROP |
| 216 | — | https://static.wixstatic.com/media/2e2a49_ab2e08c188f248779ab3728026123e34~mv2.png | 499×191 | /blog; /ebay-ecommerce; /fitzgerald-classics-garage; /portfolio; /portfolio-collections/portfolio/1963-ford-galaxie-500-convertible; /vintag… | Wix template "LOGO" placeholder (hidden) — DROP |
| 217 | — | https://static.wixstatic.com/media/913019_ad12b28d21eb435a8f80a925d57b3399~mv2.jpg | 4000×4000 | /blank | Wix template placeholder on broken videos page — DROP |
| 218 | — | https://static.wixstatic.com/media/b5fa70_1c41ea8028e34f75a2c75f50633dc316~mv2.jpg | 1024×1024 | /portfolio-collections/portfolio [og:image] | Wix template marketing mockup used as social image — DROP |
