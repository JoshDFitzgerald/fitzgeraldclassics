// Ask Fitz grounding: a searchable index of the site's own content.
//
// The index is built once (lazily, the first time a question comes in) from
// the same files in /content that the pages themselves are built from:
// blog articles, portfolio projects, the editable page text, how-to videos,
// Garage products, vintage parts and trusted partners. For each question a
// few best-matching excerpts are picked with simple keyword matching and
// sent to the AI model along with the question — no database, no extra
// service. New content files are picked up automatically on the next deploy.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { siteConfig } from "@site-config";
import {
  getGarageProducts,
  getPartners,
  getPosts,
  getProjects,
  getVideos,
  getVintageParts,
} from "@/lib/content";
import { projectPath } from "@/lib/projectPath";

export type SiteExcerpt = {
  title: string;
  url: string;
  text: string;
};

type IndexedDoc = SiteExcerpt & { titleWords: string[]; textLower: string };

const PAGE_PATHS: Record<string, string> = {
  home: "/",
  "about-us": "/about-us",
  blog: "/blog",
  contact: "/contact",
  portfolio: "/portfolio",
  "trusted-partners": "/trusted-partners",
  "ebay-ecommerce": "/ebay-ecommerce",
  garage: "/fitzgerald-classics-garage",
  "vintage-parts": "/vintage-hard-to-find-parts",
  "how-to-videos": "/how-to-videos",
};

