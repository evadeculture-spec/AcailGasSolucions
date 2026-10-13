/**
 * Content model. Content files in `src/content/<locale>/` implement these
 * types, so a future CMS only needs to return the same shapes.
 */

export type SubstanceId =
  | "acetylene"
  | "argon"
  | "carbon-dioxide"
  | "helium"
  | "hydrogen"
  | "medical-air"
  | "nitrogen"
  | "nitrous-oxide"
  | "oxygen"
  | "sulfur-dioxide";

export type ProductCategorySlug =
  | "gases-industriais"
  | "gases-alimentares"
  | "gases-medicinais"
  | "gases-especiais"
  | "gases-dispositivo-medico"
  | "gelo-seco";

export type IndustrySlug =
  | "agricultura-pecuaria-pescas"
  | "alimentar"
  | "ambiente"
  | "construcao"
  | "eletronica-telecomunicacoes"
  | "farmaceutica"
  | "laboratorios"
  | "lazer"
  | "metalomecanica"
  | "metalurgia"
  | "quimica"
  | "reciclagem"
  | "soldadura"
  | "transportes"
  | "vidro";

export type SupplyModeId = "cylinders" | "bulk" | "on-site" | "equipment" | "telemetry";

export interface SeoFields {
  title: string;
  description: string;
}

export interface TitledText {
  title: string;
  body: string;
}

/** A gas or product offered within a category. */
export interface ProductItem {
  name: string;
  /** Links to universal reference data (formula, CAS, cylinder colour). */
  substance?: SubstanceId;
  /** Physical state or grade, e.g. "Líquido criogénico". */
  variant?: string;
  description?: string;
  /** Regulatory note shown prominently, e.g. prescription-only medicine. */
  notice?: string;
  /** False for products not supplied in cylinders (cryogenic liquids, dry ice): hides the EN 1089-3 colour. */
  cylinder?: boolean;
}

export interface ProductCategory {
  slug: ProductCategorySlug;
  index: string;
  name: string;
  summary: string;
  intro: string[];
  items: ProductItem[];
  mixtures?: {
    title: string;
    description: string;
    names: string[];
  };
  applications: TitledText[];
  regulatory?: string[];
  supplyModes: SupplyModeId[];
  industries: IndustrySlug[];
  onRequestNote: string;
  seo: SeoFields;
}

export interface Industry {
  slug: IndustrySlug;
  name: string;
  /** Present only when verified, substantive content justifies a dedicated page. */
  detail?: {
    summary: string;
    intro: string;
    applications: TitledText[];
    substances: SubstanceId[];
    categories: ProductCategorySlug[];
    seo: SeoFields;
  };
}

export interface SupplyMode {
  id: SupplyModeId;
  index: string;
  title: string;
  summary: string;
  points: string[];
}

export interface NewsArticle {
  slug: string;
  title: string;
  summary: string;
  body: string[];
  facts?: Array<{ label: string; value: string }>;
  /** Publication date if confirmed (ISO 8601). Omitted when unknown. */
  publishedAt?: string;
  seo: SeoFields;
}

export type DistributorKind = "sede" | "ponto" | "fabrica" | "escritorio";

export interface DistributorLocation {
  locality: string;
  area: string;
  name?: string;
  kind: DistributorKind;
}

export interface DistributorRegion {
  id: "pt" | "es";
  country: string;
  description: string;
  locations: DistributorLocation[];
}

export interface Certification {
  name: string;
  scope?: string;
  issuer?: string;
  /** Only certifications with documentary confirmation are rendered. */
  verified: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
}

export interface LegalDocument {
  title: string;
  updatedLabel: string;
  intro: string;
  sections: LegalSection[];
  seo: SeoFields;
}
