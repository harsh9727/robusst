#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";

const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const SINGLETON_TYPES = [
  "siteSettings",
  "homePage",
  "aboutPage",
  "blogIndexPage",
  "careersPage",
  "contactPage",
  "partnershipPage",
  "platformsPage",
  "pocWaitlistPage",
  "solutionsPage",
  "aiCallCenterPage",
  "brandedCallingPage",
  "customerDataPlatformPage",
  "customizedSolutionsPage",
  "cybersecurityPage",
  "intelligentNocPage",
  "networkMonetizationPage",
  "stsDmsPage",
  "storiesPage",
];
const COLLECTION_TYPES = ["author", "blogPost", "jobPosting", "successStory"];

function dereference(value, documents, seen = new Set()) {
  if (Array.isArray(value))
    return value.map((item) => dereference(item, documents, seen));
  if (!value || typeof value !== "object") return value;
  if (value._ref && documents.has(value._ref) && !seen.has(value._ref))
    return dereference(
      documents.get(value._ref),
      documents,
      new Set([...seen, value._ref]),
    );
  return Object.fromEntries(
    Object.entries(value).map(([key, child]) => [
      key,
      dereference(child, documents, seen),
    ]),
  );
}

function arrayLengths(value, fieldPath = "", result = {}) {
  if (Array.isArray(value)) {
    if (!fieldPath.includes(".body") && !fieldPath.endsWith("body"))
      result[fieldPath] = value.length;
    for (const child of value) arrayLengths(child, `${fieldPath}[]`, result);
  } else if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      if (
        key.startsWith("_") ||
        ["translation", "keywords", "markDefs", "children"].includes(key)
      )
        continue;
      arrayLengths(child, fieldPath ? `${fieldPath}.${key}` : key, result);
    }
  }
  return result;
}

function inspect(value, document, fieldPath, issues, summary) {
  if (Array.isArray(value)) {
    for (let index = 0; index < value.length; index += 1) {
      const item = value[index];
      if (
        item &&
        typeof item === "object" &&
        !Array.isArray(item) &&
        !item._key &&
        item._type !== "span"
      ) {
        issues.push(`${document._id}.${fieldPath}[${index}] is missing _key`);
        summary.arraysMissingKeys += 1;
      }
      inspect(item, document, `${fieldPath}[${index}]`, issues, summary);
    }
    return;
  }
  if (!value || typeof value !== "object") {
    if (
      typeof value === "string" &&
      /^\/(?:home|about|career|partnership|pics|platform|solutions|successStories|thumbnail|brand|flags)\/.+\.(?:avif|gif|jpe?g|png|svg|webp|mp4|webm)$/i.test(
        value,
      )
    ) {
      issues.push(`${document._id}.${fieldPath} uses local content asset ${value}`);
      summary.localAssetReferences += 1;
    }
    return;
  }
  if (value._type === "contentImage") {
    summary.contentImages += 1;
    if (!value.image?.asset?._ref)
      issues.push(`${document._id}.${fieldPath} has no image asset`);
    if (!value.alt?.trim())
      issues.push(`${document._id}.${fieldPath} has no localized alt text`);
  }
  if (value._type === "contentLink") {
    summary.contentLinks += 1;
    if (!value.label?.trim())
      issues.push(`${document._id}.${fieldPath} has no visible label`);
    if (value.kind !== "download" && !value.href?.trim())
      issues.push(`${document._id}.${fieldPath} has no destination`);
    const match = value.href?.match(/^\/(en|fr|ru|pt|es|ar)(?:\/|$)/);
    if (match && document.language && match[1] !== document.language)
      issues.push(
        `${document._id}.${fieldPath} links to wrong locale ${match[1]}`,
      );
  }
  for (const [key, child] of Object.entries(value))
    if (!key.startsWith("_"))
      inspect(child, document, fieldPath ? `${fieldPath}.${key}` : key, issues, summary);
}

async function main() {
  if (typeof process.loadEnvFile === "function") {
    try {
      process.loadEnvFile(path.join(process.cwd(), ".env"));
    } catch {
      // CI supplies environment variables.
    }
  }
  const dataset =
    process.argv.find((value) => value.startsWith("--dataset="))?.slice(10) ??
    process.env.NEXT_PUBLIC_SANITY_DATASET ??
    "development";
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset,
    apiVersion: "2026-08-15",
    token: process.env.SANITY_API_READ_TOKEN,
    useCdn: false,
  });
  const documents = await client.fetch(
    '*[!(_id in path("_.**")) && !(_type match "sanity.*") && _type != "formSubmission"]',
  );
  const documentMap = new Map(documents.map((document) => [document._id, document]));
  const issues = [];
  const summary = {
    singletonTypes: SINGLETON_TYPES.length,
    collectionTypes: COLLECTION_TYPES.length,
    localizedDocuments: 0,
    translationSets: 0,
    contentImages: 0,
    contentLinks: 0,
    arraysMissingKeys: 0,
    localAssetReferences: 0,
    structuralMismatches: 0,
    issues: 0,
  };

  for (const type of SINGLETON_TYPES) {
    const localized = documents.filter((document) => document._type === type);
    summary.localizedDocuments += localized.length;
    for (const locale of LOCALES)
      if (localized.filter((document) => document.language === locale).length !== 1)
        issues.push(`${type} must have exactly one ${locale} document`);
    const english = localized.find((document) => document.language === "en");
    if (!english) continue;
    const baseline = arrayLengths(dereference(english, documentMap));
    for (const document of localized.filter((item) => item.language !== "en")) {
      const current = arrayLengths(dereference(document, documentMap));
      for (const [fieldPath, count] of Object.entries(baseline)) {
        if (current[fieldPath] !== count) {
          issues.push(
            `${document._id}.${fieldPath} has ${current[fieldPath] ?? 0} items; English has ${count}`,
          );
          summary.structuralMismatches += 1;
        }
      }
    }
  }

  const metadata = documents.filter(
    (document) => document._type === "translation.metadata",
  );
  for (const type of COLLECTION_TYPES) {
    const typedDocuments = documents.filter((document) => document._type === type);
    summary.localizedDocuments += typedDocuments.length;
    const typedMetadata = metadata.filter((document) =>
      document.schemaTypes?.includes(type),
    );
    summary.translationSets += typedMetadata.length;
    const referencedIds = new Set();
    for (const set of typedMetadata) {
      const translations = set.translations ?? [];
      const languages = translations.map((translation) => translation.language).sort();
      if (JSON.stringify(languages) !== JSON.stringify([...LOCALES].sort()))
        issues.push(`${set._id} does not contain exactly the six supported locales`);
      for (const translation of translations) {
        const reference = translation.value?._ref;
        if (!reference || !documentMap.has(reference))
          issues.push(`${set._id} has a missing ${translation.language} reference`);
        else {
          referencedIds.add(reference);
          const target = documentMap.get(reference);
          if (target._type !== type || target.language !== translation.language)
            issues.push(`${set._id} has a mismatched ${translation.language} reference`);
        }
      }
    }
    for (const document of typedDocuments)
      if (!referencedIds.has(document._id))
        issues.push(`${document._id} is not connected to translation metadata`);
  }

  for (const document of documents) inspect(document, document, "", issues, summary);
  summary.issues = issues.length;
  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset,
    summary,
    issues,
  };
  const output = path.join(
    process.cwd(),
    `migration/sanity/locale-sync-report.${dataset}.json`,
  );
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(summary, null, 2));
  if (issues.length) {
    console.error(issues.slice(0, 100).join("\n"));
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
