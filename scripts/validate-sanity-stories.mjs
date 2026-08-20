#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";
const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
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
  const [pages, stories, pageMetadata, storyMetadata, sectionCount] =
    await Promise.all([
      client.fetch(
        '*[_type == "storiesPage"]{_id,language,translation,"banner":banner->content,"listing":listing->content,"detailDialog":detailDialog->content,"cta":cta->content}',
      ),
      client.fetch(
        '*[_type == "successStory"]{_id,legacyId,title,customerName,customerLogo,summary,challenges,solutions,seo,language,translation}',
      ),
      client.fetch(
        '*[_type == "translation.metadata" && "storiesPage" in schemaTypes][0]{"references": translations[].value->_id}',
      ),
      client.fetch(
        '*[_type == "translation.metadata" && "successStory" in schemaTypes]{"references": translations[].value->_id}',
      ),
      client.fetch(
        'count(*[_type == "fixedPageSection" && pageType == "storiesPage"])',
      ),
    ]);
  const issues = [];
  const locales = [];
  for (const locale of LOCALES) {
    const page = pages.find((item) => item.language === locale);
    const localizedStories = stories.filter((item) => item.language === locale);
    if (!page) {
      issues.push(`Missing storiesPage for ${locale}`);
      continue;
    }
    if (
      !page.banner?.image?.image?.asset?._ref ||
      !page.banner?.image?.alt ||
      !page.banner?.primaryCta?.link?.href
    )
      issues.push(`${locale} banner is incomplete`);
    if (
      page.listing?.labels?.length !== 1 ||
      page.detailDialog?.labels?.length !== 2
    )
      issues.push(`${locale} listing/dialog labels are incomplete`);
    if (localizedStories.length !== 12)
      issues.push(
        `${locale} has ${localizedStories.length} stories; expected 12`,
      );
    for (const story of localizedStories) {
      if (
        !story.customerLogo?.image?.asset?._ref ||
        !story.customerLogo?.alt ||
        !story.challenges?.length ||
        !story.solutions?.length ||
        !story.seo?.metaTitle ||
        !story.seo?.metaDescription
      )
        issues.push(`${locale} story ${story.legacyId} is incomplete`);
    }
    locales.push({
      locale,
      pageDocumentId: page._id,
      workflowStatus: page.translation?.status,
      successStories: localizedStories.length,
      activeMedia: 1 + localizedStories.length,
    });
  }
  if (pageMetadata?.references?.length !== 6)
    issues.push("Stories page translation metadata is incomplete");
  if (
    storyMetadata.length !== 12 ||
    storyMetadata.some((item) => item.references?.length !== 6)
  )
    issues.push("Success-story translation metadata is incomplete");
  if (sectionCount !== 24)
    issues.push(
      `Stories has ${sectionCount} referenced page sections; expected 24`,
    );
  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset,
    summary: {
      storiesPageDocuments: pages.length,
      successStoryDocuments: stories.length,
      referencedSections: sectionCount,
      expectedLocales: 6,
      storiesPerLocale: 12,
      activeMediaPerLocale: 13,
      pageTranslationReferences: pageMetadata?.references?.length ?? 0,
      storyTranslationSets: storyMetadata.length,
      issues: issues.length,
    },
    issues,
    locales,
  };
  const output = path.join(
    ROOT,
    `migration/sanity/stories-report.${dataset}.json`,
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
