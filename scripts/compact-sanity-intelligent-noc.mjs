#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";

const ROOT = process.cwd();
const SECTION_KEYS = [
  "banner",
  "businessOutcomes",
  "aiNetwork",
  "networkChaos",
  "intelligentNoc",
  "coreCapabilities",
  "networkOperationsChaos",
  "intelligentDiffNoc",
  "chaosControl",
  "frameworkAdaa",
  "lifecycleAutomation",
  "integratedComponents",
  "deploymentModels",
  "keyBenefits",
  "humanInLoop",
  "faq",
];
function parseArgs(argv) {
  const options = {
    execute: false,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "development",
    allowProduction: false,
  };
  for (const argument of argv) {
    if (argument === "--execute") options.execute = true;
    else if (argument === "--allow-production") options.allowProduction = true;
    else if (argument.startsWith("--dataset="))
      options.dataset = argument.slice(10);
    else throw new Error(`Unknown argument: ${argument}`);
  }
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
  const documents = await client.fetch(
    '*[_type == "intelligentNocPage"] | order(language asc)',
  );
  const inlineDocuments = documents.filter((document) =>
    SECTION_KEYS.some((key) => document[key]?._type === "fixedSection"),
  );
  const backupPath = path.join(
    ROOT,
    `migration/sanity/intelligent-noc-inline-backup.${options.dataset}.json`,
  );
  const backup = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: options.dataset,
    documentCount: inlineDocuments.length,
    sectionKeys: SECTION_KEYS,
    documents: inlineDocuments,
  };
  if (inlineDocuments.length) {
    await mkdir(path.dirname(backupPath), { recursive: true });
    await writeFile(backupPath, `${JSON.stringify(backup, null, 2)}\n`);
  }
  console.log(
    JSON.stringify(
      {
        mode: options.execute ? "execute" : "dry-run",
        dataset: options.dataset,
        documents: documents.length,
        inlineDocuments: inlineDocuments.length,
        backupPath,
      },
      null,
      2,
    ),
  );
  if (!options.execute || !inlineDocuments.length) return;
  let transaction = client.transaction();
  for (const document of inlineDocuments)
    transaction = transaction.patch(document._id, (patch) =>
      patch.unset(SECTION_KEYS),
    );
  await transaction.commit({ visibility: "sync" });
  console.log(
    `Compacted ${inlineDocuments.length} Intelligent NOC documents. Run the Intelligent NOC migration immediately to restore referenced sections.`,
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
