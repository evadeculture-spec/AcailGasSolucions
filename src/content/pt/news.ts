import type { NewsArticle } from "@/types/content";

/**
 * News items published on acailgas.pt/noticia. Full original texts and
 * publication dates were not available during the audit, so each article is a
 * factual summary without a date (see docs/CONTENT_AUDIT.md §12).
 */
export const newsArticles: NewsArticle[] = [
  {
    slug: "nova-unidade-de-producao-criogenica-de-gas",
    title: "Nova unidade de produção criogénica de gás",
    summary:
      "Projeto cofinanciado para a criação de uma nova unidade de produção criogénica de gás, com capacidade prevista de 40 toneladas por dia.",
    body: [
      "A Acail Gás, S.A. viu aprovado em 2016 um projeto cofinanciado para a criação de uma nova unidade de produção criogénica de gás.",
      "A unidade tem uma capacidade de produção prevista de 40 toneladas por dia.",
    ],
    facts: [
      { label: "Aprovação", value: "2016" },
      { label: "Capacidade prevista", value: "40 t/dia" },
      { label: "Custo total elegível aprovado", value: "5 292 075 €" },
    ],
    seo: {
      title: "Nova unidade de produção criogénica de gás",
      description:
        "Projeto cofinanciado aprovado em 2016 para uma nova unidade de produção criogénica de gás, com capacidade prevista de 40 t/dia.",
    },
  },
  {
    slug: "fabrica-de-aranda-de-duero-produz-gelo-seco",
    title: "Fábrica de Aranda de Duero produz gelo seco",
    summary: "A fábrica de Aranda de Duero, em Espanha, produz gelo seco.",
    body: [
      "A fábrica de Aranda de Duero, na província de Burgos, em Espanha, produz gelo seco.",
      "O gelo seco é utilizado em limpeza criogénica de equipamentos sensíveis à água, no transporte em cadeia de frio e na congelação rápida de alimentos.",
    ],
    seo: {
      title: "Fábrica de Aranda de Duero produz gelo seco",
      description: "A fábrica de Aranda de Duero (Burgos, Espanha) produz gelo seco.",
    },
  },
  {
    slug: "nova-morada-em-espanha",
    title: "Temos nova morada em Espanha",
    summary:
      "O escritório de Espanha mudou de instalações para servir melhor os clientes, no Polígono Industrial de Budiño, em O Porriño.",
    body: [
      "Para servir melhor os clientes, o escritório de Espanha mudou de instalações.",
      "A nova localização situa-se no Polígono Industrial de Budiño, em O Porriño (Pontevedra).",
    ],
    seo: {
      title: "Temos nova morada em Espanha",
      description:
        "O escritório de Espanha está agora no Polígono Industrial de Budiño, em O Porriño (Pontevedra).",
    },
  },
];

export function getNewsArticle(slug: string): NewsArticle | undefined {
  return newsArticles.find((article) => article.slug === slug);
}
