export const sanityLanguages = [
  { id: "en", title: "English" },
  { id: "fr", title: "French" },
  { id: "ru", title: "Russian" },
  { id: "pt", title: "Portuguese" },
  { id: "es", title: "Spanish" },
  { id: "ar", title: "Arabic" },
] as const;

export const sanityLanguageIds = sanityLanguages.map(({ id }) => id);
