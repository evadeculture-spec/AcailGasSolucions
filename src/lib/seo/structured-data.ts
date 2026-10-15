import { absoluteUrl, primaryPhone, siteConfig } from "@/config/site";

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
    email: contact.email,
    telephone: primaryPhone.display.replace(/\s/g, ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${contact.address.street}, ${contact.address.detail}`,
      addressLocality: contact.address.locality,
      addressCountry: contact.address.countryCode,
    },
    location: {
      "@type": "Place",
      name: contact.address.name,
      geo: {
        "@type": "GeoCoordinates",
        latitude: contact.address.latitude,
        longitude: contact.address.longitude,
      },
    },
    contactPoint: contact.departments.map((department) => ({
      "@type": "ContactPoint",
      name: department.name,
      email: department.email,
      telephone: department.phones[0]?.display.replace(/\s/g, ""),
      contactType: "sales",
      areaServed: "AO",
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
