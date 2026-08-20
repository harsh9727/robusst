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

const SCHEMA_PATHS: Record<string, (locale: string) => string[]> = {
  home: (l) => [`/${l}`],

  aboutPage: (l) => [`/${l}/about`],
  contact: (l) => [`/${l}/contact`],
  partnership: (l) => [`/${l}/partnership`],
  platforms: (l) => [`/${l}/platforms`],
  careers: (l) => [`/${l}/careers`],
  pocWaitlist: (l) => [`/${l}/poc_waitlist`],

  solutionsPage: (l) => [`/${l}/solutions`],
  aiCall: (l) => [`/${l}/solutions/ai-call-center`],
  brand: (l) => [`/${l}/solutions/branded-calling`],
  cdp: (l) => [`/${l}/solutions/customer-data-platform`],
  customizeSolution: (l) => [`/${l}/solutions/customized-solutions`],
  cybersecurity: (l) => [`/${l}/solutions/cybersecurity`],
  noc: (l) => [`/${l}/solutions/intelligent-noc`],
  networkMonetization: (l) => [`/${l}/solutions/network-monetization`],
  stsAndDms: (l) => [`/${l}/solutions/sts-dms`],

  storyPage: (l) => [`/${l}/stories`],
  successStories: (l) => [`/${l}/stories`],

  header: (l) => [`/${l}`],
  footer: (l) => [`/${l}`],
  common: (l) => [`/${l}`],
};

const LAYOUT_SCHEMAS = new Set(["header", "footer", "common"]);

const SANITY_PAGE_PATHS: Record<string, string> = {
  homePage: "",
  aboutPage: "/about",
  blogIndexPage: "/blogs",
  careersPage: "/careers",
  contactPage: "/contact",
  partnershipPage: "/partnership",
  platformsPage: "/platforms",
  pocWaitlistPage: "/poc_waitlist",
  solutionsPage: "/solutions",
  aiCallCenterPage: "/solutions/ai-call-center",
  brandedCallingPage: "/solutions/branded-calling",
  customerDataPlatformPage: "/solutions/customer-data-platform",
  customizedSolutionsPage: "/solutions/customized-solutions",
  cybersecurityPage: "/solutions/cybersecurity",
  intelligentNocPage: "/solutions/intelligent-noc",
  networkMonetizationPage: "/solutions/network-monetization",
  stsDmsPage: "/solutions/sts-dms",
  storiesPage: "/stories",
};

type SanityWebhookPayload = {
  _id: string;
  _type: string;
  language?: string;
  slug?: string;
  legacyId?: string;
};

function isSanityWebhookPayload(
  body: WebhookPayload | SanityWebhookPayload,
): body is SanityWebhookPayload {
  return (
    "_id" in body &&
    typeof body._id === "string" &&
    "_type" in body &&
    typeof body._type === "string"
  );
}

function getPathsForSchema(schema: string, locale: string): string[] {
  const paths = SCHEMA_PATHS[schema]?.(locale);
  if (!paths) {
    console.warn(
      `[revalidate] ⚠️  No SCHEMA_PATHS entry for schema="${schema}". ` +
        `Layer 2 cache NOT purged for locale="${locale}". ` +
        `Add "${schema}" to SCHEMA_PATHS in src/app/api/revalidate/route.ts.`,
    );
    return [];
  }
  return paths;
}

