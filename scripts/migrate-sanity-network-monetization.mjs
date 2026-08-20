#!/usr/bin/env node
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";
import {
  commitReferencedPageDocuments,
  splitReferencedPageDocuments,
} from "./lib/referenced-page-migration.mjs";
const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const COPY = {
  en: {
    close: "Close video",
    player: "Network monetization video",
    bannerVideo: "Network monetization background video",
    features: "Features",
    impact: "Business Impact",
    view: "View More",
    module: "Module",
    keyFeatures: "Key Features",
    matters: "Why it matters",
    faq: "Network monetization support team",
  },
  fr: {
    close: "Fermer la vidéo",
    player: "Vidéo sur la monétisation du réseau",
    bannerVideo: "Vidéo d’arrière-plan sur la monétisation du réseau",
    features: "Fonctionnalités",
    impact: "Impact commercial",
    view: "Voir plus",
    module: "Module",
    keyFeatures: "Fonctionnalités clés",
    matters: "Pourquoi c’est important",
    faq: "Équipe d’assistance à la monétisation du réseau",
  },
  ru: {
    close: "Закрыть видео",
    player: "Видео о монетизации сети",
    bannerVideo: "Фоновое видео о монетизации сети",
    features: "Возможности",
    impact: "Влияние на бизнес",
    view: "Подробнее",
    module: "Модуль",
    keyFeatures: "Ключевые функции",
    matters: "Почему это важно",
    faq: "Команда поддержки монетизации сети",
  },
  pt: {
    close: "Fechar vídeo",
    player: "Vídeo sobre monetização de rede",
    bannerVideo: "Vídeo de fundo sobre monetização de rede",
    features: "Recursos",
    impact: "Impacto nos negócios",
    view: "Ver mais",
    module: "Módulo",
    keyFeatures: "Principais recursos",
    matters: "Por que isso importa",
    faq: "Equipe de suporte de monetização de rede",
  },
  es: {
    close: "Cerrar vídeo",
    player: "Vídeo sobre monetización de red",
    bannerVideo: "Vídeo de fondo sobre monetización de red",
    features: "Funciones",
    impact: "Impacto empresarial",
    view: "Ver más",
    module: "Módulo",
    keyFeatures: "Funciones clave",
    matters: "Por qué es importante",
    faq: "Equipo de soporte de monetización de red",
  },
  ar: {
    close: "إغلاق الفيديو",
    player: "فيديو تحقيق الدخل من الشبكة",
    bannerVideo: "فيديو خلفية تحقيق الدخل من الشبكة",
    features: "الميزات",
    impact: "الأثر التجاري",
    view: "عرض المزيد",
    module: "الوحدة",
    keyFeatures: "الميزات الرئيسية",
    matters: "لماذا هو مهم",
    faq: "فريق دعم تحقيق الدخل من الشبكة",
  },
};
const SEO = {
  en: [
    "Network Monetization and Optimization Solutions | Robusst",
    "Improve mobile experience, unlock network revenue, optimize coverage and quality, and automate telecom use cases with Robusst network monetization solutions.",
  ],
  fr: [
    "Solutions de monétisation et d’optimisation réseau | Robusst",
    "Améliorez l’expérience mobile, les revenus du réseau, la couverture et la qualité grâce aux solutions de monétisation et d’automatisation Robusst.",
  ],
  ru: [
    "Решения для монетизации и оптимизации сети | Robusst",
    "Улучшайте мобильный опыт, доходность сети, покрытие и качество, автоматизируя телеком-сценарии с решениями монетизации сети Robusst.",
  ],
  pt: [
    "Soluções de monetização e otimização de rede | Robusst",
    "Melhore a experiência móvel, a receita da rede, a cobertura e a qualidade, automatizando casos de uso de telecomunicações com a Robusst.",
  ],
  es: [
    "Soluciones de monetización y optimización de red | Robusst",
    "Mejora la experiencia móvil, los ingresos, la cobertura y la calidad de red, automatizando casos de uso de telecomunicaciones con Robusst.",
  ],
  ar: [
    "حلول تحقيق الدخل من الشبكة وتحسينها | Robusst",
    "حسّن تجربة الهاتف المحمول وإيرادات الشبكة والتغطية والجودة وأتمت حالات استخدام الاتصالات مع حلول Robusst لتحقيق الدخل من الشبكة.",
  ],
};
const SOLUTION_IMAGES = [
  "/solutions/network/2.webp",
  "/solutions/network/3.webp",
  "/solutions/network/4.webp",
  "/solutions/network/5.webp",
  "/solutions/network/6.webp",
];
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
  url.searchParams.set("schema", "networkmonetization");
  url.searchParams.set("locale", locale);
  const response = await fetch(url, {
    headers: { "x-api-key": process.env.CMS_API_KEY },
  });
  if (!response.ok)
    throw new Error(
      `Active Network Monetization request failed for ${locale}: ${response.status}`,
    );
  const body = await response.json();
  if (!body.data?.content?.network_monetization_page)
    throw new Error(
      `Active Network Monetization content is empty for ${locale}`,
    );
  return body.data.content.network_monetization_page;
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
      path.join(
        ROOT,
        "migration/translations/network-monetization.ar.generated.json",
      ),
      "utf8",
    ),
  ).content;
  const documents = [];
  for (const locale of LOCALES) {
    const activePage = await activeContent(locale);
    const page =
      locale === "ar" ? { ...activePage, ...generatedArabic } : activePage;
    const copy = COPY[locale];
    documents.push({
      _id: `networkMonetizationPage-${locale}`,
      _type: "networkMonetizationPage",
      internalTitle: `Network Monetization page — ${locale.toUpperCase()}`,
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
            ? "Canonical active content migrated; generated SEO, media alt text, and dialog labels require review."
            : locale === "ar"
              ? "Migrated active translation. Missing Arabic media references were restored from the active canonical placements; generated SEO, alt text, and dialog labels require human review."
              : "Migrated active translation plus generated SEO, media alt text, and dialog labels; human review required.",
      },
      banner: {
        _type: "fixedSection",
        internalName: "banner",
        title: page.banner.title,
        description: page.banner.description,
        video: {
          _type: "externalVideo",
          provider: "sanityFile",
          videoFile: {
            _type: "file",
            asset: {
              _type: "reference",
              _ref: asset(assetMap, "/solutions/network/banner.webm"),
            },
          },
          title: page.banner.videoAlt || copy.bannerVideo,
        },
      },
      whyNetworkMonetization: {
        _type: "fixedSection",
        internalName: "whyNetworkMonetization",
        title: page.whyNetworkMonetization.title,
        description: page.whyNetworkMonetization.highlightStatement,
        labels: [page.whyNetworkMonetization.playButtonText, copy.close],
        paragraphs: page.whyNetworkMonetization.points,
        image: image(
          assetMap,
          "/thumbnail/6.webp",
          page.whyNetworkMonetization.videoThumbnailAlt ||
            page.whyNetworkMonetization.title,
        ),
        video: {
          _type: "externalVideo",
          provider: "youtube",
          videoId: "Z83YPnlPSw8",
          title: copy.player,
        },
      },
      monetizationFramework: {
        _type: "fixedSection",
        internalName: "monetizationFramework",
        title: page.monetizationFramework.title,
        items: page.monetizationFramework.frameworks.map((item, index) =>
          card(
            locale,
            "monetizationFramework",
            index,
            item.title,
            item.description,
            { iconKey: item.icon },
          ),
        ),
      },
      userExperienceManagement: {
        _type: "fixedSection",
        internalName: "userExperienceManagement",
        eyebrow: page.userExperienceManagement.badge,
        title: page.userExperienceManagement.title,
        subtitle: page.userExperienceManagement.subtitle,
        labels: page.userExperienceManagement.features,
        image: image(
          assetMap,
          "/solutions/network/1.webp",
          page.userExperienceManagement.imageAlt ||
            page.userExperienceManagement.title,
        ),
      },
      solutionGrid: {
        _type: "fixedSection",
        internalName: "solutionGrid",
        labels: [copy.features, copy.impact],
        groups: page.solutionGrid.solutions.map((solution, index) => ({
          _key: stableKey(`${locale}.solutionGrid.${index}`),
          _type: "contentGroup",
          internalName: `solution-${index + 1}`,
          title: solution.title,
          subtitle: solution.subtitle,
          image: image(assetMap, SOLUTION_IMAGES[index], solution.title),
          labels: solution.features,
          items: solution.businessImpact.map((impact, impactIndex) =>
            card(locale, `solution-impact-${index}`, impactIndex, impact),
          ),
        })),
      },
      mobileUseCase: {
        _type: "fixedSection",
        internalName: "mobileUseCase",
        title: page.mobileUseCase.title,
        subtitle: page.mobileUseCase.subtitle,
        items: page.mobileUseCase.useCases.map((item, index) =>
          card(locale, "mobileUseCase", index, item.title, item.description, {
            iconKey: item.icon,
          }),
        ),
      },
      useCaseGrid: {
        _type: "fixedSection",
        internalName: "useCaseGrid",
        title: page.useCaseGrid.title,
        subtitle: page.useCaseGrid.subtitle,
        labels: [copy.view, copy.module, copy.keyFeatures, copy.matters],
        groups: page.useCaseGrid.solutions.map((solution) => ({
          _key: stableKey(`${locale}.useCase.${solution.acronym}`),
          _type: "contentGroup",
          internalName: solution.acronym,
          title: solution.title,
          subtitle: solution.detailedContent.subtitle,
          description: solution.description,
          labels: [
            solution.detailedContent.description,
            solution.detailedContent.whyItMatters,
            ...(solution.detailedContent.features ?? []),
          ].filter(Boolean),
          items: [],
        })),
      },
      telcos: {
        _type: "fixedSection",
        internalName: "telcos",
        title: page.telcos.title,
        labels: page.telcos.features,
        image: image(
          assetMap,
          "/solutions/network/1.webp",
          page.telcos.imageAlt || page.telcos.title,
        ),
      },
      faq: {
        _type: "fixedSection",
        internalName: "faq",
        image: image(assetMap, "/pics/contact.webp", copy.faq),
        faqs: page.faq.map((faq, index) => ({
          _key: stableKey(`${locale}.faq.${index}`),
          _type: "faqItem",
          question: faq.question,
          answer: block(locale, index, faq.answer),
        })),
      },
    });
  }
  documents.push({
    _id: "translation.metadata.networkMonetizationPage",
    _type: "translation.metadata",
    schemaTypes: ["networkMonetizationPage"],
    translations: LOCALES.map((locale) => ({
      _key: locale,
      _type: "internationalizedArrayReferenceValue",
      language: locale,
      value: { _type: "reference", _ref: `networkMonetizationPage-${locale}` },
    })),
  });
  console.log(
    JSON.stringify(
      {
        mode: options.execute ? "execute" : "dry-run",
        dataset: options.dataset,
        networkMonetizationPages: 6,
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
  const result = await commitReferencedPageDocuments(
    client,
    splitReferencedPageDocuments(documents, {
      pageType: "networkMonetizationPage",
      pageTitle: "Network Monetization",
      sectionKeys: [
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
    }),
  );
  console.log(
    `Committed ${result.documentIds.length} Network Monetization documents.`,
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
