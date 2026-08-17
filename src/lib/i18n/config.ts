export const locales = ["ru", "kk"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ru";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Unbounded (the display font) is missing several Kazakh-only letters
 * (ә ғ қ ң ө ұ һ і), so the browser substitutes a mismatched system font
 * per glyph. Use the body font (full Kazakh coverage) for kk headings instead.
 */
export function headingFont(locale: Locale): "font-display" | "font-body" {
  return locale === "kk" ? "font-body" : "font-display";
}
