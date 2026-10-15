import { siteConfig } from "@/config/site";
import type { Certification } from "@/types/content";

/** Sources: acailangola.com (Quem Somos, Notícias), ISO 22000 certificate, ANGOP, RNA. */
export const company = {
  intro:
    "A Acail Gás Solucions é a área de gás da Acail Angola: produção e comercialização de gases industriais, alimentares e medicinais a partir da fábrica do Pólo Industrial de Viana, em Luanda.",
  statement: "Gases para a indústria, a saúde e o setor alimentar, produzidos em Angola.",
  origin:
    "A Acail Angola foi constituída em 2005 e organiza a sua atividade em seis setores. O setor do gás abrange a produção de gases industriais, medicinais e alimentares.",
  group: "A Acail Angola integra o Grupo Acail, com empresas em Portugal, Espanha e Angola.",
  mission:
    "A satisfação do cliente e a qualidade dos processos e produtos, com um compromisso global com a qualidade, a segurança e o ambiente.",
  values: ["Qualidade", "Segurança", "Ambiente"],
} as const;

export interface Milestone {
  year?: string;
  title: string;
  body: string;
}

/** Only milestones confirmed by official or press sources. */
export const milestones: Milestone[] = [
  {
    year: "2005",
    title: "Constituição da Acail Angola",
    body: "Início da atividade em Angola, organizada em seis setores, entre os quais o gás.",
  },
  {
    year: "2015",
    title: "Inauguração da fábrica de gases",
    body: "Inauguração, no Pólo Industrial de Viana, das unidades de produção de gases medicinais, alimentares e industriais.",
  },
  {
    year: "2023",
    title: "Visita oficial",
    body: "O Primeiro-Ministro de Portugal, António Costa, visitou a fábrica de gases no Pólo Industrial de Viana.",
  },
  {
    year: "2024",
    title: "Certificação ISO 22000:2018",
    body: "Certificação da produção, comercialização e distribuição de azoto, oxigénio e dióxido de carbono para a indústria alimentar.",
  },
];

/** Certifications. Rendered only when `verified` is true (document confirmed). */
export const certifications: Certification[] = [
  {
    name: "ISO 22000:2018",
    scope:
      "Produção, comercialização e distribuição de azoto, oxigénio e dióxido de carbono para a indústria alimentar — Pólo Industrial de Viana, Luanda.",
    issued: "12-02-2024",
    documentUrl: siteConfig.links.certificateIso22000,
    verified: true,
  },
];

export const verifiedCertifications = certifications.filter((item) => item.verified);
