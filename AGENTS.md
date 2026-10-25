# Fitzgerald Classics website: instructions for AI agents

This repository is the website **www.fitzgeraldclassics.com**, a classic-car restoration site run by Dan Fitzgerald. It is a Next.js site deployed on Vercel.

**Changes go live on their own.** Every pull request is built automatically; if the site builds cleanly, the pull request merges itself and Vercel publishes it a few minutes later. Nobody reviews or merges by hand: never ask anyone to approve or merge.

**Where to see the site:** until launch, the new site is at **https://fitzgerald-classics.vercel.app**. The address fitzgeraldclassics.com still shows the old Wix site until the domain is switched over. When pointing the owner to his site, use the vercel.app address.

Read **"Talking to the site owner"** first. It applies to every conversation, no matter who you are talking to.

---

## Talking to the site owner

These rules apply to **everyone** who asks you for changes, not only Dan. Treat the implementation as a black box: people tell you what they want to see on the site, and you tell them what changed.

- The person making requests is not technical. Use plain, friendly English.
- Never show code, diffs, file names, or terminal output in replies.
- Make all technical decisions yourself. Never ask about frameworks, packages, git, builds, or hosting.
- Only ask questions about content or look ("Which photo?", "Top or bottom of the page?"), at most one question at a time.
- When done, always open a pull request automatically, then reply in 1–2 sentences: what changed, and that it will be live in a few minutes.
- If something fails, say so simply and try again. Don't explain the error.

### What this means in practice

**Only two things belong in a reply: inputs and outcomes.**
- *Inputs* are the things you genuinely need from the person: a photo, some wording, a choice between two looks.
- *Outcomes* are what visitors will now see on the website.

Everything else stays out of the conversation, including how you did it, what tools you used, what you checked, and what went wrong along the way.

**Words to avoid**, plus anything else a non-programmer wouldn't say at the dinner table: code, file, folder, repository, repo, branch, commit, merge, pull request, PR, deploy, build, compile, error, bug, Markdown, JSON, YAML, frontmatter, component, config, variable, slug, URL path, npm, Node, Next.js, Vercel, GitHub, Tailwind, CSS, HTML, image optimization, cache, "the codebase".

Say it the way he would:

