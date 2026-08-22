#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";
const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const SECTIONS = [
  "banner",
  "businessOutcomes",
  "aiNetwork",
  "networkChaos",
  "intelligentNoc",
  "coreCapabilities",
  "networkOperationsChaos",
  "intelligentDiffNoc",
  "chaosControl",
  "frameworkAdaa",
  "lifecycleAutomation",
  "integratedComponents",
  "deploymentModels",
  "keyBenefits",
  "humanInLoop",
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
  const [documents, metadata] = await Promise.all([
    client.fetch(
      `*[_type == "intelligentNocPage"]{_id,language,translation,${SECTIONS.map((section) => `"${section}": ${section}->content`).join(",")}}`,
    ),
    client.fetch(
      '*[_type == "translation.metadata" && "intelligentNocPage" in schemaTypes][0]{"references": translations[].value->_id}',
    ),
  ]);
  const issues = [];
  const locales = [];
  for (const locale of LOCALES) {
    const document = documents.find((item) => item.language === locale);
    if (!document) {
      issues.push(`Missing intelligentNocPage for ${locale}`);
      continue;
    }
    for (const section of SECTIONS)
      if (!document[section]) issues.push(`${locale} is missing ${section}`);
    const counts = [
      ["businessOutcomes", 6],
      ["coreCapabilities", 6],
      ["networkOperationsChaos", 4],
      ["intelligentDiffNoc", 4],
      ["chaosControl", 4],
      ["frameworkAdaa", 4],
      ["lifecycleAutomation", 5],
      ["deploymentModels", 3],
      ["keyBenefits", 7],
    ];
    for (const [section, expected] of counts)
      if (document[section]?.items?.length !== expected)
        issues.push(`${locale}/${section} count is invalid`);
    if (
      document.networkChaos?.groups?.length !== 2 ||
      document.networkChaos.groups.some((group) => group.items?.length !== 4)
    )
      issues.push(`${locale} network chaos groups are incomplete`);
    if (
      document.integratedComponents?.groups?.length !== 2 ||
      document.integratedComponents.groups.some(
        (group) => group.items?.length !== 4,
      )
    )
      issues.push(`${locale} integrated components are incomplete`);
    if (document.faq?.faqs?.length !== 6)
      issues.push(`${locale} FAQ count is invalid`);
    if (
      document.banner?.video?.videoId !== "Z83YPnlPSw8" ||
      !document.banner.video.poster?.image?.asset?._ref
    )
      issues.push(`${locale} video content is incomplete`);
    const media = [
      document.banner?.image,
      document.banner?.video?.poster,
      document.aiNetwork?.image,
      document.intelligentNoc?.image,
      document.networkOperationsChaos?.image,
      document.chaosControl?.image,
      document.humanInLoop?.image,
      document.faq?.image,
    ].filter(Boolean);
    const invalidMedia = media.filter(
      (item) => !item.image?.asset?._ref || !item.alt,
    );
    if (media.length !== 8 || invalidMedia.length)
      issues.push(
        `${locale} has ${media.length} media placements and ${invalidMedia.length} invalid entries`,
      );
    if (document.businessOutcomes?.video || document.businessOutcomes?.image)
      issues.push(`${locale} includes inactive Business Outcomes video media`);
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
    issues.push("Intelligent NOC translation metadata is incomplete");
  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset,
    summary: {
      intelligentNocDocuments: documents.length,
      expectedLocales: 6,
      sectionsPerLocale: 16,
      activeMediaPerLocale: 8,
      translationReferences: metadata?.references?.length ?? 0,
      issues: issues.length,
    },
    issues,
    locales,
  };
  const output = path.join(
    ROOT,
    `migration/sanity/intelligent-noc-report.${dataset}.json`,
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
