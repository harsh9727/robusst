import React from "react";
import { setRequestLocale } from "next-intl/server";
import { locales } from "~/i18n/config";
import { getCmsContent } from "~/lib/cms/client";
import type { Contact_JsonType } from "~/types/api/contact_json.types";
import ContactContent from "./ContactContent";

// ── ISR configuration ──────────────────────────────────────────────────────────
export const dynamic = "force-static";
export const revalidate = 300;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// ── Page ───────────────────────────────────────────────────────────────────────
const ContactPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setRequestLocale(locale);

  // This fetch IS inside a Server Component.
  // ISR cache, revalidateTag, and revalidatePath all work correctly here.
  // At BUILD TIME: throws loudly if CMS is unreachable (fast-fail deploy).
  // At RUNTIME:    returns null on failure; ContactContent falls back to useTranslations.
  const cmsContact = await getCmsContent<Contact_JsonType>("contact", locale);

  return <ContactContent data={cmsContact?.contact_page} />;
};

export default ContactPage;
