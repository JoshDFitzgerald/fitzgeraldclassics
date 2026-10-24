import type { Metadata } from "next";
import { siteConfig } from "@site-config";

type SeoInput = {
  title: string;
  description?: string;
  path: string;
  image?: string;
  type?: "website" | "article";
};

// Builds the page title, description, canonical link, and social share tags.
export function buildMetadata({ title, description, path, image, type = "website" }: SeoInput): Metadata {
  const desc = description || siteConfig.defaultDescription;
  const img = image || siteConfig.defaultShareImage;
  return {
    title: { absolute: title },
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      title,
      description: desc,
      url: path,
      siteName: siteConfig.name,
      type,
      images: [{ url: img }],
    },
    twitter: { card: "summary_large_image", title, description: desc, images: [img] },
  };
}
