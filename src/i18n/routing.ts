import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["pt", "en"],

  // Used when no locale matches
  defaultLocale: "pt",

  // pt has no prefix, en gets /en prefix
  localePrefix: "as-needed",
});
