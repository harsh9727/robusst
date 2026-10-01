#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";

const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const PUBLISHED_AT = "2026-05-09T15:38:19.000Z";
const SEO = {
  en: [
    "Careers at Robusst | Build the Future of Telecom AI",
    "Join a global team delivering AI-powered solutions to telecom and banking enterprises. Explore current roles and build the future with Robusst.",
  ],
  fr: [
    "Carrières chez Robusst | Façonnez l’avenir de l’IA télécom",
    "Rejoignez une équipe internationale qui fournit des solutions d’IA aux entreprises de télécommunications et bancaires. Découvrez nos postes ouverts.",
  ],
  ru: [
    "Карьера в Robusst | Создавайте будущее ИИ в телекоме",
    "Присоединяйтесь к международной команде, создающей ИИ-решения для телекома и банков. Изучите открытые вакансии Robusst.",
  ],
  pt: [
    "Carreiras na Robusst | Construa o futuro da IA em telecom",
    "Junte-se a uma equipe global que fornece soluções de IA para telecomunicações e bancos. Conheça as vagas abertas e cresça com a Robusst.",
  ],
  es: [
    "Carreras en Robusst | Construye el futuro de la IA en telecom",
    "Únete a un equipo global que ofrece soluciones de IA para telecomunicaciones y banca. Descubre las vacantes y crece con Robusst.",
  ],
  ar: [
    "العمل في Robusst | ابنِ مستقبل الذكاء الاصطناعي للاتصالات",
    "انضم إلى فريق عالمي يقدم حلول الذكاء الاصطناعي لشركات الاتصالات والبنوك. استكشف الوظائف المتاحة واصنع مستقبلك مع Robusst.",
  ],
};
const ALT_PREFIX = {
  en: "Robusst careers",
  fr: "Carrières chez Robusst",
  ru: "Карьера в Robusst",
  pt: "Carreiras na Robusst",
  es: "Carreras en Robusst",
  ar: "العمل في Robusst",
};
const SECTION_IMAGES = {
  banner: "/career/banner.webp",
  weMakeDifference: "/career/1.webp",
  whatWeOffer: "/career/2.webp",
  readyToJoin: "/career/3.webp",
  contact: "/career/contact/contact.webp",
};
const stableKey = (value) =>
  createHash("sha1").update(value).digest("hex").slice(0, 12);

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
async function activeCareers(locale) {
  const url = new URL("/api/v1/content", process.env.CMS_BASE_URL);
  url.searchParams.set("schema", "careers");
  url.searchParams.set("locale", locale);
  const response = await fetch(url, {
    headers: { "x-api-key": process.env.CMS_API_KEY },
  });
  if (!response.ok)
    throw new Error(
      `Active Careers request failed for ${locale}: ${response.status}`,
    );
  const body = await response.json();
  if (!body.data?.content?.careers)
    throw new Error(`Active Careers content is empty for ${locale}`);
  return body.data.content.careers;
}
function asset(assetMap, publicPath) {
  const mapped = Object.values(assetMap.assets).find((item) =>
    item.sourcePaths.includes(publicPath),
  );
  if (!mapped) throw new Error(`Missing mapped asset ${publicPath}`);
  return mapped.sanityAssetId;
}
function image(assetMap, publicPath, alt) {
  return {
    _type: "contentImage",
    image: {
      _type: "image",
      asset: { _type: "reference", _ref: asset(assetMap, publicPath) },
    },
    alt,
  };
}
function cta(label, href, kind = "internal", style = "primary") {
  return {
    _type: "callToAction",
    style,
    link: {
      _type: "contentLink",
      label,
      kind,
      href,
      openInNewTab: kind === "external",
    },
  };
}
function cards(locale, section, entries) {
  return entries.map((entry, index) => ({
    _key: stableKey(`${locale}.${section}.${index}`),
    _type: "contentCard",
    internalName: `${section}-${index + 1}`,
    title: entry.title,
    description: entry.description ?? entry.desc,
  }));
}
function blocks(locale, jobId, field, values) {
  return values.map((text, index) => ({
    _key: stableKey(`${locale}.${jobId}.${field}.${index}`),
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [
      {
        _key: stableKey(`${locale}.${jobId}.${field}.${index}.span`),
        _type: "span",
        marks: [],
        text,
      },
    ],
  }));
}
function generatedAlt(locale, label) {
  return `${ALT_PREFIX[locale]} — ${label}`;
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
    !process.env.CMS_BASE_URL ||
    !process.env.CMS_API_KEY
  )
    throw new Error(
      "Missing Sanity or active-content environment configuration",
    );
  if (options.execute && !process.env.SANITY_API_WRITE_TOKEN)
    throw new Error("Missing SANITY_API_WRITE_TOKEN");
  const assetMap = JSON.parse(
    await readFile(
      path.join(ROOT, `migration/sanity/asset-map.${options.dataset}.json`),
      "utf8",
    ),
  );
  const localized = Object.fromEntries(
    await Promise.all(
      LOCALES.map(async (locale) => [locale, await activeCareers(locale)]),
    ),
  );
  const canonicalJobs = new Map(
    localized.en.jobOpenings.map((job) => [job.id, job]),
  );
  const documents = [];

  for (const locale of LOCALES) {
    const careers = localized[locale];
    const contactItems = [
      "careers@robusst.com",
      "sales.hiring@robusst.com",
    ].map((email, index) => ({
      _key: stableKey(`${locale}.contact.${email}`),
      _type: "contentCard",
      internalName: `recruitment-email-${index + 1}`,
      title: email,
      cta: cta(email, `mailto:${email}`, "email", "text"),
    }));
    documents.push({
      _id: `careersPage-${locale}`,
      _type: "careersPage",
      internalTitle: `Careers page — ${locale.toUpperCase()}`,
      language: locale,
      seo: {
        _type: "seo",
        metaTitle: SEO[locale][0],
        metaDescription: SEO[locale][1],
        noIndex: false,
      },
      translation: {
        _type: "translationWorkflow",
        status: locale === "en" ? "source" : "generated",
        sourceLanguage: "en",
        reviewNotes:
          locale === "en"
            ? "Canonical content migrated from the active production experience."
            : "Migrated production translation plus generated SEO and alt text; human review required.",
      },
      banner: {
        _type: "fixedSection",
        internalName: "banner",
        title: careers.banner.heading,
        description: careers.banner.body,
        image: image(
          assetMap,
          SECTION_IMAGES.banner,
          generatedAlt(locale, careers.banner.heading),
        ),
        primaryCta: cta(careers.banner.primaryCta, "#open-position"),
        secondaryCta: cta(
          careers.banner.secondaryCta,
          "#life-at-robusst",
          "internal",
          "secondary",
        ),
      },
      riseWithUs: {
        _type: "fixedSection",
        internalName: "riseWithUs",
        title: careers.riseWithUs.heading,
        items: cards(locale, "riseWithUs", careers.riseWithUs.cards),
      },
      values: {
        _type: "fixedSection",
        internalName: "values",
        title: careers.values.heading,
        items: cards(locale, "values", careers.values.cards),
      },
      weMakeDifference: {
        _type: "fixedSection",
        internalName: "weMakeDifference",
        title: careers.weMakeDifference.heading,
        paragraphs: [
          careers.weMakeDifference.bodyOne,
          careers.weMakeDifference.bodyTwo,
        ],
        image: image(
          assetMap,
          SECTION_IMAGES.weMakeDifference,
          generatedAlt(locale, careers.weMakeDifference.heading),
        ),
      },
      whatWeOffer: {
        _type: "fixedSection",
        internalName: "whatWeOffer",
        title: careers.whatWeOffer.heading,
        image: image(
          assetMap,
          SECTION_IMAGES.whatWeOffer,
          generatedAlt(locale, careers.whatWeOffer.heading),
        ),
        items: cards(locale, "whatWeOffer", careers.whatWeOffer.sections),
      },
      lifeAtRobusst: {
        _type: "fixedSection",
        internalName: "lifeAtRobusst",
        title: careers.lifeAtRobusst.heading,
        images: Array.from({ length: 7 }, (_, index) =>
          image(
            assetMap,
            `/career/life/${index + 1}.webp`,
            generatedAlt(
              locale,
              `${careers.lifeAtRobusst.heading} ${index + 1}`,
            ),
          ),
        ),
      },
      hiringProcess: {
        _type: "fixedSection",
        internalName: "hiringProcess",
        title: careers.ourHiringProcess.heading,
        description: careers.ourHiringProcess.body,
        images: [1, 2, 3].map((number) =>
          image(
            assetMap,
            `/career/hiring/${number}.webp`,
            generatedAlt(
              locale,
              `${careers.ourHiringProcess.heading} ${number}`,
            ),
          ),
        ),
      },
      currentOpenings: {
        _type: "fixedSection",
        internalName: "currentOpenings",
        title: careers.currentOpenings.heading,
        labels: [
          careers.currentOpenings.viewJobCta,
          careers.currentOpenings.applyNowCta,
        ],
      },
      readyToJoin: {
        _type: "fixedSection",
        internalName: "readyToJoin",
        title: careers.readyToJoinUs.heading,
        paragraphs: [
          careers.readyToJoinUs.bodyOne,
          careers.readyToJoinUs.bodyTwo,
        ],
        image: image(
          assetMap,
          SECTION_IMAGES.readyToJoin,
          generatedAlt(locale, careers.readyToJoinUs.heading),
        ),
      },
      contact: {
        _type: "fixedSection",
        internalName: "contact",
        title: careers.contact.heading,
        subtitle: careers.contact.questionsPrompt,
        description: careers.contact.description,
        labels: [
          careers.contact.emailUs,
          careers.contact.followUs,
          careers.contact.latestJobOpenings,
        ],
        image: image(
          assetMap,
          SECTION_IMAGES.contact,
          generatedAlt(locale, careers.contact.heading),
        ),
        items: contactItems,
      },
      rolePage: {
        _type: "fixedSection",
        internalName: "rolePage",
        labels: [
          careers.rolePage.applyNowCta,
          careers.rolePage.overviewHeading,
          careers.rolePage.keyResponsibilitiesHeading,
          careers.rolePage.requirementsHeading,
        ],
      },
    });
    for (const job of careers.jobOpenings) {
      const canonical = canonicalJobs.get(job.id);
      if (!canonical)
        throw new Error(
          `Job ${job.id}/${locale} has no English canonical record`,
        );
      documents.push({
        _id: `jobPosting-${job.id}-${locale}`,
        _type: "jobPosting",
        legacyId: job.id,
        title: job.positionTitle,
        summary: job.shortDesc,
        department: job.department,
        employmentType: canonical.roleType,
        employmentTypeLabel: job.roleType,
        workplaceType: canonical.localtion,
        workplaceTypeLabel: job.localtion,
        location: "",
        overview: blocks(locale, job.id, "overview", job.roleOverView),
        responsibilities: blocks(
          locale,
          job.id,
          "responsibilities",
          job.responsibilities,
        ),
        requirements: blocks(locale, job.id, "requirements", job.requirements),
        applyCta: cta(
          careers.rolePage.applyNowCta,
          `https://mail.google.com/mail/?view=cm&fs=1&to=careers%40robusst.com&su=${encodeURIComponent(job.positionTitle)}`,
          "external",
        ),
        applicationEmail: "careers@robusst.com",
        publishedAt: PUBLISHED_AT,
        open: true,
        seo: {
          _type: "seo",
          metaTitle: `${job.positionTitle} | Robusst`,
          metaDescription:
            job.shortDesc.length >= 50
              ? job.shortDesc.slice(0, 170)
              : `${job.shortDesc} Apply to join the international Robusst team.`,
          noIndex: false,
        },
        language: locale,
        translation: {
          _type: "translationWorkflow",
          status: locale === "en" ? "source" : "generated",
          sourceLanguage: "en",
          reviewNotes:
            locale === "en"
              ? "Migrated from the active production job record. Publication date uses the approved baseline capture timestamp because the source did not expose one."
              : "Migrated production translation; human review required. Technical employment/workplace values follow the English canonical record.",
        },
      });
    }
  }
  documents.push({
    _id: "translation.metadata.careersPage",
    _type: "translation.metadata",
    schemaTypes: ["careersPage"],
    translations: LOCALES.map((locale) => ({
      _key: locale,
      _type: "internationalizedArrayReferenceValue",
      language: locale,
      value: { _type: "reference", _ref: `careersPage-${locale}` },
    })),
  });
  for (const jobId of canonicalJobs.keys())
    documents.push({
      _id: `translation.metadata.jobPosting-${jobId}`,
      _type: "translation.metadata",
      schemaTypes: ["jobPosting"],
      translations: LOCALES.map((locale) => ({
        _key: locale,
        _type: "internationalizedArrayReferenceValue",
        language: locale,
        value: { _type: "reference", _ref: `jobPosting-${jobId}-${locale}` },
      })),
    });
  console.log(
    JSON.stringify(
      {
        mode: options.execute ? "execute" : "dry-run",
        dataset: options.dataset,
        careersPages: 6,
        jobPostings: documents.filter(
          (document) => document._type === "jobPosting",
        ).length,
        translationMetadata: documents.filter(
          (document) => document._type === "translation.metadata",
        ).length,
      },
      null,
      2,
    ),
  );
  if (!options.execute) return;
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: options.dataset,
    apiVersion: "2026-08-15",
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN,
  });
  let transaction = client.transaction();
  for (const document of documents)
    transaction = transaction.createOrReplace(document);
  const result = await transaction.commit({ visibility: "sync" });
  console.log(
    `Committed ${result.documentIds.length} Careers and job documents.`,
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
