#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";
const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const SECTIONS = [
  "banner",
  "whyChooseRobusst",
  "solutionModules",
  "threatIntelligence",
  "howItWorks",
  "businessOutcomes",
  "ourUsp",
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
    client.fetch('*[_type == "cybersecurityPage"]'),
    client.fetch(
      '*[_type == "translation.metadata" && "cybersecurityPage" in schemaTypes][0]{"references": translations[].value->_id}',
    ),
  ]);
  const issues = [];
  const locales = [];
  for (const locale of LOCALES) {
    const document = documents.find((item) => item.language === locale);
    if (!document) {
      issues.push(`Missing cybersecurityPage for ${locale}`);
      continue;
    }
    for (const section of SECTIONS)
      if (!document[section]) issues.push(`${locale} is missing ${section}`);
    if (
      document.whyChooseRobusst?.items?.length !== 4 ||
      document.whyChooseRobusst?.video?.videoId !== "YCq8tKqpvsI" ||
      document.whyChooseRobusst?.labels?.length !== 2
    )
      issues.push(`${locale} Why Choose content is incomplete`);
    if (
      document.solutionModules?.groups?.length !== 9 ||
      document.solutionModules?.labels?.length !== 6
    )
      issues.push(`${locale} solution modules are incomplete`);
    if (
      document.solutionModules?.groups?.some(
        (group) => !group.image?.image?.asset?._ref || !group.labels?.[0],
      )
    )
      issues.push(`${locale} has an incomplete module`);
    if (
      document.threatIntelligence?.items?.length !== 2 ||
      document.howItWorks?.items?.length !== 4 ||
      document.businessOutcomes?.items?.length !== 4 ||
      document.ourUsp?.items?.length !== 4
    )
      issues.push(`${locale} supporting content counts are invalid`);
    if (document.ourUsp?.image)
      issues.push(`${locale} includes the inactive Our USP image`);
    if (document.faq?.faqs?.length !== 6)
      issues.push(`${locale} FAQ count is invalid`);
    const media = [
      document.banner?.image,
      document.whyChooseRobusst?.image,
      ...(document.solutionModules?.groups ?? []).map((group) => group.image),
      document.threatIntelligence?.image,
      document.howItWorks?.image,
      document.businessOutcomes?.image,
      document.faq?.image,
    ].filter(Boolean);
    const invalidMedia = media.filter(
      (item) => !item.image?.asset?._ref || !item.alt,
    );
    if (media.length !== 15 || invalidMedia.length)
      issues.push(
        `${locale} has ${media.length} media placements and ${invalidMedia.length} invalid entries`,
      );
    locales.push({
      locale,
      documentId: document._id,
      workflowStatus: document.translation?.status,
      activeSections: SECTIONS.filter((section) => document[section]).length,
      activeMedia: media.length,
      modules: document.solutionModules?.groups?.length ?? 0,
      faqs: document.faq?.faqs?.length ?? 0,
    });
  }
  if (metadata?.references?.length !== 6)
    issues.push("Cybersecurity translation metadata is incomplete");
  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset,
    summary: {
      cybersecurityDocuments: documents.length,
      expectedLocales: 6,
      sectionsPerLocale: 8,
      activeMediaPerLocale: 15,
      translationReferences: metadata?.references?.length ?? 0,
      issues: issues.length,
    },
    issues,
    locales,
  };
  const output = path.join(
    ROOT,
    `migration/sanity/cybersecurity-report.${dataset}.json`,
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
