export const locales = ["en", "nb"] as const;
export type Locale = (typeof locales)[number];

export const languages = {
  en: "English",
  nb: "Norsk",
} as const;

export const defaultLocale: Locale = "nb";
