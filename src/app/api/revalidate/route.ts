import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { env } from "~/env";
import { locales } from "~/i18n/config";

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

async function purgeVercelCDN(tags: string[]) {
  if (!env.VERCEL_API_TOKEN || !env.VERCEL_PROJECT_ID || tags.length === 0)
    return [];
  try {
    const url = new URL(
      "https://api.vercel.com/v1/edge-cache/invalidate-by-tags",
    );
    url.searchParams.set("projectIdOrName", env.VERCEL_PROJECT_ID);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.VERCEL_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tags, target: "production" }),
    });
    if (!response.ok) {
      console.error(
        `[revalidate] Vercel CDN purge failed: ${response.status} ${await response.text()}`,
      );
      return [];
    }
    return tags;
  } catch (error) {
    console.error("[revalidate] Vercel CDN purge threw:", error);
    return [];
  }
}

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (
    !secret ||
    !env.SANITY_REVALIDATE_SECRET ||
    secret !== env.SANITY_REVALIDATE_SECRET
  )
    return NextResponse.json(
      { message: "Invalid or missing revalidation secret." },
      { status: 401 },
    );
  let body: SanityWebhookPayload;
  try {
    body = (await request.json()) as SanityWebhookPayload;
  } catch {
    return NextResponse.json(
      { message: "Request body must be valid JSON." },
      { status: 400 },
    );
  }
  if (!body?._id || !body?._type)
    return NextResponse.json(
      { message: "Body must include Sanity _id and _type fields." },
      { status: 400 },
    );
  const purgedTags: string[] = [];
  const purgedPaths: string[] = [];
  const purgeTag = (tag: string) => {
    revalidateTag(tag, { expire: 0 });
    purgedTags.push(tag);
  };
  const purgePath = (path: string, type: "page" | "layout" = "page") => {
    revalidatePath(path, type);
    purgedPaths.push(`${path}[${type}]`);
  };
  const localesToPurge =
    body.language && (locales as readonly string[]).includes(body.language)
      ? [body.language]
      : [...locales];
  for (const locale of localesToPurge) purgeTag(`sanity-discovery-${locale}`);
  purgePath("/llms.txt");
  purgePath("/manifest.webmanifest");

  if (body._type === "siteSettings") {
    for (const locale of localesToPurge) {
      purgeTag(`sanity-siteSettings-${locale}`);
      purgePath(`/${locale}`, "layout");
    }
  } else if (body._type === "languageSettings") {
    purgeTag("sanity-languageSettings");
    for (const locale of locales) purgePath(`/${locale}`, "layout");
  } else if (body._type === "jobPosting") {
    purgeTag("sanity-sitemap");
    purgePath("/sitemap.xml");
    for (const locale of localesToPurge) {
      purgeTag(`sanity-jobPosting-${locale}`);
      purgePath(`/${locale}/careers`);
      purgePath(
        body.legacyId
          ? `/${locale}/careers/roles/${body.legacyId}`
          : `/${locale}/careers/roles/[id]`,
      );
    }
  } else if (body._type === "blogPost") {
    purgeTag("sanity-sitemap");
    purgeTag("sanity-blogPost-slugs");
    purgePath("/sitemap.xml");
    for (const locale of localesToPurge) {
      purgeTag(`sanity-blogPost-${locale}`);
      if (body.slug) purgeTag(`sanity-blogPost-${locale}-${body.slug}`);
      purgePath(`/${locale}`);
      purgePath(`/${locale}/blogs`);
      purgePath(
        body.slug ? `/${locale}/blogs/${body.slug}` : `/${locale}/blogs/[slug]`,
      );
    }
  } else if (body._type === "successStory") {
    for (const locale of localesToPurge) {
      purgeTag(`sanity-successStory-${locale}`);
      purgePath(`/${locale}/stories`);
    }
  } else if (body._type === "fixedPageSection") {
    const pageType = body._id.split("-")[1];
    for (const locale of localesToPurge) {
      if (pageType) purgeTag(`sanity-${pageType}-${locale}`);
      for (const [documentType, route] of Object.entries(SANITY_PAGE_PATHS))
        if (body._id.includes(`-${documentType}-`))
          purgePath(`/${locale}${route}`);
    }
  } else if (body._type in SANITY_PAGE_PATHS) {
    for (const locale of localesToPurge) {
      purgeTag(`sanity-${body._type}-${locale}`);
      purgePath(`/${locale}${SANITY_PAGE_PATHS[body._type]}`);
    }
  } else if (body._type !== "translation.metadata") {
    return NextResponse.json(
      { message: `Unsupported Sanity document type: "${body._type}".` },
      { status: 400 },
    );
  }
  const cdnPurgedTags = await purgeVercelCDN([...new Set(purgedTags)]);
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
