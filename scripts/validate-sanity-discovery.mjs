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
  const documents = await client.fetch(
    `*[_type == "siteSettings"]{language,siteName,tagline,organizationDescription,contactEmail,"logo":logo.image.asset->url,"favicon":favicon.asset->url,socialLinks[]{label,href},quickLinksHeading,socialLinksHeading,defaultSeo{"title":metaTitle,"description":metaDescription,keywords,"socialImage":socialImage.image.asset->url},"solutions":*[_type=="solutionsPage"&&language==^.language][0].solutionGrid.items[]{title,description,"href":cta.link.href},"presence":*[_type=="homePage"&&language==^.language][0].ourPresence.labels,"customers":array::unique(*[_type=="successStory"&&language==^.language].customerName),"blogs":*[_type=="blogPost"&&language==^.language]{"slug":slug.current}}`,
  );
  const issues = [];
  const localeReports = [];
  for (const locale of LOCALES) {
    const document = documents.find((item) => item.language === locale);
    if (!document) {
      issues.push(`Missing siteSettings for ${locale}`);
      continue;
    }
    if (
      !document.siteName ||
      !document.tagline ||
      !document.organizationDescription ||
      !document.logo ||
      !document.favicon ||
      !document.defaultSeo?.title ||
      !document.defaultSeo?.description ||
      !document.defaultSeo?.socialImage
    )
      issues.push(`${locale} discovery identity or SEO is incomplete`);
    if (
      document.solutions?.length !== 8 ||
      document.solutions.some(
        (item) => !item.title || !item.description || !item.href,
      )
    )
      issues.push(`${locale} discovery solutions are incomplete`);
    if (
      document.customers?.length !== 12 ||
      document.blogs?.length !== 15 ||
      document.presence?.length !== 23
    )
      issues.push(`${locale} discovery collections are incomplete`);
    if (
      !document.quickLinksHeading ||
      !document.socialLinksHeading ||
      !document.socialLinks?.length
    )
      issues.push(`${locale} discovery navigation labels are incomplete`);
    localeReports.push({
      locale,
      solutions: document.solutions?.length ?? 0,
      customers: document.customers?.length ?? 0,
      blogs: document.blogs?.length ?? 0,
      presenceLocations: document.presence?.length ?? 0,
      socialProfiles: document.socialLinks?.length ?? 0,
    });
  }
  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset,
    summary: {
      locales: documents.length,
      solutionsPerLocale: 8,
      customersPerLocale: 12,
      blogsPerLocale: 15,
      presenceLocationsPerLocale: 23,
      issues: issues.length,
    },
    issues,
    locales: localeReports,
  };
  const output = path.join(
    ROOT,
    `migration/sanity/discovery-report.${dataset}.json`,
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
