/**
 * Verified corporate data. Every value here is published on the website and
 * must trace back to docs/CONTENT_SOURCES.md. Do not add unverified data.
 */

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.acailgas.pt";

export const siteConfig = {
  name: "Acail Gás",
  legalName: "Acail Gás, S.A.",
  url: rawSiteUrl.replace(/\/+$/, ""),
  locale: "pt-PT",
  ogLocale: "pt_PT",
  tagline: "Produção e comercialização de gases industriais, medicinais e alimentares",
  description:
    "A Acail Gás produz, comercializa e distribui gases industriais, medicinais, alimentares e especiais, gelo seco e soluções de fornecimento para a indústria e a saúde.",
  foundingYear: 1996,
  contact: {
    address: {
      street: "Rua da Gesteira de Cima, n.º 134 e n.º 280",
      postalCode: "4520-717",
      locality: "Souto SMF",
      municipality: "Santa Maria da Feira",
      country: "Portugal",
      countryCode: "PT",
    },
    phones: [
      { display: "+351 256 800 050", href: "tel:+351256800050" },
      { display: "+351 256 800 052", href: "tel:+351256800052" },
      { display: "+351 256 800 054", href: "tel:+351256800054" },
    ],
    phoneNotice: "Chamada para a rede fixa nacional",
    fax: "+351 256 800 069",
    email: "geral@acailgrupo.pt",
  },
  links: {
    medicare: "https://www.acailmedicare.pt",
    complaintsBook: "https://www.livroreclamacoes.pt",
    consumerDisputes: "https://www.consumidor.gov.pt",
    publicSafetyInfo: "https://www.acailgas.pt/files/info/2025.03.27_infopublico.pdf",
    mapSearch:
      "https://www.openstreetmap.org/search?query=Rua%20da%20Gesteira%20de%20Cima%2C%20Souto%2C%20Santa%20Maria%20da%20Feira",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? siteConfig.url : `${siteConfig.url}${normalized}`;
}

export function formatAddressLines(): string[] {
  const { street, postalCode, locality, country } = siteConfig.contact.address;
  return [street, `${postalCode} ${locality}`, country];
}
