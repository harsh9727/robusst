#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";

const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const LEGACY_PATHS = new Set([
  "/success-stories",
  "/solutions/cdp",
  "/solutions/cyber-security",
  "/solutions/customized",
  "/solutions/sales-tracking",
  "/solutions/voicesync",
]);

async function main() {
  if (typeof process.loadEnvFile === "function") {
    try {
      process.loadEnvFile(path.join(ROOT, ".env"));
    } catch {
      // CI supplies environment variables directly.
    }
  }
  const datasetArgument = process.argv.find((argument) =>
    argument.startsWith("--dataset="),
  );
  const dataset =
    datasetArgument?.slice(10) ??
    process.env.NEXT_PUBLIC_SANITY_DATASET ??
    "development";
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset,
    apiVersion: "2026-08-15",
    useCdn: false,
    token: process.env.SANITY_API_READ_TOKEN,
  });
  const settings = await client.fetch(`*[_type == "siteSettings"]{
    _id, language, translation,
    "logoAsset": logo.image.asset->_id,
    "socialImageAsset": defaultSeo.socialImage.image.asset->_id,
    primaryNavigation, solutionsNavigation, resourcesNavigation,
    quickLinks, solutionLinks, socialLinks,
    announcement, headerPrimaryCta, headerSecondaryCta, footerCta, notFoundAction,
    mobileMenuTitle, mobileMenuOpenLabel, mobileMenuCloseLabel,
    footerHeading, footerDescription, footerHashtag,
    defaultSeo, skipLinkLabel, goToTopLabel
  }`);
  const languageSettings = await client.fetch(`*[_id == "languageSettings"][0]{
    "languageCount": count([en, fr, ru, pt, es, ar][defined(@)]),
    "flagAssets": [en.flag.image.asset->_id, fr.flag.image.asset->_id, ru.flag.image.asset->_id, pt.flag.image.asset->_id, es.flag.image.asset->_id, ar.flag.image.asset->_id]
  }`);
  const metadata = await client.fetch(
    '*[_type == "translation.metadata" && "siteSettings" in schemaTypes][0]{"languages": translations[].language, "references": translations[].value->_id}',
  );

  const issues = [];
  const localeResults = [];
  for (const locale of LOCALES) {
    const document = settings.find((item) => item.language === locale);
    if (!document) {
      issues.push(`Missing siteSettings for ${locale}`);
      continue;
    }
    const links = [
      document.announcement,
      ...(document.primaryNavigation ?? []),
      ...(document.solutionsNavigation ?? []),
      ...(document.resourcesNavigation ?? []),
      ...(document.quickLinks ?? []),
      ...(document.solutionLinks ?? []),
      ...(document.socialLinks ?? []),
      document.headerPrimaryCta?.link,
      document.headerSecondaryCta?.link,
      document.footerCta?.link,
      document.notFoundAction?.link,
    ].filter(Boolean);
    const legacyLinks = links
      .filter((link) => LEGACY_PATHS.has(link.href))
      .map((link) => link.href);
    const invalidInternalLinks = links
      .filter((link) => link.kind === "internal" && !link.href?.startsWith("/"))
      .map((link) => link.href);
    if (!document.logoAsset) issues.push(`Missing logo asset for ${locale}`);
    if (!document.socialImageAsset)
      issues.push(`Missing social image for ${locale}`);
    if (legacyLinks.length)
      issues.push(
        `Legacy links remain for ${locale}: ${legacyLinks.join(", ")}`,
      );
    if (invalidInternalLinks.length)
      issues.push(`Invalid internal links for ${locale}`);
    localeResults.push({
      locale,
      documentId: document._id,
      workflowStatus: document.translation?.status,
      links: links.length,
      legacyLinks,
      invalidInternalLinks,
      logoAsset: document.logoAsset,
      socialImageAsset: document.socialImageAsset,
      seoTitleLength: document.defaultSeo?.metaTitle?.length ?? 0,
      seoDescriptionLength: document.defaultSeo?.metaDescription?.length ?? 0,
    });
  }
  if (languageSettings?.languageCount !== 6)
    issues.push("Language settings do not contain six options");
  if (languageSettings?.flagAssets?.some((asset) => !asset))
    issues.push("One or more language flags are missing");
  if (metadata?.languages?.length !== 6 || metadata?.references?.length !== 6)
    issues.push("Site-settings translation metadata is incomplete");

  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset,
    summary: {
      siteSettingsDocuments: settings.length,
      expectedLocales: LOCALES.length,
      languageOptions: languageSettings?.languageCount ?? 0,
      translationReferences: metadata?.references?.length ?? 0,
      issues: issues.length,
    },
    issues,
    locales: localeResults,
  };
  const output = path.join(
    ROOT,
    `migration/sanity/global-content-report.${dataset}.json`,
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
