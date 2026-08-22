#!/usr/bin/env node

import { createReadStream } from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const COPY = {
  en: {
    faq: "Frequently Asked Questions",
    cdpVideo: "Customer Data Platform video",
    cdpPoster: "Customer Data Platform video preview",
    nocVideo: "Intelligent NOC video",
    nocPoster: "Intelligent NOC video preview",
  },
  fr: {
    faq: "Questions fréquentes",
    cdpVideo: "Vidéo de la plateforme de données clients",
    cdpPoster: "Aperçu vidéo de la plateforme de données clients",
    nocVideo: "Vidéo du NOC intelligent",
    nocPoster: "Aperçu vidéo du NOC intelligent",
  },
  ru: {
    faq: "Часто задаваемые вопросы",
    cdpVideo: "Видео о платформе клиентских данных",
    cdpPoster: "Превью видео о платформе клиентских данных",
    nocVideo: "Видео об интеллектуальном NOC",
    nocPoster: "Превью видео об интеллектуальном NOC",
  },
  pt: {
    faq: "Perguntas frequentes",
    cdpVideo: "Vídeo da Plataforma de Dados do Cliente",
    cdpPoster: "Prévia do vídeo da Plataforma de Dados do Cliente",
    nocVideo: "Vídeo do NOC Inteligente",
    nocPoster: "Prévia do vídeo do NOC Inteligente",
  },
  es: {
    faq: "Preguntas frecuentes",
    cdpVideo: "Video de la Plataforma de Datos del Cliente",
    cdpPoster: "Vista previa del video de la Plataforma de Datos del Cliente",
    nocVideo: "Video del NOC Inteligente",
    nocPoster: "Vista previa del video del NOC Inteligente",
  },
  ar: {
    faq: "الأسئلة الشائعة",
    cdpVideo: "فيديو منصة بيانات العملاء",
    cdpPoster: "معاينة فيديو منصة بيانات العملاء",
    nocVideo: "فيديو مركز عمليات الشبكة الذكي",
    nocPoster: "معاينة فيديو مركز عمليات الشبكة الذكي",
  },
};

const INDUSTRY_IMAGES = [
  "fmgc.png",
  "automation.png",
  "paints.png",
  "cable_and_wire.png",
  "dairy.png",
  "consumer_durable.png",
  "liquor.png",
  "building_material.png",
  "textile.png",
  "cosmetics.png",
  "pharmaceutical.png",
  "stationry.png",
];

function parseArgs(argv) {
  const options = {
    execute: false,
    dataset: "development",
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

function contentImage(assetId, alt) {
  return {
    _type: "contentImage",
    image: {
      _type: "image",
      asset: { _type: "reference", _ref: assetId },
    },
    alt,
  };
}

function externalVideo(videoId, title, poster) {
  return {
    _type: "externalVideo",
    provider: "youtube",
    videoId,
    title,
    poster,
  };
}

async function uploadImage(client, relativePath) {
  const absolutePath = path.join(ROOT, "public", relativePath);
  return client.assets.upload("image", createReadStream(absolutePath), {
    filename: path.basename(relativePath),
  });
}

async function main() {
  if (typeof process.loadEnvFile === "function") process.loadEnvFile(".env");
  const options = parseArgs(process.argv.slice(2));
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: options.dataset,
    apiVersion: "2026-08-15",
    useCdn: false,
    token: options.execute ? process.env.SANITY_API_WRITE_TOKEN : undefined,
  });

  const documentCounts = await client.fetch(`{
    "cdp": count(*[_type == "customerDataPlatformPage"]),
    "ai": count(*[_type == "aiCallCenterPage"]),
    "nocBanners": count(*[_type == "fixedPageSection" && pageType == "intelligentNocPage" && sectionKey == "banner"]),
    "nocFaqs": count(*[_type == "fixedPageSection" && pageType == "intelligentNocPage" && sectionKey == "faq"]),
    "industries": count(*[_type == "fixedPageSection" && pageType == "stsDmsPage" && sectionKey == "industryAgnostic"])
  }`);
  const expected = { cdp: 6, ai: 6, nocBanners: 6, nocFaqs: 6, industries: 6 };
  for (const [key, count] of Object.entries(expected)) {
    if (documentCounts[key] !== count)
      throw new Error(
        `${key}: expected ${count} documents, found ${documentCounts[key]}`,
      );
  }

  console.log(
    JSON.stringify(
      {
        mode: options.execute ? "execute" : "dry-run",
        dataset: options.dataset,
        documents: documentCounts,
        assets: 14,
      },
      null,
      2,
    ),
  );
  if (!options.execute) return;
  if (!process.env.SANITY_API_WRITE_TOKEN)
    throw new Error("SANITY_API_WRITE_TOKEN is required for execution");

  const [cdpThumbnail, nocThumbnail, ...industryAssets] = await Promise.all([
    uploadImage(client, "thumbnail/5.webp"),
    uploadImage(client, "thumbnail/6.webp"),
    ...INDUSTRY_IMAGES.map((filename) =>
      uploadImage(
        client,
        `solutions/sts/industry_agnostic_solution/${filename}`,
      ),
    ),
  ]);

  const transaction = client.transaction();
  for (const locale of LOCALES) {
    const copy = COPY[locale];
    transaction.patch(`customerDataPlatformPage-${locale}`, (patch) =>
      patch.set({
        "banner.video": externalVideo(
          "i2oR5Khw2N8",
          copy.cdpVideo,
          contentImage(cdpThumbnail._id, copy.cdpPoster),
        ),
        "faq.title": copy.faq,
      }),
    );
    transaction.patch(
      `fixedPageSection-aiCallCenterPage-${locale}-faq`,
      (patch) => patch.set({ "content.title": copy.faq }),
    );
    transaction.patch(
      `fixedPageSection-intelligentNocPage-${locale}-banner`,
      (patch) =>
        patch.set({
          "content.video": externalVideo(
            "Z83YPnlPSw8",
            copy.nocVideo,
            contentImage(nocThumbnail._id, copy.nocPoster),
          ),
        }),
    );

    const industryId = `fixedPageSection-stsDmsPage-${locale}-industryAgnostic`;
    const items = await client.fetch(`*[_id == $id][0].content.items`, {
      id: industryId,
    });
    const itemsWithImages = items
      .slice(0, industryAssets.length)
      .map((item, index) => ({
        ...item,
        image: contentImage(industryAssets[index]._id, item.title),
      }));
    transaction.patch(industryId, (patch) =>
      patch.set({ "content.items": itemsWithImages }),
    );
  }
  await transaction.commit({ visibility: "sync" });
  console.log(`Updated page UI content in ${options.dataset}.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
