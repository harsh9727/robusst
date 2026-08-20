#!/usr/bin/env node
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";
const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const SECTION_KEYS = [
  "banner",
  "telecomIntelligence",
  "salesDistribution",
  "whyRobusst",
  "robusstPlatform",
  "businessAutomation",
  "successStories",
  "solutionGrid",
  "driveSales",
  "erpHrisIntegration",
  "industryAgnostic",
  "faq",
];
const COPY = {
  en: {
    close: "Close video",
    player: "STS and DMS platform video",
    matters: "Why it matters",
    faq: "STS and DMS support team",
  },
  fr: {
    close: "Fermer la vidéo",
    player: "Vidéo de la plateforme STS et DMS",
    matters: "Pourquoi c’est important",
    faq: "Équipe d’assistance STS et DMS",
  },
  ru: {
    close: "Закрыть видео",
    player: "Видео о платформе STS и DMS",
    matters: "Почему это важно",
    faq: "Команда поддержки STS и DMS",
  },
  pt: {
    close: "Fechar vídeo",
    player: "Vídeo da plataforma STS e DMS",
    matters: "Por que isso importa",
    faq: "Equipe de suporte STS e DMS",
  },
  es: {
    close: "Cerrar vídeo",
    player: "Vídeo de la plataforma STS y DMS",
    matters: "Por qué es importante",
    faq: "Equipo de soporte de STS y DMS",
  },
  ar: {
    close: "إغلاق الفيديو",
    player: "فيديو منصة تتبع المبيعات وإدارة الموزعين",
    matters: "لماذا هو مهم",
    faq: "فريق دعم تتبع المبيعات وإدارة الموزعين",
  },
};
const SEO = {
  en: [
    "Sales Tracking and Distributor Management | Robusst",
    "Manage distributors, dealers, inventory, field sales, commissions, loyalty, authentication, and enterprise integrations through the unified Robusst STS and DMS platform.",
  ],
  fr: [
    "Suivi des ventes et gestion des distributeurs | Robusst",
    "Gérez distributeurs, stocks, ventes terrain, commissions, fidélité et intégrations d’entreprise avec la plateforme unifiée STS et DMS de Robusst.",
  ],
  ru: [
    "Отслеживание продаж и управление дистрибьюторами | Robusst",
    "Управляйте дистрибьюторами, запасами, полевыми продажами, комиссиями, лояльностью и интеграциями на единой платформе STS и DMS Robusst.",
  ],
  pt: [
    "Rastreamento de vendas e gestão de distribuidores | Robusst",
    "Gerencie distribuidores, estoque, vendas de campo, comissões, fidelidade e integrações empresariais na plataforma unificada STS e DMS da Robusst.",
  ],
  es: [
    "Seguimiento de ventas y gestión de distribuidores | Robusst",
    "Gestiona distribuidores, inventario, ventas de campo, comisiones, fidelización e integraciones empresariales con la plataforma STS y DMS de Robusst.",
  ],
  ar: [
    "تتبع المبيعات وإدارة الموزعين | Robusst",
    "أدر الموزعين والمخزون والمبيعات الميدانية والعمولات والولاء والمصادقة وتكاملات المؤسسات عبر منصة Robusst الموحدة لتتبع المبيعات وإدارة التوزيع.",
  ],
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
async function activeContent(locale) {
  const url = new URL("/api/v1/content", process.env.CMS_BASE_URL);
  url.searchParams.set("schema", "stsanddms");
  url.searchParams.set("locale", locale);
  const response = await fetch(url, {
    headers: { "x-api-key": process.env.CMS_API_KEY },
  });
  if (!response.ok)
    throw new Error(
      `Active STS/DMS request failed for ${locale}: ${response.status}`,
    );
  const body = await response.json();
  if (!body.data?.content?.sts_and_dms_page)
    throw new Error(`Active STS/DMS content is empty for ${locale}`);
  return body.data.content.sts_and_dms_page;
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
function card(locale, section, index, title, description, extra = {}) {
  return {
    _key: stableKey(`${locale}.${section}.${index}`),
    _type: "contentCard",
    internalName: `${section}-${index + 1}`,
    title,
    description,
    ...extra,
  };
}
function cards(
  locale,
  section,
  values,
  map = (item) => ({ title: item.title, description: item.description }),
) {
  return values.map((item, index) => {
    const mapped = map(item);
    return card(
      locale,
      section,
      index,
      mapped.title,
      mapped.description,
      mapped.extra,
    );
  });
}
function block(locale, index, text) {
  return [
    {
      _key: stableKey(`${locale}.faq.${index}.block`),
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: stableKey(`${locale}.faq.${index}.span`),
          _type: "span",
          marks: [],
          text,
        },
      ],
    },
  ];
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
  const generatedArabic = JSON.parse(
    await readFile(
      path.join(ROOT, "migration/translations/sts-dms.ar.generated.json"),
      "utf8",
    ),
  ).content;
  const documents = [];
  for (const locale of LOCALES) {
    const activePage = await activeContent(locale);
    const page =
      locale === "ar" ? { ...activePage, ...generatedArabic } : activePage;
    const copy = COPY[locale];
    const pageDocument = {
      _id: `stsDmsPage-${locale}`,
      _type: "stsDmsPage",
      internalTitle: `STS/DMS page — ${locale.toUpperCase()}`,
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
          locale === "ar"
            ? "Seven missing active Arabic sections were generated. Migrated content, SEO, alt text, and dialog labels require human review."
            : locale === "en"
              ? "Canonical active content migrated; generated SEO, media alt text, and dialog labels require review."
              : "Migrated active translation plus generated SEO, media alt text, and dialog labels; human review required.",
      },
      banner: {
        _type: "fixedSection",
        internalName: "banner",
        title: page.banner.title,
        description: page.banner.description,
        image: image(
          assetMap,
          "/solutions/sts/banner.webp",
          page.banner.imageAlt || page.banner.title,
        ),
      },
      telecomIntelligence: {
        _type: "fixedSection",
        internalName: "telecomIntelligence",
        title: page.telecomIntelligence.title,
        titleHighlight: page.telecomIntelligence.titleHighlight,
        description: page.telecomIntelligence.description,
        labels: [page.telecomIntelligence.playButtonText, copy.close],
        image: image(
          assetMap,
          "/thumbnail/4.webp",
          page.telecomIntelligence.videoThumbnailAlt ||
            page.telecomIntelligence.title,
        ),
        video: {
          _type: "externalVideo",
          provider: "youtube",
          videoId: page.telecomIntelligence.videoId,
          title: copy.player,
        },
      },
      salesDistribution: {
        _type: "fixedSection",
        internalName: "salesDistribution",
        title: page.salesDistribution.title,
        titleHighlight: page.salesDistribution.titleHighlight,
        subtitle: page.salesDistribution.subtitle,
        items: cards(
          locale,
          "salesDistribution",
          page.salesDistribution.modules,
          (item) => ({
            title: item.title,
            description: item.description,
            extra: { iconKey: item.icon },
          }),
        ),
      },
      whyRobusst: {
        _type: "fixedSection",
        internalName: "whyRobusst",
        title: page.whyRobusst.title,
        subtitle: page.whyRobusst.subtitle,
        description: page.whyRobusst.description,
        image: image(
          assetMap,
          "/solutions/sts/1.webp",
          page.whyRobusst.imageAlt || page.whyRobusst.title,
        ),
        items: cards(locale, "whyRobusst", page.whyRobusst.points),
      },
      robusstPlatform: {
        _type: "fixedSection",
        internalName: "robusstPlatform",
        title: page.robusstPlatform.title,
        subtitle: page.robusstPlatform.subtitle,
        labels: [
          page.robusstPlatform.centerTitle,
          page.robusstPlatform.centerSubtitle,
        ],
        items: page.robusstPlatform.features.map((item, index) =>
          card(
            locale,
            "robusstPlatform",
            index,
            item.title[0],
            item.description,
            { subtitle: item.title[1], iconKey: item.icon },
          ),
        ),
      },
      businessAutomation: {
        _type: "fixedSection",
        internalName: "businessAutomation",
        title: page.businessAutomation.title,
        subtitle: page.businessAutomation.subtitle,
        items: cards(
          locale,
          "businessAutomation",
          page.businessAutomation.products,
          (item) => ({
            title: item.title,
            description: item.description,
            extra: { iconKey: item.icon },
          }),
        ),
      },
      successStories: {
        _type: "fixedSection",
        internalName: "successStories",
        title: page.successStories.title,
        subtitle: page.successStories.subtitle,
        image: image(
          assetMap,
          "/solutions/sts/2.webp",
          page.successStories.imageAlt || page.successStories.title,
        ),
        items: cards(
          locale,
          "successStories",
          page.successStories.stories,
          (item) => ({
            title: item.title,
            description: item.text,
            extra: { iconKey: item.icon },
          }),
        ),
      },
      solutionGrid: {
        _type: "fixedSection",
        internalName: "solutionGrid",
        title: page.solutionGrid.title,
        labels: [page.solutionGrid.viewDetailsText, copy.matters],
        image: image(
          assetMap,
          "/solutions/sts/15.webp",
          page.solutionGrid.decorativeImageAlt || page.solutionGrid.title,
        ),
        groups: page.solutionGrid.solutions.map((solution) => ({
          _key: stableKey(`${locale}.solution.${solution.acronym}`),
          _type: "contentGroup",
          internalName: solution.acronym,
          title: solution.title,
          subtitle: solution.detailedContent.subtitle,
          description: solution.description,
          image: image(assetMap, solution.imageSrc, solution.title),
          labels: [
            solution.detailedContent.description,
            solution.detailedContent.whyItMatters,
          ],
          items: (solution.detailedContent.sections ?? []).map(
            (section, index) =>
              card(
                locale,
                `solution-${solution.acronym}`,
                index,
                section.title,
                section.description,
              ),
          ),
        })),
      },
      driveSales: {
        _type: "fixedSection",
        internalName: "driveSales",
        title: page.driveSales.title,
        titleHighlight: page.driveSales.titleHighlight,
        image: image(
          assetMap,
          "/solutions/sts/12.webp",
          page.driveSales.imageAlt || page.driveSales.title,
        ),
        items: page.driveSales.useCases.map((item, index) =>
          card(locale, "driveSales", index, item.label, undefined, {
            iconKey: item.icon,
          }),
        ),
      },
      erpHrisIntegration: {
        _type: "fixedSection",
        internalName: "erpHrisIntegration",
        eyebrow: page.erpHrisIntegration.badge,
        title: page.erpHrisIntegration.title,
        subtitle: page.erpHrisIntegration.subtitle,
        items: cards(
          locale,
          "erpHrisIntegration",
          page.erpHrisIntegration.features,
          (item) => ({
            title: item.title,
            description: item.description,
            extra: { iconKey: item.icon },
          }),
        ),
      },
      industryAgnostic: {
        _type: "fixedSection",
        internalName: "industryAgnostic",
        title: page.industryAgnostic.title,
        subtitle: page.industryAgnostic.subtitle,
        items: page.industryAgnostic.industries.map((item, index) =>
          card(locale, "industryAgnostic", index, item.title, undefined, {
            iconKey: item.icon,
          }),
        ),
      },
      faq: {
        _type: "fixedSection",
        internalName: "faq",
        image: image(assetMap, "/successStories/provision.webp", copy.faq),
        faqs: page.faq.map((faq, index) => ({
          _key: stableKey(`${locale}.faq.${index}`),
          _type: "faqItem",
          question: faq.question,
          answer: block(locale, index, faq.answer),
        })),
      },
    };
    for (const sectionKey of SECTION_KEYS) {
      const sectionId = `fixedPageSection-stsDmsPage-${locale}-${sectionKey}`;
      documents.push({
        _id: sectionId,
        _type: "fixedPageSection",
        internalTitle: `STS/DMS ${sectionKey} — ${locale.toUpperCase()}`,
        pageType: "stsDmsPage",
        sectionKey,
        language: locale,
        content: pageDocument[sectionKey],
      });
      pageDocument[sectionKey] = { _type: "reference", _ref: sectionId };
    }
    documents.push(pageDocument);
  }
  documents.push({
    _id: "translation.metadata.stsDmsPage",
    _type: "translation.metadata",
    schemaTypes: ["stsDmsPage"],
    translations: LOCALES.map((locale) => ({
      _key: locale,
      _type: "internationalizedArrayReferenceValue",
      language: locale,
      value: { _type: "reference", _ref: `stsDmsPage-${locale}` },
    })),
  });
  console.log(
    JSON.stringify(
      {
        mode: options.execute ? "execute" : "dry-run",
        dataset: options.dataset,
        stsDmsPages: 6,
        translationMetadata: 1,
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
  const documentIds = [];
  for (const document of documents) {
    const result = await client.createOrReplace(document, {
      visibility: "sync",
    });
    documentIds.push(result._id);
  }
  console.log(`Committed ${documentIds.length} STS/DMS documents.`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
