/**
 * Internationalisation settings.
 *
 * Portuguese (pt-PT) is served at the root without a prefix. English and
 * Spanish are planned: content lives in `src/content/<locale>/`, and once a
 * locale is activated, its routes are served under `/<locale>/…` and the
 * hreflang alternates below are emitted automatically.
 */

export const defaultLocale = "pt" as const;

export const activeLocales = ["pt"] as const;
export const plannedLocales = ["en", "es"] as const;

export type ActiveLocale = (typeof activeLocales)[number];
export type Locale = ActiveLocale | (typeof plannedLocales)[number];

export const hreflangByLocale: Record<Locale, string> = {
  pt: "pt-PT",
  en: "en",
  es: "es",
};

export function localizedPath(locale: Locale, path: string): string {
  if (locale === defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}
