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
  en: { name: "English", flag: "/flags/uk.png", country: "United Kingdom" },
  fr: { name: "Français", flag: "/flags/france.png", country: "France" },
  ru: { name: "Русский", flag: "/flags/russia.png", country: "Russia" },
  pt: { name: "Português", flag: "/flags/portugal.png", country: "Portugal" },
  es: { name: "Español", flag: "/flags/spain.png", country: "Spain" },
  ar: { name: "العربية", flag: "/flags/saudi_arabia.png", country: "Saudi Arabia" },
};
