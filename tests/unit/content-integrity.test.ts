import { describe, expect, it } from "vitest";

import { certifications, verifiedCertifications } from "@/content/pt/company";
import { industries, industriesWithDetail } from "@/content/pt/industries";
import { footerNavigation, legalNavigation, primaryNavigation } from "@/content/pt/navigation";
import { newsArticles } from "@/content/pt/news";
import { productCategories } from "@/content/pt/products";
import { substances } from "@/data/substances";
import { sitemapPaths } from "@/lib/seo/sitemap-paths";

const knownPaths = new Set(sitemapPaths().map((entry) => entry.path));

describe("content integrity", () => {
  it("has exactly the six product categories from the official site", () => {
    expect(productCategories.map((category) => category.name)).toEqual([
      "Gases Industriais",
      "Gases Alimentares",
      "Gases Medicinais",
      "Gases Especiais",
      "Gases Dispositivo Médico",
      "Gelo Seco",
    ]);
  });

  it("uses unique slugs", () => {
    for (const list of [productCategories, industries, newsArticles]) {
      const slugs = list.map((item) => item.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });

  it("references only existing industries and substances", () => {
    const industrySlugs = new Set(industries.map((industry) => industry.slug));
    for (const category of productCategories) {
      for (const slug of category.industries) expect(industrySlugs.has(slug)).toBe(true);
      for (const item of category.items)
        if (item.substance) expect(substances[item.substance]).toBeDefined();
    }
  });

  it("gives every detailed industry at least two applications and a related category", () => {
    for (const industry of industriesWithDetail) {
      expect(industry.detail.applications.length).toBeGreaterThanOrEqual(2);
      expect(industry.detail.categories.length).toBeGreaterThan(0);
    }
  });

  it("keeps SEO titles and descriptions within recommended lengths", () => {
    const seo = [
      ...productCategories.map((item) => item.seo),
      ...industriesWithDetail.map((item) => item.detail.seo),
      ...newsArticles.map((item) => item.seo),
    ];
    for (const entry of seo) {
      expect(entry.title.length).toBeLessThanOrEqual(60);
      expect(entry.description.length).toBeGreaterThanOrEqual(50);
      expect(entry.description.length).toBeLessThanOrEqual(170);
    }
  });

  it("never publishes unverified certifications", () => {
    expect(verifiedCertifications.every((item) => item.verified)).toBe(true);
    expect(verifiedCertifications.length).toBeLessThanOrEqual(certifications.length);
  });

  it("only links navigation to pages that exist", () => {
    const hrefs = [
      ...primaryNavigation.flatMap((group) => [
        group.href,
        ...(group.children ?? []).map((child) => child.href),
      ]),
      ...footerNavigation.flatMap((column) => column.items.map((item) => item.href)),
      ...legalNavigation.map((item) => item.href),
    ];
    for (const href of hrefs) {
      const path = href.split("#")[0] ?? href;
      expect(knownPaths.has(path), href).toBe(true);
    }
  });
});
