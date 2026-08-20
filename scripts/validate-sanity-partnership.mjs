#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";

const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];

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
      '*[_type == "partnershipPage"]{"id": _id, language, translation, "bannerAsset": banner.image.image.asset->_id, "partnerCards": count(partnerProgram.items), "partnerOptions": count(form.partnerTypeOptions), "hasBanner": defined(banner), "hasPartnerProgram": defined(partnerProgram), "hasFormIntro": defined(formIntro), "hasForm": defined(form)}',
    ),
    client.fetch(
      '*[_type == "translation.metadata" && "partnershipPage" in schemaTypes][0]{"references": translations[].value->_id}',
    ),
  ]);
  const issues = [];
  const locales = [];
  for (const locale of LOCALES) {
    const document = documents.find((item) => item.language === locale);
    if (!document) {
      issues.push(`Missing partnershipPage for ${locale}`);
      continue;
    }
    if (
      !document.hasBanner ||
      !document.hasPartnerProgram ||
      !document.hasFormIntro ||
      !document.hasForm
    )
      issues.push(`${locale} is missing required Partnership content`);
    if (!document.bannerAsset)
      issues.push(`${locale} has no Sanity banner asset`);
    if (document.partnerCards !== 2)
      issues.push(`${locale} has ${document.partnerCards} partner cards`);
    if (document.partnerOptions !== 2)
      issues.push(`${locale} has ${document.partnerOptions} partner options`);
    locales.push(document);
  }
  if (metadata?.references?.length !== 6)
    issues.push("Partnership translation metadata is incomplete");
  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset,
    summary: {
      partnershipDocuments: documents.length,
      expectedLocales: 6,
      translationReferences: metadata?.references?.length ?? 0,
      issues: issues.length,
    },
    issues,
    locales,
  };
  const output = path.join(
    ROOT,
    `migration/sanity/partnership-report.${dataset}.json`,
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
