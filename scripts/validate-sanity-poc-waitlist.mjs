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
    client.fetch('*[_type == "pocWaitlistPage"]'),
    client.fetch(
      '*[_type == "translation.metadata" && "pocWaitlistPage" in schemaTypes][0]{"references": translations[].value->_id}',
    ),
  ]);
  const issues = [];
  const locales = [];
  const requiredFormFields = [
    "title",
    "nameLabel",
    "companyLabel",
    "emailLabel",
    "phoneLabel",
    "countryLabel",
    "countryPlaceholder",
    "countrySearchPlaceholder",
    "countryEmptyMessage",
    "messageLabel",
    "submitLabel",
    "submittingLabel",
    "successMessage",
    "errorMessage",
    "formInvalidMessage",
    "messageWordLimitLabel",
    "nameRequiredMessage",
    "nameMinLengthMessage",
    "emailRequiredMessage",
    "invalidEmailMessage",
    "invalidPhoneMessage",
    "countryRequiredMessage",
    "messageRequiredMessage",
    "messageMaxWordsMessage",
  ];
  for (const locale of LOCALES) {
    const document = documents.find((item) => item.language === locale);
    if (!document) {
      issues.push(`Missing pocWaitlistPage for ${locale}`);
      continue;
    }
    if (
      !document.hero?.image?.image?.asset?._ref ||
      !document.hero?.image?.alt ||
      !document.hero?.primaryCta?.link?.href
    )
      issues.push(`${locale} hero is incomplete`);
    const missingFormFields = requiredFormFields.filter(
      (field) => !document.form?.[field],
    );
    if (missingFormFields.length)
      issues.push(`${locale} form is missing: ${missingFormFields.join(", ")}`);
    if (document.form?.countryOptions?.length !== 250)
      issues.push(
        `${locale} has ${document.form?.countryOptions?.length ?? 0} country options`,
      );
    if (
      locale === "ru" &&
      !/[А-Яа-яЁё]/.test(`${document.hero?.title} ${document.form?.title}`)
    )
      issues.push("Russian POC content does not contain Cyrillic text");
    locales.push({
      locale,
      documentId: document._id,
      workflowStatus: document.translation?.status,
      countryOptions: document.form?.countryOptions?.length ?? 0,
      heroAsset: document.hero?.image?.image?.asset?._ref,
      missingFormFields,
    });
  }
  if (metadata?.references?.length !== 6)
    issues.push("POC Waitlist translation metadata is incomplete");
  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset,
    summary: {
      pocWaitlistDocuments: documents.length,
      expectedLocales: 6,
      translationReferences: metadata?.references?.length ?? 0,
      countryOptionsPerLocale: 250,
      issues: issues.length,
    },
    issues,
    locales,
  };
  const output = path.join(
    ROOT,
    `migration/sanity/poc-waitlist-report.${dataset}.json`,
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
