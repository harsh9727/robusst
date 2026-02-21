export const locales = ["en", "fr", "ru", "pt", "es", "ar"] as const;
export const defaultLocale = "en" as const;

// import {} from "flag-icons";

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  ru: "Russian",
  pt: "Portugues",
  es: "Spanish",
  ar: "Arabic",
};

export const localeLabels: Record<
  Locale,
  { name: string; flag: string; country: string }
> = {
  en: { name: "English", flag: "/flags/uk.webp", country: "United Kingdom" },
  fr: { name: "Français", flag: "/flags/france.webp", country: "France" },
  ru: { name: "Русский", flag: "/flags/russia.webp", country: "Russia" },
  pt: { name: "Português", flag: "/flags/portugal.webp", country: "Portugal" },
  es: { name: "Español", flag: "/flags/spain.webp", country: "Spain" },
  ar: {
    name: "العربية",
    flag: "/flags/saudi_arabia.webp",
    country: "Saudi Arabia",
  },
};
