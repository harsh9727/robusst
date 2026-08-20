#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";

const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const APPROVED_SLUGS = [
  "branded-calling",
  "customer-data-platform",
  "cybersecurity",
  "sts-dms",
  "intelligent-noc",
  "ai-call-center",
  "network-monetization",
  "customized-solutions",
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
    client.fetch('*[_type == "solutionsPage"]'),
    client.fetch(
      '*[_type == "translation.metadata" && "solutionsPage" in schemaTypes][0]{"references": translations[].value->_id}',
    ),
  ]);
  const issues = [];
  const locales = [];
  for (const locale of LOCALES) {
    const document = documents.find((item) => item.language === locale);
    if (!document) {
      issues.push(`Missing solutionsPage for ${locale}`);
      continue;
    }
    if (!document.banner?.video?.videoFile?.asset?._ref)
      issues.push(`${locale} has no Sanity banner video`);
    const cards = document.solutionGrid?.items ?? [];
    const slugs = cards.map((card) => card.internalName);
    if (JSON.stringify(slugs) !== JSON.stringify(APPROVED_SLUGS))
      issues.push(
        `${locale} solution order/routes differ from the approved list`,
      );
    for (const card of cards) {
      if (
        !card.title ||
        !card.description ||
        !card.image?.image?.asset?._ref ||
        !card.image?.alt ||
        !card.cta?.link?.label ||
        card.cta?.link?.href !== `/solutions/${card.internalName}`
      )
        issues.push(
          `${locale}/${card.internalName ?? "unknown"} card is incomplete`,
        );
    }
    if (
      locale === "ru" &&
      !/[А-Яа-яЁё]/.test(
        `${document.banner?.title} ${document.banner?.subtitle}`,
      )
    )
      issues.push("Russian Solutions banner does not contain Cyrillic text");
    locales.push({
      locale,
      documentId: document._id,
      workflowStatus: document.translation?.status,
      bannerVideoAsset: document.banner?.video?.videoFile?.asset?._ref,
      cards: cards.length,
      slugs,
    });
  }
  if (metadata?.references?.length !== 6)
    issues.push("Solutions translation metadata is incomplete");
  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset,
    summary: {
      solutionsDocuments: documents.length,
      expectedLocales: 6,
      cardsPerLocale: 8,
      translationReferences: metadata?.references?.length ?? 0,
      issues: issues.length,
    },
    issues,
    locales,
  };
  const output = path.join(
    ROOT,
    `migration/sanity/solutions-index-report.${dataset}.json`,
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
