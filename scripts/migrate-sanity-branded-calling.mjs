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
const YOUTUBE_VIDEO_ID = "r4DBZZIO2m8";
const COPY = {
  en: {
    play: "Play",
    close: "Close video",
    player: "Branded Calling demonstration",
    preview: "Branded Calling video preview",
    spam: "Spam calls shown on a mobile screen",
    faq: "Branded Calling support team",
  },
  fr: {
    play: "Lire",
    close: "Fermer la vidéo",
    player: "Démonstration des appels de marque",
    preview: "Aperçu vidéo des appels de marque",
    spam: "Appels indésirables affichés sur un écran mobile",
    faq: "Équipe d’assistance des appels de marque",
  },
  ru: {
    play: "Смотреть",
    close: "Закрыть видео",
    player: "Демонстрация брендированных звонков",
    preview: "Предпросмотр видео о брендированных звонках",
    spam: "Спам-звонки на экране телефона",
    faq: "Команда поддержки брендированных звонков",
  },
  pt: {
    play: "Reproduzir",
    close: "Fechar vídeo",
    player: "Demonstração de chamadas com marca",
    preview: "Prévia do vídeo de chamadas com marca",
    spam: "Chamadas de spam exibidas em uma tela móvel",
    faq: "Equipe de suporte de chamadas com marca",
  },
  es: {
    play: "Reproducir",
    close: "Cerrar vídeo",
    player: "Demostración de llamadas con marca",
    preview: "Vista previa del vídeo de llamadas con marca",
    spam: "Llamadas de spam mostradas en una pantalla móvil",
    faq: "Equipo de soporte de llamadas con marca",
  },
  ar: {
    play: "تشغيل",
    close: "إغلاق الفيديو",
    player: "عرض توضيحي للمكالمات ذات العلامة التجارية",
    preview: "معاينة فيديو المكالمات ذات العلامة التجارية",
    spam: "مكالمات مزعجة معروضة على شاشة هاتف",
    faq: "فريق دعم المكالمات ذات العلامة التجارية",
  },
};
const SEO = {
  en: [
    "Branded Calling and Anti-Spam Solution | Robusst",
    "Display your brand identity on outbound calls, improve answer rates, prevent spam tagging, protect customers, and strengthen trust with Robusst Branded Calling.",
  ],
  fr: [
    "Appels de marque et solution anti-spam | Robusst",
    "Affichez votre identité sur les appels sortants, améliorez les taux de réponse, évitez le marquage spam et renforcez la confiance avec Robusst.",
  ],
  ru: [
    "Брендированные звонки и защита от спама | Robusst",
    "Показывайте бренд при исходящих звонках, повышайте отвечаемость, предотвращайте спам-маркировку и укрепляйте доверие клиентов с Robusst.",
  ],
  pt: [
    "Chamadas com marca e solução anti-spam | Robusst",
    "Exiba sua marca nas chamadas, aumente as taxas de atendimento, evite marcações de spam e fortaleça a confiança dos clientes com a Robusst.",
  ],
  es: [
    "Llamadas con marca y solución anti-spam | Robusst",
    "Muestra tu marca en llamadas salientes, aumenta la tasa de respuesta, evita etiquetas de spam y refuerza la confianza de tus clientes con Robusst.",
  ],
  ar: [
    "المكالمات ذات العلامة التجارية والحماية من الإزعاج | Robusst",
    "اعرض هوية علامتك في المكالمات الصادرة وارفع معدلات الرد وتجنب تصنيفها كمزعجة وعزز ثقة العملاء باستخدام حلول Robusst.",
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
async function activeBrand(locale) {
  const url = new URL("/api/v1/content", process.env.CMS_BASE_URL);
  url.searchParams.set("schema", "brand");
  url.searchParams.set("locale", locale);
  const response = await fetch(url, {
    headers: { "x-api-key": process.env.CMS_API_KEY },
  });
  if (!response.ok)
    throw new Error(
      `Active Branded Calling request failed for ${locale}: ${response.status}`,
    );
  const body = await response.json();
  if (!body.data?.content?.brand_page)
    throw new Error(`Active Branded Calling content is empty for ${locale}`);
  return body.data.content.brand_page;
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
function cards(locale, section, values) {
  return values.map((item, index) => ({
    _key: stableKey(`${locale}.${section}.${index}`),
    _type: "contentCard",
    internalName: `${section}-${index + 1}`,
    title: item.title,
    description: item.description,
  }));
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
    const page = await activeBrand(locale);
    const copy = COPY[locale];
    documents.push({
      _id: `brandedCallingPage-${locale}`,
      _type: "brandedCallingPage",
      internalTitle: `Branded Calling page — ${locale.toUpperCase()}`,
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
            ? "Canonical active content migrated. Previously hardcoded media alt text and video controls were generated for review."
            : "Migrated active translation plus generated SEO, media alt text, and video accessibility copy; human review required.",
      },
      banner: {
        _type: "fixedSection",
        internalName: "banner",
        title: page.banner.heading,
        subtitle: page.banner.subheading,
        image: image(
          assetMap,
          "/solutions/brand/banner.webp",
          page.banner.heading,
        ),
      },
      eliminate: {
        _type: "fixedSection",
        internalName: "eliminate",
        title: page.eliminate.heading,
        images: [
          image(assetMap, "/thumbnail/3.webp", copy.preview),
          image(assetMap, "/solutions/brand/11.webp", copy.spam),
        ],
        video: {
          _type: "externalVideo",
          provider: "youtube",
          videoId: YOUTUBE_VIDEO_ID,
          title: copy.player,
        },
        labels: [copy.play, copy.close, copy.player],
      },
      transformCommunication: {
        _type: "fixedSection",
        internalName: "transformCommunication",
        title: page.transformCommunication.ctaHeading,
        paragraphs: [
          page.transformCommunication.paragraph1,
          page.transformCommunication.paragraph2,
        ],
        image: image(
          assetMap,
          "/solutions/brand/14.webp",
          page.transformCommunication.ctaHeading,
        ),
      },
      whyChoose: {
        _type: "fixedSection",
        internalName: "whyChoose",
        title: page.whyChoose.heading,
        items: cards(locale, "whyChoose", page.whyChoose.items),
      },
      brandedCalling: {
        _type: "fixedSection",
        internalName: "brandedCalling",
        title: page.brandedCalling.heading,
        titleHighlight: page.brandedCalling.subheading,
        paragraphs: [
          page.brandedCalling.description1,
          page.brandedCalling.description2,
        ],
        labels: page.brandedCalling.benefits,
        image: image(
          assetMap,
          "/solutions/brand/2.webp",
          page.brandedCalling.heading,
        ),
      },
      keyFeatures: {
        _type: "fixedSection",
        internalName: "keyFeatures",
        title: page.keyFeatures.heading,
        image: image(
          assetMap,
          "/solutions/brand/8.webp",
          page.keyFeatures.heading,
        ),
        items: cards(locale, "keyFeatures", page.keyFeatures.features),
      },
      antiSpamProtection: {
        _type: "fixedSection",
        internalName: "antiSpamProtection",
        title: page.antiSpamProtection.heading,
        titleHighlight: page.antiSpamProtection.subheading,
        paragraphs: [
          page.antiSpamProtection.description1,
          page.antiSpamProtection.description2,
        ],
        labels: page.antiSpamProtection.benefits,
        image: image(
          assetMap,
          "/solutions/brand/7.webp",
          page.antiSpamProtection.heading,
        ),
      },
      coreProtectionFeatures: {
        _type: "fixedSection",
        internalName: "coreProtectionFeatures",
        title: page.coreProtectionFeatures.heading,
        image: image(
          assetMap,
          "/solutions/brand/6.webp",
          page.coreProtectionFeatures.heading,
        ),
        items: cards(
          locale,
          "coreProtectionFeatures",
          page.coreProtectionFeatures.features,
        ),
      },
      industryApplications: {
        _type: "fixedSection",
        internalName: "industryApplications",
        title: page.industryApplications.heading,
        subtitle: page.industryApplications.subheading,
        items: cards(
          locale,
          "industryApplications",
          page.industryApplications.industries,
        ),
      },
      regionalExcellence: {
        _type: "fixedSection",
        internalName: "regionalExcellence",
        title: page.regionalExcellence.heading,
        subtitle: page.regionalExcellence.subheading,
        image: image(
          assetMap,
          "/solutions/brand/4.webp",
          page.regionalExcellence.heading,
        ),
        items: cards(
          locale,
          "regionalExcellence",
          page.regionalExcellence.regions,
        ),
      },
      securityCompliance: {
        _type: "fixedSection",
        internalName: "securityCompliance",
        title: page.securityCompliance.heading,
        items: cards(
          locale,
          "securityCompliance",
          page.securityCompliance.items,
        ),
      },
      faq: {
        _type: "fixedSection",
        internalName: "faq",
        title: page.faq.heading,
        image: image(assetMap, "/solutions/brand/3.webp", copy.faq),
        faqs: page.faq.items.map((faq, index) => ({
          _key: stableKey(`${locale}.faq.${index}`),
          _type: "faqItem",
          question: faq.question,
          answer: block(locale, index, faq.answer),
        })),
      },
    });
  }
  documents.push({
    _id: "translation.metadata.brandedCallingPage",
    _type: "translation.metadata",
    schemaTypes: ["brandedCallingPage"],
    translations: LOCALES.map((locale) => ({
      _key: locale,
      _type: "internationalizedArrayReferenceValue",
      language: locale,
      value: { _type: "reference", _ref: `brandedCallingPage-${locale}` },
    })),
  });
  console.log(
    JSON.stringify(
      {
        mode: options.execute ? "execute" : "dry-run",
        dataset: options.dataset,
        brandedCallingPages: 6,
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
      pageType: "brandedCallingPage",
      pageTitle: "Branded Calling",
      sectionKeys: [
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
    }),
  );
  console.log(
    `Committed ${result.documentIds.length} Branded Calling documents.`,
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
