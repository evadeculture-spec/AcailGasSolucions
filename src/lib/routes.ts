import type { IndustrySlug, ProductCategorySlug } from "@/types/content";

/** Single source of truth for internal URLs. */
export const routes = {
  home: "/",
  company: "/empresa",
  history: "/empresa#historia",
  quality: "/qualidade",
  products: "/produtos",
  product: (slug: ProductCategorySlug) => `/produtos/${slug}`,
  industries: "/industrias",
  industry: (slug: IndustrySlug) => `/industrias/${slug}`,
  services: "/servicos",
  acailVision: "/servicos#acail-vision",
  health: "/saude",
  distributors: "/distribuidores",
  news: "/noticias",
  newsArticle: (slug: string) => `/noticias/${slug}`,
  contact: "/contactos",
  privacy: "/privacidade",
  cookies: "/cookies",
  terms: "/termos",
} as const;

export type ContactSubject =
  "proposta" | "informacao-tecnica" | "fds" | "distribuicao" | "saude" | "outro";

/** Contact page link with a pre-selected subject and, optionally, a product category. */
export function contactHref(subject: ContactSubject, product?: ProductCategorySlug): string {
  const params = new URLSearchParams({ assunto: subject });
  if (product) params.set("produto", product);
  return `${routes.contact}?${params.toString()}#formulario`;
}
