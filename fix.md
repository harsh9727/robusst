# Robusst — CMS Cache & ISR Fix Guide

> **Audience:** The agent / developer implementing these fixes.
> **Scope:** Three independent but related problems found in the Robusst Next.js codebase deployed on Vercel.

---

## Table of Contents

1. [Problem Overview](#1-problem-overview)
2. [Problem A — PPR breaks `revalidatePath`](#2-problem-a--ppr-breaks-revalidatepath)
3. [Problem B — Build-time CMS timeouts](#3-problem-b--build-time-cms-timeouts)
4. [Problem C — Incomplete `SCHEMA_PATHS` map + wrong blog path](#4-problem-c--incomplete-schema_paths-map--wrong-blog-path)
5. [How ISR + On-Demand Revalidation Should Work](#5-how-isr--on-demand-revalidation-should-work)
6. [All File Changes (copy-paste ready)](#6-all-file-changes-copy-paste-ready)
7. [Verification Checklist](#7-verification-checklist)
8. [Architecture Reference](#8-architecture-reference)
9. [Correct Rendering Strategy — ISR for a CMS-Driven Site](#9-correct-rendering-strategy--isr-for-a-cms-driven-site)
10. [Agent Codebase Audit Instructions](#10-agent-codebase-audit-instructions)

---

## 1. Problem Overview

Three distinct problems are preventing CMS content updates from appearing on the live site.

| # | Problem | Symptom | Root Cause |
|---|---------|---------|------------|
| A | PPR segment cache not busted | `x-vercel-cache: HIT` persists after webhook | Next.js PPR creates multiple edge cache entries per page; `revalidatePath` only busts one of them |
| B | CMS unreachable at build time | `ConnectTimeoutError` in build logs for all locales | Vercel's build network cannot reach the CMS server, so pages bake in `null` content at deploy time |
| C | Wrong/missing path mappings | Edge cache for most pages never purged | `SCHEMA_PATHS` only maps `home`; blog paths use `/blog` instead of `/blogs` |

All three must be fixed. Fixing only the revalidation code (A + C) while the build still fails (B) means you're perfectly invalidating a cache that contains empty content.

---

## 2. Problem A — PPR breaks `revalidatePath`

### What is happening

Your response headers prove this:

```
x-nextjs-postponed: 2
x-nextjs-prerender: 1
x-matched-path: /en.segments/_tree.segment.rsc
```

**Partial Prerendering (PPR)** is active. PPR splits every page into:
- A static HTML shell (cached at Vercel's edge CDN)
- One or more RSC segment files (also cached separately, e.g. `/en.segments/_tree.segment.rsc`)

When you call `revalidatePath("/en", "page")`, Next.js invalidates the page-level cache entry. But Vercel's CDN has also cached the segment RSC files under different cache keys. Those segment caches are **not** busted by `revalidatePath` — they have their own TTL and their own cache entries.

The result: even after a successful webhook, users still get the old segment content because `x-vercel-cache: HIT` is served from the stale segment cache.

### Why PPR is on (you didn't enable it)

Next.js 15+ enables PPR incrementally by default in some configurations. You haven't set `ppr: false` in `next.config.js`, so it is silently active. The `Expire 1y` column in your build output confirms this — standard ISR pages do not get a 1-year CDN TTL.

```
● /[locale]   Revalidate 5m   Expire 1y   ← PPR active
```

### Fix

**Step 1 — Disable PPR globally in `next.config.js`:**

```js
// next.config.js
experimental: {
  optimizeCss: true,
  optimizePackageImports: [
    "framer-motion",
    "lucide-react",
    "react-icons",
    "recharts",
    "swiper",
  ],
  ppr: false,   // ← ADD THIS LINE
},
```

**Step 2 — Opt out at the page level as an explicit safety net.**

Add this export to every page that consumes CMS content. Based on your file tree, that includes at minimum:

```ts
// Add to each of these files:
// src/app/[locale]/(default)/page.tsx
// src/app/[locale]/(default)/about/page.tsx
// src/app/[locale]/(default)/contact/page.tsx
// src/app/[locale]/(default)/partnership/page.tsx
// src/app/[locale]/(default)/platforms/page.tsx
// src/app/[locale]/(default)/solutions/page.tsx  (and all sub-pages)
// src/app/[locale]/(default)/careers/page.tsx
// src/app/[locale]/(default)/poc_waitlist/page.tsx
// src/app/[locale]/(default)/stories/page.tsx

export const experimental_ppr = false;
```

**After this fix**, the build output should change from:

```
● /[locale]   Revalidate 5m   Expire 1y
```

to:

```
● /[locale]   Revalidate 5m
```

No `Expire` column means standard ISR — `revalidatePath` will work correctly.

---

## 3. Problem B — Build-time CMS timeouts

### What is happening

Your build log shows:

```
[CMS] getCmsContent("home", "en") threw: TypeError: fetch failed
  ConnectTimeoutError: Connect Timeout Error
    (attempted addresses: 216.198.79.131:443, 64.29.17.131:443, timeout: 10000ms)
```

This happens for every schema and every locale during `next build`. Because `getCmsContent` catches the error and returns `null`, the build **succeeds** but every page is baked with empty/null CMS content.

This means your ISR cache — the data that gets served on the first hit — contains no CMS content at all. Revalidation works correctly but there's nothing meaningful to invalidate.

### Two sub-causes

**Sub-cause 1 — Environment variables not set in Vercel for Production builds.**

Go to Vercel dashboard → Project → Settings → Environment Variables and verify:
- `CMS_BASE_URL` is set for **Production** (not just Preview/Development)
- `CMS_API_KEY` is set for **Production**

They are often set for Preview but missed for Production.

**Sub-cause 2 — CMS server firewall blocks Vercel build IPs.**

Vercel's build runners use a range of dynamic IPs. If your CMS server (at `216.198.79.131` / `64.29.17.131`) has an IP allowlist, it needs to allow all Vercel build IPs, or you need to disable the allowlist for the `/api/v1/content` route during builds.

Vercel's current build IP ranges are published at: https://vercel.com/docs/security/deployment-protection/methods-to-protect-all-deployments/vercel-authentication

### Fix — Make build failures loud and visible

Currently `getCmsContent` silently swallows errors at build time. Change it to throw during builds so broken deploys fail fast instead of silently serving empty pages:

```ts
// src/lib/cms/client.ts

export async function getCmsContent<T = Record<string, unknown>>(
  schema: string,
  locale: string,
): Promise<T | null> {
  const isBuildTime =
    process.env.NEXT_PHASE === "phase-production-build" ||
    process.env.NEXT_PHASE === "phase-export";

  try {
    const url = new URL("/api/v1/content", env.CMS_BASE_URL);
    url.searchParams.set("schema", schema);
    url.searchParams.set("locale", locale);

    const res = await fetch(url.toString(), {
      headers: { "x-api-key": env.CMS_API_KEY },
      next: {
        revalidate: 300,
        tags: [cmsTag(schema, locale)],
      },
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "(unreadable)");
      const msg = `[CMS] ${schema}/${locale} → ${res.status} ${res.statusText}: ${body}`;
      if (isBuildTime) throw new Error(msg);
      console.error(msg);
      return null;
    }

    const json = (await res.json()) as CmsResponse<T>;
    const content = json.data?.content;

    if (content === undefined || content === null) {
      const msg =
        `[CMS] ${schema}/${locale} → "data.content" missing. ` +
        `error=${String(json.error)}, message=${json.message ?? "—"}`;
      if (isBuildTime) throw new Error(msg);
      console.error(msg);
      return null;
    }

    return content;
  } catch (err) {
    const msg = `[CMS] getCmsContent("${schema}", "${locale}") threw: ${String(err)}`;
    if (isBuildTime) {
      throw new Error(
        `${msg}\n\nBuild-time CMS fetch failed. Check:\n` +
        `  1. CMS_BASE_URL is set in Vercel → Settings → Environment Variables (Production)\n` +
        `  2. CMS_API_KEY is set in Vercel → Settings → Environment Variables (Production)\n` +
        `  3. CMS server allows connections from Vercel build IPs\n` +
        `  4. CMS server is running and healthy`,
      );
    }
    console.error(msg);
    return null;
  }
}
```

> **Note:** Once you confirm the CMS is reachable from Vercel builds (sub-causes resolved), this change will make broken deploys fail loudly instead of silently deploying empty pages. That is the desired behaviour.

---

## 4. Problem C — Incomplete `SCHEMA_PATHS` map + wrong blog path

### What is happening

**Issue 1 — Only `home` is mapped.**

Your current `SCHEMA_PATHS`:

```ts
const SCHEMA_PATHS: Record<string, (locale: string) => string[]> = {
  home: (locale) => [`/${locale}`],
  // everything else is missing
};
```

When `content.published` fires for `about`, `contact`, `solutions`, or any other schema, `getPathsForSchema` returns `[]` and `revalidatePath` is never called. The fetch cache (Layer 1) gets purged, but Vercel's edge CDN (Layer 2) keeps serving stale HTML for those pages forever.

**Issue 2 — Blog paths use `/blog` (singular) but your file tree uses `/blogs` (plural).**

Your file tree:
```
src/app/[locale]/(default)/blogs/page.tsx        ← plural
src/app/[locale]/(default)/blogs/[slug]/page.tsx ← plural
```

Your revalidate route:
```ts
purgePath(`/${body.locale}/blog/${body.slug}`);  // ← WRONG, singular
purgePath(`/${body.locale}/blog`);               // ← WRONG, singular
```

These paths don't exist, so `revalidatePath` calls are no-ops for blog pages.

### Fix — Complete rewrite of `src/api/revalidate/route.ts`

See the full corrected file in [Section 6](#6-all-file-changes-copy-paste-ready).

Key changes:

```ts
// 1. Full SCHEMA_PATHS covering all schemas from the file tree
const SCHEMA_PATHS: Record<string, (locale: string) => string[]> = {
  home:                (l) => [`/${l}`],
  aboutPage:           (l) => [`/${l}/about`],
  contact:             (l) => [`/${l}/contact`],
  partnership:         (l) => [`/${l}/partnership`],
  platforms:           (l) => [`/${l}/platforms`],
  solutionsPage:       (l) => [`/${l}/solutions`],
  aiCall:              (l) => [`/${l}/solutions/ai-call-center`],
  brand:               (l) => [`/${l}/solutions/branded-calling`],
  cdp:                 (l) => [`/${l}/solutions/customer-data-platform`],
  customizeSolution:   (l) => [`/${l}/solutions/customized-solutions`],
  cybersecurity:       (l) => [`/${l}/solutions/cybersecurity`],
  noc:                 (l) => [`/${l}/solutions/intelligent-noc`],
  networkMonetization: (l) => [`/${l}/solutions/network-monetization`],
  stsAndDms:           (l) => [`/${l}/solutions/sts-dms`],
  careers:             (l) => [`/${l}/careers`],
  pocWaitlist:         (l) => [`/${l}/poc_waitlist`],
  storyPage:           (l) => [`/${l}/stories`],
  successStories:      (l) => [`/${l}/stories`],
  // Global schemas → use "layout" scope (purges all pages under the layout)
  header:              (l) => [`/${l}`],
  footer:              (l) => [`/${l}`],
  common:              (l) => [`/${l}`],
};

// 2. Layout-scoped schemas (affect every page, need layout purge not page purge)
const LAYOUT_SCHEMAS = new Set(["header", "footer", "common"]);

// 3. Blog paths corrected to /blogs (plural)
case "blog.published":
case "blog.unpublished": {
  purgeTag(blogPostTag(body.slug, body.locale));
  purgeTag(blogListTag(body.locale));
  revalidatePath(`/${body.locale}/blogs/${body.slug}`, "page");
  revalidatePath(`/${body.locale}/blogs`, "page");
  break;
}

// 4. Warning when a schema has no path mapping
function getPathsForSchema(schema: string, locale: string): string[] {
  const paths = SCHEMA_PATHS[schema]?.(locale);
  if (!paths) {
    console.warn(
      `[revalidate] No SCHEMA_PATHS entry for schema="${schema}". ` +
      `Layer 2 (Vercel edge) cache NOT purged for locale="${locale}". ` +
      `Add it to SCHEMA_PATHS in src/app/api/revalidate/route.ts.`
    );
    return [];
  }
  return paths;
}
```

---

## 5. How ISR + On-Demand Revalidation Should Work

This section explains the intended architecture so you can reason about future changes correctly.

### The two cache layers

```
User Request
     │
     ▼
┌─────────────────────────────────┐
│  Layer 2: Vercel Edge CDN       │  ← Busted by: revalidatePath()
│  (fully rendered HTML/RSC)      │
└────────────────┬────────────────┘
                 │ MISS
                 ▼
┌─────────────────────────────────┐
│  Layer 1: Next.js Fetch Cache   │  ← Busted by: revalidateTag()
│  (raw CMS API responses)        │
└────────────────┬────────────────┘
                 │ MISS
                 ▼
┌─────────────────────────────────┐
│  Your CMS API                   │
│  (source of truth)              │
└─────────────────────────────────┘
```

Both layers must be purged on every CMS publish event. `revalidateTag` alone only purges Layer 1. Without `revalidatePath`, Layer 2 keeps serving old HTML from the CDN.

### The correct request lifecycle

1. **Build time:** `next build` fetches all CMS content → bakes fully rendered static HTML → stored in Layer 2
2. **User visits site:** Layer 2 serves cached HTML instantly (no CMS call, no server rendering)
3. **Content editor publishes in CMS:** CMS fires webhook to `POST /api/revalidate`
4. **Webhook handler:**
   - Calls `revalidateTag(tag, "max")` → Layer 1 fetch cache entry marked stale
   - Calls `revalidatePath(path, "page")` → Layer 2 CDN entry evicted
5. **Next user request:** Layer 2 MISS → Next.js re-renders the page → fetches fresh data from CMS → response cached in both layers again
6. **Subsequent requests:** Back to fast CDN serving

### SEO implications

With PPR disabled and standard ISR active:
- Crawlers receive fully rendered HTML (no JS required)
- First render after revalidation may take ~200–500ms (server render) but that's one request only
- All subsequent requests are CDN-fast again
- `revalidate: 300` provides a 5-minute safety net even if the webhook fails

---

## 6. All File Changes (copy-paste ready)

### File 1: `next.config.js`

Add `ppr: false` to the `experimental` block:

```js
// next.config.js
import "./src/env.js";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://assets.calendly.com https://platform.linkedin.com https://us-assets.i.posthog.com",
      "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' data:",
      "frame-src https://calendly.com https://js.stripe.com",
      "connect-src 'self' https://us.i.posthog.com https://us-assets.i.posthog.com https://api.stripe.com https://ingest.robusst.com",
      "media-src 'self' blob:",
      "worker-src 'self' blob:",
    ].join("; "),
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

/** @type {import("next").NextConfig} */
const config = {
  compress: true,
  productionBrowserSourceMaps: true,
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "react-icons",
      "recharts",
      "swiper",
    ],
    ppr: false,   // ← ADDED: disable PPR so revalidatePath works correctly
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async rewrites() {
    return [
      { source: "/ingest/static/:path*", destination: "https://us-assets.i.posthog.com/static/:path*" },
      { source: "/ingest/:path*", destination: "https://us.i.posthog.com/:path*" },
    ];
  },
  async redirects() {
    return [
      { source: "/success-stories", destination: "/en/stories", permanent: true },
      { source: "/en/success-stories", destination: "/en/stories", permanent: true },
      { source: "/solutions/cdp", destination: "/en/solutions/customer-data-platform", permanent: true },
      { source: "/en/solutions/cdp", destination: "/en/solutions/customer-data-platform", permanent: true },
      { source: "/solutions/customized", destination: "/en/solutions/customized-solutions", permanent: true },
      { source: "/en/solutions/customized", destination: "/en/solutions/customized-solutions", permanent: true },
      { source: "/solutions/sales-tracking", destination: "/en/solutions/sts-dms", permanent: true },
      { source: "/en/solutions/sales-tracking", destination: "/en/solutions/sts-dms", permanent: true },
      { source: "/solutions/voicesync", destination: "/en/solutions/sts-dms", permanent: true },
      { source: "/en/solutions/voicesync", destination: "/en/solutions/sts-dms", permanent: true },
      { source: "/solutions/cyber-security", destination: "/en/solutions/cybersecurity", permanent: true },
      { source: "/en/solutions/cyber-security", destination: "/en/solutions/cybersecurity", permanent: true },
      {
        source: "/solutions/:path((?!.*\\.(?:webp|webm|mp4|svg|png|jpg|jpeg|gif|ico|css|js|woff|woff2|txt|xml|json)$).*)*",
        destination: "/en/solutions/:path*",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(config);
```

---

### File 2: `src/lib/cms/client.ts`

Full replacement — adds loud build-time failure:

```ts
import { env } from "~/env";

// ── Cache tag helpers ─────────────────────────────────────────────────────────

/** Schema content: `cms-{schema}-{locale}` */
export function cmsTag(schema: string, locale: string): string {
  return `cms-${schema}-${locale}`;
}

/** A single blog post: `cms-blog-{slug}-{locale}` */
export function blogPostTag(slug: string, locale: string): string {
  return `cms-blog-${slug}-${locale}`;
}

/** Blog listing page for a locale: `cms-blog-list-{locale}` */
export function blogListTag(locale: string): string {
  return `cms-blog-list-${locale}`;
}

// ── Webhook payload type ──────────────────────────────────────────────────────

export type WebhookPayload =
  | { event: "content.published"; schema: string; locale: string }
  | { event: "blog.published"; slug: string; locale: string }
  | { event: "blog.unpublished"; slug: string; locale: string }
  | { event: "blog.deleted"; slug: string }
  | { event: "schema.updated"; schema: string };

// ── CMS response envelope ─────────────────────────────────────────────────────

type CmsResponse<T> = {
  data?: {
    schema?: string;
    locale?: string;
    content?: T;
    updatedAt?: string;
  };
  error?: unknown;
  message?: string;
};

// ── Content fetcher ───────────────────────────────────────────────────────────

/**
 * Generic CMS content fetcher with ISR + on-demand revalidation.
 *
 * - Served from Next.js cache after the first hit
 * - Background-revalidated every 5 minutes (time-based baseline)
 * - Instantly purgeable via POST /api/revalidate (on-demand)
 *
 * At RUNTIME: returns null on failure so the site never hard-crashes.
 * At BUILD TIME: throws loudly so broken deploys fail fast instead of
 * silently baking in empty/null content.
 */
export async function getCmsContent<T = Record<string, unknown>>(
  schema: string,
  locale: string,
): Promise<T | null> {
  // True during `next build` / `next export`
  const isBuildTime =
    process.env.NEXT_PHASE === "phase-production-build" ||
    process.env.NEXT_PHASE === "phase-export";

  try {
    const url = new URL("/api/v1/content", env.CMS_BASE_URL);
    url.searchParams.set("schema", schema);
    url.searchParams.set("locale", locale);

    const res = await fetch(url.toString(), {
      headers: { "x-api-key": env.CMS_API_KEY },
      next: {
        revalidate: 300, // 5-minute ISR baseline
        tags: [cmsTag(schema, locale)],
      },
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "(unreadable)");
      const msg = `[CMS] ${schema}/${locale} → ${res.status} ${res.statusText}: ${body}`;
      if (isBuildTime) throw new Error(msg);
      console.error(msg);
      return null;
    }

    const json = (await res.json()) as CmsResponse<T>;
    const content = json.data?.content;

    if (content === undefined || content === null) {
      const msg =
        `[CMS] ${schema}/${locale} → "data.content" missing. ` +
        `error=${String(json.error)}, message=${json.message ?? "—"}`;
      if (isBuildTime) throw new Error(msg);
      console.error(msg);
      return null;
    }

    return content;
  } catch (err) {
    // Don't double-wrap errors we already threw above
    if (err instanceof Error && err.message.startsWith("[CMS]") && isBuildTime) {
      throw err;
    }

    const msg = `[CMS] getCmsContent("${schema}", "${locale}") threw: ${String(err)}`;

    if (isBuildTime) {
      throw new Error(
        `${msg}\n\n` +
        `Build-time CMS fetch failed. Checklist:\n` +
        `  1. CMS_BASE_URL is set in Vercel → Settings → Environment Variables (Production scope)\n` +
        `  2. CMS_API_KEY is set in Vercel → Settings → Environment Variables (Production scope)\n` +
        `  3. Your CMS server allowlists Vercel build runner IPs\n` +
        `     See: https://vercel.com/docs/security/deployment-protection\n` +
        `  4. CMS server is running and healthy at ${env.CMS_BASE_URL}`,
      );
    }

    console.error(msg);
    return null;
  }
}
```

---

### File 3: `src/app/api/revalidate/route.ts`

Full replacement — fixes PPR, blog paths, and adds complete schema map:

```ts
import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { env } from "~/env";
import {
  cmsTag,
  blogPostTag,
  blogListTag,
  type WebhookPayload,
} from "~/lib/cms/client";
import { locales } from "~/i18n/config";

/**
 * POST /api/revalidate?secret=<REVALIDATE_SECRET>
 *
 * Webhook endpoint called by the CMS on every content/blog event.
 *
 * ── Two-layer cache purging ────────────────────────────────────────────────
 *
 *  Layer 1 — Next.js fetch/data cache
 *    revalidateTag(tag, "max") purges cached fetch() responses tagged with
 *    next: { tags: [...] }. The "max" argument is required in Next.js 16+;
 *    the single-argument form is deprecated.
 *
 *  Layer 2 — Vercel Edge CDN cache
 *    revalidatePath(path, type) evicts the fully-rendered page or layout
 *    from Vercel's CDN. Without this, x-vercel-cache: HIT keeps serving
 *    stale HTML even after the fetch cache has been purged.
 *    Use "page" for page-specific schemas, "layout" for global schemas
 *    (header, footer, common) that affect every page under the layout.
 *
 * ── Events ────────────────────────────────────────────────────────────────
 *
 *  content.published  → purge schema+locale fetch cache + page path(s)
 *  blog.published     → purge post + list fetch cache + blog page paths
 *  blog.unpublished   → same as blog.published
 *  blog.deleted       → purge all locales for post + lists + blog paths
 *  schema.updated     → purge all locales for schema + page paths
 *
 * ── Example payloads ──────────────────────────────────────────────────────
 *
 *  { "event": "content.published", "schema": "home",    "locale": "en" }
 *  { "event": "blog.published",    "slug":  "my-post",  "locale": "en" }
 *  { "event": "blog.unpublished",  "slug":  "my-post",  "locale": "en" }
 *  { "event": "blog.deleted",      "slug":  "my-post"                  }
 *  { "event": "schema.updated",    "schema": "home"                    }
 */

// ── Schema → page path mapping ─────────────────────────────────────────────
//
// Maps every CMS schema name to the URL path(s) it controls.
// Used by revalidatePath to evict Vercel's edge CDN cache (Layer 2).
//
// ⚠️  When you add a new schema to the CMS, add it here too.
//     If a schema is missing, Layer 2 cache will NOT be purged and the
//     live site will keep serving stale content until the 5-minute ISR
//     baseline kicks in.
//
// Scope rules:
//   "page"   → only evicts the specific page route (default for most schemas)
//   "layout" → evicts all pages under that layout subtree (use for global
//               schemas like header/footer/common that appear on every page)

const SCHEMA_PATHS: Record<string, (locale: string) => string[]> = {
  // ── Home ──────────────────────────────────────────────────────────────────
  home:                (l) => [`/${l}`],

  // ── Company pages ─────────────────────────────────────────────────────────
  aboutPage:           (l) => [`/${l}/about`],
  contact:             (l) => [`/${l}/contact`],
  partnership:         (l) => [`/${l}/partnership`],
  platforms:           (l) => [`/${l}/platforms`],
  careers:             (l) => [`/${l}/careers`],
  pocWaitlist:         (l) => [`/${l}/poc_waitlist`],

  // ── Solutions ─────────────────────────────────────────────────────────────
  solutionsPage:       (l) => [`/${l}/solutions`],
  aiCall:              (l) => [`/${l}/solutions/ai-call-center`],
  brand:               (l) => [`/${l}/solutions/branded-calling`],
  cdp:                 (l) => [`/${l}/solutions/customer-data-platform`],
  customizeSolution:   (l) => [`/${l}/solutions/customized-solutions`],
  cybersecurity:       (l) => [`/${l}/solutions/cybersecurity`],
  noc:                 (l) => [`/${l}/solutions/intelligent-noc`],
  networkMonetization: (l) => [`/${l}/solutions/network-monetization`],
  stsAndDms:           (l) => [`/${l}/solutions/sts-dms`],

  // ── Stories ───────────────────────────────────────────────────────────────
  storyPage:           (l) => [`/${l}/stories`],
  successStories:      (l) => [`/${l}/stories`],

  // ── Global / layout-scoped schemas ────────────────────────────────────────
  // These affect every page. Use "layout" scope in revalidatePath so that
  // the entire subtree under /${locale} is evicted, not just the home page.
  header:              (l) => [`/${l}`],
  footer:              (l) => [`/${l}`],
  common:              (l) => [`/${l}`],
};

// Schemas that need "layout" scope instead of "page" scope.
const LAYOUT_SCHEMAS = new Set(["header", "footer", "common"]);

/**
 * Returns the paths to evict for a given schema+locale pair.
 * Logs a warning if the schema is not mapped — this is always a bug.
 */
function getPathsForSchema(schema: string, locale: string): string[] {
  const paths = SCHEMA_PATHS[schema]?.(locale);
  if (!paths) {
    console.warn(
      `[revalidate] ⚠️  No SCHEMA_PATHS entry for schema="${schema}". ` +
      `Layer 2 (Vercel edge CDN) cache NOT purged for locale="${locale}". ` +
      `Add "${schema}" to SCHEMA_PATHS in src/app/api/revalidate/route.ts.`,
    );
    return [];
  }
  return paths;
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  // ── Auth ────────────────────────────────────────────────────────────────────
  const secret = request.nextUrl.searchParams.get("secret");

  if (!env.REVALIDATE_SECRET || secret !== env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: "Invalid or missing revalidation secret." },
      { status: 401 },
    );
  }

  // ── Parse body ──────────────────────────────────────────────────────────────
  let body: WebhookPayload;
  try {
    body = (await request.json()) as WebhookPayload;
  } catch {
    return NextResponse.json(
      { message: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  if (!body.event) {
    return NextResponse.json(
      { message: 'Body must include an "event" field.' },
      { status: 400 },
    );
  }

  // ── Purge helpers ───────────────────────────────────────────────────────────
  const purgedTags: string[] = [];
  const purgedPaths: string[] = [];

  /**
   * Layer 1: purge the Next.js fetch/data cache entry for this tag.
   * "max" is required in Next.js 16+ — single-argument form is deprecated.
   */
  function purgeTag(tag: string) {
    revalidateTag(tag, "max");
    purgedTags.push(tag);
  }

  /**
   * Layer 2: purge the Vercel edge CDN cache for a specific path.
   * "page" evicts only the matched page route.
   * "layout" evicts all pages rendered under the matched layout.
   */
  function purgePath(path: string, type: "page" | "layout" = "page") {
    revalidatePath(path, type);
    purgedPaths.push(`${path}[${type}]`);
  }

  /**
   * Purge both cache layers for a given schema+locale pair.
   * Automatically uses "layout" scope for global schemas.
   */
  function purgeContent(schema: string, locale: string) {
    purgeTag(cmsTag(schema, locale));
    const scope = LAYOUT_SCHEMAS.has(schema) ? "layout" : "page";
    for (const path of getPathsForSchema(schema, locale)) {
      purgePath(path, scope);
    }
  }

  // ── Route per event ─────────────────────────────────────────────────────────
  switch (body.event) {
    // Content schema saved — purge the given locale, or all locales if omitted.
    case "content.published": {
      const localesToPurge =
        body.locale && (locales as readonly string[]).includes(body.locale)
          ? [body.locale]
          : [...locales];

      for (const l of localesToPurge) {
        purgeContent(body.schema, l);
      }
      break;
    }

    // Blog post went live or was taken offline.
    // NOTE: paths use /blogs (plural) to match the file-system route:
    //   src/app/[locale]/(default)/blogs/page.tsx
    //   src/app/[locale]/(default)/blogs/[slug]/page.tsx
    case "blog.published":
    case "blog.unpublished": {
      purgeTag(blogPostTag(body.slug, body.locale));
      purgeTag(blogListTag(body.locale));
      purgePath(`/${body.locale}/blogs/${body.slug}`, "page");
      purgePath(`/${body.locale}/blogs`, "page");
      break;
    }

    // Blog post deleted — may have existed in every locale.
    case "blog.deleted": {
      for (const l of locales) {
        purgeTag(blogPostTag(body.slug, l));
        purgeTag(blogListTag(l));
        purgePath(`/${l}/blogs/${body.slug}`, "page");
        purgePath(`/${l}/blogs`, "page");
      }
      break;
    }

    // Schema structure changed — content shape may have shifted for all locales.
    case "schema.updated": {
      for (const l of locales) {
        purgeContent(body.schema, l);
      }
      break;
    }

    default: {
      return NextResponse.json(
        {
          message: `Unknown event type: "${(body as { event: string }).event}".`,
        },
        { status: 400 },
      );
    }
  }

  console.log(
    `[revalidate] event="${body.event}" ` +
    `tags=[${purgedTags.join(", ")}] ` +
    `paths=[${purgedPaths.join(", ")}]`,
  );

  return NextResponse.json({
    revalidated: true,
    event: body.event,
    purgedTags,
    purgedPaths,
    now: new Date().toISOString(),
  });
}
```

---

### File 4: Add `experimental_ppr = false` to CMS pages

Add this single export to every page file that fetches CMS content.
The pages are listed below based on your file tree.

```ts
// Add this line near the top of each file, alongside other exports like
// `generateMetadata`, `generateStaticParams`, etc.
export const experimental_ppr = false;
```

Pages that need this:

```
src/app/[locale]/(default)/page.tsx
src/app/[locale]/(default)/about/page.tsx
src/app/[locale]/(default)/contact/page.tsx
src/app/[locale]/(default)/partnership/page.tsx
src/app/[locale]/(default)/platforms/page.tsx
src/app/[locale]/(default)/poc_waitlist/page.tsx
src/app/[locale]/(default)/solutions/page.tsx
src/app/[locale]/(default)/solutions/ai-call-center/page.tsx
src/app/[locale]/(default)/solutions/branded-calling/page.tsx
src/app/[locale]/(default)/solutions/customer-data-platform/page.tsx
src/app/[locale]/(default)/solutions/customized-solutions/page.tsx
src/app/[locale]/(default)/solutions/cybersecurity/page.tsx
src/app/[locale]/(default)/solutions/intelligent-noc/page.tsx
src/app/[locale]/(default)/solutions/network-monetization/page.tsx
src/app/[locale]/(default)/solutions/sts-dms/page.tsx
src/app/[locale]/(default)/careers/page.tsx
src/app/[locale]/(default)/stories/page.tsx
src/app/[locale]/(default)/stories/[slug]/page.tsx
src/app/[locale]/(default)/blogs/page.tsx
src/app/[locale]/(default)/blogs/[slug]/page.tsx
```

---

## 7. Verification Checklist

Work through these in order after deploying the fixes.

### Before deploying

- [ ] `CMS_BASE_URL` is set in Vercel → Project → Settings → Environment Variables → **Production**
- [ ] `CMS_API_KEY` is set in Vercel → Project → Settings → Environment Variables → **Production**
- [ ] CMS server firewall allows connections from Vercel build runner IPs
- [ ] `next.config.js` has `ppr: false` in `experimental`
- [ ] `src/app/api/revalidate/route.ts` is fully replaced with the new version
- [ ] `src/lib/cms/client.ts` has the build-time throw logic
- [ ] `export const experimental_ppr = false` added to all CMS page files

### Build verification

Run `pnpm build` and confirm:

- [ ] No `ConnectTimeoutError` in the build output
- [ ] No `[CMS] getCmsContent(...) threw` errors
- [ ] The route table no longer shows `Expire 1y` for `● /[locale]` rows
- [ ] Route table shows `Revalidate 5m` only (no `Expire` column)
- [ ] `x-nextjs-postponed` header is gone from page responses

### Runtime verification (after deploy to Vercel)

Trigger a `content.published` webhook for `home` / `en`, then:

- [ ] Check Vercel Function logs — confirm log line: `[revalidate] event="content.published" tags=[cms-home-en] paths=[/en[page]]`
- [ ] Immediately request `https://www.robusst.com/en` → Response header should show `x-vercel-cache: MISS`
- [ ] Request again → `x-vercel-cache: HIT`
- [ ] Update content in CMS → webhook fires → next request is `MISS` again ← **this is the goal**
- [ ] `x-nextjs-postponed` header should no longer appear in any response

### Ongoing — when you add new schemas

Every time a new schema is added to the CMS:

1. Add the schema name and its URL path to `SCHEMA_PATHS` in `route.ts`
2. If the schema is global (affects header/footer/nav), add it to `LAYOUT_SCHEMAS`
3. Deploy — the warning log `⚠️ No SCHEMA_PATHS entry for schema="..."` will alert you if you miss one

---

## 8. Architecture Reference

### Why not use PPR at all for a CMS site?

PPR is designed for pages with a mix of static and dynamic content — e.g., a static marketing shell with a personalised dynamic user section. Your pages are uniformly CMS-driven: the entire page content comes from the same source and should update together. PPR adds complexity (multiple cache entries, segment RSC files) with no benefit for this use case. Standard ISR + on-demand revalidation is the correct pattern.

### Why `revalidate: 300` in addition to the webhook?

The 5-minute ISR baseline is a safety net. If the CMS webhook fails (network blip, misconfigured secret, CMS downtime), pages will still refresh on their own within 5 minutes. It is not the primary revalidation mechanism — the webhook is.

### `"max"` vs no second argument in `revalidateTag`

In Next.js 16, `revalidateTag` has two forms:
- `revalidateTag(tag)` — deprecated single-argument form, targets the old fetch cache only
- `revalidateTag(tag, "max")` — new form, correctly targets all cache systems

Always use `"max"`.

### `"page"` vs `"layout"` in `revalidatePath`

- `revalidatePath("/en/about", "page")` — evicts only `/en/about`
- `revalidatePath("/en", "layout")` — evicts `/en` AND every page rendered under the `/en` layout

Use `"layout"` only for truly global schemas (header, footer, common) to avoid over-invalidating. Over-invalidation is not harmful for correctness but causes unnecessary cache churn and more re-renders.

---

## 9. Correct Rendering Strategy — ISR for a CMS-Driven Site

### The goal

The site must behave fully static for crawlers and users (instant CDN-served HTML, no JS required to see content) while all content remains dynamic and editable through the CMS without requiring a redeploy.

The correct rendering technique for this is **ISR (Incremental Static Regeneration)** with on-demand revalidation.

### Why ISR and not the alternatives

| Technique | Static HTML for crawlers | Content updatable without redeploy | Correct choice |
|-----------|--------------------------|-------------------------------------|----------------|
| Pure SSG | ✅ | ❌ — requires full redeploy on every CMS change | ❌ |
| SSR | ✅ (technically) | ✅ | ❌ — server renders on every request, CDN cannot cache, performance degrades at scale, CMS outage = site down |
| ISR | ✅ | ✅ — webhook triggers instant re-render | ✅ |
| PPR | ✅ (partially) | ⚠️ — partial, segment cache not busted by `revalidatePath` | ❌ for a uniformly CMS-driven site |

### The correct data flow

```
BUILD TIME
  next build
    └─ generateStaticParams() → all locales [en, fr, ru, pt, es, ar]
         └─ for each locale: getCmsContent(schema, locale)
              └─ fetch CMS API → cached with tag + 300s revalidate
         └─ render full HTML page
    └─ all pages stored in Vercel CDN as static HTML

USER VISITS (happy path)
  Browser → Vercel CDN → serves pre-rendered HTML instantly
  x-vercel-cache: HIT
  No CMS call. No server rendering. Crawlers get full HTML.

CMS EDITOR PUBLISHES
  CMS → POST /api/revalidate { event: "content.published", schema: "home", locale: "en" }
    └─ revalidateTag("cms-home-en", "max")  → Layer 1 (fetch cache) marked stale
    └─ revalidatePath("/en", "page")        → Layer 2 (CDN HTML) evicted

NEXT REQUEST AFTER REVALIDATION
  Browser → Vercel CDN → MISS (evicted)
    └─ Next.js server renders /en
         └─ getCmsContent("home", "en") → fetch cache stale → calls CMS API → fresh content
         └─ new HTML rendered and stored in both layers
  x-vercel-cache: MISS (this one request only)

ALL SUBSEQUENT REQUESTS
  x-vercel-cache: HIT again — back to instant static serving
```

### The correct page file pattern

Every CMS-driven page must have all three of these exports. Missing any one of them breaks the ISR contract:

```ts
// src/app/[locale]/(default)/page.tsx  (and every other CMS page)

// 1. Pre-render all locale variants at build time.
//    Without this, the first visitor after deploy triggers a cold server render.
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// 2. Lock to static rendering. Prevents Next.js from silently drifting into
//    SSR if anything in the component tree looks dynamic (cookies, headers,
//    searchParams). Throws a build error if the contract is broken — which
//    is exactly the right behaviour.
export const dynamic = "force-static";

// 3. 5-minute ISR fallback. Safety net if the CMS webhook fails (network
//    blip, misconfigured secret, CMS downtime). Not the primary mechanism —
//    the webhook is. But guarantees content is never more than 5 minutes stale
//    even without a webhook.
export const revalidate = 300;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = await getCmsContent<HomeContent>("home", locale);
  // render using content...
}
```

### What `force-static` actually enforces

`export const dynamic = "force-static"` tells Next.js: this page must be statically renderable. If any component in the tree calls `cookies()`, `headers()`, or reads `searchParams` dynamically, Next.js will throw a build error. This is a guard, not a punishment — it surfaces accidental SSR drift immediately at build time instead of silently degrading production performance.

Without it, a developer adding a cookie check in a shared component six months from now can accidentally turn your entire site dynamic with no warning.

### The layout fetch — easy to miss

Your `src/app/[locale]/layout.tsx` likely fetches header and footer content from the CMS. That fetch must also use `getCmsContent` with the correct cache tag — if it uses a plain `fetch()` without `next: { tags: [...] }`, the webhook `revalidateTag` call will never reach it and header/footer changes won't reflect until the 5-minute ISR baseline kicks in.

```ts
// src/app/[locale]/layout.tsx — correct pattern
export const dynamic = "force-static";
export const revalidate = 300;

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  // Must use getCmsContent so the fetch is tagged and revalidatable
  const header = await getCmsContent<HeaderContent>("header", locale);
  const footer = await getCmsContent<FooterContent>("footer", locale);

  return (
    <html>
      <body>
        <Header data={header} />
        {children}
        <Footer data={footer} />
      </body>
    </html>
  );
}
```

---

## 10. Agent Codebase Audit Instructions

> **READ THIS SECTION BEFORE TOUCHING ANY CODE.**
>
> Complete all fixes in Sections 2–6 first. Then perform the audit below. The audit finds anything in the codebase that contradicts or undermines the ISR architecture described in Section 9.

---

### Step 1 — Audit every page file for the three required ISR exports

Open every file matching this glob pattern:

```
src/app/[locale]/**/*.tsx   (page.tsx and layout.tsx files only)
```

For each page file, check:

#### Check 1.1 — `generateStaticParams` present

Every page under `[locale]` that is not purely dynamic (i.e. not a `[slug]` page with runtime-only data) must export `generateStaticParams`.

```ts
// ✅ Required on every locale page
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
```

**If missing:** Add it. Without it the page is not pre-rendered at build time and the first visitor after each deploy gets a cold server render.

For `[slug]` pages (blogs, stories), `generateStaticParams` must return all known slugs at build time:

```ts
// src/app/[locale]/(default)/blogs/[slug]/page.tsx
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs(); // fetch from CMS or static list
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}
```

#### Check 1.2 — `export const dynamic = "force-static"` present

**If missing:** Add it to every CMS-driven page and layout. See the complete list in Section 6, File 4.

**If the page uses `cookies()`, `headers()`, or dynamic `searchParams`:** That page cannot be `force-static`. Document the exception and ensure it is intentional. The dashboard and auth pages (`/dashboard`, `/login`) are expected exceptions.

#### Check 1.3 — `export const revalidate = 300` present

**If missing:** Add it. Without the time-based baseline, a webhook failure means the page never refreshes.

**If `revalidate = 0`:** This forces SSR (re-render on every request). Remove it unless the page is intentionally dynamic (dashboard, auth). This is a common mistake.

**If `revalidate = false`:** This means the page never revalidates and ignores webhooks. Remove it for any CMS page.

---

### Step 2 — Audit all `fetch()` calls in page and layout files

Search the codebase for any `fetch(` calls that are **not** going through `getCmsContent`:

```bash
# Run this from the project root to find raw fetch calls in app/ directory
grep -rn "fetch(" src/app/ --include="*.tsx" --include="*.ts"
```

For each raw `fetch()` found, check whether it fetches from the CMS. If it does:

**Problem:** It bypasses the tag system. `revalidateTag` cannot reach it. The data will stay stale until `revalidate` TTL expires.

**Fix:** Replace it with `getCmsContent`, or add `next: { tags: [cmsTag(schema, locale)], revalidate: 300 }` to the fetch options.

```ts
// ❌ Bypasses tag system — revalidateTag cannot reach this
const res = await fetch(`${env.CMS_BASE_URL}/api/v1/content?schema=home&locale=${locale}`);

// ✅ Correct — tagged, revalidatable, error-handled
const content = await getCmsContent<HomeContent>("home", locale);
```

---

### Step 3 — Audit for accidental `dynamic = "force-dynamic"` or `dynamic = "auto"` on CMS pages

```bash
grep -rn "force-dynamic\|dynamic.*auto\|dynamic.*=.*\"" src/app/[locale]/ --include="*.tsx" --include="*.ts"
```

`force-dynamic` on a CMS page is always wrong — it turns the page into SSR and the CDN cannot cache it. Remove it unless the page is intentionally not CMS-driven (dashboard, auth routes).

`dynamic = "auto"` (or no `dynamic` export at all) is fragile — it lets Next.js decide, and it can silently choose SSR. Replace with `"force-static"` on all CMS pages.

---

### Step 4 — Audit layout files specifically

Layout files affect every page rendered inside them. Check:

```
src/app/[locale]/layout.tsx           ← root locale layout
src/app/[locale]/(default)/layout.tsx ← default group layout
src/app/[locale]/(auth)/layout.tsx    ← auth group layout (expected exception)
src/app/[locale]/(dashboard)/layout.tsx ← dashboard layout (expected exception)
```

For `layout.tsx` and `(default)/layout.tsx`:

- [ ] `export const dynamic = "force-static"` present
- [ ] `export const revalidate = 300` present
- [ ] Any CMS fetches (header, footer, common) go through `getCmsContent` with correct tags
- [ ] No `cookies()` or `headers()` calls (these force dynamic rendering on the entire subtree)

For `(auth)/layout.tsx` and `(dashboard)/layout.tsx`: these are expected to be dynamic. No changes needed.

---

### Step 5 — Audit `src/lib/cms/client.ts`

Confirm the following are true after applying Section 3 fixes:

- [ ] `isBuildTime` detection uses `process.env.NEXT_PHASE`
- [ ] Build-time errors throw with a clear checklist message instead of returning `null`
- [ ] Runtime errors still return `null` (graceful degradation)
- [ ] `fetch()` uses `next: { revalidate: 300, tags: [cmsTag(schema, locale)] }`
- [ ] No `cache: "no-store"` anywhere — this would bypass ISR entirely

---

### Step 6 — Audit `src/app/api/revalidate/route.ts`

Confirm after applying Section 4 fixes:

- [ ] `revalidateTag(tag, "max")` — two arguments, not one
- [ ] `revalidatePath(path, "page")` for page-scoped schemas
- [ ] `revalidatePath(path, "layout")` for `header`, `footer`, `common`
- [ ] `SCHEMA_PATHS` has an entry for every schema your CMS manages
- [ ] Blog paths use `/blogs` (plural) not `/blog` (singular)
- [ ] Unknown schemas log a `console.warn` (not silently do nothing)

---

### Step 7 — Audit `next.config.js`

- [ ] `experimental.ppr` is `false`
- [ ] No `output: "export"` — this would disable ISR entirely (static export mode has no revalidation)
- [ ] No `output: "standalone"` unless you understand it does not change ISR behaviour on Vercel

---

### Step 8 — Audit for `export const experimental_ppr = false` on all CMS pages

```bash
# Find page files that are missing the ppr=false export
# Run from project root
for f in $(find src/app/\\[locale\\] -name "page.tsx"); do
  if ! grep -q "experimental_ppr" "$f"; then
    echo "MISSING experimental_ppr=false: $f"
  fi
done
```

Add `export const experimental_ppr = false` to every file reported by this script, except auth and dashboard pages.

---

### Step 9 — Final build check

After all audit fixes are applied, run:

```bash
pnpm build
```

A correctly configured build will show:

```
● /[locale]                     5m        ← no "Expire" column
● /[locale]/about               5m
● /[locale]/blogs               5m
● /[locale]/blogs/[slug]        5m
... (all CMS pages show 5m revalidate, no Expire)

ƒ /api/auth/[...all]            ← dynamic, correct
ƒ /api/revalidate               ← dynamic, correct
ƒ /api/trpc/[trpc]              ← dynamic, correct
```

No CMS page should appear in the `ƒ (Dynamic)` row. If any does, trace why: check for `force-dynamic`, `revalidate = 0`, or a `cookies()`/`headers()` call in the component tree.

---

### Agent completion checklist

Work through these in order. Do not skip ahead.

- [ ] **Section 2 fixes applied** — `ppr: false` in `next.config.js`, `experimental_ppr = false` on all CMS pages
- [ ] **Section 3 fixes applied** — `client.ts` throws at build time, Vercel env vars confirmed
- [ ] **Section 4 fixes applied** — `route.ts` fully replaced with complete `SCHEMA_PATHS`, correct blog paths, `revalidateTag(tag, "max")`
- [ ] **Step 1 audit complete** — all CMS pages have `generateStaticParams` + `force-static` + `revalidate = 300`
- [ ] **Step 2 audit complete** — no raw `fetch()` calls to CMS bypassing `getCmsContent`
- [ ] **Step 3 audit complete** — no `force-dynamic` or `dynamic = "auto"` on CMS pages
- [ ] **Step 4 audit complete** — layout files have correct exports and use `getCmsContent` for header/footer
- [ ] **Step 5 audit complete** — `client.ts` matches the corrected version exactly
- [ ] **Step 6 audit complete** — `route.ts` matches the corrected version exactly
- [ ] **Step 7 audit complete** — `next.config.js` has no ISR-breaking options
- [ ] **Step 8 audit complete** — all page files have `experimental_ppr = false`
- [ ] **`pnpm build` passes** — no CMS page in the `ƒ Dynamic` row, no `Expire 1y` column, no CMS timeout errors
- [ ] **Runtime verified** — `x-vercel-cache: MISS` immediately after webhook, `HIT` on next request, `x-nextjs-postponed` gone
