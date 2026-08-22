#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";

const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const REQUIRED_SECTIONS = [
  "banner",
  "riseWithUs",
  "values",
  "weMakeDifference",
  "whatWeOffer",
  "lifeAtRobusst",
  "hiringProcess",
  "currentOpenings",
  "readyToJoin",
  "contact",
  "rolePage",
];

async function main() {
  if (typeof process.loadEnvFile === "function") {
    try {
      process.loadEnvFile(path.join(ROOT, ".env"));
    } catch {
      // CI supplies environment variables.
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
  const [pages, jobs, pageMetadata, jobMetadata] = await Promise.all([
    client.fetch('*[_type == "careersPage"]'),
    client.fetch('*[_type == "jobPosting"]'),
    client.fetch(
      '*[_type == "translation.metadata" && "careersPage" in schemaTypes][0]{"references": translations[].value->_id}',
    ),
    client.fetch(
      '*[_type == "translation.metadata" && "jobPosting" in schemaTypes]{_id, "references": translations[].value->_id}',
    ),
  ]);
  const issues = [];
  const locales = [];
  const canonicalIds = [
    ...new Set(
      jobs.filter((job) => job.language === "en").map((job) => job.legacyId),
    ),
  ];

  for (const locale of LOCALES) {
    const page = pages.find((item) => item.language === locale);
    if (!page) {
      issues.push(`Missing careersPage for ${locale}`);
      continue;
    }
    for (const section of REQUIRED_SECTIONS) {
      if (!page[section]) issues.push(`${locale} is missing ${section}`);
    }
    const media = [
      page.banner?.image,
      page.weMakeDifference?.image,
      page.whatWeOffer?.image,
      ...(page.lifeAtRobusst?.images ?? []),
      ...(page.hiringProcess?.images ?? []),
      page.readyToJoin?.image,
      page.contact?.image,
    ].filter(Boolean);
    const invalidMedia = media.filter(
      (item) => !item.image?.asset?._ref || !item.alt,
    );
    if (media.length !== 15 || invalidMedia.length) {
      issues.push(
        `${locale} has ${media.length} active career media items and ${invalidMedia.length} invalid items`,
      );
    }
    const recruitmentEmails = page.contact?.items ?? [];
    if (
      recruitmentEmails.length !== 2 ||
      recruitmentEmails.some(
        (item) =>
          typeof item.title !== "string" ||
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(item.title),
      )
    )
      issues.push(`${locale} recruitment email addresses are incomplete`);
    const localizedJobs = jobs.filter((job) => job.language === locale);
    for (const id of canonicalIds) {
      const job = localizedJobs.find((item) => item.legacyId === id);
      if (!job) {
        issues.push(`Missing job ${id}/${locale}`);
        continue;
      }
      if (
        !job.employmentTypeLabel ||
        !job.workplaceTypeLabel ||
        !job.applyCta?.link?.href ||
        !job.overview?.length ||
        !job.responsibilities?.length ||
        !job.requirements?.length
      ) {
        issues.push(`Job ${id}/${locale} is incomplete`);
      }
    }
    locales.push({
      locale,
      pageId: page._id,
      workflowStatus: page.translation?.status,
      activeMedia: media.length,
      jobs: localizedJobs.map((job) => ({
        id: job.legacyId,
        documentId: job._id,
        open: job.open,
        employmentType: job.employmentType,
        workplaceType: job.workplaceType,
        workflowStatus: job.translation?.status,
      })),
    });
  }
  if (pageMetadata?.references?.length !== 6)
    issues.push("Careers page translation metadata is incomplete");
  for (const id of canonicalIds) {
    const metadata = jobMetadata.find(
      (item) => item._id === `translation.metadata.jobPosting-${id}`,
    );
    if (metadata?.references?.length !== 6)
      issues.push(`Job ${id} translation metadata is incomplete`);
  }

  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset,
    summary: {
      careersDocuments: pages.length,
      jobDocuments: jobs.length,
      canonicalJobs: canonicalIds.length,
      expectedLocales: 6,
      careersTranslationReferences: pageMetadata?.references?.length ?? 0,
      jobTranslationSets: jobMetadata.length,
      issues: issues.length,
    },
    issues,
    locales,
  };
  const output = path.join(
    ROOT,
    `migration/sanity/careers-report.${dataset}.json`,
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
