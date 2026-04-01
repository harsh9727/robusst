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
 *    revalidateTag(tag) purges the cached fetch() responses that were tagged
 *    with next: { tags: [...] }. This uses the single-argument form because
 *    our CMS client uses the old fetch-tag system, not the new "use cache"
 *    directive system (which uses the two-argument form).
 *
 *  Layer 2 — Vercel Edge CDN cache
 *    revalidatePath(path) tells Vercel to evict the fully-rendered page from
 *    its edge cache. Without this, x-vercel-cache: HIT keeps serving stale
 *    HTML even after the fetch cache has been purged.
 *
 * ── Events ────────────────────────────────────────────────────────────────
 *
 *  content.published  → purge schema+locale fetch cache + page path(s)
 *  blog.published     → purge post + list fetch cache + page path(s)
 *  blog.unpublished   → same as blog.published
 *  blog.deleted       → purge all locales for post + lists + page paths
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
// Tells revalidatePath which URL paths to evict from Vercel's edge cache
// when a given schema is published. Add new schemas here as pages are built.
const SCHEMA_PATHS: Record<string, (locale: string) => string[]> = {
  home: (locale) => [`/${locale}`],
  // footer, header → affect every page; use revalidatePath('/', 'layout')
  // when those schemas are migrated to the CMS.
};

function getPathsForSchema(schema: string, locale: string): string[] {
  return SCHEMA_PATHS[schema]?.(locale) ?? [];
}

export async function POST(request: NextRequest) {
  // ── Auth ──────────────────────────────────────────────────────────────────
  const secret = request.nextUrl.searchParams.get("secret");

  if (!env.REVALIDATE_SECRET || secret !== env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: "Invalid or missing revalidation secret." },
      { status: 401 },
    );
  }

  // ── Parse body ────────────────────────────────────────────────────────────
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

  // ── Purge helpers ─────────────────────────────────────────────────────────
  const purgedTags: string[] = [];
  const purgedPaths: string[] = [];

  // Layer 1: purge Next.js fetch/data cache for this tag.
  // Single-argument form — correct for fetch() with next: { tags: [...] }.
  function purgeTag(tag: string) {
    (revalidateTag as (tag: string) => void)(tag);
    purgedTags.push(tag);
  }

  // Layer 2: purge Vercel edge cache for a specific page path.
  function purgePath(path: string) {
    revalidatePath(path);
    purgedPaths.push(path);
  }

  // Purge both layers for a schema+locale pair.
  function purgeContent(schema: string, locale: string) {
    purgeTag(cmsTag(schema, locale));
    for (const path of getPathsForSchema(schema, locale)) {
      purgePath(path);
    }
  }

  // ── Route per event type ──────────────────────────────────────────────────
  switch (body.event) {
    // Schema content saved — purge the given locale, or all locales if omitted.
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
    case "blog.published":
    case "blog.unpublished": {
      purgeTag(blogPostTag(body.slug, body.locale));
      purgeTag(blogListTag(body.locale));
      purgePath(`/${body.locale}/blog/${body.slug}`);
      purgePath(`/${body.locale}/blog`);
      break;
    }

    // Blog post deleted — may have existed in every locale.
    case "blog.deleted": {
      for (const l of locales) {
        purgeTag(blogPostTag(body.slug, l));
        purgeTag(blogListTag(l));
        purgePath(`/${l}/blog/${body.slug}`);
        purgePath(`/${l}/blog`);
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
    `[revalidate] event="${body.event}" tags=[${purgedTags.join(", ")}] paths=[${purgedPaths.join(", ")}]`,
  );

  return NextResponse.json({
    revalidated: true,
    event: body.event,
    purgedTags,
    purgedPaths,
    now: new Date().toISOString(),
  });
}
