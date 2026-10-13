import type { DistributorRegion } from "@/types/content";

/**
 * Distribution network listed on acailgas.pt/distribuidores (partial extract).
 * Individual contact details were not available during the audit, so visitors
 * are directed to headquarters to reach the nearest location.
 */
export const distributorRegions: DistributorRegion[] = [
  {
    id: "pt",
    country: "Portugal",
    description: "Sede e pontos de distribuição no continente e nas regiões autónomas.",
    locations: [
      { locality: "Souto", area: "Santa Maria da Feira", name: "Acail Gás", kind: "sede" },
      { locality: "Braga", area: "Braga", name: "Acail Gás Braga", kind: "ponto" },
      { locality: "Pombal", area: "Leiria", name: "Acail Gás Pombal", kind: "ponto" },
      { locality: "Palmela", area: "Setúbal", name: "Acail Gás Tejo", kind: "ponto" },
      { locality: "Évora", area: "Évora", name: "Acail Gás Évora", kind: "ponto" },
      { locality: "Lousada", area: "Porto", name: "Acail Norte", kind: "ponto" },
      { locality: "Chaves", area: "Vila Real", kind: "ponto" },
      { locality: "Viseu", area: "Viseu", kind: "ponto" },
      { locality: "Leiria", area: "Leiria", kind: "ponto" },
      { locality: "Santarém", area: "Santarém", kind: "ponto" },
      { locality: "Torres Vedras", area: "Lisboa", kind: "ponto" },
      { locality: "Funchal", area: "Madeira", name: "Construmadeira", kind: "ponto" },
      { locality: "Rabo de Peixe", area: "Açores", name: "Acail Açores", kind: "ponto" },
    ],
  },
  {
    id: "es",
    country: "Espanha",
    description:
      "Escritório principal, fábrica e pontos de distribuição em várias comunidades autónomas.",
    locations: [
      { locality: "O Porriño", area: "Pontevedra", kind: "escritorio" },
      { locality: "Aranda de Duero", area: "Burgos", kind: "fabrica" },
      { locality: "Camarma de Esteruelas", area: "Madrid", kind: "ponto" },
      { locality: "Castellar del Vallès", area: "Barcelona", kind: "ponto" },
      { locality: "Larrabetzu", area: "Bizkaia", kind: "ponto" },
      { locality: "Vitoria-Gasteiz", area: "Álava", kind: "ponto" },
      { locality: "A Coruña", area: "Galiza", kind: "ponto" },
      { locality: "Ávila", area: "Castela e Leão", kind: "ponto" },
      { locality: "Badajoz", area: "Estremadura", kind: "ponto" },
      { locality: "Cantábria", area: "Cantábria", kind: "ponto" },
      { locality: "Toledo", area: "Castela-Mancha", kind: "ponto" },
      { locality: "Zamora", area: "Castela e Leão", kind: "ponto" },
    ],
  },
];

export const distributorKindLabels: Record<DistributorRegion["locations"][number]["kind"], string> =
  {
    sede: "Sede",
    ponto: "Ponto de distribuição",
    fabrica: "Fábrica",
    escritorio: "Escritório principal",
  };
