import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Inter, Libre_Caslon_Text } from "next/font/google";
import { siteConfig } from "@site-config";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AskFitz from "@/components/AskFitz";
import "./globals.css";

const libreCaslon = Libre_Caslon_Text({
  variable: "--font-libre-caslon",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: siteConfig.defaultDescription,
  verification: { google: siteConfig.googleSiteVerification },
  alternates: { types: { "application/rss+xml": "/blog-feed.xml" } },
};

const { colors } = siteConfig;
const themeVars = {
  "--c-background": colors.background,
  "--c-surface": colors.surface,
  "--c-line": colors.line,
  "--c-muted": colors.muted,
  "--c-text": colors.text,
  "--c-gold": colors.gold,
  "--c-rust": colors.rust,
} as CSSProperties;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" style={themeVars} className={`${libreCaslon.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 pt-[48px] md:pt-[58px]">{children}</main>
        <SiteFooter />
        <AskFitz />
      </body>
    </html>
  );
}
