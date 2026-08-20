#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";
const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const SECTIONS = [
  "banner",
  "innovationProcess",
  "customizedSolutions",
  "customerCentric",
  "challenges",
  "solutionsSlider",
  "commitmentToExcellence",
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
      `*[_type == "customizedSolutionsPage"]{_id,language,translation,${SECTIONS.map((section) => `"${section}": ${section}->content`).join(",")}}`,
    ),
    client.fetch(
      '*[_type == "translation.metadata" && "customizedSolutionsPage" in schemaTypes][0]{"references": translations[].value->_id}',
    ),
  ]);
  const issues = [];
  const locales = [];
  for (const locale of LOCALES) {
    const document = documents.find((item) => item.language === locale);
    if (!document) {
      issues.push(`Missing customizedSolutionsPage for ${locale}`);
      continue;
    }
    for (const section of SECTIONS)
      if (!document[section]) issues.push(`${locale} is missing ${section}`);
    if (
      document.innovationProcess?.items?.length !== 4 ||
      document.innovationProcess?.video?.videoId !== "i2oR5Khw2N8" ||
      document.innovationProcess?.labels?.length !== 2
    )
      issues.push(`${locale} innovation process is incomplete`);
    if (
      document.challenges?.groups?.length !== 6 ||
      document.challenges.groups.some((group) => !group.items?.length)
    )
      issues.push(`${locale} challenge groups are incomplete`);
    if (
      document.solutionsSlider?.items?.length !== 3 ||
      document.commitmentToExcellence?.items?.length !== 3
    )
      issues.push(`${locale} solution or commitment cards are incomplete`);
    if (!document.customizedSolutions?.primaryCta?.link?.href)
      issues.push(`${locale} contact CTA is incomplete`);
    if (document.faq?.faqs?.length !== 6)
      issues.push(`${locale} FAQ count is invalid`);
    const media = [
      document.banner?.image,
      document.innovationProcess?.image,
      document.customizedSolutions?.image,
      document.customerCentric?.image,
      document.challenges?.image,
      ...(document.solutionsSlider?.items ?? []).map((item) => item.image),
      document.commitmentToExcellence?.image,
      document.faq?.image,
    ].filter(Boolean);
    const invalidMedia = media.filter(
      (item) => !item.image?.asset?._ref || !item.alt,
    );
    if (media.length !== 10 || invalidMedia.length)
      issues.push(
        `${locale} has ${media.length} media placements and ${invalidMedia.length} invalid entries`,
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
    issues.push("Customized Solutions translation metadata is incomplete");
  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset,
    summary: {
      customizedSolutionsDocuments: documents.length,
      expectedLocales: 6,
      sectionsPerLocale: 8,
      activeMediaPerLocale: 10,
      translationReferences: metadata?.references?.length ?? 0,
      issues: issues.length,
    },
    issues,
    locales,
  };
  const output = path.join(
    ROOT,
    `migration/sanity/customized-solutions-report.${dataset}.json`,
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