// Markdown to plain text, good enough for searching and for the model.
function plainText(markdown: string): string {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // links keep their text
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_`>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Split a long article body into one document per section (split on
// headings) so a question matches the section that actually answers it.
function sectionDocs(title: string, url: string, intro: string, body: string): IndexedDoc[] {
  const docs: IndexedDoc[] = [];
  const push = (text: string) => {
    const clean = plainText(text);
    if (clean.length < 40) return;
    docs.push({
      title,
      url,
      text: clean.slice(0, 4000),
      titleWords: wordsOf(title),
      textLower: clean.toLowerCase(),
    });
  };
  push(intro);
  for (const section of body.split(/\n(?=#{1,3}\s)/)) push(section);
  return docs;
}

const STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "of", "to", "in", "on", "for", "with", "my", "your", "our",
  "is", "are", "was", "were", "do", "does", "did", "how", "what", "when", "where", "which",
  "who", "why", "can", "could", "should", "would", "i", "me", "you", "we", "it", "its", "this",
  "that", "have", "has", "had", "get", "got", "about", "from", "into", "out", "up", "down",
  "if", "so", "but", "not", "no", "yes", "any", "some", "much", "many", "best", "good",
]);

function wordsOf(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/[\s-]+/)
    .filter((w) => w.length >= 3 && !STOP_WORDS.has(w));
}

function buildIndex(): IndexedDoc[] {
  const docs: IndexedDoc[] = [];
  const abs = (p: string) => `${siteConfig.url}${p}`;

  for (const post of getPosts()) {
    docs.push(...sectionDocs(post.title, abs(`/post/${post.slug}`), post.excerpt, post.body));
  }

  for (const project of getProjects()) {
    const intro = [
      project.seoDescription ?? "",
      ...project.details.map((d) => `${d.label}: ${d.text}`),
      ...project.photos.slice(0, 12).map((p) => `${p.title}. ${p.caption}`),
    ].join(" ");
    docs.push(...sectionDocs(project.title, abs(projectPath(project.slug)), intro, project.body));
  }

  for (const video of getVideos()) {
    const text = `${video.title}. ${video.recommendation} A ${video.format} how-to video by ${video.creator} (${video.channel}).`;
    docs.push({ title: video.title, url: abs(`/how-to-videos/${video.slug}`), text, titleWords: wordsOf(video.title), textLower: text.toLowerCase() });
  }

  for (const product of getGarageProducts()) {
    const text = `${product.name} (${product.category}, in The Garage). ${product.description}`;
    docs.push({ title: product.name, url: abs("/fitzgerald-classics-garage"), text, titleWords: wordsOf(product.name), textLower: text.toLowerCase() });
  }

  for (const part of getVintageParts()) {
    const text = `${part.name} (vintage part for sale). ${part.description}`;
    docs.push({ title: part.name, url: abs("/vintage-hard-to-find-parts"), text, titleWords: wordsOf(part.name), textLower: text.toLowerCase() });
  }

  for (const partner of getPartners()) {
    const text = `${partner.name} (${partner.category}, a trusted partner). ${partner.description} ${partner.contact.join(" ")}`;
    docs.push({ title: partner.name, url: abs("/trusted-partners"), text, titleWords: wordsOf(partner.name), textLower: text.toLowerCase() });
  }

  // The editable text of the regular pages (frontmatter fields + body).
  const pagesDir = path.join(process.cwd(), "content", "pages");
  for (const [name, pagePath] of Object.entries(PAGE_PATHS)) {
    try {
      const { data, content } = matter(fs.readFileSync(path.join(pagesDir, `${name}.md`), "utf8"));
      const fields = Object.values(data).filter((v): v is string => typeof v === "string");
      const title = (data.heading as string) || (data.seoTitle as string) || name;
      const text = plainText([...fields, content].join(" "));
      if (text.length >= 40) {
        docs.push({ title, url: abs(pagePath), text: text.slice(0, 2000), titleWords: wordsOf(title), textLower: text.toLowerCase() });
      }
    } catch {
      // A missing page file just means that page is not in the index.
    }
  }

  return docs;
}

let cachedIndex: IndexedDoc[] | null = null;

function getIndex(): IndexedDoc[] {
  if (!cachedIndex) {
    try {
      cachedIndex = buildIndex();
    } catch {
      cachedIndex = [];
    }
  }
  return cachedIndex;
}

// The few excerpts most relevant to the question, best first. Mostly one
// excerpt per page, so a single long article can't crowd out the rest of
// the site; a second section from a page is only used to fill spare slots.
export function findSiteExcerpts(question: string, maxResults = 4): SiteExcerpt[] {
  const terms = [...new Set(wordsOf(question))];
  if (terms.length === 0) return [];

  const scored: { doc: IndexedDoc; score: number }[] = [];
  for (const doc of getIndex()) {
    let score = 0;
    for (const term of terms) {
      if (doc.titleWords.includes(term)) score += 6;
      // Count mentions in the text, capped so long pages don't always win.
      let count = 0;
      let at = doc.textLower.indexOf(term);
      while (at !== -1 && count < 4) {
        count += 1;
        at = doc.textLower.indexOf(term, at + term.length);
      }
      score += count;
    }
    if (score >= 3) scored.push({ doc, score });
  }
  scored.sort((a, b) => b.score - a.score);

  const picked: { doc: IndexedDoc; score: number }[] = [];
  const usedUrls = new Set<string>();
  for (const entry of scored) {
    if (picked.length >= maxResults) break;
    if (usedUrls.has(entry.doc.url)) continue;
    usedUrls.add(entry.doc.url);
    picked.push(entry);
  }
  for (const entry of scored) {
    if (picked.length >= maxResults) break;
    if (!picked.includes(entry)) picked.push(entry);
  }
  picked.sort((a, b) => b.score - a.score);

  const results = picked.map(({ doc }) => ({
    title: doc.title,
    url: doc.url,
    text: excerptAround(doc.text, terms),
  }));

  // "How do I reach / hire / contact you?" rarely shares words with the
  // Contact page itself, so keyword matching misses it. Always ground
  // those questions in the Contact page.
  if (/\b(hire|hiring|quote|contact|touch|reach|phone|email|call)\b/i.test(question)) {
    const contact = getIndex().find((d) => d.url.endsWith("/contact"));
    if (contact && !results.some((r) => r.url === contact.url)) {
      results.unshift({ title: contact.title, url: contact.url, text: contact.text.slice(0, 900) });
    }
  }

  return results.slice(0, maxResults + 1);
}

// Trim a long excerpt to a window around the first matching word, so the
// model sees the part of the page that answers the question.
function excerptAround(text: string, terms: string[]): string {
  const LIMIT = 900;
  if (text.length <= LIMIT) return text;
  const lower = text.toLowerCase();
  let first = -1;
  for (const term of terms) {
    const at = lower.indexOf(term);
    if (at !== -1 && (first === -1 || at < first)) first = at;
  }
  if (first === -1) return text.slice(0, LIMIT);
  const start = Math.max(0, first - 200);
  return (start > 0 ? "…" : "") + text.slice(start, start + LIMIT);
}
