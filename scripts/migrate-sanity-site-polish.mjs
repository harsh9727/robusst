#!/usr/bin/env node

import path from "node:path";
import { createClient } from "@sanity/client";

const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const VIEW_MORE_LABELS = {
  en: "View More",
  fr: "Voir plus",
  ru: "Подробнее",
  pt: "Ver mais",
  es: "Ver más",
  ar: "عرض المزيد",
};
const execute = process.argv.includes("--execute");
const allowProduction = process.argv.includes("--allow-production");

if (typeof process.loadEnvFile === "function") {
  try {
    process.loadEnvFile(path.join(ROOT, ".env"));
  } catch {
    // CI provides environment variables directly.
  }
}

const dataset =
  process.argv
    .find((argument) => argument.startsWith("--dataset="))
    ?.slice(10) ??
  process.env.NEXT_PUBLIC_SANITY_DATASET ??
  "development";

if (execute && dataset === "production" && !allowProduction) {
  throw new Error("Production writes require --allow-production");
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset,
  apiVersion: "2026-08-15",
  useCdn: false,
  token: execute
    ? process.env.SANITY_API_WRITE_TOKEN
    : process.env.SANITY_API_READ_TOKEN,
});

// Newest first. Dates start on 30 September 2026 (yesterday at the time of
// this migration) and then move back by alternating two- and three-day gaps.
const BLOG_ORDER = [
  "ai-powered-customer-insights-unlocking-telecom-revenue-growth",
  "ai-powered-digital-lending-platform-promoting-financial-inclusion",
  "cpaas-and-ai-benefits-the-future-of-intelligent-connectivity",
  "elevate-the-employee-experience-with-the-right-ai-chatbot",
  "global-telecom-trends-2025-how-operators-can-stay-competitive",
  "how-esim-technology-is-shaping-the-iot-industry",
  "maximizing-customer-engagement-with-robussts-mcp",
  "on-the-path-to-financial-inclusion-interoperability-connects-the-dots",
  "revolutionizing-financial-management-the-impact-of-business-wallets",
  "robusst-emergency-credit-solution-ensuring-seamless-connectivity",
  "the-future-of-mobile-connectivity-why-esim-is-the-next-big-thing",
  "the-role-of-artificial-intelligence-in-optimizing-omnichannel-experiences",
  "travel-esim-mnos-the-rising-challenge-and-opportunity",
  "unlocking-the-power-of-international-a2p-wholesale-messaging",
  "viber-benefits-for-businesses-worldwide-a-gateway-to-global-growth",
];

const dateBySlug = new Map();
let daysBeforeOctober = 1;
for (const [index, slug] of BLOG_ORDER.entries()) {
  const date = new Date(Date.UTC(2026, 9, 1, 9));
  date.setUTCDate(date.getUTCDate() - daysBeforeOctober);
  dateBySlug.set(slug, date.toISOString());
  if (index < BLOG_ORDER.length - 1) {
    daysBeforeOctober += index % 2 === 0 ? 2 : 3;
  }
}

const [posts, jobs, settings, cdpPages] = await Promise.all([
  client.fetch('*[_type == "blogPost"]{_id, language, "slug": slug.current}'),
  client.fetch('*[_type == "jobPosting"]{_id, language, title}'),
  client.fetch('*[_type == "siteSettings"]{_id, language, solutionLinks}'),
  client.fetch(
    '*[_type == "customerDataPlatformPage"]{_id, language, "labels": solutionGrid.labels}',
  ),
]);

const localizedPosts = posts.filter(
  (post) => LOCALES.includes(post.language) && dateBySlug.has(post.slug),
);
const localizedJobs = jobs.filter((job) => LOCALES.includes(job.language));
const localizedSettings = settings.filter((setting) =>
  LOCALES.includes(setting.language),
);
const localizedCdpPages = cdpPages.filter((page) =>
  LOCALES.includes(page.language),
);

if (localizedPosts.length !== BLOG_ORDER.length * LOCALES.length) {
  throw new Error(
    `Expected ${BLOG_ORDER.length * LOCALES.length} localized blog posts; found ${localizedPosts.length}`,
  );
}
if (localizedJobs.length !== LOCALES.length) {
  throw new Error(
    `Expected ${LOCALES.length} localized job postings; found ${localizedJobs.length}`,
  );
}
if (localizedSettings.length !== LOCALES.length) {
  throw new Error(
    `Expected ${LOCALES.length} localized settings documents; found ${localizedSettings.length}`,
  );
}
if (localizedCdpPages.length !== LOCALES.length) {
  throw new Error(
    `Expected ${LOCALES.length} localized CDP pages; found ${localizedCdpPages.length}`,
  );
}

const mutations = [];
for (const post of localizedPosts) {
  mutations.push({
    id: post._id,
    values: { publishedAt: dateBySlug.get(post.slug) },
  });
}
for (const job of localizedJobs) {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: "careers@robusst.com",
    su: job.title,
  });
  mutations.push({
    id: job._id,
    values: {
      "applyCta.link.href": `https://mail.google.com/mail/?${params.toString()}`,
      "applyCta.link.kind": "external",
      "applyCta.link.openInNewTab": true,
    },
  });
}
for (const setting of localizedSettings) {
  const solutionLinks = (setting.solutionLinks ?? []).map((link) =>
    link.href === "/solutions/ai-call-center"
      ? { ...link, label: "AI Voice Bot" }
      : link,
  );
  mutations.push({ id: setting._id, values: { solutionLinks } });
}
for (const page of localizedCdpPages) {
  const labels = [...(page.labels ?? [])];
  labels[0] = VIEW_MORE_LABELS[page.language];
  mutations.push({ id: page._id, values: { "solutionGrid.labels": labels } });
}

console.log(
  JSON.stringify(
    {
      dataset,
      execute,
      blogPostsToUpdate: localizedPosts.length,
      jobsToUpdate: localizedJobs.length,
      settingsToUpdate: localizedSettings.length,
      cdpPagesToUpdate: localizedCdpPages.length,
      newestBlogDate: dateBySlug.get(BLOG_ORDER[0]),
      oldestBlogDate: dateBySlug.get(BLOG_ORDER.at(-1)),
    },
    null,
    2,
  ),
);

if (execute) {
  for (let index = 0; index < mutations.length; index += 50) {
    let transaction = client.transaction();
    for (const mutation of mutations.slice(index, index + 50)) {
      transaction = transaction.patch(mutation.id, (patch) =>
        patch.set(mutation.values),
      );
    }
    await transaction.commit({ visibility: "sync" });
  }
}
