import React from "react";
import { setRequestLocale } from "next-intl/server";
import { locales } from "~/i18n/config";
import { getContactPage } from "~/sanity/queries/contactPage";
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

  const contactPage = await getContactPage(locale);
  if (!contactPage) {
    throw new Error(`Missing published Sanity Contact page for ${locale}`);
  }

  return <ContactContent data={contactPage} />;
};

export default ContactPage;
