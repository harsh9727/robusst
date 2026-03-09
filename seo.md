# SEO & AI Discoverability Playbook for Next.js App Router

A complete, copy-paste-ready reference for achieving high organic search rankings and AI crawler visibility in any Next.js 13+ App Router project. Based on real production audit findings.

---

## Table of Contents

1. [Core Philosophy](#1-core-philosophy)
2. [The #1 Silent SSR Killer](#2-the-1-silent-ssr-killer)
3. [Static Site Generation Strategy](#3-static-site-generation-strategy)
4. [Semantic HTML Hierarchy](#4-semantic-html-hierarchy)
5. [Centralised Site Configuration](#5-centralised-site-configuration)
6. [Root Metadata (Layout Level)](#6-root-metadata-layout-level)
7. [Per-Page Metadata](#7-per-page-metadata)
8. [JSON-LD Structured Data](#8-json-ld-structured-data)
9. [Open Graph & Twitter Cards](#9-open-graph--twitter-cards)
10. [Canonical URLs](#10-canonical-urls)
11. [robots.txt — Including AI Crawlers](#11-robotstxt--including-ai-crawlers)
12. [Sitemap Configuration](#12-sitemap-configuration)
13. [llms.txt — AI Discoverability Standard](#13-llmstxt--ai-discoverability-standard)
14. [Content SEO — Blog & Article Frontmatter](#14-content-seo--blog--article-frontmatter)
15. [Reading Time & Related Content](#15-reading-time--related-content)
16. [Image SEO](#16-image-seo)
17. [Common Bugs & Gotchas](#17-common-bugs--gotchas)
18. [Platform Registration Checklist](#18-platform-registration-checklist)
19. [Verification & Testing Tools](#19-verification--testing-tools)
20. [Master Implementation Checklist](#20-master-implementation-checklist)

---

## 1. Core Philosophy

### The Two Audiences You Are Writing For

Every page you build has two audiences:

1. **Humans** — who load the page in a browser, execute JavaScript, and see the rendered DOM.
2. **Crawlers** — search engines (Googlebot, Bingbot), AI indexers (GPTBot, anthropic-ai, PerplexityBot), and simple HTTP clients (`curl`, LLM tool calls) that fetch raw HTML and parse text nodes directly. They do **not** execute JavaScript.

**The fundamental rule:** If meaningful content — headings, paragraphs, service descriptions, blog titles — does not exist as a literal text node in the raw HTML response, it is invisible to all crawlers.

### How to Verify Raw HTML Content

```bash
# Check that headings exist in raw HTML
curl -s https://{{YOUR_DOMAIN}} | grep -o '<h1[^>]*>[^<]*</h1>'

# Check specific text
curl -s https://{{YOUR_DOMAIN}} | grep "{{KEY_PHRASE}}"

# Count h1 tags per page (should always be exactly 1)
curl -s https://{{YOUR_DOMAIN}}/{{PAGE}} | grep -o '<h1' | wc -l
```

If either command returns nothing, your content is client-rendered and invisible to crawlers.

### Why "Static" Does Not Automatically Mean "Crawlable"

Next.js can mark a page as `○ (Static)` in its build output while the HTML body is still effectively empty. This happens when a **Client Component wraps the entire page tree and returns `null` on first render** before JavaScript runs. The static HTML file exists on disk, but its `<body>` contains no text. See Section 2 for the specific pattern.

---

## 2. The #1 Silent SSR Killer

### The `useMounted` / Provider Trap

This is the single most common pattern that silently breaks SSR for an entire site while the Next.js build reports 100% success.

**The broken pattern:**

```tsx
// src/utils/globalProvider.tsx  ← BROKEN
"use client";

import { useEffect, useState } from "react";

const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
};

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const mounted = useMounted();

  if (!mounted) {
    return null; // ← KILLS ENTIRE PAGE BODY in static HTML
  }

  return <SomeProvider>{children}</SomeProvider>;
};
```

**Why it destroys SEO:**

- `mounted` initialises as `false`
- On the server (and on first client render before `useEffect` fires), `mounted === false`
- `return null` causes the **entire children tree** — Navbar, page content, Footer — to render as nothing in the static HTML
- The built `.html` file has a full `<head>` but a body with no meaningful content
- Every crawler sees an empty page

**The fix:**

```tsx
// src/utils/globalProvider.tsx  ← FIXED
"use client";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  // No useMounted. Just render children.
  return (
    <AnalyticsProvider>
      <SomeContextProvider>
        {children}
      </SomeContextProvider>
    </AnalyticsProvider>
  );
};
```

**Rule:** Never use `useMounted` to gate the rendering of layout-level children. `useMounted` is only acceptable for small, isolated UI components where a hydration mismatch must be avoided (e.g., rendering a `window.innerWidth`-dependent value). It must never wrap `{children}` at the Provider/Layout level.

### Detecting This Pattern in Any Codebase

```bash
# Find all files using useMounted
grep -r "useMounted" src/ --include="*.tsx" --include="*.ts" -l

# Check if any of those files wrap children
grep -r "useMounted" src/ --include="*.tsx" -A 5 | grep "children\|return null"

# Find all client components that wrap children
grep -r '"use client"' src/ --include="*.tsx" -l | xargs grep -l "children"
```

For each result, check: does the component return `null` or render nothing before some state becomes `true`? If yes and it wraps `{children}`, it is breaking your SSR.

---

## 3. Static Site Generation Strategy

### Force Static on All Marketing Pages

Every marketing page (homepage, about, services, blogs listing, contact) must be explicitly forced to static:

```tsx
// At the top of every page.tsx in the app/(marketing) route group
export const dynamic = "force-static";
```

### Dynamic Routes with generateStaticParams

For blog posts, service pages, or any `[slug]` route, use `generateStaticParams` to pre-render all known paths at build time:

```tsx
// app/blogs/[slug]/page.tsx
export const dynamic = "force-static";
export const dynamicParams = false; // 404 for unknown slugs at runtime

export async function generateStaticParams() {
  const posts = getAllPosts(); // reads from filesystem / CMS
  return posts.map((post) => ({ slug: post.slug }));
}
```

`dynamicParams = false` is important: without it, Next.js will attempt server-side rendering for slugs not in the static params list. With it, unknown slugs return a proper 404 instead.

### Build Output — What to Expect

After `next build`, every marketing page should show `○ (Static)`:

```
Route (app)
┌ ○ /                        ← Static
├ ○ /about                   ← Static
├ ○ /services                ← Static
├ ○ /blogs                   ← Static
├ ○ /contact                 ← Static
├ ● /blogs/[slug]            ← SSG (pre-rendered with generateStaticParams)
│ ├ /blogs/post-one
│ └/blogs/post-two
├ ● /services/[slug]         ← SSG
├ ƒ /api/og                  ← Dynamic (edge, generates images on demand — expected)
└ ƒ /api/...                 ← Dynamic API routes (expected)
```

The only `ƒ (Dynamic)` entries should be API routes. If any marketing page shows `ƒ`, it means something is triggering server-side rendering — find and fix it.

### Route Groups

Use Next.js route groups to separate concerns without affecting URLs:

```
app/
  (marketing)/         ← all public-facing pages share one layout
    layout.tsx         ← Navbar + Footer
    page.tsx           ← /
    about/page.tsx     ← /about
    services/
      page.tsx         ← /services
      [slug]/page.tsx  ← /services/marketing-enablement
    blogs/
      page.tsx         ← /blogs
      [slug]/page.tsx  ← /blogs/post-slug
    contact/page.tsx   ← /contact
  (no-nav)/            ← pages without Navbar (landing pages, etc.)
    layout.tsx
  api/                 ← API routes — always dynamic, never crawled
```

### The Edge Runtime Warning

```
⚠ Using edge runtime on a page currently disables static generation for that page
```

This warning is acceptable **only for API routes** (e.g., `/api/og` for dynamic OG image generation using `next/og`). If this warning appears next to a marketing page, remove `export const runtime = "edge"` from that page immediately.

---

## 4. Semantic HTML Hierarchy

### The Rule: One `<h1>` Per Page

Each page must have **exactly one `<h1>`** that describes the page's primary topic. Everything else must follow a logical `h2 → h3 → h4` hierarchy. Multiple `<h1>` tags confuse both search engines and screen readers.

```
Page
└── h1: Page title (one only)
    ├── h2: Major section
    │   ├── h3: Sub-section or card title
    │   └── h3: Sub-section
    ├── h2: Another major section
    │   └── h3: Card / item title
    └── h2: Final section
```

### Common Mistakes

**❌ Wrong — multiple h1s:**
```tsx
<h1>Make</h1>           {/* visual stacking via separate tags */}
<h1>Technology</h1>
<h1>Resonate</h1>
```

**✅ Correct — one h1, spans for styling:**
```tsx
<h1 className="text-[60px] font-bold">
  <span className="block text-white">Make</span>
  <span className="block text-brand">Technology</span>
  <span className="block text-white">Resonate</span>
</h1>
```

**❌ Wrong — section headings as h1:**
```tsx
{/* These are sections inside a page, not page titles */}
<h1>What We Do</h1>
<h1>Our Services</h1>
<h1>Why Choose Us</h1>
<h1>Latest Blog Posts</h1>
```

**✅ Correct — sections use h2:**
```tsx
<h2>What We Do</h2>
<h2>Our Services</h2>
<h2>Why Choose Us</h2>
<h2>Latest Blog Posts</h2>
```

**❌ Wrong — card titles as h1:**
```tsx
{/* Inside a grid of cards */}
<h1>{blogPost.title}</h1>
<h1>{service.title}</h1>
```

**✅ Correct — card titles use h3:**
```tsx
<h3>{blogPost.title}</h3>
<h3>{service.title}</h3>
```

**❌ Wrong — footer brand name as h1:**
```tsx
<footer>
  <h1>{{SITE_NAME}}</h1>  {/* not a page heading */}
</footer>
```

**✅ Correct — footer brand name as p:**
```tsx
<footer>
  <p className="font-semibold text-white">{{SITE_NAME}}</p>
</footer>
```

### Heading Audit Command

```bash
# Check heading hierarchy in built HTML
grep -o '<h[1-6][^>]*>[^<]*</h[1-6]>' .next/server/app/index.html

# Count h1s per page (must be 1)
for f in .next/server/app/*.html; do
  count=$(grep -o '<h1' "$f" | wc -l)
  echo "$f: $count h1 tag(s)"
done
```

---

## 5. Centralised Site Configuration

Every SEO-related URL, handle, and image reference must come from a single config file. This prevents staging URLs and personal handles from leaking into production.

### `src/config/index.ts`

```ts
import type { SiteConfig } from "~/types";

export const siteConfig: SiteConfig = {
  name: "{{SITE_NAME}}",
  description: "{{SITE_TAGLINE}}",
  url: "https://www.{{YOUR_DOMAIN}}",        // ← PRODUCTION URL with www
  domain: "{{YOUR_DOMAIN}}",                 // ← no protocol, no www
  ogImage: {
    url: "https://www.{{YOUR_DOMAIN}}/assets/og-default.png",
    width: 1200,                             // ← must be 1200
    height: 630,                             // ← must be 630
  },
  twitterHandle: "@{{TWITTER_HANDLE}}",      // ← brand account, not personal
  links: {
    twitter: "https://twitter.com/{{TWITTER_HANDLE}}",
    linkedin: "https://www.linkedin.com/company/{{LINKEDIN_SLUG}}",
  },
};
```

### `src/types/index.ts`

```ts
export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  domain: string;
  ogImage: {
    url: string;
    width: number;
    height: number;
  };
  twitterHandle: string;
  links: {
    twitter: string;
    linkedin?: string;
  };
};
```

### Critical Checks

- `url` must be the **production URL with www** (or consistently without — pick one and never mix)
- `ogImage.url` must be an **absolute URL** pointing to an image that actually exists
- `ogImage` dimensions must be **exactly 1200×630** — this is the universal OG standard; wrong dimensions cause cropped or rejected previews on LinkedIn, Slack, WhatsApp, and iMessage
- `twitterHandle` must be the **brand Twitter account**, not a developer's personal handle
- Never hardcode `vercel.app` staging URLs — they will pollute canonical tags across your entire site

---

## 6. Root Metadata (Layout Level)

Place this in `src/app/(marketing)/metadata.ts` and import into the layout.

```ts
import type { Metadata, Viewport } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.{{YOUR_DOMAIN}}";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#{{BRAND_DARK_HEX}}" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  title: {
    default: "{{SITE_NAME}} - {{SITE_TAGLINE}}",
    template: "%s | {{SITE_NAME}}",            // ← used by child pages
  },

  description: "{{DEFAULT_META_DESCRIPTION}}",  // 150-160 characters

  keywords: [
    "{{PRIMARY_KEYWORD}}",
    "{{SECONDARY_KEYWORD_1}}",
    "{{SECONDARY_KEYWORD_2}}",
    // 8–12 keywords max
  ],

  authors: [{ name: "{{SITE_NAME}} Team" }],
  creator: "{{SITE_NAME}}",
  publisher: "{{SITE_NAME}}",
  category: "{{BUSINESS_CATEGORY}}",            // e.g. "Business Services"

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "{{SITE_NAME}}",
    title: "{{SITE_NAME}} - {{SITE_TAGLINE}}",
    description: "{{DEFAULT_META_DESCRIPTION}}",
    images: [
      {
        url: `${baseUrl}/assets/og-default.png`,
        width: 1200,
        height: 630,
        alt: "{{SITE_NAME}} - {{SITE_TAGLINE}}",
        type: "image/png",                       // or image/webp
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@{{TWITTER_HANDLE}}",
    creator: "@{{TWITTER_HANDLE}}",
    title: "{{SITE_NAME}} - {{SITE_TAGLINE}}",
    description: "{{DEFAULT_META_DESCRIPTION}}",
    images: [
      {
        url: `${baseUrl}/assets/og-default.png`,
        width: 1200,
        height: 630,
        alt: "{{SITE_NAME}} - {{SITE_TAGLINE}}",
      },
    ],
  },

  // Fill these after completing platform registrations (Section 18)
  verification: {
    google: "{{GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE}}",
    // other: { "msvalidate.01": "{{BING_VERIFICATION_CODE}}" },
    // yandex: "{{YANDEX_VERIFICATION_CODE}}",
  },

  alternates: {
    canonical: baseUrl,
    languages: {
      "en-US": baseUrl,
    },
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/assets/apple-touch-icon.png",     // 180×180 PNG
    shortcut: "/favicon-32x32.png",
  },

  manifest: "/manifest.json",
};
```

### Root Layout Wiring

```tsx
// src/app/(marketing)/layout.tsx
import {
  metadata as rootMetadata,
  viewport as rootViewport,
  organizationJsonLd,
  websiteJsonLd,
} from "./metadata";

export const metadata = rootMetadata;
export const viewport = rootViewport;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        <Provider>          {/* no useMounted guard — see Section 2 */}
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
```

---

## 7. Per-Page Metadata

### `generateSeo` Utility

Create a reusable utility so every page gets consistent, correct metadata:

```ts
// src/utils/generateSeo.ts
import type { Metadata } from "next";
import { siteConfig } from "~/config";

interface GenerateSeoProps {
  title: string;
  description: string;
  url: string;                    // relative ("/about") or absolute
  image?: string;                 // absolute URL to OG image
  keywords?: string[];
  openGraphType?: "website" | "article";
  author?: string;
  robots?: {
    index?: boolean;
    follow?: boolean;
  };
}

export const generateSeo = ({
  title,
  description,
  url,
  image,
  keywords,
  openGraphType = "website",
  author,
  robots,
}: GenerateSeoProps): Metadata => {
  // Always produce an absolute canonical URL
  const canonicalUrl = url.startsWith("http")
    ? url
    : `${siteConfig.url}${url}`;

  // Fall back to the default OG image if none provided
  const imageUrl = image ?? siteConfig.ogImage.url;

  const metadata: Metadata = {
    title,
    description,
    metadataBase: new URL(siteConfig.url),

    openGraph: {
      title,
      description,
      siteName: siteConfig.name,
      url: canonicalUrl,
      locale: "en_US",
      type: openGraphType,
      images: [
        {
          url: imageUrl,
          width: 1200,                  // always 1200×630
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    alternates: {
      canonical: canonicalUrl,         // absolute — never relative
    },
  };

  if (keywords?.length) {
    metadata.keywords = keywords;
  }
  if (robots) {
    metadata.robots = robots;
  }
  if (author) {
    metadata.authors = [{ name: author }];
    metadata.creator = author;
  }

  return metadata;
};
```

### Usage in Page Files

```tsx
// app/(marketing)/about/page.tsx
export const dynamic = "force-static";

export const generateMetadata = () =>
  generateSeo({
    title: "About Us",
    description: "{{ABOUT_PAGE_DESCRIPTION}}",
    url: "/about",
  });

// app/(marketing)/blogs/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const post = getPostBySlug((await params).slug);
  if (!post) return {};

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? siteConfig.url;
  const postUrl = `${baseUrl}/blogs/${post.slug}`;
  const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent(post.title)}&excerpt=${encodeURIComponent(post.excerpt)}`;

  return {
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt,
    keywords: [post.primaryKeyword, ...(post.secondaryKeywords ?? [])].join(", "),
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.metaTitle ?? post.title,
      description: post.metaDescription ?? post.excerpt,
      url: postUrl,
      type: "article",
      publishedTime: post.date,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle ?? post.title,
      images: [ogImage],
    },
    alternates: { canonical: postUrl },
  };
}
```

---

## 8. JSON-LD Structured Data

JSON-LD is machine-readable metadata embedded in `<script type="application/ld+json">` tags. It is the primary signal used by Google for rich results and by AI tools (Perplexity, ChatGPT search, Gemini) to understand your site's entities.

### Organization Schema (in root layout — every page)

```ts
// src/app/(marketing)/metadata.ts
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.{{YOUR_DOMAIN}}";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "{{SITE_NAME}}",
  url: baseUrl,
  logo: `${baseUrl}/assets/static/logo.png`,
  description: "{{ORGANIZATION_DESCRIPTION}}",
  foundingDate: "{{FOUNDING_YEAR}}",           // e.g. "2020"
  sameAs: [
    "https://www.linkedin.com/company/{{LINKEDIN_SLUG}}",
    "https://twitter.com/{{TWITTER_HANDLE}}",
    // Add every official social/directory profile
    // "https://www.crunchbase.com/organization/{{CRUNCHBASE_SLUG}}",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    url: `${baseUrl}/contact`,
    email: "{{CONTACT_EMAIL}}",
    telephone: "{{CONTACT_PHONE}}",
    availableLanguage: ["English"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "{{STREET_ADDRESS}}",
    addressLocality: "{{CITY}}",
    addressRegion: "{{STATE_OR_REGION}}",
    postalCode: "{{POSTAL_CODE}}",
    addressCountry: "{{ISO_COUNTRY_CODE}}",    // e.g. "IN", "US", "GB"
  },
  areaServed: {
    "@type": "Place",
    name: "Worldwide",
  },
  knowsAbout: [
    "{{EXPERTISE_1}}",
    "{{EXPERTISE_2}}",
    "{{EXPERTISE_3}}",
  ],
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: {{MIN_EMPLOYEES}},
    maxValue: {{MAX_EMPLOYEES}},
  },
};
```

**Why `sameAs` matters:** Google uses `sameAs` to connect your website entity to your social profiles. When these match, it triggers and enriches your **Knowledge Panel** in search results. Each listed URL must be an active, populated profile.

### WebSite Schema (in root layout — enables Sitelinks Search Box)

```ts
export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "{{SITE_NAME}}",
  url: baseUrl,
  description: "{{SITE_DESCRIPTION}}",
  publisher: {
    "@type": "Organization",
    name: "{{SITE_NAME}}",
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/assets/static/logo.png`,
    },
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${baseUrl}/blogs?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};
```

### Article Schema (blog detail pages)

```ts
const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: post.title,
  description: post.excerpt,
  image: [`${baseUrl}${post.coverImage}`],
  datePublished: post.date,                    // ISO 8601: "2026-01-22T00:00:00.000Z"
  dateModified: post.updatedDate ?? post.date,
  author: {
    "@type": "Organization",                   // use Person if a named human author
    name: post.author.name,
    url: baseUrl,
  },
  publisher: {
    "@type": "Organization",
    name: "{{SITE_NAME}}",
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/assets/static/logo.png`,  // must be absolute path, not /logo.png
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${baseUrl}/blogs/${post.slug}`,
  },
  keywords: [post.primaryKeyword, ...(post.secondaryKeywords ?? [])],
  articleSection: "{{CONTENT_CATEGORY}}",      // e.g. "Business Strategy"
  wordCount: post.content?.split(" ").length ?? 0,
  timeRequired: `PT${readingTime}M`,           // ISO 8601 duration
};
```

### Service Schema (service detail pages)

```ts
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.title,
  description: service.description,
  provider: {
    "@type": "Organization",
    name: "{{SITE_NAME}}",
    url: baseUrl,
  },
  serviceType: service.title,
  areaServed: {
    "@type": "Place",
    name: "Worldwide",
  },
  url: `${baseUrl}/services/${service.slug}`,
};
```

### BreadcrumbList Schema (all detail pages)

Add to every blog post and service page. Breadcrumbs appear as visual trails in Google search results and help AI tools understand site hierarchy.

```ts
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: baseUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "{{SECTION_NAME}}",           // e.g. "Blogs" or "Services"
      item: `${baseUrl}/{{SECTION_PATH}}`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: post.title,                   // or service.title
      item: `${baseUrl}/{{SECTION_PATH}}/${slug}`,
    },
  ],
};
```

**Inject all JSON-LD as inline scripts:**

```tsx
<>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
  />
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
  />
</>
```

### Visible Breadcrumb Nav (for humans + crawlers)

```tsx
<nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-white/60">
  <Link href="/">Home</Link>
  <span>/</span>
  <Link href="/blogs">Blogs</Link>
  <span>/</span>
  <span className="text-white/90">{post.title}</span>
</nav>
```

---

## 9. Open Graph & Twitter Cards

### The Standard

| Property | Required Value |
|---|---|
| `og:image` width | **1200px** |
| `og:image` height | **630px** |
| `og:image` format | PNG or WebP (JPEG acceptable) |
| `twitter:card` | `summary_large_image` |
| `og:locale` | `en_US` (or your target locale) |

Never use non-standard dimensions. 640×321 or 641×321 are common copy-paste errors that cause cropped or rejected previews on LinkedIn, Slack, WhatsApp, and iMessage.

### Dynamic OG Image Generation (Next.js Edge Route)

For blog posts and service pages, generate OG images dynamically so each page gets a unique, branded preview image:

```tsx
// app/api/og/route.tsx
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";  // required for ImageResponse

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "{{SITE_NAME}}";
  const excerpt = searchParams.get("excerpt") ?? "{{SITE_TAGLINE}}";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0c1323 0%, #1e2f45 100%)",
          padding: "60px",
        }}
      >
        <div style={{ color: "#fff", fontSize: "56px", fontWeight: "bold", textAlign: "center" }}>
          {title}
        </div>
        <div style={{ color: "#e5e7eb", fontSize: "24px", marginTop: "30px", textAlign: "center" }}>
          {excerpt}
        </div>
        <div style={{ position: "absolute", top: "40px", right: "60px", color: "#fff", fontSize: "20px" }}>
          {{SITE_NAME}}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
```

Usage in metadata:
```ts
const ogImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(post.title)}&excerpt=${encodeURIComponent(post.excerpt)}`;
```

---

## 10. Canonical URLs

### Rules

1. Every page must have exactly one canonical URL
2. Canonical URLs must always be **absolute** — never relative
3. The canonical must match the live URL exactly including `www` vs non-www
4. `metadataBase` in Next.js metadata does not automatically fix relative canonicals passed through `generateSeo` — the utility must construct the absolute URL itself

### Why Relative Canonicals Break Everything

If your `generateSeo` utility receives `/about` and sets `alternates: { canonical: "/about" }` while `metadataBase` points to a staging domain (`nagana-media.vercel.app`), every page on your site has its canonical pointing to the wrong domain. This tells Google to index the staging site instead of production.

**Always construct absolute canonicals in the utility:**

```ts
const canonicalUrl = url.startsWith("http")
  ? url
  : `${siteConfig.url}${url}`;  // siteConfig.url must be the production domain

// ...
alternates: {
  canonical: canonicalUrl,   // "https://www.yourdomain.com/about"
},
```

### www vs non-www Consistency

Pick one and never mix. If your live site serves `www.yourdomain.com`, then:
- `siteConfig.url` = `https://www.yourdomain.com`
- `metadataBase` = `new URL("https://www.yourdomain.com")`
- All JSON-LD `url` fields = `https://www.yourdomain.com/...`
- `robots.txt` Host = `https://www.yourdomain.com`
- `next-sitemap.config.cjs` siteUrl = `https://www.yourdomain.com`

Set up a redirect at the infrastructure level (Vercel, Cloudflare, Nginx) so `yourdomain.com` always 301-redirects to `www.yourdomain.com`.

---

## 11. robots.txt — Including AI Crawlers

Place in `public/robots.txt`. This file is served statically and is the first thing crawlers read.

```txt
# All crawlers — default allow everything except internal/API paths
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin
Disallow: /dashboard

# GPTBot (OpenAI ChatGPT training + browsing)
User-agent: GPTBot
Allow: /

# OAI-SearchBot (OpenAI Search / SearchGPT)
User-agent: OAI-SearchBot
Allow: /

# ChatGPT-User (ChatGPT browse-with-search)
User-agent: ChatGPT-User
Allow: /

# anthropic-ai (Claude training crawler)
User-agent: anthropic-ai
Allow: /

# Claude-Web (Claude browse tool)
User-agent: Claude-Web
Allow: /

# Google-Extended (Gemini / Bard training)
User-agent: Google-Extended
Allow: /

# PerplexityBot (Perplexity AI)
User-agent: PerplexityBot
Allow: /

# CCBot (Common Crawl — used by many AI training datasets)
User-agent: CCBot
Allow: /

# Applebot-Extended (Apple Intelligence)
User-agent: Applebot-Extended
Allow: /

# cohere-ai (Cohere)
User-agent: cohere-ai
Allow: /

# FacebookBot (Meta AI)
User-agent: FacebookBot
Allow: /

# Bytespider (ByteDance / TikTok AI)
User-agent: Bytespider
Allow: /

# Host — must match your canonical domain including www
Host: https://www.{{YOUR_DOMAIN}}

# Sitemaps
Sitemap: https://www.{{YOUR_DOMAIN}}/sitemap.xml
Sitemap: https://www.{{YOUR_DOMAIN}}/sitemap-0.xml
```

### Key Rules

- `Host` and `Sitemap` URLs must use the **same www/non-www scheme** as your canonical domain
- Do not block `/api/og` if you use dynamic OG image generation — social scrapers need it
- Explicitly allowing AI crawlers does not guarantee indexing; it just removes the barrier
- If you use `next-sitemap` with `generateRobotsTxt: true`, it will **overwrite** this file on every build. Either disable robot generation in next-sitemap and manage the file manually, or configure all the above through `robotsTxtOptions` in `next-sitemap.config.cjs`

---

## 12. Sitemap Configuration

### `next-sitemap.config.cjs`

```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.{{YOUR_DOMAIN}}",
  generateRobotsTxt: false,       // manage robots.txt manually (see Section 11)
  generateIndexSitemap: true,
  exclude: ["/api/*", "/admin/*", "/_next/*", "/dashboard/*"],

  // Per-page priority and change frequency
  transform: async (config, path) => {
    // Homepage — highest priority, crawled daily
    if (path === "/") {
      return {
        loc: path,
        changefreq: "daily",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }
    // Blog posts — high priority, check weekly for updates
    if (path.startsWith("/blogs/") && path !== "/blogs") {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 0.9,
        lastmod: new Date().toISOString(),
      };
    }
    // Service pages
    if (path.startsWith("/services/") && path !== "/services") {
      return {
        loc: path,
        changefreq: "monthly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }
    // Section indexes and other pages
    return {
      loc: path,
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};
```

### Add as a postbuild script

```json
// package.json
{
  "scripts": {
    "build": "next build",
    "postbuild": "next-sitemap --config next-sitemap.config.cjs"
  }
}
```

### Submit Sitemaps After Deployment

After deploying, submit both URLs to Google Search Console and Bing Webmaster Tools:

```
https://www.{{YOUR_DOMAIN}}/sitemap.xml
https://www.{{YOUR_DOMAIN}}/sitemap-0.xml
```

Ping Google directly (optional, speeds up discovery):

```
https://www.google.com/ping?sitemap=https://www.{{YOUR_DOMAIN}}/sitemap.xml
```

---

## 13. llms.txt — AI Discoverability Standard

`llms.txt` is a plain-text file at the root of your site that tells AI language models what your site is about, what pages exist, and how to navigate your content. It is the AI equivalent of `sitemap.xml` — not a machine-readable XML format but a human-readable Markdown document optimised for LLM consumption.

Place it at `public/llms.txt` so it is served at `https://www.{{YOUR_DOMAIN}}/llms.txt`.

### Format

```markdown
# {{SITE_NAME}}

> {{ONE_SENTENCE_DESCRIPTION_OF_BUSINESS}}

## About

{{2-3 PARAGRAPH DESCRIPTION OF WHO YOU ARE, WHAT YOU DO, AND WHO YOU SERVE}}

- [About Us](https://www.{{YOUR_DOMAIN}}/about)
- [Contact](https://www.{{YOUR_DOMAIN}}/contact)

## Services / Products

Brief description of each offering with a direct link:

- [{{SERVICE_1_NAME}}](https://www.{{YOUR_DOMAIN}}/services/{{SERVICE_1_SLUG}}): {{ONE_LINE_DESCRIPTION}}
- [{{SERVICE_2_NAME}}](https://www.{{YOUR_DOMAIN}}/services/{{SERVICE_2_SLUG}}): {{ONE_LINE_DESCRIPTION}}
- [{{SERVICE_3_NAME}}](https://www.{{YOUR_DOMAIN}}/services/{{SERVICE_3_SLUG}}): {{ONE_LINE_DESCRIPTION}}
- [All Services](https://www.{{YOUR_DOMAIN}}/services)

## Blog & Content

Brief description of content categories, then list your most important articles:

- [{{ARTICLE_1_TITLE}}](https://www.{{YOUR_DOMAIN}}/blogs/{{SLUG_1}})
- [{{ARTICLE_2_TITLE}}](https://www.{{YOUR_DOMAIN}}/blogs/{{SLUG_2}})
- [{{ARTICLE_3_TITLE}}](https://www.{{YOUR_DOMAIN}}/blogs/{{SLUG_3}})
- [All Posts](https://www.{{YOUR_DOMAIN}}/blogs)

## Key Topics & Expertise

- {{TOPIC_1}}
- {{TOPIC_2}}
- {{TOPIC_3}}
- {{TOPIC_4}}

## Contact

- Website: https://www.{{YOUR_DOMAIN}}
- Email: {{CONTACT_EMAIL}}
- Phone: {{CONTACT_PHONE}}
- Address: {{FULL_ADDRESS}}
- LinkedIn: https://www.linkedin.com/company/{{LINKEDIN_SLUG}}
- Twitter/X: https://twitter.com/{{TWITTER_HANDLE}}

## Site Map

- https://www.{{YOUR_DOMAIN}} — Homepage
- https://www.{{YOUR_DOMAIN}}/about — About Us
- https://www.{{YOUR_DOMAIN}}/services — Services overview
- https://www.{{YOUR_DOMAIN}}/blogs — All blog posts
- https://www.{{YOUR_DOMAIN}}/contact — Contact
- https://www.{{YOUR_DOMAIN}}/sitemap.xml — XML Sitemap
```

### Guidelines

- Write in plain, factual prose. No marketing fluff.
- Use exact, crawlable URLs — not relative paths
- List your most important blog posts explicitly (do not just link to `/blogs`)
- Keep it updated whenever you add new service pages or publish significant articles
- The `>` blockquote at the top is the LLM's "one-line brief" — make it precise and factual

---

## 14. Content SEO — Blog & Article Frontmatter

### Frontmatter Schema

Every Markdown blog post should include a full frontmatter block:

```yaml
---
title: "{{ARTICLE_TITLE}}"
excerpt: "{{150-160 CHAR META DESCRIPTION — also used as og:description}}"
coverImage: "/assets/blog/{{SLUG}}/cover.png"
date: "{{ISO_DATE}}"                           # e.g. "2026-01-22T00:00:00.000Z"
author:
  name: "{{AUTHOR_NAME}}"
  picture: "/assets/blog/authors/{{AUTHOR_SLUG}}.jpeg"
ogImage:
  url: "/assets/blog/{{SLUG}}/cover.png"
metaTitle: "{{SEO_OPTIMISED_TITLE — can differ from display title}}"
metaDescription: "{{SEO_OPTIMISED_DESCRIPTION}}"
primaryKeyword: "{{MAIN_TARGET_KEYWORD}}"
secondaryKeywords:
  - "{{RELATED_KEYWORD_1}}"
  - "{{RELATED_KEYWORD_2}}"
  - "{{RELATED_KEYWORD_3}}"
---
```

### Field Guidance

| Field | Purpose | Length |
|---|---|---|
| `title` | Display title — shown in hero | Any |
| `metaTitle` | `<title>` tag and OG title — can be keyword-optimised | 50–60 chars |
| `excerpt` / `metaDescription` | `<meta description>` and OG description | 150–160 chars |
| `primaryKeyword` | The one term this article must rank for | Single phrase |
| `secondaryKeywords` | Related terms; used in Article JSON-LD `keywords` field | 3–6 phrases |
| `date` | ISO 8601 — used in `datePublished` JSON-LD | Full timestamp |
| `coverImage` | Used in OG `image` fallback and Article JSON-LD `image` | 1200×630 preferred |

### URL / Slug Rules

- Use `kebab-case` only: `surviving-the-ai-shift-2026`
- Include the primary keyword in the slug where natural
- Never use underscores (`microsoft_ignite_2025_recap`) — hyphens are preferred by Google
- Keep slugs short and descriptive; avoid dates in the slug unless the content is time-bound

### Content Structure for SEO

```markdown
## {{H2 — primary section, contains keyword variation}}

Opening paragraph answering the question directly (inverted pyramid).

### {{H3 — sub-point or supporting point}}

Supporting content. Use bullet lists for scannable facts.

- **Bold term**: explanation
- **Bold term**: explanation
```

Key rules:
- Answer the primary keyword question within the **first 100 words**
- Use `<h2>` for major sections, `<h3>` for sub-points — never `<h1>` inside article body
- Include the primary keyword in: the first `<h2>`, the first paragraph, and the `metaTitle`
- Internal links: each blog post should link to at least one relevant service page and one other blog post
- Minimum useful length: 800 words. For competitive topics: 1500+ words

---

## 15. Reading Time & Related Content

### Reading Time Utility

```ts
// src/utils/api.ts
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
```

### Display in Blog Hero

```tsx
const readingTime = calculateReadingTime(post.content ?? "");

// In the hero section:
<div className="flex items-center gap-3 text-sm text-white/60">
  <span>
    {new Date(post.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}
  </span>
  <span>·</span>
  <span>{readingTime} min read</span>
  {post.primaryKeyword && (
    <>
      <span>·</span>
      <span className="rounded-full bg-white/10 px-3 py-0.5 text-xs">
        {post.primaryKeyword}
      </span>
    </>
  )}
</div>
```

### Include in Article JSON-LD

```ts
timeRequired: `PT${readingTime}M`,   // ISO 8601 duration format
wordCount: post.content?.split(" ").length ?? 0,
```

### Related Posts

Implement keyword-based matching to surface related articles at the bottom of every post. This reduces bounce rate and increases internal link equity:

```ts
// src/utils/api.ts
export function getRelatedPosts(currentPost: Blog, limit = 3): Blog[] {
  const allPosts = getAllPosts().filter((p) => p.slug !== currentPost.slug);

  const keywords = [
    currentPost.primaryKeyword,
    ...(currentPost.secondaryKeywords ?? []),
  ].filter(Boolean).map((k) => k?.toLowerCase());

  const scored = allPosts.map((post) => {
    const postKeywords = [
      post.primaryKeyword,
      ...(post.secondaryKeywords ?? []),
    ].filter(Boolean).map((k) => k?.toLowerCase());

    const overlap = keywords.filter((kw) =>
      postKeywords.some((pk) => pk?.includes(kw ?? ""))
    ).length;

    return { post, relevance: overlap };
  });

  const related = scored
    .filter((s) => s.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit)
    .map((s) => s.post);

  // Fill remaining slots with most recent posts
  if (related.length < limit) {
    const recent = allPosts
      .filter((p) => !related.includes(p))
      .slice(0, limit - related.length);
    return [...related, ...recent];
  }

  return related;
}
```

Wire it up in the blog detail page:

```tsx
const relatedPosts = getRelatedPosts(post, 3);

// At the bottom of the article:
{relatedPosts.length > 0 && (
  <section className="border-t pt-12">
    <h2 className="text-2xl font-bold">Related Articles</h2>
    <div className="mt-6 grid gap-4 sm:grid-cols-3">
      {relatedPosts.map((related) => (
        <Link key={related.slug} href={`/blogs/${related.slug}`}>
          <h3 className="font-semibold">{related.title}</h3>
          <p className="text-sm text-black/50">
            {calculateReadingTime(related.content ?? "")} min read
          </p>
        </Link>
      ))}
    </div>
  </section>
)}
```

---

## 16. Image SEO

### Rules

1. Every `<img>` and `<Image>` must have a descriptive `alt` attribute — never empty, never `alt="image"`
2. OG images must be exactly **1200×630**
3. Use `next/image` for all images — it handles WebP conversion, lazy loading, and responsive `srcSet` automatically
4. Use `priority` prop on above-the-fold images (hero, banner) to prevent LCP degradation
5. Name image files descriptively: `gtm-strategy-b2b-2026-cover.png` not `cover.png` or `IMG_1234.jpg`

### Alt Text Guidelines

```tsx
// ❌ Wrong
<Image src={heroImage} alt="image" />
<Image src={heroImage} alt="" />
<Image src={heroImage} alt="heroImage" />

// ✅ Correct
<Image src={heroImage} alt="B2B marketing team planning a go-to-market strategy" />
<Image src={coverImage} alt={post.title} />
<Image src={serviceIcon} alt={service.title} />
```

### Logo Path in JSON-LD

A common mistake is referencing `/logo.png` in JSON-LD when the actual file is at `/assets/static/logo.png`. The path in JSON-LD must be an absolute URL pointing to a file that actually exists and returns a 200 response:

```ts
// ❌ Wrong — file does not exist at this path
logo: { "@type": "ImageObject", url: `${baseUrl}/logo.png` }

// ✅ Correct — file exists and is accessible
logo: { "@type": "ImageObject", url: `${baseUrl}/assets/static/logo.png` }
```

Verify with:
```bash
curl -I https://www.{{YOUR_DOMAIN}}/assets/static/logo.png
# Must return HTTP/2 200
```

---

## 17. Common Bugs & Gotchas

These are real bugs found in production Next.js projects. Check for each one explicitly.

### Bug 1: Staging URL in siteConfig

```ts
// ❌ Staging URL leaks into all canonical tags
url: "https://my-project.vercel.app",

// ✅ Production URL
url: "https://www.yourdomain.com",
```

**Impact:** Every page generated with `generateSeo()` has its canonical pointing to the Vercel staging domain. Google indexes the staging site, not production.

### Bug 2: Personal Twitter Handle in Production

```ts
// ❌ Developer's personal handle
twitter: { site: "@john_dev_personal" }

// ✅ Brand handle
twitter: { site: "@BrandHandle" }
```

**Impact:** Twitter/X card previews attribute your content to the wrong account. Embarrassing and unfixable after Google caches it.

### Bug 3: Relative Canonical with Wrong metadataBase

```ts
// In generateSeo.ts:
// ❌ Relative canonical — resolved against metadataBase
alternates: { canonical: "/about" }
// If metadataBase is staging URL → canonical = staging URL

// ✅ Absolute canonical — always correct
alternates: { canonical: "https://www.yourdomain.com/about" }
```

### Bug 4: Multiple h1 Tags Per Page

```tsx
// ❌ Every section using h1
<h1>Hero Title</h1>
<h1>What We Do</h1>
<h1>Our Services</h1>

// ✅ One h1, sections use h2/h3
<h1>Hero Title</h1>
<h2>What We Do</h2>
<h2>Our Services</h2>
```

**Impact:** Google's quality guidelines penalise pages with unclear heading structure. Affects ranking for all target keywords.

### Bug 5: useMounted Returning null for Entire Page Body

Already covered in Section 2. Impact: entire site is invisible to crawlers despite appearing as `○ Static` in build output.

### Bug 6: Wrong OG Image Dimensions

```ts
// ❌ Non-standard — causes cropped previews
ogImage: { width: 640, height: 321 }
ogImage: { width: 641, height: 321 }

// ✅ Universal standard
ogImage: { width: 1200, height: 630 }
```

### Bug 7: Empty sameAs Array

```ts
// ❌ Empty — no Knowledge Panel, no entity linking
sameAs: []

// ✅ All active social/directory profiles
sameAs: [
  "https://www.linkedin.com/company/your-company",
  "https://twitter.com/YourHandle",
]
```

### Bug 8: Non-www vs www Inconsistency

```txt
# ❌ Inconsistent — robots.txt uses non-www but site serves www
Host: https://yourdomain.com
Sitemap: https://yourdomain.com/sitemap.xml

# ✅ Consistent with live site
Host: https://www.yourdomain.com
Sitemap: https://www.yourdomain.com/sitemap.xml
```

### Bug 9: Broken Logo URL in Article JSON-LD

```ts
// ❌ File does not exist at /logo.png
publisher: { logo: { url: `${baseUrl}/logo.png` } }

// ✅ Correct absolute path to actual file
publisher: { logo: { url: `${baseUrl}/assets/static/logo.png` } }
```

### Bug 10: og:locale Inconsistency

```ts
// ❌ Mixed — root metadata says en_US, generateSeo says en_GB
// root layout:
locale: "en_US"
// generateSeo.ts:
locale: "en_GB"

// ✅ Consistent throughout
locale: "en_US"
```

### Bug 11: Missing `dynamicParams = false` on SSG Routes

```tsx
// Without this, Next.js will SSR unknown slugs instead of returning 404
export const dynamicParams = false;

// With this, any slug not returned by generateStaticParams gets a proper 404
```

---

## 18. Platform Registration Checklist

### 🔴 Priority 1 — Do Immediately (Highest ROI)

**Google Search Console** → `search.google.com/search-console`
- Add property for `https://www.{{YOUR_DOMAIN}}`
- Verify via HTML meta tag → add code to `metadata.ts` `verification.google` field
- Submit `https://www.{{YOUR_DOMAIN}}/sitemap.xml`
- Use URL Inspection tool to request indexing for: `/`, `/about`, `/services`, `/blogs`, `/contact`
- Monitor: Coverage report (find any 404s or indexing errors), Core Web Vitals

**Bing Webmaster Tools** → `bing.com/webmasters`
- Import directly from Google Search Console (one-click)
- Bing powers **Microsoft Copilot**, so this is the #1 platform for AI answer visibility
- Submit sitemaps
- Add `msvalidate.01` meta tag to `metadata.ts` verification

**Google Business Profile** → `business.google.com`
- Creates the Knowledge Panel (right-side card) when someone searches your brand name
- Fill: business name, website, phone, email, address, category, description, logo, cover photo
- This is what `sameAs` in your Organization JSON-LD links back to

### 🟡 Priority 2 — AI Search Platforms

**Bing / Copilot** — covered by Bing Webmaster Tools above

**Perplexity** — No direct submission. Allow `PerplexityBot` in `robots.txt` (already covered). Perplexity indexes from Common Crawl + Bing. Getting indexed in Bing is sufficient.

**ChatGPT Search (OpenAI SearchGPT)** — No direct submission. Allow `GPTBot` and `OAI-SearchBot`. OpenAI's search pulls from Bing index. Submit to Bing first.

**Gemini / Google AI Overviews** — Allow `Google-Extended`. Covered by Google Search Console. Well-structured JSON-LD and E-E-A-T signals (author info, organization data) increase chances of being cited in AI Overviews.

**Claude (Anthropic)** — No direct submission. Allow `anthropic-ai` and `Claude-Web`. Content is periodically re-crawled. Ensure `llms.txt` is live.

**You.com** → `datasources.you.com` — Submit your sitemap URL directly.

### 🟡 Priority 3 — Authority & Backlinks

**Clutch.co** → `clutch.co` — Premier B2B agency directory. A verified listing with client reviews is one of the highest-authority backlinks for agencies. Reviewers must be real clients.

**G2** → `g2.com` — Create a company profile. Used by AI tools as a factual data source for software and service companies.

**Crunchbase** → `crunchbase.com` — Free company profile. Heavily cited by AI tools as a factual entity source for company information.

**LinkedIn Company Page** → `linkedin.com/company/{{LINKEDIN_SLUG}}` — Ensure it is claimed, fully populated (logo, banner, description, website URL, industry). Must match the URL in `sameAs`.

**Twitter/X Profile** → Ensure it is active and the handle matches `twitterHandle` in `siteConfig`.

### 🟢 Priority 4 — Industry-Specific Directories

Depending on your industry, list on relevant directories. Each listing is a backlink and adds to your entity's authority:

- **Agency directories:** Clutch, Agency Spotter, DesignRush, GoodFirms
- **SaaS/Tech:** Product Hunt, AlternativeTo, StackShare
- **General business:** Better Business Bureau, Manta, Alignable
- **Local/regional:** Local chamber of commerce site, Google Maps listing

---

## 19. Verification & Testing Tools

Run these after every deployment, and after any metadata or JSON-LD change.

### Structured Data

| Tool | URL | What to Test |
|---|---|---|
| Google Rich Results Test | `search.google.com/test/rich-results` | Article, Breadcrumb, Organization, Service schemas |
| Schema.org Validator | `validator.schema.org` | All JSON-LD — catches type errors and missing required fields |
| Google Search Console Rich Results | Inside GSC → Enhancements | Monitor for warnings after indexing |

### Open Graph & Social Previews

| Tool | URL | What to Test |
|---|---|---|
| Facebook / Meta Debugger | `developers.facebook.com/tools/debug` | Clears Facebook/WhatsApp OG cache, shows parsed preview |
| LinkedIn Post Inspector | `linkedin.com/post-inspector` | Critical for B2B — test every important page |
| Twitter Card Validator | `cards-dev.twitter.com/validator` | Verify `summary_large_image` and correct image dimensions |
| OpenGraph.xyz | `opengraph.xyz` | Quick multi-platform preview |

### Crawlability & Raw HTML

```bash
# Confirm content is in raw HTML (not JS-only)
curl -s https://www.{{YOUR_DOMAIN}}/ | grep -o '<h1[^>]*>[^<]*</h1>'

# Confirm exactly one h1 per page
curl -s https://www.{{YOUR_DOMAIN}}/about | grep -o '<h1' | wc -l

# Confirm canonical URL is correct and absolute
curl -s https://www.{{YOUR_DOMAIN}}/about | grep -o 'rel="canonical".*href="[^"]*"'

# Confirm JSON-LD is present
curl -s https://www.{{YOUR_DOMAIN}}/ | grep -o 'application/ld+json'

# Confirm robots.txt is correct
curl -s https://www.{{YOUR_DOMAIN}}/robots.txt

# Confirm sitemap is accessible
curl -s https://www.{{YOUR_DOMAIN}}/sitemap.xml | head -20

# Confirm llms.txt is accessible
curl -s https://www.{{YOUR_DOMAIN}}/llms.txt | head -10
```

### Performance (Core Web Vitals)

| Tool | URL | What to Measure |
|---|---|---|
| PageSpeed Insights | `pagespeed.web.dev` | LCP, CLS, FID/INP — all should be green |
| WebPageTest | `webpagetest.org` | Detailed waterfall, TTFB |
| Lighthouse | Chrome DevTools → Lighthouse tab | Full audit including accessibility and SEO score |

Core Web Vitals targets:
- **LCP (Largest Contentful Paint):** < 2.5s
- **CLS (Cumulative Layout Shift):** < 0.1
- **INP (Interaction to Next Paint):** < 200ms
- **TTFB (Time to First Byte):** < 800ms

---

## 20. Master Implementation Checklist

Use this as a handoff checklist when implementing SEO in a new Next.js App Router project.

### Phase 1: Foundation (Before Writing Any Content)

**Static Generation**
- [ ] All marketing pages have `export const dynamic = "force-static"` at the top
- [ ] All `[slug]` routes have `generateStaticParams` + `export const dynamicParams = false`
- [ ] Build output shows `○` for all marketing pages, `●` for SSG routes, `ƒ` only for API routes
- [ ] No marketing page triggers the edge runtime warning

**SSR Killer Check**
- [ ] Search entire codebase: `grep -r "useMounted" src/ -l`
- [ ] For every result: confirm it does NOT wrap `{children}` in a layout or provider
- [ ] Search for Client Components wrapping children: `grep -r '"use client"' src/ --include="*.tsx" -l | xargs grep -l "children"`
- [ ] Confirm Provider components render children unconditionally on both server and client
- [ ] Run `curl -s https://www.{{YOUR_DOMAIN}} | grep -o '<h1[^>]*>[^<]*</h1>'` — must return results

**Site Configuration**
- [ ] `src/config/index.ts` has production URL (not `vercel.app`, not `localhost`)
- [ ] `siteConfig.url` uses the exact canonical form (`www` or non-`www`) consistently
- [ ] `siteConfig.ogImage.url` is an absolute URL pointing to a file that actually exists (verify with `curl -I`)
- [ ] `siteConfig.ogImage` dimensions are exactly `1200 × 630`
- [ ] `siteConfig.twitterHandle` is the brand account, not a personal developer account
- [ ] All hardcoded staging/example URLs removed from entire codebase: `grep -r "vercel.app\|example.com\|localhost" src/`

### Phase 2: Metadata System

**Root Metadata (`layout.tsx` / `metadata.ts`)**
- [ ] `metadataBase` set to production URL
- [ ] `title.template` set to `"%s | {{SITE_NAME}}"`
- [ ] `description` is 150–160 characters
- [ ] `openGraph.locale` = `en_US` (consistent everywhere)
- [ ] `openGraph.images[0]` dimensions = `1200 × 630` with `alt` and `type` set
- [ ] `twitter.site` and `twitter.creator` = brand handle (not personal)
- [ ] `twitter.images[0]` dimensions = `1200 × 630`
- [ ] `verification` fields commented out with clear placeholder labels (fill after GSC setup)
- [ ] `alternates.canonical` = absolute production URL
- [ ] `robots.googleBot` has `max-image-preview: "large"` and `max-snippet: -1`
- [ ] `icons.apple` points to a 180×180 PNG that actually exists

**`generateSeo` Utility**
- [ ] Constructs absolute canonical URLs (`url.startsWith("http") ? url : siteConfig.url + url`)
- [ ] Falls back to `siteConfig.ogImage.url` when no image is passed
- [ ] OG image dimensions hardcoded to `1200 × 630`
- [ ] `twitter.site` and `twitter.creator` sourced from `siteConfig.twitterHandle`
- [ ] `locale` = `en_US` (not `en_GB` or anything else)

**Per-Page Metadata**
- [ ] Every page file exports `generateMetadata` or `export const metadata`
- [ ] Blog detail: `metaTitle`, `metaDescription`, `primaryKeyword`, `secondaryKeywords` from frontmatter
- [ ] Blog detail: OG image uses `/api/og?title=...&excerpt=...` for unique per-post images
- [ ] Blog detail: `openGraph.type = "article"` with `publishedTime` and `authors`
- [ ] Blog detail: `alternates.canonical` = absolute post URL
- [ ] Service detail: unique title and description per service

### Phase 3: Structured Data (JSON-LD)

**Layout Level (every page)**
- [ ] `Organization` schema with: `name`, `url`, `logo`, `description`, `sameAs`, `contactPoint`, `address`
- [ ] `sameAs` includes all active social/directory profiles (LinkedIn, Twitter minimum)
- [ ] `contactPoint` includes `email` and `telephone`
- [ ] `address` uses proper `PostalAddress` type with `addressCountry` ISO code
- [ ] `WebSite` schema with `potentialAction` SearchAction
- [ ] Both schemas injected as `<script type="application/ld+json">` in `<head>` (not `<body>`)
- [ ] Logo URL in JSON-LD is absolute and returns HTTP 200: `curl -I {{LOGO_URL}}`

**Blog Detail Page**
- [ ] `Article` schema with: `headline`, `description`, `image`, `datePublished`, `dateModified`, `author`, `publisher`, `mainEntityOfPage`, `keywords`, `wordCount`, `timeRequired`
- [ ] `publisher.logo` path is correct and resolves (common bug: `/logo.png` vs `/assets/static/logo.png`)
- [ ] `BreadcrumbList` schema with correct `position` numbers (1, 2, 3...)
- [ ] Visible `<nav aria-label="Breadcrumb">` matching the JSON-LD breadcrumb

**Service Detail Page**
- [ ] `Service` schema with: `name`, `description`, `provider`, `serviceType`, `areaServed`, `url`
- [ ] `BreadcrumbList` schema
- [ ] Visible breadcrumb nav

**Validation**
- [ ] Run every page through `search.google.com/test/rich-results`
- [ ] Run every page through `validator.schema.org`
- [ ] No errors — warnings acceptable

### Phase 4: Semantic HTML

**Heading Hierarchy**
- [ ] Every page has exactly one `<h1>` (run: `curl -s {{URL}} | grep -o '<h1' | wc -l` → must be `1`)
- [ ] Hero with visually stacked words uses a single `<h1>` with `<span className="block">` children
- [ ] All section headings use `<h2>`
- [ ] All card titles and sub-section headings use `<h3>`
- [ ] Footer brand name uses `<p>` or `<span>`, not `<h1>`
- [ ] No `<h1>` inside repeating card components (`BlogCard`, `ServiceCard`, `ExperienceCard`, etc.)
- [ ] Heading audit passes: `grep -o '<h[1-6][^>]*>[^<]*</h[1-6]>' .next/server/app/index.html`

**Semantic Elements**
- [ ] Blog post body wrapped in `<article>`
- [ ] Navigation wrapped in `<nav aria-label="...">`
- [ ] Page footer uses `<footer>`
- [ ] All images have descriptive `alt` attributes (no empty `alt=""` on content images)

### Phase 5: Crawlability Files

**`public/robots.txt`**
- [ ] Default `User-agent: *` with appropriate `Disallow` for `/api/`, `/_next/`, `/admin`
- [ ] Explicit `Allow: /` entries for all major AI crawlers:
  - `GPTBot`, `OAI-SearchBot`, `ChatGPT-User` (OpenAI)
  - `anthropic-ai`, `Claude-Web` (Anthropic)
  - `Google-Extended` (Google AI)
  - `PerplexityBot` (Perplexity)
  - `CCBot` (Common Crawl)
  - `Applebot-Extended` (Apple Intelligence)
  - `cohere-ai` (Cohere)
  - `FacebookBot` (Meta AI)
  - `Bytespider` (ByteDance)
- [ ] `Host:` directive uses canonical domain with `www`
- [ ] `Sitemap:` directives use canonical domain with `www`
- [ ] If using `next-sitemap` with `generateRobotsTxt: true`, all of the above is in `robotsTxtOptions`
- [ ] `curl -s https://www.{{YOUR_DOMAIN}}/robots.txt` returns the file correctly

**`public/sitemap.xml` / `next-sitemap`**
- [ ] `siteUrl` in `next-sitemap.config.cjs` uses production URL with `www`
- [ ] `transform` function assigns: homepage priority `1.0`, blog posts `0.9`, services `0.8`, others `0.7`
- [ ] `postbuild` script runs `next-sitemap` after every build
- [ ] Built sitemap accessible at `https://www.{{YOUR_DOMAIN}}/sitemap.xml`

**`public/llms.txt`**
- [ ] File exists and is accessible at `https://www.{{YOUR_DOMAIN}}/llms.txt`
- [ ] Starts with `# {{SITE_NAME}}` and `> one-line description`
- [ ] Lists all services with direct absolute URLs
- [ ] Lists 5–10 most important blog posts with direct absolute URLs
- [ ] Includes contact info: email, phone, address, social links
- [ ] Includes full site map section with all page URLs
- [ ] Updated whenever a new service page or major blog post is added

### Phase 6: Content SEO

**Blog Frontmatter (every post)**
- [ ] `title` — display title
- [ ] `metaTitle` — SEO-optimised, 50–60 characters, contains primary keyword
- [ ] `metaDescription` / `excerpt` — 150–160 characters
- [ ] `primaryKeyword` — the single target search term
- [ ] `secondaryKeywords` — 3–6 related terms
- [ ] `date` — ISO 8601 full timestamp
- [ ] `coverImage` — absolute path from `/public`, image actually exists
- [ ] `author.picture` — absolute path from `/public`, image actually exists

**Content Structure**
- [ ] Primary keyword appears in first 100 words
- [ ] Primary keyword in at least one `<h2>`
- [ ] Minimum 800 words for every post
- [ ] At least one internal link to a service page
- [ ] At least one internal link to another blog post
- [ ] Reading time displayed in blog hero
- [ ] Related posts section at bottom of every post

**URL / Slug Rules**
- [ ] All slugs use `kebab-case` only (no underscores)
- [ ] Primary keyword included in slug where natural
- [ ] No dates in slug unless content is strictly time-bound

### Phase 7: Platform Registrations

- [ ] **Google Search Console** — property added, verified, sitemap submitted, key pages indexed
- [ ] **Google Business Profile** — claimed, fully filled, website URL set
- [ ] **Bing Webmaster Tools** — imported from GSC, sitemaps submitted
- [ ] **LinkedIn Company Page** — claimed, logo, description, website URL all set; URL matches `sameAs`
- [ ] **Twitter/X Profile** — active, handle matches `siteConfig.twitterHandle`
- [ ] **Crunchbase** — company profile created with correct website URL
- [ ] **Clutch / G2** — listing created (for agencies and B2B services)
- [ ] Verification codes from GSC and Bing added to `metadata.ts` and redeployed

### Phase 8: Post-Deployment Verification

Run these commands and checks after every deployment:

```bash
# 1. Content is in raw HTML
curl -s https://www.{{YOUR_DOMAIN}}/ | grep -o '<h1[^>]*>[^<]*</h1>'

# 2. Exactly one h1 per page
for page in "" about services blogs contact; do
  url="https://www.{{YOUR_DOMAIN}}/${page}"
  count=$(curl -s "$url" | grep -o '<h1' | wc -l)
  echo "$url: $count h1(s)"
done

# 3. Canonical tags are absolute and correct
curl -s https://www.{{YOUR_DOMAIN}}/about | grep -o 'canonical.*href="[^"]*"'

# 4. JSON-LD present
curl -s https://www.{{YOUR_DOMAIN}}/ | grep -c 'application/ld+json'

# 5. robots.txt correct
curl -s https://www.{{YOUR_DOMAIN}}/robots.txt | grep -E "Sitemap|Host|GPTBot"

# 6. sitemap accessible
curl -s https://www.{{YOUR_DOMAIN}}/sitemap.xml | grep "<loc>"

# 7. llms.txt accessible
curl -s https://www.{{YOUR_DOMAIN}}/llms.txt | head -5

# 8. Logo resolves
curl -I https://www.{{YOUR_DOMAIN}}/assets/static/logo.png | grep "HTTP"

# 9. OG image resolves
curl -I "https://www.{{YOUR_DOMAIN}}/api/og?title=Test" | grep "HTTP"
```

**Manual checks:**
- [ ] `search.google.com/test/rich-results` — test homepage, a blog post, a service page
- [ ] `developers.facebook.com/tools/debug` — test homepage and a blog post
- [ ] `linkedin.com/post-inspector` — test homepage and a blog post
- [ ] `pagespeed.web.dev` — LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] `validator.schema.org` — no errors on any page

---

## Quick Reference: Key Numbers

| Property | Correct Value |
|---|---|
| OG image width | **1200px** |
| OG image height | **630px** |
| Meta description length | **150–160 characters** |
| `<title>` tag length | **50–60 characters** |
| LCP target | **< 2.5 seconds** |
| CLS target | **< 0.1** |
| INP target | **< 200ms** |
| Minimum article word count | **800 words** |
| Max `<h1>` per page | **1** |
| `dynamicParams` on SSG routes | **false** |

## Quick Reference: Files to Create or Modify

| File | Purpose |
|---|---|
| `src/config/index.ts` | Single source of truth for all site URLs and handles |
| `src/types/index.ts` | `SiteConfig` type + `Blog`, `Service`, `Author` types |
| `src/utils/generateSeo.ts` | Reusable per-page metadata generator |
| `src/utils/api.ts` | `getAllPosts`, `getPostBySlug`, `getRelatedPosts`, `calculateReadingTime` |
| `src/utils/markdownToHtml.ts` | Markdown → HTML with figure/figcaption support |
| `src/app/(marketing)/metadata.ts` | Root metadata + Organization + WebSite JSON-LD |
| `src/app/(marketing)/layout.tsx` | Injects JSON-LD, no `useMounted` in Provider |
| `src/utils/globalProvider.tsx` | Provider with no `useMounted` guard |
| `public/robots.txt` | Allow all crawlers including AI bots |
| `public/llms.txt` | AI discoverability file |
| `public/manifest.json` | PWA manifest |
| `next-sitemap.config.cjs` | Sitemap generation with per-page priorities |
| `package.json` | `postbuild` script running `next-sitemap` |