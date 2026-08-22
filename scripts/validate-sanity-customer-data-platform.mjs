#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";
const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const SECTIONS = [
  "banner",
  "whyChooseRobusst",
  "industryApplications",
  "provenImpact",
  "telecomUseCases",
  "personalizedExperience",
  "solutionGrid",
  "benefitsUseCases",
  "accelerateValue",
  "keyFeaturesCapabilities",
  "cta",
  "faq",
];
const COUNTS = {
  whyChooseRobusst: 6,
  industryApplications: 4,
  provenImpact: 4,
  benefitsUseCases: 5,
  accelerateValue: 3,
  keyFeaturesCapabilities: 4,
};
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
  const [documents, metadata] = await Promise.all([
    client.fetch('*[_type == "customerDataPlatformPage"]'),
    client.fetch(
      '*[_type == "translation.metadata" && "customerDataPlatformPage" in schemaTypes][0]{"references": translations[].value->_id}',
    ),
  ]);
  const issues = [];
  const locales = [];
  for (const locale of LOCALES) {
    const document = documents.find((item) => item.language === locale);
    if (!document) {
      issues.push(`Missing customerDataPlatformPage for ${locale}`);
      continue;
    }
    for (const section of SECTIONS)
      if (!document[section]) issues.push(`${locale} is missing ${section}`);
    for (const [section, expected] of Object.entries(COUNTS))
      if (document[section]?.items?.length !== expected)
        issues.push(
          `${locale}/${section} has ${document[section]?.items?.length ?? 0} items; expected ${expected}`,
        );
    if (
      document.telecomUseCases?.labels?.length !== 6 ||
      document.personalizedExperience?.labels?.length !== 6
    )
      issues.push(`${locale} use-case labels are incomplete`);
    if (
      document.solutionGrid?.groups?.length !== 5 ||
      document.solutionGrid.groups.some(
        (group) => !group.image?.image?.asset?._ref || !group.labels?.[0],
      )
    )
      issues.push(`${locale} solution modules are incomplete`);
    if (document.faq?.faqs?.length !== 6 || !document.faq?.title)
      issues.push(`${locale} FAQ content is incomplete`);
    if (
      document.banner?.video?.videoId !== "i2oR5Khw2N8" ||
      !document.banner.video.poster?.image?.asset?._ref
    )
      issues.push(`${locale} video content is incomplete`);
    if (
      !document.cta?.primaryCta?.link?.href ||
      !document.cta?.secondaryCta?.link?.href
    )
      issues.push(`${locale} CTA destinations are incomplete`);
    if (locale === "en" && document.banner?.description?.includes("anxd"))
      issues.push("English CDP typo remains");
    if (
      locale === "ru" &&
      document.banner?.description?.includes("Robusst's advanced")
    )
      issues.push("Russian CDP banner still contains the English fragment");
    const media = [
      document.banner?.image,
      document.banner?.video?.poster,
      document.whyChooseRobusst?.image,
      document.provenImpact?.image,
      document.telecomUseCases?.image,
      document.personalizedExperience?.image,
      document.solutionGrid?.image,
      ...(document.solutionGrid?.groups ?? []).map((group) => group.image),
      document.benefitsUseCases?.image,
      document.accelerateValue?.image,
      document.keyFeaturesCapabilities?.image,
      document.cta?.image,
      document.faq?.image,
    ].filter(Boolean);
    const invalidMedia = media.filter(
      (item) => !item.image?.asset?._ref || !item.alt,
    );
    if (media.length !== 17 || invalidMedia.length)
      issues.push(
        `${locale} has ${media.length} media entries and ${invalidMedia.length} invalid entries`,
      );
    locales.push({
      locale,
      documentId: document._id,
      workflowStatus: document.translation?.status,
      activeSections: SECTIONS.filter((section) => document[section]).length,
      activeMedia: media.length,
      modules: document.solutionGrid?.groups?.length ?? 0,
      faqs: document.faq?.faqs?.length ?? 0,
    });
  }
  if (metadata?.references?.length !== 6)
    issues.push("Customer Data Platform translation metadata is incomplete");
  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset,
    summary: {
      customerDataPlatformDocuments: documents.length,
      expectedLocales: 6,
      sectionsPerLocale: 12,
      activeMediaPerLocale: 17,
      translationReferences: metadata?.references?.length ?? 0,
      issues: issues.length,
    },
    issues,
    locales,
  };
  const output = path.join(
    ROOT,
    `migration/sanity/customer-data-platform-report.${dataset}.json`,
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
