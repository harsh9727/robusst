#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";
const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const SECTIONS = [
  "banner",
  "telecomIntelligence",
  "salesDistribution",
  "whyRobusst",
  "robusstPlatform",
  "businessAutomation",
  "successStories",
  "solutionGrid",
  "driveSales",
  "erpHrisIntegration",
  "industryAgnostic",
  "faq",
];
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
  const projections = SECTIONS.map(
    (section) => `"${section}": ${section}->content`,
  ).join(",");
  const [documents, metadata, sectionCount] = await Promise.all([
    client.fetch(
      `*[_type == "stsDmsPage"]{_id,language,translation,${projections}}`,
    ),
    client.fetch(
      '*[_type == "translation.metadata" && "stsDmsPage" in schemaTypes][0]{"references": translations[].value->_id}',
    ),
    client.fetch(
      'count(*[_type == "fixedPageSection" && pageType == "stsDmsPage"])',
    ),
  ]);
  const issues = [];
  const locales = [];
  for (const locale of LOCALES) {
    const document = documents.find((item) => item.language === locale);
    if (!document) {
      issues.push(`Missing stsDmsPage for ${locale}`);
      continue;
    }
    for (const section of SECTIONS)
      if (!document[section]) issues.push(`${locale} is missing ${section}`);
    const counts = [
      ["salesDistribution", 10],
      ["whyRobusst", 4],
      ["robusstPlatform", 6],
      ["businessAutomation", 6],
      ["successStories", 4],
      ["driveSales", 4],
      ["erpHrisIntegration", 6],
      ["industryAgnostic", 12],
    ];
    for (const [section, expected] of counts)
      if (document[section]?.items?.length !== expected)
        issues.push(`${locale}/${section} count is invalid`);
    if (
      document.solutionGrid?.groups?.length !== 5 ||
      document.solutionGrid?.labels?.length !== 2
    )
      issues.push(`${locale} solution grid is incomplete`);
    if (
      document.telecomIntelligence?.video?.videoId !== "UIhUqIy9w0Y" ||
      document.telecomIntelligence?.labels?.length !== 2
    )
      issues.push(`${locale} telecom video is incomplete`);
    if (document.faq?.faqs?.length !== 6)
      issues.push(`${locale} FAQ count is invalid`);
    const media = [
      document.banner?.image,
      document.telecomIntelligence?.image,
      document.whyRobusst?.image,
      document.successStories?.image,
      document.solutionGrid?.image,
      ...(document.solutionGrid?.groups ?? []).map((group) => group.image),
      document.driveSales?.image,
      document.faq?.image,
    ].filter(Boolean);
    const invalidMedia = media.filter(
      (item) => !item.image?.asset?._ref || !item.alt,
    );
    if (media.length !== 12 || invalidMedia.length)
      issues.push(
        `${locale} has ${media.length} media placements and ${invalidMedia.length} invalid entries`,
      );
    locales.push({
      locale,
      documentId: document._id,
      workflowStatus: document.translation?.status,
      activeSections: SECTIONS.filter((section) => document[section]).length,
      activeMedia: media.length,
      solutions: document.solutionGrid?.groups?.length ?? 0,
      faqs: document.faq?.faqs?.length ?? 0,
    });
  }
  if (metadata?.references?.length !== 6)
    issues.push("STS/DMS translation metadata is incomplete");
  if (sectionCount !== 72)
    issues.push(`STS/DMS has ${sectionCount} referenced sections; expected 72`);
  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset,
    summary: {
      stsDmsDocuments: documents.length,
      referencedSections: sectionCount,
      expectedLocales: 6,
      sectionsPerLocale: 12,
      activeMediaPerLocale: 12,
      translationReferences: metadata?.references?.length ?? 0,
      issues: issues.length,
    },
    issues,
    locales,
  };
  const output = path.join(
    ROOT,
    `migration/sanity/sts-dms-report.${dataset}.json`,
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
