import { env } from "~/env";

// ── Cache tag helpers ─────────────────────────────────────────────────────────
// All tags follow the same naming convention so the revalidate webhook has a
// single predictable contract with the fetch cache.

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
// Mirrors the payload shape fired by the CMS on every content/blog event.
// Keep this in sync with the CMS-side WebhookPayload type.

export type WebhookPayload =
  | { event: "content.published"; schema: string; locale: string }
  | { event: "blog.published"; slug: string; locale: string }
  | { event: "blog.unpublished"; slug: string; locale: string }
  | { event: "blog.deleted"; slug: string }
  | { event: "schema.updated"; schema: string };

/**
 * Actual API response envelope from the CMS.
 * { data: { schema, locale, content: T, updatedAt }, error, message }
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
 * Usage:
 *   const home = await getCmsContent<Home_JsonType>("home", locale);
 *   const footer = await getCmsContent<Footer_JsonType>("footer", locale);
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
