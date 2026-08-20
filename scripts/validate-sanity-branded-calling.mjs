#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";
const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const SECTIONS = [
  "banner",
  "brandedCalling",
  "antiSpamProtection",
  "whyChoose",
  "keyFeatures",
  "coreProtectionFeatures",
  "eliminate",
  "transformCommunication",
  "securityCompliance",
  "regionalExcellence",
  "industryApplications",
  "faq",
];
const COUNTS = {
  whyChoose: 4,
  keyFeatures: 4,
  coreProtectionFeatures: 4,
  securityCompliance: 4,
  regionalExcellence: 4,
  industryApplications: 6,
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
    client.fetch(
      `*[_type == "brandedCallingPage"]{_id,language,translation,${SECTIONS.map((section) => `"${section}": ${section}->content`).join(",")}}`,
    ),
    client.fetch(
      '*[_type == "translation.metadata" && "brandedCallingPage" in schemaTypes][0]{"references": translations[].value->_id}',
    ),
  ]);
  const issues = [];
  const locales = [];
  for (const locale of LOCALES) {
    const document = documents.find((item) => item.language === locale);
    if (!document) {
      issues.push(`Missing brandedCallingPage for ${locale}`);
      continue;
    }
    for (const section of SECTIONS)
      if (!document[section]) issues.push(`${locale} is missing ${section}`);
    for (const [section, expected] of Object.entries(COUNTS))
      if (document[section]?.items?.length !== expected)
        issues.push(
          `${locale}/${section} has ${document[section]?.items?.length ?? 0} items; expected ${expected}`,
        );
    if (document.faq?.faqs?.length !== 5)
      issues.push(`${locale} FAQ count is invalid`);
    if (
      document.eliminate?.video?.videoId !== "r4DBZZIO2m8" ||
      document.eliminate?.labels?.length !== 3
    )
      issues.push(`${locale} video controls are incomplete`);
    const media = [
      document.banner?.image,
      ...(document.eliminate?.images ?? []),
      document.transformCommunication?.image,
      document.brandedCalling?.image,
      document.keyFeatures?.image,
      document.antiSpamProtection?.image,
      document.coreProtectionFeatures?.image,
      document.regionalExcellence?.image,
      document.faq?.image,
    ].filter(Boolean);
    const invalidMedia = media.filter(
      (item) => !item.image?.asset?._ref || !item.alt,
    );
    if (media.length !== 10 || invalidMedia.length)
      issues.push(
        `${locale} has ${media.length} media entries and ${invalidMedia.length} invalid entries`,
      );
    locales.push({
      locale,
      documentId: document._id,
      workflowStatus: document.translation?.status,
      activeSections: SECTIONS.filter((section) => document[section]).length,
      activeMedia: media.length,
      faqs: document.faq?.faqs?.length ?? 0,
    });
  }
  if (metadata?.references?.length !== 6)
    issues.push("Branded Calling translation metadata is incomplete");
  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset,
    summary: {
      brandedCallingDocuments: documents.length,
      expectedLocales: 6,
      sectionsPerLocale: 12,
      activeMediaPerLocale: 10,
      translationReferences: metadata?.references?.length ?? 0,
      issues: issues.length,
    },
    issues,
    locales,
  };
  const output = path.join(
    ROOT,
    `migration/sanity/branded-calling-report.${dataset}.json`,
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
