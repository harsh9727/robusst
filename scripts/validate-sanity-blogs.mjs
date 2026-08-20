#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";

const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const SECTION_KEYS = ["hero", "listing", "emptyState", "articleUi", "cta"];

async function main() {
  if (typeof process.loadEnvFile === "function") {
    try {
      process.loadEnvFile(path.join(ROOT, ".env"));
    } catch {
      /* CI supplies environment variables. */
    }
  }
  const dataset =
    process.argv
      .find((argument) => argument.startsWith("--dataset="))
      ?.slice(10) ??
    process.env.NEXT_PUBLIC_SANITY_DATASET ??
    "development";
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset,
    apiVersion: "2026-08-15",
    useCdn: false,
    token: process.env.SANITY_API_READ_TOKEN,
  });
  const routeMap = JSON.parse(
    await readFile(
      path.join(ROOT, "migration/audit/blog-route-map.json"),
      "utf8",
    ),
  );
  const expectedSlugs = routeMap.entries
    .map((entry) => entry.productionSlug)
    .sort();
  const sectionProjection = SECTION_KEYS.map(
    (section) => `"${section}": ${section}->content`,
  ).join(",");
  const [pages, posts, pageMetadata, postMetadata, sectionCount] =
    await Promise.all([
      client.fetch(
        `*[_type == "blogIndexPage"]{_id,language,translation,seo,${sectionProjection}}`,
      ),
      client.fetch(
        '*[_type == "blogPost"]{_id,language,"slug":slug.current,title,excerpt,coverImage,authorImage,publishedAt,updatedAtEditorial,categories,body,relatedPosts,seo,translation}',
      ),
      client.fetch(
        '*[_type == "translation.metadata" && "blogIndexPage" in schemaTypes][0]{translations}',
      ),
      client.fetch(
        '*[_type == "translation.metadata" && "blogPost" in schemaTypes]{translations}',
      ),
      client.fetch(
        'count(*[_type == "fixedPageSection" && pageType == "blogIndexPage"])',
      ),
    ]);
  const issues = [];
  const locales = [];
  let portableTextBlocks = 0;
  let links = 0;
  let localizedLinkIssues = 0;
  for (const locale of LOCALES) {
    const page = pages.find((item) => item.language === locale);
    const localizedPosts = posts.filter((post) => post.language === locale);
    if (!page) {
      issues.push(`Missing blogIndexPage for ${locale}`);
      continue;
    }
    for (const section of SECTION_KEYS)
      if (!page[section])
        issues.push(`${locale} blog index is missing ${section}`);
    if (
      page.listing?.labels?.length !== 3 ||
      page.articleUi?.labels?.length !== 5 ||
      !page.cta?.primaryCta?.link?.href
    )
      issues.push(`${locale} blog UI labels or CTA are incomplete`);
    const slugs = localizedPosts.map((post) => post.slug).sort();
    if (JSON.stringify(slugs) !== JSON.stringify(expectedSlugs))
      issues.push(`${locale} does not have the 15 audited production slugs`);
    for (const post of localizedPosts) {
      if (
        !post.title ||
        !post.excerpt ||
        !post.coverImage?.image?.asset?._ref ||
        !post.coverImage?.alt ||
        !post.authorImage?.image?.asset?._ref ||
        !post.body?.length ||
        !post.seo?.metaTitle ||
        !post.seo?.metaDescription ||
        !post.publishedAt
      )
        issues.push(`${locale}/${post.slug} is incomplete`);
      if (post.relatedPosts?.length !== 3)
        issues.push(`${locale}/${post.slug} does not have three related posts`);
      portableTextBlocks += post.body?.length ?? 0;
      for (const block of post.body ?? [])
        for (const mark of block.markDefs ?? [])
          if (mark._type === "link") {
            links += 1;
            if (
              typeof mark.href === "string" &&
              /^\/(en|fr|ru|pt|es|ar)(\/|$)/.test(mark.href) &&
              !mark.href.startsWith(`/${locale}`)
            ) {
              localizedLinkIssues += 1;
              issues.push(
                `${locale}/${post.slug} contains wrong-locale link ${mark.href}`,
              );
            }
          }
    }
    locales.push({
      locale,
      pageDocumentId: page._id,
      workflowStatus: page.translation?.status,
      blogPosts: localizedPosts.length,
      portableTextBlocks: localizedPosts.reduce(
        (total, post) => total + (post.body?.length ?? 0),
        0,
      ),
      activeMedia: localizedPosts.length * 3 + 1,
    });
  }
  if (sectionCount !== 30)
    issues.push(`Blog index has ${sectionCount} sections; expected 30`);
  if (
    pageMetadata?.translations?.length !== 6 ||
    pageMetadata.translations.some((entry) => !entry.language)
  )
    issues.push("Blog index translation metadata is incomplete");
  if (
    postMetadata.length !== 15 ||
    postMetadata.some(
      (document) =>
        document.translations?.length !== 6 ||
        document.translations.some((entry) => !entry.language),
    )
  )
    issues.push("Blog-post translation metadata is incomplete");
  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset,
    summary: {
      blogIndexPages: pages.length,
      blogPosts: posts.length,
      logicalPosts: expectedSlugs.length,
      referencedSections: sectionCount,
      portableTextBlocks,
      bodyLinks: links,
      localizedLinkIssues,
      activeMediaPlacements: posts.length * 3 + pages.length,
      translationMetadataSets: 1 + postMetadata.length,
      issues: issues.length,
    },
    issues,
    locales,
  };
  const output = path.join(
    ROOT,
    `migration/sanity/blog-report.${dataset}.json`,
  );
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report.summary, null, 2));
  if (issues.length) process.exitCode = 1;
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
