#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";
const ROOT = process.cwd();
const PAGE_SECTIONS = {
  aiCallCenterPage: [
    "banner",
    "businessProblem",
    "solutionOverview",
    "keyValueProposition",
    "coreCapabilities",
    "advancedAiIntelligence",
    "enterpriseArchitecture",
    "solutionGrid",
    "customDevelopment",
    "idealUseCases",
    "futureAutomation",
    "faq",
  ],
  customizedSolutionsPage: [
    "banner",
    "challenges",
    "customerCentric",
    "customizedSolutions",
    "solutionsSlider",
    "innovationProcess",
    "commitmentToExcellence",
    "faq",
  ],
  intelligentNocPage: [
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
  ],
  brandedCallingPage: [
    "banner",
    "brandedCalling",
    "antiSpamProtection",
    "whyChoose",
    "keyFeatures",
    "coreProtectionFeatures",
    "eliminate",
    "transformCommunication",
    "securityCompliance",
    "regionalExcellence",
    "industryApplications",
    "faq",
  ],
  networkMonetizationPage: [
    "banner",
    "whyNetworkMonetization",
    "monetizationFramework",
    "userExperienceManagement",
    "solutionGrid",
    "mobileUseCase",
    "useCaseGrid",
    "telcos",
    "faq",
  ],
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
  if (!PAGE_SECTIONS[options.type])
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
  const sectionKeys = PAGE_SECTIONS[options.type];
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
    "*[_type == $type] | order(language asc)",
    { type: options.type },
  );
  const inlineDocuments = documents.filter((document) =>
    sectionKeys.some((key) => document[key]?._type === "fixedSection"),
  );
  const backupPath = path.join(
    ROOT,
    `migration/sanity/${options.type}-inline-backup.${options.dataset}.json`,
  );
  const backup = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: options.dataset,
    pageType: options.type,
    documentCount: inlineDocuments.length,
    sectionKeys,
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
        pageType: options.type,
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
      patch.unset(sectionKeys),
    );
  await transaction.commit({ visibility: "sync" });
  console.log(
    `Compacted ${inlineDocuments.length} ${options.type} documents. Restore them as referenced sections immediately.`,
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
