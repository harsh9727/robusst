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

// These keys must exactly match the schema strings passed to getCmsContent().
// Cache tags are case-sensitive, so e.g. "aicall" and "aiCall" are different.
const SCHEMA_PATHS: Record<string, (locale: string) => string[]> = {
  home: (l) => [`/${l}`],
  aboutpage: (l) => [`/${l}/about`],
  contact: (l) => [`/${l}/contact`],
  partnership: (l) => [`/${l}/partnership`],
  platforms: (l) => [`/${l}/platforms`],
  careers: (l) => [`/${l}/careers`],
  pocwaitlist: (l) => [`/${l}/poc_waitlist`],
  solutionspage: (l) => [`/${l}/solutions`],
  aicall: (l) => [`/${l}/solutions/ai-call-center`],
  brand: (l) => [`/${l}/solutions/branded-calling`],
  cdp: (l) => [`/${l}/solutions/customer-data-platform`],
  customizesolution: (l) => [`/${l}/solutions/customized-solutions`],
  cybersecurity: (l) => [`/${l}/solutions/cybersecurity`],
  noc: (l) => [`/${l}/solutions/intelligent-noc`],
  networkmonetization: (l) => [`/${l}/solutions/network-monetization`],
  stsanddms: (l) => [`/${l}/solutions/sts-dms`],
  storypage: (l) => [`/${l}/stories`],
  successstories: (l) => [`/${l}/stories`],
  header: (l) => [`/${l}`],
  footer: (l) => [`/${l}`],
  common: (l) => [`/${l}`],
};

const LAYOUT_SCHEMAS = new Set(["header", "footer"]);

export async function POST(request: NextRequest) {
  const querySecret = request.nextUrl.searchParams.get("secret");
  const headerSecret = request.headers.get("x-revalidate-secret");
  const secret = headerSecret ?? querySecret;

  // Do not log the URL or secret value: the URL may contain the secret.
  console.info(
    `[revalidate] webhook received auth=${headerSecret ? "header" : querySecret ? "query" : "missing"}`,
  );

  if (!env.REVALIDATE_SECRET || secret !== env.REVALIDATE_SECRET) {
    console.warn("[revalidate] rejected: invalid or missing secret");
    return NextResponse.json(
      { message: "Invalid or missing revalidation secret." },
      { status: 401 },
    );
  }

  let body: WebhookPayload;
  try {
    body = (await request.json()) as WebhookPayload;
  } catch {
    console.warn("[revalidate] rejected: invalid JSON body");
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

  if (
    (body.event === "content.published" || body.event === "schema.updated") &&
    !SCHEMA_PATHS[body.schema]
  ) {
    return NextResponse.json(
      {
        message: `Unknown CMS schema: "${body.schema}". Cache tags are case-sensitive.`,
        knownSchemas: Object.keys(SCHEMA_PATHS),
      },
      { status: 400 },
    );
  }

  const purgedTags: string[] = [];
  const purgedPaths: string[] = [];

  function purgeTag(tag: string) {
    revalidateTag(tag, { expire: 0 });
    purgedTags.push(tag);
  }

  function purgePage(path: string) {
    // Next.js requires the type argument to be omitted for literal page paths.
    revalidatePath(path);
    purgedPaths.push(`${path}[page]`);
  }

  function purgeLayout(path: string) {
    revalidatePath(path, "layout");
    purgedPaths.push(`${path}[layout]`);
  }

  function purgeContent(schema: string, locale: string) {
    purgeTag(cmsTag(schema, locale));
    for (const path of SCHEMA_PATHS[schema]!(locale)) {
      if (LAYOUT_SCHEMAS.has(schema)) purgeLayout(path);
      else purgePage(path);
    }
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
      purgePage(`/${body.locale}/blogs/${body.slug}`);
      purgePage(`/${body.locale}/blogs`);
      break;
    }

    case "blog.deleted": {
      for (const l of locales) {
        purgeTag(blogPostTag(body.slug, l));
        purgeTag(blogListTag(l));
        purgePage(`/${l}/blogs/${body.slug}`);
        purgePage(`/${l}/blogs`);
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
