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

/**
 * Actual API response envelope from the CMS.
 */
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

//  Retry with exponential backoff ──────────────────────────────────
//
// During `next build`, 11 workers (now reduced to 2 via cpus:2 in next.config.js)
// hit the CMS simultaneously. The free-tier CMS on Vercel can drop connections
// under load, producing `TypeError: fetch failed` (ECONNRESET / ETIMEDOUT).
//
// This wrapper retries those transient network errors up to MAX_RETRIES times
// with exponential backoff before giving up and letting getCmsContent decide
// whether to throw (build-time) or return null (runtime).
//
// NOTE: Only network-level errors are retried (TypeError: fetch failed).
//       HTTP error responses (4xx, 5xx) are NOT retried — they are returned
//       immediately to getCmsContent for proper handling.

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 600; // 600 ms → 1200 ms → 2400 ms

async function fetchWithRetry(
  url: string,
  options: RequestInit & { next?: NextFetchRequestConfig },
): Promise<Response> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      // Next.js extends RequestInit with `next` — cast to satisfy the type
      return await fetch(url, options as RequestInit);
    } catch (err) {
      lastError = err;

      const isNetworkError =
        err instanceof TypeError &&
        (err.message === "fetch failed" ||
          err.message.includes("ECONNRESET") ||
          err.message.includes("ETIMEDOUT") ||
          err.message.includes("socket hang up"));

      if (!isNetworkError) {
        // Non-network error (e.g. invalid URL) — no point retrying
        throw err;
      }

      if (attempt < MAX_RETRIES) {
        const delay = BASE_DELAY_MS * Math.pow(2, attempt - 1); // 600, 1200, 2400
        console.warn(
          `[CMS] fetch attempt ${attempt}/${MAX_RETRIES} failed (${String(err)}). ` +
            `Retrying in ${delay}ms…`,
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  // All retries exhausted — rethrow the last network error so getCmsContent
  // can apply its build-time vs runtime logic correctly.
  throw lastError;
}

// ── NextFetchRequestConfig shim ───────────────────────────────────────────────
// next-intl / Next.js augments the global fetch with a `next` property.
// Defining the shape here avoids importing from an internal Next.js path.
type NextFetchRequestConfig = {
  revalidate?: number | false;
  tags?: string[];
};

// ── Generic CMS content fetcher ───────────────────────────────────────────────

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
 *
 * Transient network errors (ECONNRESET, fetch failed, etc.) are retried up to
 * 3 times with exponential backoff before the error propagates.
 */
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

    // fetchWithRetry handles transient network failures (TypeError: fetch failed).
    // HTTP error responses (4xx / 5xx) pass through and are handled below.
    const res = await fetchWithRetry(url.toString(), {
      headers: {
        "x-api-key": env.CMS_API_KEY,
      },
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
    if (
      err instanceof Error &&
      err.message.startsWith("[CMS]") &&
      isBuildTime
    ) {
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

// ── CMS Blog Types ─────────────────────────────────────────────────────────────

export interface CmsBlogMeta {
  metaTitle?: string | null;
  primaryKeyword?: string | null;
  metaDescription?: string | null;
}

export interface CmsBlogListPost {
  slug: string;
  title: string;
  excerpt: string | null;
  coverImage: string | null;
  author: { name: string; picture?: string | null } | null;
  tags: string[];
  meta: CmsBlogMeta | null;
  publishedAt: string;
  updatedAt: string;
}

export interface CmsBlogPostFull extends CmsBlogListPost {
  body: string;
  locale: string;
}

// Internal API response envelopes (not exported — only used inside this file)
type CmsBlogListApiResponse = {
  data?: {
    locale?: string;
    posts?: CmsBlogListPost[];
  };
  error?: unknown;
  message?: string;
};

type CmsBlogPostApiResponse = {
  data?: (CmsBlogPostFull & { locale?: string }) | null;
  error?: unknown;
  message?: string;
};

// ── Blog list fetcher ─────────────────────────────────────────────────────────

/**
 * Fetches the full list of blog posts for a given locale from the CMS.
 *
 * - Served from Next.js ISR cache; revalidates every 5 minutes.
 * - Instantly purgeable via the `cms-blog-list-{locale}` on-demand tag.
 *
 * At RUNTIME: returns null on failure so the site never hard-crashes.
 * At BUILD TIME: throws loudly so broken deploys fail fast.
 *
 * Transient network errors (ECONNRESET, fetch failed, etc.) are retried up to
 * 3 times with exponential backoff before the error propagates.
 */
export async function getCmsBlogList(
  locale: string,
): Promise<CmsBlogListPost[] | null> {
  const isBuildTime =
    process.env.NEXT_PHASE === "phase-production-build" ||
    process.env.NEXT_PHASE === "phase-export";

  try {
    const url = new URL("/api/v1/blogs", env.CMS_BASE_URL);
    url.searchParams.set("locale", locale);

    const res = await fetchWithRetry(url.toString(), {
      headers: {
        "x-api-key": env.CMS_API_KEY,
      },
      next: {
        revalidate: 300,
        tags: [blogListTag(locale)],
      },
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "(unreadable)");
      const msg = `[CMS] blog-list/${locale} → ${res.status} ${res.statusText}: ${body}`;
      if (isBuildTime) throw new Error(msg);
      console.error(msg);
      return null;
    }

    const json = (await res.json()) as CmsBlogListApiResponse;
    const posts = json.data?.posts;

    if (!posts) {
      const msg =
        `[CMS] blog-list/${locale} → "data.posts" missing. ` +
        `error=${String(json.error)}, message=${json.message ?? "—"}`;
      if (isBuildTime) throw new Error(msg);
      console.error(msg);
      return null;
    }

    return posts;
  } catch (err) {
    // Don't double-wrap errors we already threw above
    if (
      err instanceof Error &&
      err.message.startsWith("[CMS]") &&
      isBuildTime
    ) {
      throw err;
    }

    const msg = `[CMS] getCmsBlogList("${locale}") threw: ${String(err)}`;

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

// ── Blog post fetcher ─────────────────────────────────────────────────────────

/**
 * Fetches a single blog post by slug and locale from the CMS.
 *
 * - Served from Next.js ISR cache; revalidates every 5 minutes.
 * - Instantly purgeable via the `cms-blog-{slug}-{locale}` on-demand tag.
 * - Returns null (without logging) on 404 — the post simply doesn't exist
 *   in that locale, which is an expected, non-error condition.
 *
 * At RUNTIME: returns null on other failures so the site never hard-crashes.
 * At BUILD TIME: throws loudly so broken deploys fail fast.
 *
 * Transient network errors (ECONNRESET, fetch failed, etc.) are retried up to
 * 3 times with exponential backoff before the error propagates.
 */
export async function getCmsBlogPost(
  slug: string,
  locale: string,
): Promise<CmsBlogPostFull | null> {
  const isBuildTime =
    process.env.NEXT_PHASE === "phase-production-build" ||
    process.env.NEXT_PHASE === "phase-export";

  try {
    const url = new URL(`/api/v1/blogs/${slug}`, env.CMS_BASE_URL);
    url.searchParams.set("locale", locale);

    const res = await fetchWithRetry(url.toString(), {
      headers: {
        "x-api-key": env.CMS_API_KEY,
      },
      next: {
        revalidate: 300,
        tags: [blogPostTag(slug, locale)],
      },
    });

    // 404 is an expected, non-error condition — post doesn't exist in this locale
    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      const body = await res.text().catch(() => "(unreadable)");
      const msg = `[CMS] blog-post/${slug}/${locale} → ${res.status} ${res.statusText}: ${body}`;
      if (isBuildTime) throw new Error(msg);
      console.error(msg);
      return null;
    }

    const json = (await res.json()) as CmsBlogPostApiResponse;
    const post = json.data;

    if (!post) {
      const msg =
        `[CMS] blog-post/${slug}/${locale} → "data" missing. ` +
        `error=${String(json.error)}, message=${json.message ?? "—"}`;
      if (isBuildTime) throw new Error(msg);
      console.error(msg);
      return null;
    }

    return post;
  } catch (err) {
    // Don't double-wrap errors we already threw above
    if (
      err instanceof Error &&
      err.message.startsWith("[CMS]") &&
      isBuildTime
    ) {
      throw err;
    }

    const msg = `[CMS] getCmsBlogPost("${slug}", "${locale}") threw: ${String(err)}`;

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
