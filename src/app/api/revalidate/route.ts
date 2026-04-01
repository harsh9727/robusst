import { revalidateTag } from "next/cache";
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
 * Purges only the affected ISR cache tags so the next request gets
 * fresh content immediately instead of waiting up to 5 minutes.
 *
 * ── Events ────────────────────────────────────────────────────────
 *
 *  content.published  → purge schema+locale (or all locales)
 *  blog.published     → purge post slug+locale + blog list for that locale
 *  blog.unpublished   → same as blog.published
 *  blog.deleted       → purge all locale variants of the post + all blog lists
 *  schema.updated     → purge all locales for that schema
 *
 * ── Example payloads ──────────────────────────────────────────────
 *
 *  { "event": "content.published", "schema": "home",     "locale": "en" }
 *  { "event": "blog.published",    "slug":   "my-post",  "locale": "en" }
 *  { "event": "blog.unpublished",  "slug":   "my-post",  "locale": "en" }
 *  { "event": "blog.deleted",      "slug":   "my-post"                  }
 *  { "event": "schema.updated",    "schema": "home"                     }
 */
export async function POST(request: NextRequest) {
  // ── Auth ────────────────────────────────────────────────────────────────
  const secret = request.nextUrl.searchParams.get("secret");

  if (!env.REVALIDATE_SECRET || secret !== env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: "Invalid or missing revalidation secret." },
      { status: 401 },
    );
  }

  // ── Parse body ──────────────────────────────────────────────────────────
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

  // ── Purge ───────────────────────────────────────────────────────────────
  const purged: string[] = [];

  function purge(tag: string) {
    revalidateTag(tag, { expire: 0 });
    purged.push(tag);
  }

  switch (body.event) {
    // Schema content was saved — purge that schema for the given locale,
    // or every locale if the publish touched all of them at once.
    case "content.published": {
      const localesToPurge =
        body.locale && (locales as readonly string[]).includes(body.locale)
          ? [body.locale]
          : [...locales];

      for (const l of localesToPurge) {
        purge(cmsTag(body.schema, l));
      }
      break;
    }

    // Blog post went live or was taken offline — purge the post itself and
    // the listing page so the blog index reflects the change immediately.
    case "blog.published":
    case "blog.unpublished": {
      purge(blogPostTag(body.slug, body.locale));
      purge(blogListTag(body.locale));
      break;
    }

    // Blog post was deleted — it may have existed in every locale, so purge
    // all locale variants of the post and every blog listing page.
    case "blog.deleted": {
      for (const l of locales) {
        purge(blogPostTag(body.slug, l));
        purge(blogListTag(l));
      }
      break;
    }

    // Schema structure changed — the content shape may have shifted for every
    // locale, so purge all of them.
    case "schema.updated": {
      for (const l of locales) {
        purge(cmsTag(body.schema, l));
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
    `[revalidate] event="${body.event}" purged: ${purged.join(", ")}`,
  );

  return NextResponse.json({
    revalidated: true,
    event: body.event,
    purged,
    now: new Date().toISOString(),
  });
}
