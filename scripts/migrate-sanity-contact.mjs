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
]) {
  countries.registerLocale(localeData);
}

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
    invalid: "Corrige los errores del formulario antes de enviarlo.",
  },
  ar: {
    search: "البحث عن دولة...",
    empty: "لم يتم العثور على دولة.",
    invalid: "يُرجى تصحيح أخطاء النموذج قبل الإرسال.",
  },
};
const LOCALIZED_DESCRIPTIONS = {
  en: "Contact Robusst to discuss AI-powered telecom solutions, partnerships, product questions, or a tailored consultation with our team.",
  fr: "Contactez Robusst pour discuter de solutions d’IA pour les télécoms, de partenariats, de produits ou d’une consultation personnalisée.",
  ru: "Свяжитесь с Robusst, чтобы обсудить ИИ-решения для телекоммуникаций, партнерство, продукты или индивидуальную консультацию.",
  pt: "Fale com a Robusst sobre soluções de IA para telecomunicações, parcerias, produtos ou uma consultoria personalizada com nossa equipe.",
  es: "Contacta con Robusst para hablar sobre soluciones de IA para telecomunicaciones, alianzas, productos o una consulta personalizada.",
  ar: "تواصل مع Robusst لمناقشة حلول الذكاء الاصطناعي للاتصالات أو الشراكات أو المنتجات أو الحصول على استشارة مخصصة.",
};
const LOCALIZED_TITLES = {
  en: "Contact Robusst | Telecom AI Solutions",
  fr: "Contacter Robusst | Solutions d’IA pour les télécoms",
  ru: "Связаться с Robusst | ИИ-решения для телекоммуникаций",
  pt: "Fale com a Robusst | Soluções de IA para telecomunicações",
  es: "Contacta con Robusst | Soluciones de IA para telecomunicaciones",
  ar: "تواصل مع Robusst | حلول الذكاء الاصطناعي للاتصالات",
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

async function activeContact(locale) {
  const url = new URL("/api/v1/content", process.env.CMS_BASE_URL);
  url.searchParams.set("schema", "contact");
  url.searchParams.set("locale", locale);
  const response = await fetch(url, {
    headers: { "x-api-key": process.env.CMS_API_KEY },
  });
  if (!response.ok)
    throw new Error(
      `Active Contact request failed for ${locale}: ${response.status}`,
    );
  const body = await response.json();
  if (!body.data?.content?.contact_page)
    throw new Error(`Active Contact content is empty for ${locale}`);
  return body.data.content.contact_page;
}

function image(assetMap, publicPath, alt) {
  const asset = Object.values(assetMap.assets).find((item) =>
    item.sourcePaths.includes(publicPath),
  );
  if (!asset) throw new Error(`Missing mapped asset ${publicPath}`);
  return {
    _type: "contentImage",
    image: {
      _type: "image",
      asset: { _type: "reference", _ref: asset.sanityAssetId },
    },
    alt,
  };
}
function metadataFor(locale) {
  return {
    title: LOCALIZED_TITLES[locale],
    description: LOCALIZED_DESCRIPTIONS[locale],
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
  const [assetMap, generatedTranslations] = await Promise.all([
    readFile(
      path.join(ROOT, `migration/sanity/asset-map.${options.dataset}.json`),
      "utf8",
    ).then(JSON.parse),
    readFile(
      path.join(ROOT, "migration/translations/contact.generated.json"),
      "utf8",
    ).then(JSON.parse),
  ]);
  const documents = [];
  for (const locale of LOCALES) {
    const active = await activeContact(locale);
    const contact = generatedTranslations[locale] ?? active;
    const { form, banner } = contact;
    const meta = metadataFor(locale);
    documents.push({
      _id: `contactPage-${locale}`,
      _type: "contactPage",
      internalTitle: `Contact page — ${locale.toUpperCase()}`,
      seo: {
        _type: "seo",
        metaTitle: meta.title,
        metaDescription: meta.description,
        noIndex: false,
      },
      language: locale,
      translation: {
        _type: "translationWorkflow",
        status: locale === "en" ? "source" : "generated",
        sourceLanguage: "en",
        reviewNotes:
          locale === "en"
            ? "Canonical content migrated from the active production experience."
            : "Migrated from active production content; generated UI completion requires human review.",
      },
      hero: {
        _type: "fixedSection",
        internalName: "hero",
        title: banner.heading,
        subtitle: banner.subtitle,
        image: image(assetMap, banner.image, banner.imageAlt || banner.heading),
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
    _id: "translation.metadata.contactPage",
    _type: "translation.metadata",
    schemaTypes: ["contactPage"],
    translations: LOCALES.map((locale) => ({
      _key: locale,
      _type: "internationalizedArrayReferenceValue",
      language: locale,
      value: { _type: "reference", _ref: `contactPage-${locale}` },
    })),
  });
  console.log(
    JSON.stringify(
      {
        mode: options.execute ? "execute" : "dry-run",
        dataset: options.dataset,
        contactPages: 6,
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
  console.log(`Committed ${result.documentIds.length} Contact documents.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
