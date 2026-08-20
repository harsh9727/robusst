#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";

const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const SECTIONS = [
  "hero",
  "trustedBy",
  "about",
  "solutions",
  "results",
  "successStories",
  "techStack",
  "industriesWeServe",
  "howWeHelp",
  "eventsCoverage",
  "whyChooseUs",
  "blogs",
  "ourPresence",
  "contact",
];

function walk(value, visit, fieldPath = "") {
  visit(value, fieldPath);
  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, visit, `${fieldPath}[${index}]`));
  } else if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      walk(child, visit, fieldPath ? `${fieldPath}.${key}` : key);
    }
  }
}

async function main() {
  if (typeof process.loadEnvFile === "function") {
    try {
      process.loadEnvFile(path.join(ROOT, ".env"));
    } catch {
      // CI supplies environment variables directly.
    }
  }
  const datasetArgument = process.argv.find((argument) =>
    argument.startsWith("--dataset="),
  );
  const dataset =
    datasetArgument?.slice(10) ??
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
    client.fetch('*[_type == "homePage"]'),
    client.fetch(
      '*[_type == "translation.metadata" && "homePage" in schemaTypes][0]{"languages": translations[].language, "references": translations[].value->_id}',
    ),
  ]);
  const issues = [];
  const localeResults = [];
  for (const locale of LOCALES) {
    const document = documents.find((item) => item.language === locale);
    if (!document) {
      issues.push(`Missing homePage for ${locale}`);
      continue;
    }
    const missingSections = SECTIONS.filter((section) => !document[section]);
    const localAssetPaths = [];
    const mediaReferences = new Set();
    walk(document, (value, fieldPath) => {
      if (
        typeof value === "string" &&
        (/^\/home\//.test(value) || /^\/techstack\//.test(value))
      ) {
        localAssetPaths.push({ fieldPath, value });
      }
      if (
        fieldPath.endsWith("._ref") &&
        typeof value === "string" &&
        (value.startsWith("image-") || value.startsWith("file-"))
      ) {
        mediaReferences.add(value);
      }
    });
    if (missingSections.length)
      issues.push(
        `${locale} is missing sections: ${missingSections.join(", ")}`,
      );
    if (localAssetPaths.length)
      issues.push(
        `${locale} retains ${localAssetPaths.length} local asset paths`,
      );
    if (!document.hero?.items?.length)
      issues.push(`${locale} has no hero slides`);
    if (!document.solutions?.items?.length)
      issues.push(`${locale} has no solutions`);
    localeResults.push({
      locale,
      documentId: document._id,
      workflowStatus: document.translation?.status,
      sections: SECTIONS.length - missingSections.length,
      missingSections,
      heroSlides: document.hero?.items?.length ?? 0,
      solutions: document.solutions?.items?.length ?? 0,
      successStories: document.successStories?.items?.length ?? 0,
      mediaReferences: mediaReferences.size,
      localAssetPaths,
    });
  }
  if (metadata?.languages?.length !== 6 || metadata?.references?.length !== 6)
    issues.push("Home translation metadata is incomplete");
  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset,
    summary: {
      homeDocuments: documents.length,
      expectedLocales: LOCALES.length,
      translationReferences: metadata?.references?.length ?? 0,
      issues: issues.length,
    },
    issues,
    locales: localeResults,
  };
  const output = path.join(
    ROOT,
    `migration/sanity/home-report.${dataset}.json`,
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
