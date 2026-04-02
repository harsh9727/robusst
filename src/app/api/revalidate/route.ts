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
  home: (l) => [`/${l}`],

  // ── Company pages ─────────────────────────────────────────────────────────
  aboutPage: (l) => [`/${l}/about`],
  contact: (l) => [`/${l}/contact`],
  partnership: (l) => [`/${l}/partnership`],
  platforms: (l) => [`/${l}/platforms`],
  careers: (l) => [`/${l}/careers`],
  pocWaitlist: (l) => [`/${l}/poc_waitlist`],

  // ── Solutions ─────────────────────────────────────────────────────────────
  solutionsPage: (l) => [`/${l}/solutions`],
  aiCall: (l) => [`/${l}/solutions/ai-call-center`],
  brand: (l) => [`/${l}/solutions/branded-calling`],
  cdp: (l) => [`/${l}/solutions/customer-data-platform`],
  customizeSolution: (l) => [`/${l}/solutions/customized-solutions`],
  cybersecurity: (l) => [`/${l}/solutions/cybersecurity`],
  noc: (l) => [`/${l}/solutions/intelligent-noc`],
  networkMonetization: (l) => [`/${l}/solutions/network-monetization`],
  stsAndDms: (l) => [`/${l}/solutions/sts-dms`],

  // ── Stories ───────────────────────────────────────────────────────────────
  storyPage: (l) => [`/${l}/stories`],
  successStories: (l) => [`/${l}/stories`],

  // ── Global / layout-scoped schemas ────────────────────────────────────────
  // These affect every page. Use "layout" scope in revalidatePath so that
  // the entire subtree under /${locale} is evicted, not just the home page.
  header: (l) => [`/${l}`],
  footer: (l) => [`/${l}`],
  common: (l) => [`/${l}`],
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
   * { expire: 0 } drops the entry immediately (no stale-while-revalidate).
   * This is required for CMS webhooks that need instant expiration so that
   * the very next request fetches fresh data rather than serving stale content
   * while regenerating in the background.
   */
  function purgeTag(tag: string) {
    revalidateTag(tag, { expire: 0 });
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

  // ── Pre-warm: trigger immediate regeneration for all purged paths ───────────
  // revalidateTag/revalidatePath only mark the cache stale — regeneration
  // doesn't happen until the next organic visit. Pre-warming fires fetch
  // requests to those paths so the cache is repopulated immediately after
  // invalidation. Real users then always get fresh content on their first hit.
  //
  // cache: "no-store" bypasses the CDN and hits the origin directly.
  // x-prerender-revalidate tells Vercel to treat this as a trusted revalidation.
  // Fire-and-forget (no await) so the webhook response is not delayed.
  const siteBaseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.robusst.com";

  for (const purgedPathEntry of purgedPaths) {
    // purgedPaths entries are formatted as "/en[page]" — strip the type suffix
    const cleanPath = purgedPathEntry.replace(/\[(page|layout)\]$/, "");
    fetch(`${siteBaseUrl}${cleanPath}`, {
      cache: "no-store",
      headers: {
        "x-prerender-revalidate": env.REVALIDATE_SECRET ?? "",
      },
    }).catch((err: unknown) => {
      console.warn(`[revalidate] Pre-warm failed for ${cleanPath}:`, err);
    });
  }

  return NextResponse.json({
    revalidated: true,
    event: body.event,
    purgedTags,
    purgedPaths,
    now: new Date().toISOString(),
  });
}
