#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";

const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const PLATFORM_FIELDS = ["cdp", "cpm", "kyc", "noc"];

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
    client.fetch('*[_type == "platformsPage"]'),
    client.fetch(
      '*[_type == "translation.metadata" && "platformsPage" in schemaTypes][0]{"references": translations[].value->_id}',
    ),
  ]);
  const issues = [];
  const locales = [];
  for (const locale of LOCALES) {
    const document = documents.find((item) => item.language === locale);
    if (!document) {
      issues.push(`Missing platformsPage for ${locale}`);
      continue;
    }
    const platformResults = {};
    for (const field of PLATFORM_FIELDS) {
      const section = document[field];
      const moduleGroup = section?.groups?.find(
        (group) => group.internalName === "keyModules",
      );
      const benefitGroup = section?.groups?.find(
        (group) => group.internalName === "clientBenefits",
      );
      platformResults[field] = {
        imageAsset: section?.image?.image?.asset?._ref,
        modules: moduleGroup?.items?.length ?? 0,
        benefits: benefitGroup?.items?.length ?? 0,
      };
      if (
        !platformResults[field].imageAsset ||
        !platformResults[field].modules ||
        !platformResults[field].benefits
      )
        issues.push(`${locale}/${field} is incomplete`);
    }
    if (!document.banner?.video?.videoFile?.asset?._ref)
      issues.push(`${locale} has no Sanity banner video`);
    if (!document.whyChoose?.items?.length)
      issues.push(`${locale} has no why-choose cards`);
    locales.push({
      locale,
      documentId: document._id,
      workflowStatus: document.translation?.status,
      bannerVideoAsset: document.banner?.video?.videoFile?.asset?._ref,
      whyChooseCards: document.whyChoose?.items?.length ?? 0,
      platforms: platformResults,
    });
  }
  if (metadata?.references?.length !== 6)
    issues.push("Platforms translation metadata is incomplete");
  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset,
    summary: {
      platformsDocuments: documents.length,
      expectedLocales: 6,
      translationReferences: metadata?.references?.length ?? 0,
      issues: issues.length,
    },
    issues,
    locales,
  };
  const output = path.join(
    ROOT,
    `migration/sanity/platforms-report.${dataset}.json`,
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
