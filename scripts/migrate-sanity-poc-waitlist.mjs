#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";
import countries from "i18n-iso-countries";
import arCountries from "i18n-iso-countries/langs/ar.json" with { type: "json" };
import enCountries from "i18n-iso-countries/langs/en.json" with { type: "json" };
import esCountries from "i18n-iso-countries/langs/es.json" with { type: "json" };
import frCountries from "i18n-iso-countries/langs/fr.json" with { type: "json" };
import ptCountries from "i18n-iso-countries/langs/pt.json" with { type: "json" };
import ruCountries from "i18n-iso-countries/langs/ru.json" with { type: "json" };

for (const localeData of [
  enCountries,
  frCountries,
  ruCountries,
  ptCountries,
  esCountries,
  arCountries,
])
  countries.registerLocale(localeData);

const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const GENERATED_COPY = {
  en: {
    search: "Search country...",
    empty: "No country found.",
    invalid: "Please fix the errors in the form before submitting.",
  },
  fr: {
    search: "Rechercher un pays...",
    empty: "Aucun pays trouvé.",
    invalid: "Veuillez corriger les erreurs du formulaire avant de l’envoyer.",
  },
  ru: {
    search: "Найти страну...",
    empty: "Страна не найдена.",
    invalid: "Исправьте ошибки в форме перед отправкой.",
  },
  pt: {
    search: "Pesquisar país...",
    empty: "Nenhum país encontrado.",
    invalid: "Corrija os erros no formulário antes de enviar.",
  },
  es: {
    search: "Buscar país...",
    empty: "No se encontró ningún país.",
    invalid: "Corrige los errores del formulario antes de enviar.",
  },
  ar: {
    search: "البحث عن دولة...",
    empty: "لم يتم العثور على دولة.",
    invalid: "يُرجى تصحيح أخطاء النموذج قبل الإرسال.",
  },
};
const SEO = {
  en: [
    "POC Waitlist | Robusst AI Platform",
    "Join the Robusst proof-of-concept waitlist and be among the first to experience AI-powered telecom solutions tailored to your business.",
  ],
  fr: [
    "Liste d’attente POC | Plateforme d’IA Robusst",
    "Rejoignez la liste d’attente POC de Robusst et découvrez parmi les premiers des solutions télécoms basées sur l’IA adaptées à votre entreprise.",
  ],
  ru: [
    "Список ожидания POC | ИИ-платформа Robusst",
    "Присоединяйтесь к списку ожидания POC Robusst, чтобы первыми испытать ИИ-решения для телекома, адаптированные к задачам вашего бизнеса.",
  ],
  pt: [
    "Lista de espera POC | Plataforma de IA Robusst",
    "Entre na lista de espera POC da Robusst e seja um dos primeiros a experimentar soluções de telecomunicações com IA para sua empresa.",
  ],
  es: [
    "Lista de espera POC | Plataforma de IA Robusst",
    "Únete a la lista de espera POC de Robusst y sé de los primeros en probar soluciones de telecomunicaciones con IA adaptadas a tu empresa.",
  ],
  ar: [
    "قائمة انتظار POC | منصة Robusst للذكاء الاصطناعي",
    "انضم إلى قائمة انتظار إثبات المفهوم من Robusst لتكون من أوائل من يجرب حلول الاتصالات المدعومة بالذكاء الاصطناعي لأعمالك.",
  ],
};

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
async function activePoc(locale) {
  const url = new URL("/api/v1/content", process.env.CMS_BASE_URL);
  url.searchParams.set("schema", "pocwaitlist");
  url.searchParams.set("locale", locale);
  const response = await fetch(url, {
    headers: { "x-api-key": process.env.CMS_API_KEY },
  });
  if (!response.ok)
    throw new Error(
      `Active POC Waitlist request failed for ${locale}: ${response.status}`,
    );
  const body = await response.json();
  if (!body.data?.content?.poc_waitlist_page)
    throw new Error(`Active POC Waitlist content is empty for ${locale}`);
  return body.data.content.poc_waitlist_page;
}
function image(assetMap, publicPath, alt) {
  const mapped = Object.values(assetMap.assets).find((item) =>
    item.sourcePaths.includes(publicPath),
  );
  if (!mapped) throw new Error(`Missing mapped asset ${publicPath}`);
  return {
    _type: "contentImage",
    image: {
      _type: "image",
      asset: { _type: "reference", _ref: mapped.sanityAssetId },
    },
    alt,
  };
}
function cta(label) {
  return {
    _type: "callToAction",
    style: "primary",
    link: { _type: "contentLink", label, kind: "internal", href: "#poc-form" },
  };
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
  const [assetMap, generatedRussian] = await Promise.all([
    readFile(
      path.join(ROOT, `migration/sanity/asset-map.${options.dataset}.json`),
      "utf8",
    ).then(JSON.parse),
    readFile(
      path.join(ROOT, "migration/translations/poc-waitlist.ru.generated.json"),
      "utf8",
    ).then(JSON.parse),
  ]);
  const documents = [];
  for (const locale of LOCALES) {
    const active = await activePoc(locale);
    const poc = locale === "ru" ? generatedRussian.content : active;
    const { banner, form } = poc;
    documents.push({
      _id: `pocWaitlistPage-${locale}`,
      _type: "pocWaitlistPage",
      internalTitle: `POC Waitlist page — ${locale.toUpperCase()}`,
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
            ? "Canonical content migrated from the active production experience. Generic banner alt text was retained pending review."
            : locale === "ru"
              ? "The active Russian payload was Spanish. Complete Russian content, SEO, country taxonomy, and auxiliary form copy were generated; human review required."
              : "Migrated active translation plus generated SEO, localized country taxonomy, and auxiliary form copy; human review required.",
      },
      hero: {
        _type: "fixedSection",
        internalName: "hero",
        title: banner.heading,
        subtitle: banner.subtitle,
        image: image(assetMap, banner.image, banner.imageAlt || banner.heading),
        primaryCta: cta(banner.ctaText),
      },
      formIntro: {
        _type: "fixedSection",
        internalName: "formIntro",
        title: form.heading,
      },
      form: {
        _type: "formCopy",
        title: form.heading,
        nameLabel: form.fields.name.label,
        companyLabel: form.fields.companyName.label,
        emailLabel: form.fields.email.label,
        phoneLabel: form.fields.phone.label,
        countryLabel: form.fields.country.label,
        countryPlaceholder: form.fields.country.placeholder,
        countrySearchPlaceholder: GENERATED_COPY[locale].search,
        countryEmptyMessage: GENERATED_COPY[locale].empty,
        countryOptions: Object.entries(countries.getNames(locale))
          .sort(([, left], [, right]) => left.localeCompare(right, locale))
          .map(([code, label]) => ({
            _key: code.toLowerCase(),
            _type: "selectOption",
            value: code,
            label,
          })),
        messageLabel: form.fields.message.label,
        submitLabel: form.submit.button,
        submittingLabel: form.submit.submitting,
        successTitle: form.success.title,
        successMessage: form.success.message,
        errorTitle: form.error.title,
        errorMessage: form.error.message,
        formInvalidMessage: GENERATED_COPY[locale].invalid,
        messageWordLimitLabel: form.fields.message.wordLimit,
        nameRequiredMessage: form.validation.nameRequired,
        nameMinLengthMessage: form.validation.nameMinLength,
        emailRequiredMessage: form.validation.emailRequired,
        invalidEmailMessage: form.validation.emailInvalid,
        phoneRequiredMessage: form.validation.phoneRequired,
        invalidPhoneMessage: form.validation.phoneInvalid,
        countryRequiredMessage: form.validation.countryRequired,
        messageRequiredMessage: form.validation.messageRequired,
        messageMinWordsMessage: form.validation.messageMinWords,
        messageMaxWordsMessage: form.validation.messageMaxWords,
      },
    });
  }
  documents.push({
    _id: "translation.metadata.pocWaitlistPage",
    _type: "translation.metadata",
    schemaTypes: ["pocWaitlistPage"],
    translations: LOCALES.map((locale) => ({
      _key: locale,
      _type: "internationalizedArrayReferenceValue",
      language: locale,
      value: { _type: "reference", _ref: `pocWaitlistPage-${locale}` },
    })),
  });
  console.log(
    JSON.stringify(
      {
        mode: options.execute ? "execute" : "dry-run",
        dataset: options.dataset,
        pocWaitlistPages: 6,
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
  let transaction = client.transaction();
  for (const document of documents)
    transaction = transaction.createOrReplace(document);
  const result = await transaction.commit({ visibility: "sync" });
  console.log(`Committed ${result.documentIds.length} POC Waitlist documents.`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
