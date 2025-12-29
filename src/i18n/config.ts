export const locales = ["en", "fr", "ru", "pt", "es"] as const;
export const defaultLocale = "en" as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  ru: "Russian",
  pt: "Portugues",
  es: "Spanish",
};

// Locale labels with native names
export const localeLabels: Record<Locale, { name: string; flag: string }> = {
  en: { name: "English", flag: "🇬🇧" },
  fr: { name: "Français", flag: "🇫🇷" },
  ru: { name: "Русский", flag: "🇷🇺" },
  pt: { name: "Português", flag: "🇵🇹" },
  es: { name: "Español", flag: "🇪🇸" },
};
