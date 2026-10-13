import type { Metadata } from "next";

import { activeLocales, hreflangByLocale, localizedPath } from "@/config/i18n";
import { absoluteUrl, siteConfig } from "@/config/site";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  /** Use "article" for news items. */
  type?: "website" | "article";
  noIndex?: boolean;
}

/** hreflang alternates for every active locale, plus x-default. */
export function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of activeLocales) {
    languages[hreflangByLocale[locale]] = absoluteUrl(localizedPath(locale, path));
  }
  languages["x-default"] = absoluteUrl(path);
  return languages;
}

export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  noIndex = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type,
      url,
      title: `${title} | ${siteConfig.name}`,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.ogLocale,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
    },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}
