// Reads the files in /content. Pages call these helpers; nothing here
// needs to change when articles, photos, or list items are added.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { imageSize } from "image-size";

const CONTENT = path.join(process.cwd(), "content");

function readJson<T>(file: string): T {
  return JSON.parse(fs.readFileSync(path.join(CONTENT, file), "utf8")) as T;
}

// Pixel size of an image in /public, so photos keep their natural shape.
export function getImageSize(src: string): { width: number; height: number } {
  try {
    const { width = 1200, height = 900 } = imageSize(fs.readFileSync(path.join(process.cwd(), "public", src)));
    return { width, height };
  } catch {
    return { width: 1200, height: 900 };
  }
}

function readMarkdown(file: string) {
  const { data, content } = matter(fs.readFileSync(path.join(CONTENT, file), "utf8"));
  return { data, body: content.trim() };
}

// ---------- Static page text (content/pages/*.md)

export function getPage<T>(name: string): T & { body: string } {
  const { data, body } = readMarkdown(`pages/${name}.md`);
  return { ...(data as T), body };
}

// ---------- Blog

export type Post = {
  slug: string;
  title: string;
  date: string;
  author: string;
  categories: string[];
  excerpt: string;
  coverImage: string;
  coverAlt: string;
  seoTitle?: string;
  seoDescription?: string;
  body: string;
  minutesToRead: number;
};

export type BlogCategory = { slug: string; name: string; description: string };

export function getPosts(): Post[] {
  return fs
    .readdirSync(path.join(CONTENT, "posts"))
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { data, body } = readMarkdown(`posts/${f}`);
      const words = body.split(/\s+/).length;
      return {
        ...(data as Omit<Post, "slug" | "body" | "minutesToRead">),
        date: String(data.date),
        categories: data.categories ?? [],
        slug: f.replace(/\.md$/, ""),
        body,
        minutesToRead: Math.max(1, Math.round(words / 265)),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string) {
  return getPosts().find((p) => p.slug === slug);
}

export function getBlogCategories(): BlogCategory[] {
  return readJson<BlogCategory[]>("blog-categories.json");
}

// ---------- Portfolio

export type Project = {
  file: string;
  title: string;
  slug: string;
  order: number;
  coverImage: string;
  coverAlt: string;
  details: { label: string; text: string }[];
  seoTitle?: string;
  seoDescription?: string;
  photos: { image: string; title: string; caption: string; width: number; height: number }[];
  body: string;
};

export function getProjects(): Project[] {
  return fs
    .readdirSync(path.join(CONTENT, "projects"))
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { data, body } = readMarkdown(`projects/${f}`);
      return {
        ...(data as Omit<Project, "file" | "body">),
        details: data.details ?? [],
        photos: (data.photos ?? []).map((ph: { image: string }) => ({ ...ph, ...getImageSize(ph.image) })),
        file: f,
        body,
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function getProject(slug: string) {
  return getProjects().find((p) => p.slug === slug);
}

// ---------- Lists

export type Video = {
  slug: string;
  title: string;
  youtubeId: string;
  youtubeUrl: string;
  format: string;
  creator: string;
  channel: string;
  recommendation: string;
  publishedDate: string;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
};
export const getVideos = () => readJson<Video[]>("how-to-videos.json");
export const getVideo = (slug: string) => getVideos().find((v) => v.slug === slug);

export type Partner = {
  name: string;
  category: string;
  description: string;
  contact: string[];
  address: string[];
  website: string;
  logo: string;
};
export const getPartners = () => readJson<Partner[]>("partners.json");

export type GarageProduct = {
  name: string;
  category: string;
  description: string;
  link: string;
  image: string;
};
export const getGarageProducts = () => readJson<GarageProduct[]>("garage-products.json");

export type VintagePart = {
  name: string;
  description: string;
  link: string;
  image: string;
  buttonLabel?: string;
};
export const getVintageParts = () => readJson<VintagePart[]>("vintage-parts.json");
