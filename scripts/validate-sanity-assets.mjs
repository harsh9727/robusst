#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";

const ROOT = process.cwd();

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function main() {
  if (typeof process.loadEnvFile === "function") {
    try {
      process.loadEnvFile(path.join(ROOT, ".env"));
    } catch {
      // CI provides environment variables directly.
    }
  }
  const datasetArgument = process.argv.find((argument) =>
    argument.startsWith("--dataset="),
  );
  const dataset =
    datasetArgument?.slice(10) ??
    process.env.NEXT_PUBLIC_SANITY_DATASET ??
    "development";
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");

  const inventory = await readJson(
    path.join(ROOT, "migration/audit/asset-manifest.json"),
  );
  const mappingFile = path.join(
    ROOT,
    `migration/sanity/asset-map.${dataset}.json`,
  );
  const mapping = await readJson(mappingFile);
  const mappedAssets = Object.values(mapping.assets);
  const ids = mappedAssets.map((asset) => asset.sanityAssetId);
  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2026-08-15",
    useCdn: false,
    token: process.env.SANITY_API_READ_TOKEN,
  });
  const [remoteAssets, contentDocuments] = await Promise.all([
    client.fetch(
      '*[_id in $ids]{_id, url, mimeType, size, "width": metadata.dimensions.width, "height": metadata.dimensions.height, "duration": metadata.duration}',
      { ids },
    ),
    client.fetch(
      '*[!(_type in ["sanity.imageAsset", "sanity.fileAsset", "system.group", "system.template", "system.release"]) && !(_id in path("_.**"))]',
    ),
  ]);
  const remoteById = new Map(remoteAssets.map((asset) => [asset._id, asset]));
  const currentImageUsages = new Map();

  function collectImageUsages(value, ancestors = [], documentId = null) {
    if (!value || typeof value !== "object") return;
    const nextDocumentId = value._id ?? documentId;
    const assetId = value.asset?._ref;
    if (typeof assetId === "string" && assetId.startsWith("image-")) {
      const altContainer = [value, ...ancestors.slice().reverse()].find(
        (candidate) => Object.hasOwn(candidate, "alt"),
      );
      const usages = currentImageUsages.get(assetId) ?? [];
      usages.push({
        documentId: nextDocumentId,
        alt:
          typeof altContainer?.alt === "string" ? altContainer.alt.trim() : "",
      });
      currentImageUsages.set(assetId, usages);
    }
    const nextAncestors = [...ancestors, value];
    for (const child of Array.isArray(value) ? value : Object.values(value)) {
      collectImageUsages(child, nextAncestors, nextDocumentId);
    }
  }

  for (const document of contentDocuments) collectImageUsages(document);
  const activeFiles = inventory.publicInventory.filter(
    (item) => item.classification === "active-content-asset",
  );
  const mappedPaths = new Set(
    mappedAssets.flatMap((asset) => asset.sourcePaths),
  );
  const unmappedPaths = activeFiles
    .map((item) => item.publicPath)
    .filter((publicPath) => !mappedPaths.has(publicPath));
  const missingRemoteAssets = mappedAssets
    .filter((asset) => !remoteById.has(asset.sanityAssetId))
    .map((asset) => asset.sanityAssetId);
  const mappingBySourcePath = new Map(
    mappedAssets.flatMap((asset) =>
      asset.sourcePaths.map((sourcePath) => [sourcePath, asset]),
    ),
  );
  const assetsMissingAltText = inventory.assets
    .filter((asset) => asset.active && asset.altTextStatus === "missing")
    .map((asset) => {
      const mappedAsset = mappingBySourcePath.get(asset.publicPath);
      const currentUsages = mappedAsset
        ? (currentImageUsages.get(mappedAsset.sanityAssetId) ?? [])
        : [];
      return {
        publicPath: asset.publicPath,
        altTextByLocale: asset.altTextByLocale,
        sanityDestinations: asset.sanityDestinations,
        currentUsages,
      };
    })
    .filter((asset) =>
      asset.currentUsages.some((usage) => usage.alt.length === 0),
    );

  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    projectId,
    dataset,
    summary: {
      activePublicPaths: activeFiles.length,
      uniqueActiveChecksums: new Set(activeFiles.map((item) => item.sha256))
        .size,
      mappedChecksums: mappedAssets.length,
      mappedPaths: mappedPaths.size,
      remoteAssetsFound: remoteAssets.length,
      unmappedPaths: unmappedPaths.length,
      missingRemoteAssets: missingRemoteAssets.length,
      assetsMissingAltText: assetsMissingAltText.length,
      inactiveDuplicatesExcluded: inventory.publicInventory.filter(
        (item) => item.classification === "inactive-duplicate",
      ).length,
      deadCodeAssetsExcluded: inventory.publicInventory.filter(
        (item) => item.classification === "inactive-dead-code-asset",
      ).length,
      unreferencedAssetsExcluded: inventory.publicInventory.filter(
        (item) => item.classification === "inactive-unreferenced-asset",
      ).length,
    },
    unmappedPaths,
    missingRemoteAssets,
    assetsMissingAltText,
    assets: mappedAssets.map((asset) => ({
      ...asset,
      remote: remoteById.get(asset.sanityAssetId) ?? null,
    })),
  };
  const output = path.join(
    ROOT,
    `migration/sanity/asset-report.${dataset}.json`,
  );
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report.summary, null, 2));
  if (
    unmappedPaths.length ||
    missingRemoteAssets.length ||
    assetsMissingAltText.length
  )
    process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
