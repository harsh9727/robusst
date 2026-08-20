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
    play: "Play",
    close: "Close video",
    player: "Customized solutions video",
    faq: "Customized solutions support team",
  },
  fr: {
    play: "Lire",
    close: "Fermer la vidéo",
    player: "Vidéo sur les solutions personnalisées",
    faq: "Équipe d’assistance des solutions personnalisées",
  },
  ru: {
    play: "Смотреть",
    close: "Закрыть видео",
    player: "Видео об индивидуальных решениях",
    faq: "Команда поддержки индивидуальных решений",
  },
  pt: {
    play: "Reproduzir",
    close: "Fechar vídeo",
    player: "Vídeo sobre soluções personalizadas",
    faq: "Equipe de suporte de soluções personalizadas",
  },
  es: {
    play: "Reproducir",
    close: "Cerrar vídeo",
    player: "Vídeo sobre soluciones personalizadas",
    faq: "Equipo de soporte de soluciones personalizadas",
  },
  ar: {
    play: "تشغيل",
    close: "إغلاق الفيديو",
    player: "فيديو الحلول المخصصة",
    faq: "فريق دعم الحلول المخصصة",
  },
};
const SEO = {
  en: [
    "Customized AI Solutions for Enterprises | Robusst",
    "Build tailored AI and software solutions aligned with your business goals, existing platforms, measurable outcomes, and long-term growth with Robusst.",
  ],
  fr: [
    "Solutions d’IA personnalisées pour entreprises | Robusst",
    "Créez des solutions d’IA et logicielles sur mesure, intégrées à vos plateformes et alignées sur vos objectifs et résultats métier avec Robusst.",
  ],
  ru: [
    "Индивидуальные ИИ-решения для бизнеса | Robusst",
    "Создавайте с Robusst индивидуальные ИИ-решения и ПО, интегрированные с вашими платформами и ориентированные на измеримые бизнес-результаты.",
  ],
  pt: [
    "Soluções de IA personalizadas para empresas | Robusst",
    "Crie soluções de IA e software sob medida, integradas às suas plataformas e alinhadas a objetivos e resultados mensuráveis com a Robusst.",
  ],
  es: [
    "Soluciones de IA personalizadas para empresas | Robusst",
    "Crea soluciones de IA y software a medida, integradas con tus plataformas y orientadas a objetivos y resultados empresariales medibles con Robusst.",
  ],
  ar: [
    "حلول ذكاء اصطناعي مخصصة للمؤسسات | Robusst",
    "طوّر حلول ذكاء اصطناعي وبرمجيات مصممة لأهداف مؤسستك، متكاملة مع منصاتك وموجهة لتحقيق نتائج قابلة للقياس مع Robusst.",
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
  url.searchParams.set("schema", "customizesolution");
  url.searchParams.set("locale", locale);
  const response = await fetch(url, {
    headers: { "x-api-key": process.env.CMS_API_KEY },
  });
  if (!response.ok)
    throw new Error(
      `Active Customized Solutions request failed for ${locale}: ${response.status}`,
    );
  const body = await response.json();
  if (!body.data?.content?.customized_solution_page)
    throw new Error(
      `Active Customized Solutions content is empty for ${locale}`,
    );
  return body.data.content.customized_solution_page;
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
  const documents = [];
  for (const locale of LOCALES) {
    const page = await activeContent(locale);
    const copy = COPY[locale];
    documents.push({
      _id: `customizedSolutionsPage-${locale}`,
      _type: "customizedSolutionsPage",
      internalTitle: `Customized Solutions page — ${locale.toUpperCase()}`,
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
            ? "Canonical active content migrated; generated SEO, media alt text, and video accessibility labels require review."
            : "Migrated active translation plus generated SEO, media alt text, and video accessibility labels; human review required.",
      },
      banner: {
        _type: "fixedSection",
        internalName: "banner",
        title: page.banner.heading,
        subtitle: page.banner.subheading,
        image: image(
          assetMap,
          "/solutions/customized/banner.webp",
          page.banner.heading,
        ),
      },
      innovationProcess: {
        _type: "fixedSection",
        internalName: "innovationProcess",
        title: page.innovationProcess.heading,
        subtitle: page.innovationProcess.subheading,
        labels: [copy.play, copy.close],
        image: image(
          assetMap,
          "/thumbnail/5.webp",
          page.innovationProcess.heading,
        ),
        video: {
          _type: "externalVideo",
          provider: "youtube",
          videoId: "i2oR5Khw2N8",
          title: copy.player,
        },
        items: page.innovationProcess.steps.map((item, index) =>
          card(
            locale,
            "innovationProcess",
            index,
            item.title,
            item.description,
          ),
        ),
      },
      customizedSolutions: {
        _type: "fixedSection",
        internalName: "customizedSolutions",
        title: page.customizedSolutions.heading,
        description: page.customizedSolutions.description,
        image: image(
          assetMap,
          "/solutions/customized/1.webp",
          page.customizedSolutions.heading,
        ),
        primaryCta: {
          _type: "callToAction",
          style: "primary",
          link: {
            _type: "contentLink",
            label: page.customizedSolutions.ctaText,
            kind: "internal",
            href: "/contact",
          },
        },
      },
      customerCentric: {
        _type: "fixedSection",
        internalName: "customerCentric",
        title: page.customerCentric.heading,
        description: page.customerCentric.description,
        labels: page.customerCentric.points,
        image: image(
          assetMap,
          "/solutions/customized/2.webp",
          page.customerCentric.heading,
        ),
      },
      challenges: {
        _type: "fixedSection",
        internalName: "challenges",
        title: page.challenges.heading,
        subtitle: page.challenges.subheading,
        image: image(
          assetMap,
          "/solutions/customized/3.webp",
          page.challenges.heading,
        ),
        groups: page.challenges.categories.map((category, index) => ({
          _key: stableKey(`${locale}.challenges.${index}`),
          _type: "contentGroup",
          internalName: `challenge-${index + 1}`,
          title: category.title,
          items: category.points.map((point, pointIndex) =>
            card(locale, `challenge-${index + 1}`, pointIndex, point),
          ),
        })),
      },
      solutionsSlider: {
        _type: "fixedSection",
        internalName: "solutionsSlider",
        title: page.customizedSolutionsSlider.heading,
        items: page.customizedSolutionsSlider.solutions.map((solution, index) =>
          card(
            locale,
            "solutionsSlider",
            index,
            solution.heading,
            solution.subheading,
            {
              eyebrow: solution.countPrefix,
              image: image(assetMap, solution.imageSrc, solution.heading),
            },
          ),
        ),
      },
      commitmentToExcellence: {
        _type: "fixedSection",
        internalName: "commitmentToExcellence",
        title: page.commitmentToExcellence.heading,
        image: image(
          assetMap,
          "/solutions/customized/8.webp",
          page.commitmentToExcellence.heading,
        ),
        items: page.commitmentToExcellence.features.map((feature, index) =>
          card(locale, "commitmentToExcellence", index, feature.text),
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
    });
  }
  documents.push({
    _id: "translation.metadata.customizedSolutionsPage",
    _type: "translation.metadata",
    schemaTypes: ["customizedSolutionsPage"],
    translations: LOCALES.map((locale) => ({
      _key: locale,
      _type: "internationalizedArrayReferenceValue",
      language: locale,
      value: { _type: "reference", _ref: `customizedSolutionsPage-${locale}` },
    })),
  });
  console.log(
    JSON.stringify(
      {
        mode: options.execute ? "execute" : "dry-run",
        dataset: options.dataset,
        customizedSolutionsPages: 6,
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
      pageType: "customizedSolutionsPage",
      pageTitle: "Customized Solutions",
      sectionKeys: [
        "banner",
        "challenges",
        "customerCentric",
        "customizedSolutions",
        "solutionsSlider",
        "innovationProcess",
        "commitmentToExcellence",
        "faq",
      ],
    }),
  );
  console.log(
    `Committed ${result.documentIds.length} Customized Solutions documents.`,
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
