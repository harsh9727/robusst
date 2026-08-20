#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";

const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const COPY = {
  en: {
    become: "Become a Partner",
    submitting: "Submitting…",
    sales: "Sales",
    tech: "Technology",
    select: "Select partner type",
    nameRequired: "Name is required.",
    nameMin: "Name must be at least 2 characters.",
    emailRequired: "Email is required.",
    emailInvalid: "Please enter a valid email address.",
    typeRequired: "Please select a partner type.",
    invalid: "Please fix the errors in the form before submitting.",
    success:
      "Your partner request has been submitted! We will get back to you soon.",
    failed: "Failed to submit form. Please try again later.",
    unexpected: "An unexpected error occurred. Please try again later.",
  },
  fr: {
    become: "Devenir partenaire",
    submitting: "Envoi…",
    sales: "Commercial",
    tech: "Technologie",
    select: "Sélectionnez le type de partenaire",
    nameRequired: "Le nom est obligatoire.",
    nameMin: "Le nom doit comporter au moins 2 caractères.",
    emailRequired: "L’adresse e-mail est obligatoire.",
    emailInvalid: "Veuillez saisir une adresse e-mail valide.",
    typeRequired: "Veuillez sélectionner un type de partenaire.",
    invalid: "Veuillez corriger les erreurs du formulaire avant de l’envoyer.",
    success:
      "Votre demande de partenariat a été envoyée. Nous vous répondrons bientôt.",
    failed: "Échec de l’envoi du formulaire. Veuillez réessayer plus tard.",
    unexpected:
      "Une erreur inattendue s’est produite. Veuillez réessayer plus tard.",
  },
  ru: {
    become: "Стать партнёром",
    submitting: "Отправка…",
    sales: "Продажи",
    tech: "Технологии",
    select: "Выберите тип партнёрства",
    nameRequired: "Укажите имя.",
    nameMin: "Имя должно содержать не менее 2 символов.",
    emailRequired: "Укажите адрес электронной почты.",
    emailInvalid: "Введите корректный адрес электронной почты.",
    typeRequired: "Выберите тип партнёрства.",
    invalid: "Исправьте ошибки в форме перед отправкой.",
    success: "Ваша заявка на партнёрство отправлена. Мы скоро свяжемся с вами.",
    failed: "Не удалось отправить форму. Повторите попытку позже.",
    unexpected: "Произошла непредвиденная ошибка. Повторите попытку позже.",
  },
  pt: {
    become: "Torne-se parceiro",
    submitting: "Enviando…",
    sales: "Vendas",
    tech: "Tecnologia",
    select: "Selecione o tipo de parceiro",
    nameRequired: "O nome é obrigatório.",
    nameMin: "O nome deve ter pelo menos 2 caracteres.",
    emailRequired: "O e-mail é obrigatório.",
    emailInvalid: "Digite um endereço de e-mail válido.",
    typeRequired: "Selecione um tipo de parceiro.",
    invalid: "Corrija os erros no formulário antes de enviar.",
    success:
      "Sua solicitação de parceria foi enviada. Entraremos em contato em breve.",
    failed: "Não foi possível enviar o formulário. Tente novamente mais tarde.",
    unexpected: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
  },
  es: {
    become: "Hazte socio",
    submitting: "Enviando…",
    sales: "Ventas",
    tech: "Tecnología",
    select: "Selecciona el tipo de socio",
    nameRequired: "El nombre es obligatorio.",
    nameMin: "El nombre debe tener al menos 2 caracteres.",
    emailRequired: "El correo electrónico es obligatorio.",
    emailInvalid: "Introduce una dirección de correo válida.",
    typeRequired: "Selecciona un tipo de socio.",
    invalid: "Corrige los errores del formulario antes de enviarlo.",
    success:
      "Tu solicitud de asociación ha sido enviada. Nos pondremos en contacto contigo pronto.",
    failed: "No se pudo enviar el formulario. Inténtalo de nuevo más tarde.",
    unexpected: "Se produjo un error inesperado. Inténtalo de nuevo más tarde.",
  },
  ar: {
    become: "كن شريكًا",
    submitting: "جارٍ الإرسال…",
    sales: "المبيعات",
    tech: "التكنولوجيا",
    select: "اختر نوع الشريك",
    nameRequired: "الاسم مطلوب.",
    nameMin: "يجب ألا يقل الاسم عن حرفين.",
    emailRequired: "البريد الإلكتروني مطلوب.",
    emailInvalid: "أدخل عنوان بريد إلكتروني صالحًا.",
    typeRequired: "يُرجى اختيار نوع الشريك.",
    invalid: "يُرجى تصحيح أخطاء النموذج قبل الإرسال.",
    success: "تم إرسال طلب الشراكة. سنتواصل معك قريبًا.",
    failed: "تعذر إرسال النموذج. يُرجى المحاولة مرة أخرى لاحقًا.",
    unexpected: "حدث خطأ غير متوقع. يُرجى المحاولة مرة أخرى لاحقًا.",
  },
};
const SEO = {
  en: [
    "Partner With Robusst | Global Alliance Program",
    "Join Robusst’s global partner ecosystem and co-deliver AI solutions for telecom and banking across Africa, the Middle East, Asia, Europe, and beyond.",
  ],
  fr: [
    "Devenez partenaire de Robusst | Programme d’alliance mondial",
    "Rejoignez l’écosystème mondial de partenaires Robusst et déployez ensemble des solutions d’IA pour les télécoms et la banque sur plusieurs continents.",
  ],
  ru: [
    "Партнёрство с Robusst | Глобальная партнёрская программа",
    "Присоединяйтесь к глобальной экосистеме Robusst и совместно внедряйте ИИ-решения для телекоммуникаций и банков в разных регионах мира.",
  ],
  pt: [
    "Seja parceiro da Robusst | Programa global de alianças",
    "Participe do ecossistema global de parceiros da Robusst e entregue conosco soluções de IA para telecomunicações e bancos em diversos mercados.",
  ],
  es: [
    "Asóciate con Robusst | Programa global de alianzas",
    "Únete al ecosistema global de socios de Robusst y ofrece con nosotros soluciones de IA para telecomunicaciones y banca en mercados de todo el mundo.",
  ],
  ar: [
    "كن شريكًا لـ Robusst | برنامج التحالف العالمي",
    "انضم إلى منظومة شركاء Robusst العالمية وشاركنا تقديم حلول الذكاء الاصطناعي لقطاعي الاتصالات والخدمات المصرفية في أسواق متعددة.",
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

async function activePartnership(locale) {
  const url = new URL("/api/v1/content", process.env.CMS_BASE_URL);
  url.searchParams.set("schema", "partnership");
  url.searchParams.set("locale", locale);
  const response = await fetch(url, {
    headers: { "x-api-key": process.env.CMS_API_KEY },
  });
  if (!response.ok)
    throw new Error(
      `Active Partnership request failed for ${locale}: ${response.status}`,
    );
  const body = await response.json();
  if (!body.data?.content?.partnership)
    throw new Error(`Active Partnership content is empty for ${locale}`);
  return body.data.content.partnership;
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
function cta(label, href, style = "primary") {
  return {
    _type: "callToAction",
    style,
    link: {
      _type: "contentLink",
      label,
      kind: "internal",
      href,
      openInNewTab: false,
    },
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
  const assetMap = JSON.parse(
    await readFile(
      path.join(ROOT, `migration/sanity/asset-map.${options.dataset}.json`),
      "utf8",
    ),
  );
  const documents = [];
  for (const locale of LOCALES) {
    const partnership = await activePartnership(locale);
    const generated = COPY[locale];
    documents.push({
      _id: `partnershipPage-${locale}`,
      _type: "partnershipPage",
      internalTitle: `Partnership page — ${locale.toUpperCase()}`,
      seo: {
        _type: "seo",
        metaTitle: SEO[locale][0],
        metaDescription: SEO[locale][1],
        noIndex: false,
      },
      language: locale,
      translation: {
        _type: "translationWorkflow",
        status: locale === "en" ? "source" : "generated",
        sourceLanguage: "en",
        reviewNotes:
          locale === "en"
            ? "Canonical content migrated from the active production experience; placeholder banner copy was excluded."
            : "Migrated from active production content with generated form completion; human language review required.",
      },
      banner: {
        _type: "fixedSection",
        internalName: "banner",
        title: partnership.banner.heading,
        image: image(
          assetMap,
          "/partnership/banner.webp",
          partnership.banner.heading,
        ),
        primaryCta: cta(generated.become, "#partner"),
      },
      partnerProgram: {
        _type: "fixedSection",
        internalName: "partnerProgram",
        title: partnership.partner.heading,
        items: partnership.partner.cards.map((card, index) => ({
          _key: stableKey(`${locale}.partner.${index}`),
          _type: "contentCard",
          internalName: index === 0 ? "technology-partner" : "sales-partner",
          title: card.title,
          description: card.description,
          cta: cta(card.buttonText, "#partner-form", "text"),
        })),
      },
      formIntro: {
        _type: "fixedSection",
        internalName: "formIntro",
        title: partnership.formSection.heading,
        description: partnership.formSection.subtitle,
      },
      form: {
        _type: "formCopy",
        title: partnership.formSection.heading,
        description: partnership.formSection.subtitle,
        nameLabel: partnership.formSection.form.nameLabel,
        jobTitleLabel: partnership.formSection.form.jobTitleLabel,
        emailLabel: partnership.formSection.form.emailLabel,
        phoneLabel: partnership.formSection.form.phoneLabel,
        companyLabel: partnership.formSection.form.companyNameLabel,
        websiteLabel: partnership.formSection.form.websiteLabel,
        partnerTypeLabel: partnership.formSection.form.partnerTypeLabel,
        partnerTypePlaceholder: generated.select,
        partnerTypeOptions: [
          {
            _key: "sales",
            _type: "selectOption",
            value: "sales",
            label: generated.sales,
          },
          {
            _key: "tech",
            _type: "selectOption",
            value: "tech",
            label: generated.tech,
          },
        ],
        privacyText: partnership.formSection.form.privacyText,
        submitLabel: partnership.formSection.form.submitButton,
        submittingLabel: generated.submitting,
        successMessage: generated.success,
        errorMessage: generated.failed,
        submissionFailedMessage: generated.failed,
        unexpectedErrorMessage: generated.unexpected,
        formInvalidMessage: generated.invalid,
        nameRequiredMessage: generated.nameRequired,
        nameMinLengthMessage: generated.nameMin,
        emailRequiredMessage: generated.emailRequired,
        invalidEmailMessage: generated.emailInvalid,
        partnerTypeRequiredMessage: generated.typeRequired,
      },
    });
  }
  documents.push({
    _id: "translation.metadata.partnershipPage",
    _type: "translation.metadata",
    schemaTypes: ["partnershipPage"],
    translations: LOCALES.map((locale) => ({
      _key: locale,
      _type: "internationalizedArrayReferenceValue",
      language: locale,
      value: { _type: "reference", _ref: `partnershipPage-${locale}` },
    })),
  });
  console.log(
    JSON.stringify(
      {
        mode: options.execute ? "execute" : "dry-run",
        dataset: options.dataset,
        partnershipPages: 6,
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
  console.log(`Committed ${result.documentIds.length} Partnership documents.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
