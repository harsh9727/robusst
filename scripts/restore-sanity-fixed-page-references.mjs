#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";
const ROOT = process.cwd();
const CONFIG = {
  aiCallCenterPage: {
    title: "AI Call Center",
    backup: "aiCallCenterPage-inline-backup",
  },
  brandedCallingPage: {
    title: "Branded Calling",
    backup: "brandedCallingPage-inline-backup",
  },
  customizedSolutionsPage: {
    title: "Customized Solutions",
    backup: "customizedSolutionsPage-inline-backup",
  },
  intelligentNocPage: {
    title: "Intelligent NOC",
    backup: "intelligent-noc-inline-backup",
  },
  networkMonetizationPage: {
    title: "Network Monetization",
    backup: "networkMonetizationPage-inline-backup",
  },
};
function parseArgs(argv) {
  const options = {
    execute: false,
    type: "",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "development",
    allowProduction: false,
  };
  for (const argument of argv) {
    if (argument === "--execute") options.execute = true;
    else if (argument === "--allow-production") options.allowProduction = true;
    else if (argument.startsWith("--dataset="))
      options.dataset = argument.slice(10);
    else if (argument.startsWith("--type=")) options.type = argument.slice(7);
    else throw new Error(`Unknown argument: ${argument}`);
  }
  if (!CONFIG[options.type])
    throw new Error(`Unsupported page type: ${options.type || "(missing)"}`);
  if (
    options.execute &&
    options.dataset === "production" &&
    !options.allowProduction
  )
    throw new Error("Production writes require --allow-production");
  return options;
}
async function main() {
  if (typeof process.loadEnvFile === "function") {
    try {
      process.loadEnvFile(path.join(ROOT, ".env"));
    } catch {
      /* CI supplies environment variables. */
    }
  }
  const options = parseArgs(process.argv.slice(2));
  const config = CONFIG[options.type];
  if (
    !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    !process.env.SANITY_API_WRITE_TOKEN
  )
    throw new Error("Missing Sanity project or write-token configuration");
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: options.dataset,
    apiVersion: "2026-08-15",
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN,
  });
  const backupPath = path.join(
    ROOT,
    `migration/sanity/${config.backup}.${options.dataset}.json`,
  );
  const backup = JSON.parse(await readFile(backupPath, "utf8"));
  const pageDocuments = [];
  const sectionDocuments = [];
  for (const backedUpDocument of backup.documents) {
    const pageDocument = structuredClone(backedUpDocument);
    delete pageDocument._createdAt;
    delete pageDocument._updatedAt;
    delete pageDocument._rev;
    for (const sectionKey of backup.sectionKeys) {
      const content = pageDocument[sectionKey];
      if (!content)
        throw new Error(
          `${pageDocument._id} is missing backed-up ${sectionKey}`,
        );
      const sectionId = `fixedPageSection-${options.type}-${pageDocument.language}-${sectionKey}`;
      sectionDocuments.push({
        _id: sectionId,
        _type: "fixedPageSection",
        internalTitle: `${config.title} ${sectionKey} — ${pageDocument.language.toUpperCase()}`,
        pageType: options.type,
        sectionKey,
        language: pageDocument.language,
        content,
      });
      pageDocument[sectionKey] = { _type: "reference", _ref: sectionId };
    }
    pageDocuments.push(pageDocument);
  }
  console.log(
    JSON.stringify(
      {
        mode: options.execute ? "execute" : "dry-run",
        dataset: options.dataset,
        pageType: options.type,
        pages: pageDocuments.length,
        sections: sectionDocuments.length,
        backupPath,
      },
      null,
      2,
    ),
  );
  if (!options.execute) return;
  for (const document of sectionDocuments)
    await client.createOrReplace(document, { visibility: "sync" });
  let transaction = client.transaction();
  for (const document of pageDocuments)
    transaction = transaction.createOrReplace(document);
  await transaction.commit({ visibility: "sync" });
  console.log(
    `Restored ${pageDocuments.length} ${options.type} pages with ${sectionDocuments.length} referenced sections.`,
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
