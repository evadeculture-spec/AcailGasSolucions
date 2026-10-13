import type { MetadataRoute } from "next";

import { industriesWithDetail } from "@/content/pt/industries";
import { newsArticles } from "@/content/pt/news";
import { productCategories } from "@/content/pt/products";
import { routes } from "@/lib/routes";

export type SitemapEntry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

/** Every indexable public path. Also used by tests to verify internal links. */
export function sitemapPaths(): SitemapEntry[] {
  return [
    { path: routes.home, priority: 1, changeFrequency: "monthly" },
    { path: routes.products, priority: 0.9, changeFrequency: "monthly" },
    ...productCategories.map((category) => ({
      path: routes.product(category.slug),
      priority: 0.9,
      changeFrequency: "monthly" as const,
    })),
    { path: routes.industries, priority: 0.8, changeFrequency: "monthly" },
    ...industriesWithDetail.map((industry) => ({
      path: routes.industry(industry.slug),
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
    { path: routes.services, priority: 0.8, changeFrequency: "monthly" },
    { path: routes.health, priority: 0.8, changeFrequency: "monthly" },
    { path: routes.company, priority: 0.7, changeFrequency: "yearly" },
    { path: routes.quality, priority: 0.7, changeFrequency: "yearly" },
    { path: routes.distributors, priority: 0.6, changeFrequency: "monthly" },
    { path: routes.news, priority: 0.6, changeFrequency: "weekly" },
    ...newsArticles.map((article) => ({
      path: routes.newsArticle(article.slug),
      priority: 0.5,
      changeFrequency: "yearly" as const,
    })),
    { path: routes.contact, priority: 0.8, changeFrequency: "yearly" },
    { path: routes.privacy, priority: 0.2, changeFrequency: "yearly" },
    { path: routes.cookies, priority: 0.2, changeFrequency: "yearly" },
    { path: routes.terms, priority: 0.2, changeFrequency: "yearly" },
  ];
}
