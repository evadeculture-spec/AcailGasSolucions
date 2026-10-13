import { absoluteUrl, siteConfig } from "@/config/site";

/**
 * Schema.org builders. Only verified data is used: no ratings, offers,
 * prices, employee counts or other unconfirmed commercial information.
 */

export interface BreadcrumbEntry {
  name: string;
  path: string;
}

export function organizationSchema() {
  const { contact } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
    foundingDate: String(siteConfig.foundingYear),
    email: contact.email,
    telephone: contact.phones[0].display.replace(/\s/g, ""),
    faxNumber: contact.fax.replace(/\s/g, ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      postalCode: contact.address.postalCode,
      addressLocality: contact.address.locality,
      addressRegion: contact.address.municipality,
      addressCountry: contact.address.countryCode,
    },
    contactPoint: contact.phones.map((phone) => ({
      "@type": "ContactPoint",
      telephone: phone.display.replace(/\s/g, ""),
      contactType: "customer service",
      areaServed: ["PT", "ES"],
      availableLanguage: ["pt"],
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: siteConfig.locale,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function breadcrumbSchema(entries: BreadcrumbEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: absoluteUrl(entry.path),
    })),
  };
}

export function itemListSchema(name: string, items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}
