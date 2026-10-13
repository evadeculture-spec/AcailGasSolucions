import type { Certification } from "@/types/content";

/** Source: acailgas.pt/empresa, homepage, public information notice (2025). */
export const company = {
  intro:
    "A Acail Gás é uma empresa de produção, comercialização e distribuição de gases industriais, medicinais e alimentares.",
  statement:
    "Produzimos uma gama completa de gases atmosféricos e desenvolvemos gases específicos para a sua indústria.",
  origin:
    "Fundada em 1996, a Acail Gás dedica-se à produção de gás a alta pressão e integra o Grupo Acail.",
  group:
    "O Grupo Acail tem vindo a enraizar os pilares do seu sucesso através de uma visão empreendedora.",
  mission: "A satisfação do cliente, com foco na melhoria contínua e na formação das equipas.",
  values: ["Disponibilidade", "Dedicação", "Compromisso"],
  pillars: ["Responsabilidade", "Rigor", "Qualidade", "Criatividade", "Inovação"],
  activityCode: { code: "20110", label: "Fabricação de gases industriais" },
} as const;

export interface Milestone {
  year?: string;
  title: string;
  body: string;
}

/** Only milestones confirmed on the official website. Undated items have no confirmed year. */
export const milestones: Milestone[] = [
  {
    year: "1996",
    title: "Fundação da Acail Gás",
    body: "Início da atividade dedicada à produção de gás a alta pressão, no seio do Grupo Acail.",
  },
  {
    year: "2016",
    title: "Nova unidade de produção criogénica",
    body: "Aprovação de projeto cofinanciado para uma nova unidade de produção criogénica de gás, com capacidade prevista de 40 toneladas por dia.",
  },
  {
    title: "Gelo seco em Aranda de Duero",
    body: "Produção de gelo seco na fábrica de Aranda de Duero, em Espanha.",
  },
  {
    title: "Nova morada em Espanha",
    body: "Instalação do escritório de Espanha no Polígono Industrial de Budiño, em O Porriño (Pontevedra).",
  },
];

/**
 * Certifications. Rendered only when `verified` is true.
 * ISO 9001:2015 is referenced in indexed snippets of the official homepage but
 * the certificate (issuer, scope, validity) has not been confirmed.
 */
export const certifications: Certification[] = [
  { name: "ISO 9001:2015", scope: "Sistema de gestão da qualidade", verified: false },
];

export const verifiedCertifications = certifications.filter((item) => item.verified);
