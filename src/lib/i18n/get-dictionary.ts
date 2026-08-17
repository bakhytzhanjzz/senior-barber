import { dictionaries } from "./dictionary";
import type { Locale } from "./config";

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
