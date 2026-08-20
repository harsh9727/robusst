#!/usr/bin/env node

import { createReadStream } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";

const ROOT = process.cwd();
const INVENTORY_FILE = path.join(ROOT, "migration/audit/asset-manifest.json");
const IMAGE_MIME_TYPES = new Set([
  "image/avif",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "image/webp",
]);

function parseArgs(argv) {
  const options = {
    execute: false,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "development",
    limit: null,
    allowProduction: false,
  };
  for (const argument of argv) {
    if (argument === "--execute") options.execute = true;
    else if (argument === "--allow-production") options.allowProduction = true;
    else if (argument.startsWith("--dataset="))
      options.dataset = argument.slice(10);
    else if (argument.startsWith("--limit="))
      options.limit = Number.parseInt(argument.slice(8), 10);
    else throw new Error(`Unknown argument: ${argument}`);
  }
  if (
    options.dataset === "production" &&
    options.execute &&
    !options.allowProduction
  ) {
    throw new Error("Production asset uploads require --allow-production");
  }
  return options;
}

function mappingPath(dataset) {
  return path.join(ROOT, `migration/sanity/asset-map.${dataset}.json`);
}

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await readFile(filePath, "utf8"));
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "ENOENT"
    )
      return fallback;
    throw error;
  }
}

async function main() {
  if (typeof process.loadEnvFile === "function") {
    try {
      process.loadEnvFile(path.join(ROOT, ".env"));
    } catch {
      // CI and Vercel provide environment variables without a local file.
    }
  }
  const options = parseArgs(process.argv.slice(2));
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
  if (options.execute && !token)
    throw new Error("Missing SANITY_API_WRITE_TOKEN");

  const inventory = await readJson(INVENTORY_FILE, null);
  if (!inventory) throw new Error(`Missing ${INVENTORY_FILE}`);
  const activeFiles = inventory.publicInventory.filter(
    (item) => item.classification === "active-content-asset",
  );
  const checksumGroups = Map.groupBy(activeFiles, (item) => item.sha256);
  let uniqueFiles = [...checksumGroups.values()].map((files) => files[0]);
  if (Number.isFinite(options.limit))
    uniqueFiles = uniqueFiles.slice(0, options.limit);

  const outputFile = mappingPath(options.dataset);
  const existing = await readJson(outputFile, {
    schemaVersion: 1,
    projectId,
    dataset: options.dataset,
    generatedAt: null,
    assets: {},
  });
  const client = createClient({
    projectId,
    dataset: options.dataset,
    apiVersion: "2026-08-15",
    useCdn: false,
    token,
  });

  const summary = {
    mode: options.execute ? "execute" : "dry-run",
    activePaths: activeFiles.length,
    uniqueChecksums: checksumGroups.size,
    selectedChecksums: uniqueFiles.length,
    alreadyMapped: 0,
    uploaded: 0,
    pending: 0,
    failed: 0,
  };

  for (const [index, file] of uniqueFiles.entries()) {
    const paths = checksumGroups
      .get(file.sha256)
      .map((item) => item.publicPath);
    const mapped = existing.assets[file.sha256];
    if (mapped?.sanityAssetId) {
      const exists = options.execute
        ? await client.fetch("defined(*[_id == $id][0]._id)", {
            id: mapped.sanityAssetId,
          })
        : true;
      if (exists) {
        summary.alreadyMapped += 1;
        console.log(
          `[${index + 1}/${uniqueFiles.length}] mapped ${paths.join(", ")}`,
        );
        continue;
      }
    }

    if (!options.execute) {
      summary.pending += 1;
      console.log(
        `[${index + 1}/${uniqueFiles.length}] would upload ${paths.join(", ")}`,
      );
      continue;
    }

    const absolutePath = path.join(
      ROOT,
      "public",
      file.publicPath.replace(/^\//, ""),
    );
    const assetType = IMAGE_MIME_TYPES.has(file.mimeType) ? "image" : "file";
    try {
      const uploaded = await client.assets.upload(
        assetType,
        createReadStream(absolutePath),
        {
          filename: path.basename(file.publicPath),
          contentType: file.mimeType,
          label: `Migrated from ${paths[0]}`,
        },
      );
      existing.assets[file.sha256] = {
        sha256: file.sha256,
        sourcePaths: paths,
        sanityAssetId: uploaded._id,
        sanityCdnUrl: uploaded.url,
        assetType,
        mimeType: file.mimeType,
        bytes: file.bytes,
        width: file.width,
        height: file.height,
        durationSeconds: file.durationSeconds,
        uploadedAt: new Date().toISOString(),
        qaStatus: "pending",
      };
      existing.generatedAt = new Date().toISOString();
      await mkdir(path.dirname(outputFile), { recursive: true });
      await writeFile(outputFile, `${JSON.stringify(existing, null, 2)}\n`);
      summary.uploaded += 1;
      console.log(
        `[${index + 1}/${uniqueFiles.length}] uploaded ${paths.join(", ")} -> ${uploaded._id}`,
      );
    } catch (error) {
      summary.failed += 1;
      console.error(
        `[${index + 1}/${uniqueFiles.length}] failed ${paths.join(", ")}: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  console.log(JSON.stringify(summary, null, 2));
  if (summary.failed > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
