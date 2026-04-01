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
 * Generic CMS content fetcher.
 *
 * Fetches any schema from the CMS for the given locale using ISR:
 *   - Served from Next.js cache after the first hit
 *   - Background-revalidated every 5 minutes (time-based baseline)
 *   - Instantly purgeable via POST /api/revalidate (on-demand)
 *
 * Returns `null` on any network or non-2xx error so callers can fall back
 * to static data gracefully — the site never hard-crashes because of a CMS
 * outage.
 *
 * Usage:
 *   const home = await getCmsContent<Home_JsonType>("home", locale);
 *   const footer = await getCmsContent<Footer_JsonType>("footer", locale);
 */
export async function getCmsContent<T = Record<string, unknown>>(
  schema: string,
  locale: string,
): Promise<T | null> {
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
      console.error(
        `[CMS] ${schema}/${locale} → ${res.status} ${res.statusText}: ${body}`,
      );
      return null;
    }

    const json = (await res.json()) as CmsResponse<T>;
    const content = json.data?.content;

    if (content === undefined || content === null) {
      console.error(
        `[CMS] ${schema}/${locale} → "data.content" missing. ` +
          `error=${String(json.error)}, message=${json.message ?? "—"}`,
      );
      return null;
    }

    return content;
  } catch (err) {
    console.error(`[CMS] getCmsContent("${schema}", "${locale}") threw:`, err);
    return null;
  }
}
