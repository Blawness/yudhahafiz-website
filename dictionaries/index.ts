import type { Dictionary } from "./id";

export type { Dictionary };
export type Locale = "id" | "en";

export const locales: Locale[] = ["id", "en"];
export const defaultLocale: Locale = "id";

const dictionaries = {
  id: () => import("./id").then((m) => m.default),
  en: () => import("./en").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]?.() ?? dictionaries[defaultLocale]();
}