async function purgeVercelCDN(tags: string[]): Promise<string[]> {
  if (!env.VERCEL_API_TOKEN || !env.VERCEL_PROJECT_ID) {
    console.warn(
      "[revalidate] ⚠️  VERCEL_API_TOKEN or VERCEL_PROJECT_ID not set. " +
        "Vercel CDN cache (Layer 1) will NOT be purged. " +
        "Add both env vars to your Vercel project settings.",
    );
    return [];
  }

  try {
    const url = new URL(
      "https://api.vercel.com/v1/edge-cache/invalidate-by-tags",
    );
    url.searchParams.set("projectIdOrName", env.VERCEL_PROJECT_ID);

    const res = await fetch(url.toString(), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.VERCEL_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tags, target: "production" }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "(unreadable)");
      console.error(
        `[revalidate] Vercel CDN purge failed: ${res.status} ${res.statusText}: ${body}`,
      );
      return [];
    }

    return tags;
  } catch (err) {
    console.error("[revalidate] Vercel CDN purge threw:", err);
    return [];
  }
}

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  const validSecrets = [
    env.REVALIDATE_SECRET,
    env.SANITY_REVALIDATE_SECRET,
  ].filter(Boolean);
  if (!secret || !validSecrets.includes(secret)) {
    return NextResponse.json(
      { message: "Invalid or missing revalidation secret." },
      { status: 401 },
    );
  }

  let body: WebhookPayload | SanityWebhookPayload;
  try {
    body = (await request.json()) as WebhookPayload;
  } catch {
    return NextResponse.json(
      { message: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  const purgedTags: string[] = [];
  const purgedPaths: string[] = [];

  function purgeTag(tag: string) {
    revalidateTag(tag, { expire: 0 });
    purgedTags.push(tag);
  }

  function purgePath(path: string, type: "page" | "layout" = "page") {
    revalidatePath(path, type);
    purgedPaths.push(`${path}[${type}]`);
  }

  function purgeContent(schema: string, locale: string) {
    purgeTag(cmsTag(schema, locale));
    const scope = LAYOUT_SCHEMAS.has(schema) ? "layout" : "page";
    for (const path of getPathsForSchema(schema, locale)) {
      purgePath(path, scope);
    }
  }

  if (isSanityWebhookPayload(body)) {
    const localesToPurge =
      body.language && (locales as readonly string[]).includes(body.language)
        ? [body.language]
        : [...locales];

    if (body._type === "siteSettings") {
      for (const locale of localesToPurge) {
        purgeTag(`sanity-siteSettings-${locale}`);
        purgePath(`/${locale}`, "layout");
      }
    } else if (body._type === "languageSettings") {
      purgeTag("sanity-languageSettings");
      for (const locale of locales) purgePath(`/${locale}`, "layout");
    } else if (body._type === "jobPosting") {
      for (const locale of localesToPurge) {
        purgeTag(`sanity-jobPosting-${locale}`);
        purgePath(`/${locale}/careers`, "page");
        purgePath(
          body.legacyId
            ? `/${locale}/careers/roles/${body.legacyId}`
            : `/${locale}/careers/roles/[id]`,
          "page",
        );
      }
    } else if (body._type === "successStory") {
      for (const locale of localesToPurge) {
        purgeTag(`sanity-successStory-${locale}`);
        purgePath(`/${locale}/stories`, "page");
      }
    } else if (body._type === "fixedPageSection") {
      for (const locale of localesToPurge) {
        purgeTag(`sanity-${body._id.split("-")[1]}-${locale}`);
        for (const [documentType, route] of Object.entries(SANITY_PAGE_PATHS)) {
          if (body._id.includes(`-${documentType}-`))
            purgePath(`/${locale}${route}`, "page");
        }
      }
    } else if (body._type in SANITY_PAGE_PATHS) {
      for (const locale of localesToPurge) {
        purgeTag(`sanity-${body._type}-${locale}`);
        purgePath(`/${locale}${SANITY_PAGE_PATHS[body._type]}`, "page");
      }
    } else {
      return NextResponse.json(
        { message: `Unsupported Sanity document type: "${body._type}".` },
        { status: 400 },
      );
    }

    const cdnPurgedTags = await purgeVercelCDN(purgedTags);
    return NextResponse.json({
      revalidated: true,
      source: "sanity",
      documentId: body._id,
      documentType: body._type,
      purgedTags,
      purgedPaths,
      cdnPurgedTags,
      now: new Date().toISOString(),
    });
  }

  if (!("event" in body) || !body.event) {
    return NextResponse.json(
      { message: 'Body must include an "event" or Sanity document fields.' },
      { status: 400 },
    );
  }

  switch (body.event) {
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

    case "blog.published":
    case "blog.unpublished": {
      purgeTag(blogPostTag(body.slug, body.locale));
      purgeTag(blogListTag(body.locale));
      purgePath(`/${body.locale}/blogs/${body.slug}`, "page");
      purgePath(`/${body.locale}/blogs`, "page");
      break;
    }

    case "blog.deleted": {
      for (const l of locales) {
        purgeTag(blogPostTag(body.slug, l));
        purgeTag(blogListTag(l));
        purgePath(`/${l}/blogs/${body.slug}`, "page");
        purgePath(`/${l}/blogs`, "page");
      }
      break;
    }

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

  const cdnPurgedTags = await purgeVercelCDN(purgedTags);

  console.log(
    `[revalidate] event="${body.event}" ` +
      `tags=[${purgedTags.join(", ")}] ` +
      `paths=[${purgedPaths.join(", ")}] ` +
      `cdnPurgedTags=[${cdnPurgedTags.join(", ")}]`,
  );

  return NextResponse.json({
    revalidated: true,
    event: body.event,
    purgedTags,
    purgedPaths,
    cdnPurgedTags,
    now: new Date().toISOString(),
  });
}
