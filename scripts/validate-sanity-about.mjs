#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";

const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const SECTIONS = [
  "hero",
  "mission",
  "vision",
  "purpose",
  "values",
  "whatDefinesUs",
  "challenges",
];

function inspect(value, result) {
  if (Array.isArray(value))
    return value.forEach((item) => inspect(item, result));
  if (!value || typeof value !== "object") {
    if (
      typeof value === "string" &&
      (/^\/about\//.test(value) || /^\/pics\//.test(value))
    )
      result.localAssetPaths.push(value);
    return;
  }
  if (
    typeof value._ref === "string" &&
    (value._ref.startsWith("image-") || value._ref.startsWith("file-"))
  )
    result.mediaReferences.add(value._ref);
  Object.values(value).forEach((child) => inspect(child, result));
}

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
    client.fetch('*[_type == "aboutPage"]'),
    client.fetch(
      '*[_type == "translation.metadata" && "aboutPage" in schemaTypes][0]{"languages": translations[].language, "references": translations[].value->_id}',
    ),
  ]);
  const issues = [];
  const locales = [];
  for (const locale of LOCALES) {
    const document = documents.find((item) => item.language === locale);
    if (!document) {
      issues.push(`Missing aboutPage for ${locale}`);
      continue;
    }
    const missingSections = SECTIONS.filter((section) => !document[section]);
    const inspection = { localAssetPaths: [], mediaReferences: new Set() };
    inspect(document, inspection);
    if (missingSections.length)
      issues.push(
        `${locale} is missing sections: ${missingSections.join(", ")}`,
      );
    if (inspection.localAssetPaths.length)
      issues.push(`${locale} retains local About asset paths`);
    locales.push({
      locale,
      documentId: document._id,
      workflowStatus: document.translation?.status,
      sections: SECTIONS.length - missingSections.length,
      missingSections,
      mediaReferences: inspection.mediaReferences.size,
      localAssetPaths: inspection.localAssetPaths,
    });
  }
  if (metadata?.references?.length !== 6)
    issues.push("About translation metadata is incomplete");
  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset,
    summary: {
      aboutDocuments: documents.length,
      expectedLocales: 6,
      translationReferences: metadata?.references?.length ?? 0,
      issues: issues.length,
    },
    issues,
    locales,
  };
  const output = path.join(
    ROOT,
    `migration/sanity/about-report.${dataset}.json`,
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
