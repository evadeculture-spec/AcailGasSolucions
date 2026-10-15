/**
 * Verified corporate data (Acail Angola — gas division). Every value here is
 * published on the website and must trace back to docs/CONTENT_SOURCES.md.
 * Do not add unverified data.
 */

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://acailgassolucions.vercel.app";

export interface ContactDepartment {
  id: "gas" | "medicinal" | "soldadura";
  name: string;
  description: string;
  email: string;
  phones: Array<{ display: string; href: string }>;
}

function phone(display: string) {
  return { display, href: `tel:${display.replace(/\s/g, "")}` };
}

export const siteConfig = {
  name: "Acail Gás Solucions",
  legalName: "Acail Angola, S.A.",
  url: rawSiteUrl.replace(/\/+$/, ""),
  locale: "pt-AO",
  ogLocale: "pt_AO",
  tagline: "Gases industriais, alimentares e medicinais produzidos em Angola",
  description:
    "Acail Gás Solucions: fábrica de gases industriais, alimentares e medicinais no Pólo Industrial de Viana, em Luanda. Gases para soldadura e corte, gás medicinal, gás ambiente, propano e redes de gases.",
  foundingYear: 2005,
  contact: {
    address: {
      name: "Fábrica de Gases Industriais, Alimentares e Medicinais",
      street: "PIV – Pólo Industrial de Viana",
      detail: "Estrada Nacional Luanda–Catete, km 23",
      locality: "Viana, Luanda",
      country: "Angola",
      countryCode: "AO",
      gps: "8°55'54.92\"S 13°24'51.03\"E",
      latitude: -8.931922,
      longitude: 13.414175,
    },
    email: "gas@acailangola.com",
    departments: [
      {
        id: "gas",
        name: "Gás industrial e alimentar",
        description:
          "Encomendas, propostas e informação sobre gases industriais, alimentares, ambiente e propano.",
        email: "gas@acailangola.com",
        phones: [phone("+244 946 423 679"), phone("+244 948 190 748"), phone("+244 942 568 607")],
      },
      {
        id: "medicinal",
        name: "Gás medicinal",
        description: "Gases medicinais e redes de gases medicinais para hospitais e clínicas.",
        email: "medicinal@acailangola.com",
        phones: [phone("+244 923 986 120"), phone("+244 922 327 152"), phone("+244 921 915 666")],
      },
      {
        id: "soldadura",
        name: "Soldadura e corte",
        description: "Gases e misturas para soldadura e corte, acetileno e material de soldadura.",
        email: "soldadura@acailangola.com",
        phones: [phone("+244 941 836 757"), phone("+244 948 190 748")],
      },
    ] satisfies ContactDepartment[],
  },
  links: {
    certificateIso22000:
      "https://www.acailangola.com/files/latest/ACAIL-ANGOLA_22000_UKAS_EN_2024.pdf",
    corporateSite: "https://www.acailangola.com",
    mapSearch:
      "https://www.openstreetmap.org/?mlat=-8.931922&mlon=13.414175#map=15/-8.931922/13.414175",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Main gas line, used in calls to action. */
export const primaryPhone = siteConfig.contact.departments[0].phones[0];

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? siteConfig.url : `${siteConfig.url}${normalized}`;
}

export function formatAddressLines(): string[] {
  const { street, detail, locality, country } = siteConfig.contact.address;
  return [street, detail, `${locality}, ${country}`];
}
