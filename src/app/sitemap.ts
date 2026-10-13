import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/config/site";
import { languageAlternates } from "@/lib/seo/metadata";
import { sitemapPaths } from "@/lib/seo/sitemap-paths";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapPaths().map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    priority,
    changeFrequency,
    alternates: { languages: languageAlternates(path) },
  }));
}
