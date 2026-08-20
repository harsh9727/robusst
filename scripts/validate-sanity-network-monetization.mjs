#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";
const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const SECTIONS = [
  "banner",
  "whyNetworkMonetization",
  "monetizationFramework",
  "userExperienceManagement",
  "solutionGrid",
  "mobileUseCase",
  "useCaseGrid",
  "telcos",
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
      `*[_type == "networkMonetizationPage"]{_id,language,translation,${SECTIONS.map((section) => `"${section}": ${section}->content`).join(",")}}`,
    ),
    client.fetch(
      '*[_type == "translation.metadata" && "networkMonetizationPage" in schemaTypes][0]{"references": translations[].value->_id}',
    ),
  ]);
  const issues = [];
  const locales = [];
  for (const locale of LOCALES) {
    const document = documents.find((item) => item.language === locale);
    if (!document) {
      issues.push(`Missing networkMonetizationPage for ${locale}`);
      continue;
    }
    for (const section of SECTIONS)
      if (!document[section]) issues.push(`${locale} is missing ${section}`);
    if (!document.banner?.video?.videoFile?.asset?._ref)
      issues.push(`${locale} banner video is incomplete`);
    if (
      document.whyNetworkMonetization?.paragraphs?.length !== 4 ||
      document.whyNetworkMonetization?.labels?.length !== 2 ||
      document.whyNetworkMonetization?.video?.videoId !== "Z83YPnlPSw8"
    )
      issues.push(`${locale} Why Network Monetization is incomplete`);
    if (
      document.monetizationFramework?.items?.length !== 4 ||
      document.solutionGrid?.groups?.length !== 5 ||
      document.mobileUseCase?.items?.length !== 9 ||
      document.useCaseGrid?.groups?.length !== 9
    )
      issues.push(`${locale} content collection counts are invalid`);
    if (document.useCaseGrid?.groups?.some((group) => group.image))
      issues.push(`${locale} includes non-rendered use-case imagery`);
    if (
      document.useCaseGrid?.labels?.length !== 4 ||
      document.solutionGrid?.labels?.length !== 2
    )
      issues.push(`${locale} dialog or solution labels are incomplete`);
    if (
      document.telcos?.labels?.length !== 8 ||
      document.faq?.faqs?.length !== 6
    )
      issues.push(`${locale} Telcos or FAQ content is incomplete`);
    const images = [
      document.whyNetworkMonetization?.image,
      document.userExperienceManagement?.image,
      ...(document.solutionGrid?.groups ?? []).map((group) => group.image),
      document.telcos?.image,
      document.faq?.image,
    ].filter(Boolean);
    const invalidMedia = images.filter(
      (item) => !item.image?.asset?._ref || !item.alt,
    );
    const mediaCount =
      images.length + (document.banner?.video?.videoFile?.asset?._ref ? 1 : 0);
    if (mediaCount !== 10 || invalidMedia.length)
      issues.push(
        `${locale} has ${mediaCount} media placements and ${invalidMedia.length} invalid image entries`,
      );
    locales.push({
      locale,
      documentId: document._id,
      workflowStatus: document.translation?.status,
      activeSections: SECTIONS.filter((section) => document[section]).length,
      activeMedia: mediaCount,
      useCases: document.useCaseGrid?.groups?.length ?? 0,
      faqs: document.faq?.faqs?.length ?? 0,
    });
  }
  if (metadata?.references?.length !== 6)
    issues.push("Network Monetization translation metadata is incomplete");
  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset,
    summary: {
      networkMonetizationDocuments: documents.length,
      expectedLocales: 6,
      sectionsPerLocale: 9,
      activeMediaPerLocale: 10,
      translationReferences: metadata?.references?.length ?? 0,
      issues: issues.length,
    },
    issues,
    locales,
  };
  const output = path.join(
    ROOT,
    `migration/sanity/network-monetization-report.${dataset}.json`,
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
