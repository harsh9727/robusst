import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";

// Removed "/*/poc_waitlist" — Bing was blocked from crawling it.
// If the page should remain unindexed, add <meta name="robots" content="noindex">
// directly on the page instead of blocking it in robots.txt.
const disallow = ["/api/", "/_next/", "/*/dashboard", "/*/login"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow,
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow,
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow,
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow,
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow,
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow,
      },
      {
        userAgent: "CCBot",
        allow: "/",
        disallow,
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow,
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow,
      },
      {
        userAgent: "cohere-ai",
        allow: "/",
        disallow,
      },
      {
        userAgent: "FacebookBot",
        allow: "/",
        disallow,
      },
      {
        userAgent: "bingbot",
        allow: "/",
        disallow,
      },
      {
        userAgent: "Amazonbot",
        allow: "/",
        disallow,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
