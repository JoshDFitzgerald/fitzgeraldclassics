import { Marked } from "marked";

// Markdown → HTML for articles and page text.
// A link with the title "button" becomes a button:  [Shop now](/garage "button")
const marked = new Marked({
  renderer: {
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const external = /^https?:\/\//.test(href) && !href.includes("fitzgeraldclassics.com");
      const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : "";
      if (title === "button") return `<a class="article-button" href="${href}"${attrs}>${text}</a>`;
      return `<a href="${href}"${title ? ` title="${title}"` : ""}${attrs}>${text}</a>`;
    },
  },
});

export function markdownToHtml(md: string): string {
  return marked.parse(md, { async: false });
}