| Instead of… | Say… |
|---|---|
| "I created `content/posts/fuel-pumps.md`" | "Your new article about fuel pumps is on the blog." |
| "Opened PR #12, it'll deploy after merge." | "Done! It'll be live on the site in a few minutes." |
| "The build failed due to a type error, retrying." | "That didn't go through the first time. Trying again now." |
| "Which slug should I use?" | *(Don't ask. Pick a sensible web address yourself.)* |
| "Should this be an h2 or h3?" | *(Don't ask. Decide.)* |
| "I resized the image to 2400px and converted it to JPEG." | "The new photo is up on the Galaxie page." |

**Good replies:**
- "Your Nash Metropolitan page now has the three new paint photos at the end. It'll be live in a few minutes."
- "Done! The phone number for Zip Corvette is updated on the Trusted Partners page. Live in a few minutes."
- "Which photo should go at the top of the article: the engine bay or the finished car?"

**Bad replies:** anything with a list of changed files, a code snippet, a technical explanation, more than one question, or more than a couple of sentences after a finished task.

**When the request is unclear**, make the most reasonable choice that matches how the rest of the site looks and works, and mention it in plain words ("I put it at the bottom of the page, under the photos."). Only ask if a wrong guess would really matter, and then ask one simple question about content or look.

**If he asks how something works**, answer in everyday terms ("The article list updates itself whenever a new article is added"), never with technical detail.

**If he asks for something the site can't do yet** (see "Not built yet" below), say so kindly and simply: "That part of the site isn't set up yet. The contact form currently shows a 'coming soon' note." Don't promise dates.

---

## How every change works (for you, not for the reply)

1. Make the change, usually by editing files in `content/` or adding photos to `public/images/`. You should rarely need to touch `src/`.
2. Check your work: run `npm install` (first time only), then `npm run build` and `npm run lint`. Both must pass. If something fails, fix it and run them again.
3. Open a pull request against `main` with a short, clear title and description of what changed for visitors. It merges itself once the automatic build passes; you don't need to do anything else.
4. Reply to the person in 1–2 plain sentences (see above).

If the automatic build fails on the pull request, fix the problem and push to the same branch; it will try again. If the pull request can't merge because someone else changed the same files first, bring your branch up to date with `main`, resolve the overlap, and push again.

Keep the site looking consistent: reuse the existing look (dark background, gold accents, serif headings) and don't invent new styles for a single page.

---

## How the project is organized

```
site.config.ts            ← site-wide settings: name, menu, footer text, social links, colors, Ask Fitz text
content/
  posts/                  ← blog articles, one Markdown file each (file name = web address)
  projects/               ← portfolio cars (Galaxie, Nash, Corvette): text + ordered photo list
  pages/                  ← the editable text of each regular page (home, about-us, contact, …)
  blog-categories.json    ← the blog's category tabs
  partners.json           ← Trusted Partners list
  garage-products.json    ← The Garage (Amazon products)
  vintage-parts.json      ← Vintage & Hard-to-Find Parts (eBay listings)
  how-to-videos.json      ← How-To Videos (YouTube)
public/images/            ← all photos, in folders by area:
  site/  blog/  portfolio/<car>/  partners/  garage/  parts/
src/                      ← page layouts and components (rarely needs changes)
next.config.ts            ← redirects from old web addresses
reference/                ← snapshot of the old Wix site, for reference only. Never edit, never link to it.
```

Which page uses which content:

| Page on the site | Web address | Text lives in | Lists/photos live in |
|---|---|---|---|
| Home | `/` | `content/pages/home.md` | `public/images/site/` |
| About Us | `/about-us` | `content/pages/about-us.md` | `public/images/site/` |
| Projects (portfolio) | `/portfolio` | `content/pages/portfolio.md` | `content/projects/*.md` |
| A portfolio car | `/portfolio-collections/portfolio/<slug>` | `content/projects/<car>.md` | `public/images/portfolio/<car>/` |
| Blog | `/blog`, `/blog/categories/<slug>` | `content/pages/blog.md` | `content/posts/`, `content/blog-categories.json` |
| An article | `/post/<file-name>` | `content/posts/<file-name>.md` | `public/images/blog/` |
| Contact Us | `/contact` | `content/pages/contact.md` | — |
| Trusted Partners | `/trusted-partners` | `content/pages/trusted-partners.md` | `content/partners.json`, `public/images/partners/` |
| eBay eCommerce | `/ebay-ecommerce` | `content/pages/ebay-ecommerce.md` | store link in `site.config.ts` (`ebayStoreUrl`) |
| The Garage | `/fitzgerald-classics-garage` | `content/pages/garage.md` | `content/garage-products.json`, `public/images/garage/` |
| Vintage Parts | `/vintage-hard-to-find-parts` | `content/pages/vintage-parts.md` | `content/vintage-parts.json`, `public/images/parts/` |
| How-To Videos | `/how-to-videos`, `/how-to-videos/<slug>` | `content/pages/how-to-videos.md` | `content/how-to-videos.json` |

Pages, the menu, the sitemap, the RSS feed, and the article lists all update themselves from these files. There's no list to keep in sync by hand.

---

## How to add an article

1. Create `content/posts/<short-descriptive-name>.md`. Use lowercase words joined by hyphens, e.g. `fuel-pump-rebuild-basics.md`. The file name becomes the web address (`/post/fuel-pump-rebuild-basics`), so **never rename an existing article file**: old links would break.
2. Start the file with this header, then write the article in Markdown below it:

   ```markdown
   ---
   title: Fuel Pump Rebuild Basics
   date: '2026-11-06'                 # publish date, YYYY-MM-DD (newest shows first)
   author: Dan Fitzgerald
   categories: [Engines & Mechanical] # names from content/blog-categories.json; [] for none
   excerpt: One or two sentences shown on the blog list.
   coverImage: /images/blog/fuel-pump-rebuild-basics.jpg
   coverAlt: Short description of the cover photo
   seoTitle: Fuel Pump Rebuild Basics | Fitzgerald Classics   # optional, for Google
   seoDescription: One sentence for Google search results.    # optional
   ---

   Opening paragraph…

   ## A section heading

   More text, **bold**, [a link](/fitzgerald-classics-garage), and lists:
   - item
   - item
   ```
3. Put the cover photo in `public/images/blog/` with the same name as the article file.
4. To show a link as a rust-red button, give it the title `"button"`:
   `[Explore the Fitzgerald Classics Garage](/fitzgerald-classics-garage "button")`
5. Read time is calculated automatically. Link to other pages on the site with short addresses like `/post/…` or `/fitzgerald-classics-garage`.

**Match his voice.** Most articles are first-person, practical and warm. They end with "Coming Next" (the next article), "About the Author", and the line "Preserving Americana… one classic car at a time." Look at a recent post in `content/posts/` and follow its pattern unless he asks for something different.

To edit or remove an article, change or delete its file. To unpublish without losing the text, move it out of `content/posts/` (for example into a new `content/drafts/` folder).

---

## How to add or replace a photo

- **Where:** `public/images/<area>/`. The areas are `site` (big page photos and the logo), `blog`, `portfolio/<car>`, `partners`, `garage` and `parts`.
- **Names:** lowercase, descriptive, hyphens, e.g. `portfolio/1957-nash-metropolitan/48-hood-ornament-installed.jpg`. No spaces and no camera names like `IMG_1234.jpg`.
- **Size:** photos straight from a phone are fine up to about 5 MB. If a photo is larger, or more than 3000 pixels wide, shrink it to about 2400 pixels wide (JPEG, quality around 85) before adding it. The website automatically serves smaller versions to visitors.
- **Using it:** point to the photo with its address starting at `/images/…`, e.g. `coverImage: /images/blog/fuel-pump-rebuild-basics.jpg`.
- **Replacing a photo:** the simplest way is to save the new photo under the *same* file name. If the new photo is a different format (e.g. `.png` instead of `.jpg`), save it with the new name, update every place that pointed to the old name (search the `content/` folder and `site.config.ts`), then delete the old file.
- **Adding photos to a portfolio car:** save them in `public/images/portfolio/<car>/`, continuing the number sequence, and add entries to the `photos:` list in `content/projects/<car>.md`, in the order they should appear:
  ```yaml
  - image: /images/portfolio/1957-nash-metropolitan/48-hood-ornament-installed.jpg
    title: Hood Ornament Installed
    caption: One or two sentences about what the photo shows.
  ```
  The car's page (and its cover on the Projects page) updates automatically. If the car's description has a dated status update, update that text too when the photos show new progress.
- **Adding a new portfolio car:** copy an existing file in `content/projects/`, give it a new file name, `slug` (its web address), `title`, `order` (position on the Projects page), cover photo, description and photos.
- When someone sends a photo in the chat, save it into the right folder following these rules. Don't ask them about file names or sizes.
- Always write a short, meaningful `alt`/caption text describing the photo. It helps blind visitors and Google.

---

## How to change site-wide settings

Everything that appears on every page lives in **`site.config.ts`**:

| To change… | Edit in `site.config.ts` |
|---|---|
| Business name, tagline, mission line | `name`, `tagline`, `mission` |
| The slide-out menu (order, labels, links) | `nav` |
| Footer copyright line | `copyright` (`{year}` updates itself) |
| Facebook / Instagram links | `social` |
| eBay store button on the eBay page | `ebayStoreUrl` (empty shows a "coming soon" note) |
| Amazon / eBay affiliate IDs | `affiliates` (reference only; product links already include them) |
| "Ask Fitz" button text | `askFitz` |
| Colors | `colors` (`gold` is the accent color used for buttons and highlights) |
| Default description and share image | `defaultDescription`, `defaultShareImage` |

If a new page is added to the menu, it also needs a page in `src/app/<address>/page.tsx` and a text file in `content/pages/`. Follow an existing simple page such as `contact` or `ebay-ecommerce`.

---

## Other common edits

- **Page wording** (headings, paragraphs, button labels, page titles for Google): edit the matching file in `content/pages/`. Keep the existing field names; only change the text.
- **Trusted Partner:** add, edit or reorder entries in `content/partners.json`. The logo goes in `public/images/partners/`; leave `"logo": ""` if there isn't one.
- **Garage product:** add an entry to `content/garage-products.json` (`name`, `category`, `description`, `link`, `image`). Amazon links must keep the affiliate tag `tag=fitzgeraldcla-20`. Categories come from the products themselves; reuse an existing category name unless he asks for a new one.
- **Vintage part:** add an entry to `content/vintage-parts.json` (`name`, `description`, `link`, `image`, `buttonLabel`). Newest goes at the **top**. eBay links should keep the partner tracking (`campid=5339219494`). Remove sold parts when asked.
- **How-To Video:** add an entry to `content/how-to-videos.json` with `slug` (lowercase-hyphenated, unique), `title`, `youtubeId` (the code after `v=` or `/shorts/` in the YouTube link), `youtubeUrl`, `format` (`Short` or `Long-form`), `creator`, `channel`, `recommendation` (1–2 sentences), `publishedDate`, `featured`, `seoTitle` and `seoDescription`. The list shows in file order.
- **Blog category:** edit `content/blog-categories.json`. Never change an existing category's `slug`, because that's its web address.

---

## Rules that protect the site

- **Never change existing web addresses**: article file names, project slugs, video slugs, category slugs, or page folders. Search engines and old links depend on them. If an address truly must change, add a permanent redirect in `next.config.ts`.
- Don't add new packages, services or tracking unless the request truly needs it.
- Don't edit anything in `reference/`.
- Keep `npm run build` and `npm run lint` passing before opening a pull request.
- Third-party product photos in `vintage-parts.json` and `garage-products.json` that start with `https://` are loaded from other websites. Leave them as they are unless asked.

---

## Not built yet

These parts of the site are visual placeholders only:

- **Contact form:** it checks the fields, then shows a friendly "almost ready" note. Nothing is sent yet.
- **"Ask Fitz" chat:** it shows a greeting and points visitors to the contact page.
- **eBay store listings:** the eBay page shows a "coming soon" panel until `ebayStoreUrl` is set. Live listings aren't connected.
- **Blog comments and likes** from the old site weren't carried over.

If the owner asks for one of these, explain simply that it isn't set up yet. Don't build backend features (sending email, storing uploads, payments, chat) unless he clearly asks for that feature to be built.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
