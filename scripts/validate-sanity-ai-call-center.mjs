#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";

const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const REQUIRED_SECTIONS = [
  "banner",
  "businessProblem",
  "solutionOverview",
  "keyValueProposition",
  "coreCapabilities",
  "advancedAiIntelligence",
  "enterpriseArchitecture",
  "solutionGrid",
  "customDevelopment",
  "idealUseCases",
  "futureAutomation",
  "faq",
];
const CARD_COUNTS = {
  businessProblem: 4,
  solutionOverview: 4,
  coreCapabilities: 6,
  advancedAiIntelligence: 4,
  enterpriseArchitecture: 3,
  customDevelopment: 3,
  idealUseCases: 6,
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
      `*[_type == "aiCallCenterPage"]{_id,language,translation,${REQUIRED_SECTIONS.map((section) => `"${section}": ${section}->content`).join(",")}}`,
    ),
    client.fetch(
      '*[_type == "translation.metadata" && "aiCallCenterPage" in schemaTypes][0]{"references": translations[].value->_id}',
    ),
  ]);
  const issues = [];
  const locales = [];
  for (const locale of LOCALES) {
    const document = documents.find((item) => item.language === locale);
    if (!document) {
      issues.push(`Missing aiCallCenterPage for ${locale}`);
      continue;
    }
    for (const section of REQUIRED_SECTIONS)
      if (!document[section]) issues.push(`${locale} is missing ${section}`);
    for (const [section, expected] of Object.entries(CARD_COUNTS))
      if (document[section]?.items?.length !== expected)
        issues.push(
          `${locale}/${section} has ${document[section]?.items?.length ?? 0} cards; expected ${expected}`,
        );
    if (
      document.solutionGrid?.groups?.length !== 3 ||
      document.solutionGrid.groups.some(
        (group) =>
          group.items?.length !== 2 ||
          !group.image?.image?.asset?._ref ||
          !group.labels?.[1],
      )
    )
      issues.push(`${locale} solution detail grid is incomplete`);
    if (document.keyValueProposition?.statistics?.length !== 3)
      issues.push(`${locale} value proposition statistics are incomplete`);
    if (document.faq?.faqs?.length !== 6)
      issues.push(`${locale} FAQs are incomplete`);
    if (
      document.businessProblem?.video?.videoId !== "jeLPsaU15to" ||
      document.businessProblem?.labels?.length !== 3
    )
      issues.push(`${locale} video or accessibility copy is incomplete`);
    const media = [
      document.banner?.image,
      document.businessProblem?.image,
      document.solutionOverview?.image,
      ...(document.coreCapabilities?.images ?? []),
      document.enterpriseArchitecture?.image,
      ...(document.solutionGrid?.groups ?? []).map((group) => group.image),
      document.customDevelopment?.image,
      document.faq?.image,
    ].filter(Boolean);
    const invalidMedia = media.filter(
      (item) => !item.image?.asset?._ref || !item.alt,
    );
    if (media.length !== 11 || invalidMedia.length)
      issues.push(
        `${locale} has ${media.length} active media entries and ${invalidMedia.length} invalid entries`,
      );
    if (locale === "ar") {
      for (const section of [
        "coreCapabilities",
        "futureAutomation",
        "solutionOverview",
        "customDevelopment",
        "keyValueProposition",
        "advancedAiIntelligence",
        "enterpriseArchitecture",
      ])
        if (!/[؀-ۿ]/.test(document[section]?.title ?? ""))
          issues.push(
            `Arabic generated section ${section} does not contain Arabic text`,
          );
    }
    locales.push({
      locale,
      documentId: document._id,
      workflowStatus: document.translation?.status,
      activeSections: REQUIRED_SECTIONS.filter((section) => document[section])
        .length,
      activeMedia: media.length,
      solutionGroups: document.solutionGrid?.groups?.length ?? 0,
      faqs: document.faq?.faqs?.length ?? 0,
    });
  }
  if (metadata?.references?.length !== 6)
    issues.push("AI Call Center translation metadata is incomplete");
  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset,
    summary: {
      aiCallCenterDocuments: documents.length,
      expectedLocales: 6,
      sectionsPerLocale: 12,
      activeMediaPerLocale: 11,
      translationReferences: metadata?.references?.length ?? 0,
      issues: issues.length,
    },
    issues,
    locales,
  };
  const output = path.join(
    ROOT,
    `migration/sanity/ai-call-center-report.${dataset}.json`,
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
