import type { NewsArticle } from "@/types/content";

/**
 * News about the gas division of Acail Angola. Sources: acailangola.com news,
 * ANGOP (2015), RNA (2023) and the ISO 22000 certificate (2024). Dates are only
 * shown when confirmed — see docs/CONTENT_SOURCES.md.
 */
export const newsArticles: NewsArticle[] = [
  {
    slug: "certificacao-iso-22000",
    title: "Fábrica de gases certificada segundo a ISO 22000:2018",
    summary:
      "A produção, comercialização e distribuição de azoto, oxigénio e dióxido de carbono para a indústria alimentar está certificada segundo a ISO 22000:2018.",
    body: [
      "A Acail Angola obteve a certificação ISO 22000:2018 para a produção, comercialização e distribuição de azoto, oxigénio e dióxido de carbono destinados à indústria alimentar.",
      "O certificado abrange a fábrica de gases do Pólo Industrial de Viana, em Luanda.",
    ],
    facts: [
      { label: "Norma", value: "ISO 22000:2018" },
      { label: "Emissão", value: "12-02-2024" },
      { label: "Gases abrangidos", value: "N₂ · O₂ · CO₂" },
    ],
    dateLabel: "Fevereiro de 2024",
    seo: {
      title: "Certificação ISO 22000:2018",
      description:
        "A fábrica de gases da Acail Angola está certificada ISO 22000:2018 para azoto, oxigénio e dióxido de carbono para a indústria alimentar.",
    },
  },
  {
    slug: "acail-disponibiliza-gas-propano",
    title: "Acail disponibiliza gás propano",
    summary: "Gás propano em garrafas de 12 kg e de 45 kg e a granel.",
    body: [
      "A Acail Angola passou a comercializar gás propano em garrafas de 12 kg e de 45 kg e em fornecimento a granel.",
      "Para encomendas e condições, contacte o departamento de gás.",
    ],
    facts: [
      { label: "Garrafas", value: "12 kg · 45 kg" },
      { label: "Granel", value: "Disponível" },
    ],
    seo: {
      title: "Acail disponibiliza gás propano",
      description:
        "A Acail Angola disponibiliza gás propano em garrafas de 12 kg e 45 kg e a granel, em Luanda.",
    },
  },
  {
    slug: "visita-primeiro-ministro-portugal",
    title: "Primeiro-Ministro de Portugal visita a fábrica de gases",
    summary:
      "António Costa visitou o Pólo Industrial de Viana, incluindo a fábrica de gases da Acail, erguida com financiamento português.",
    body: [
      "Durante a visita a Angola, o Primeiro-Ministro de Portugal, António Costa, esteve no Pólo Industrial de Viana, em Luanda.",
      "A visita incluiu a fábrica de gases da Acail, um dos empreendimentos do pólo erguidos com financiamento português.",
    ],
    dateLabel: "Junho de 2023",
    seo: {
      title: "Visita do Primeiro-Ministro de Portugal",
      description:
        "António Costa visitou o Pólo Industrial de Viana e a fábrica de gases da Acail, erguida com financiamento português.",
    },
  },
  {
    slug: "inauguracao-fabrica-de-gases",
    title: "Inaugurada a fábrica de gases no Pólo Industrial de Viana",
    summary:
      "O Ministro da Geologia e Minas e da Indústria, Joaquim David, inaugurou as unidades de produção de gases medicinais, alimentares e industriais.",
    body: [
      "Foram inauguradas no Pólo Industrial de Viana três unidades industriais, entre as quais a unidade de produção de gases medicinais, alimentares e industriais.",
      "A inauguração foi presidida pelo então Ministro da Geologia e Minas e da Indústria, Joaquim David.",
    ],
    dateLabel: "2015",
    seo: {
      title: "Inauguração da fábrica de gases",
      description:
        "Inauguração das unidades de produção de gases medicinais, alimentares e industriais no Pólo Industrial de Viana, em Luanda.",
    },
  },
];

export function getNewsArticle(slug: string): NewsArticle | undefined {
  return newsArticles.find((article) => article.slug === slug);
}
