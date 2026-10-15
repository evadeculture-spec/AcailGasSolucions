import type { Industry } from "@/types/content";

/**
 * Sectors served by the gas division of Acail Angola. Only sectors with
 * substantive, verified content get a `detail` (and therefore a dedicated page).
 */
export const industries: Industry[] = [
  {
    slug: "alimentar-bebidas",
    name: "Alimentar e Bebidas",
    detail: {
      summary:
        "Inertização, congelação, refrigeração e tratamento de água, com gases certificados ISO 22000.",
      intro:
        "A produção de azoto, oxigénio e dióxido de carbono para a indústria alimentar está certificada segundo a ISO 22000:2018. Os gases alimentares protegem os produtos e garantem a cadeia de frio.",
      applications: [
        {
          title: "Inertização",
          body: "Azoto, dióxido de carbono e árgon evitam atmosferas explosivas no armazenamento e embalagem de produtos inflamáveis e protegem produtos sensíveis da oxidação, da humidade e dos micróbios.",
        },
        {
          title: "Congelação e refrigeração",
          body: "Dióxido de carbono e azoto para congelação e refrigeração de alimentos, incluindo uva e mosto nas vindimas.",
        },
        {
          title: "Transporte a temperatura controlada",
          body: "Transporte de alimentos ou medicamentos a temperatura controlada.",
        },
        {
          title: "Água potável e engarrafada",
          body: "Ozono e ácido carbónico no tratamento de água potável e de água engarrafada, e na desinfeção de garrafas.",
        },
      ],
      substances: ["nitrogen", "carbon-dioxide", "argon", "ozone"],
      categories: ["gases-alimentares", "gas-ambiente"],
      seo: {
        title: "Indústria Alimentar e Bebidas",
        description:
          "Gases para inertização, congelação, refrigeração, transporte a temperatura controlada e tratamento de água potável em Angola.",
      },
    },
  },
  { slug: "aquicultura", name: "Aquicultura" },
  {
    slug: "hospitais-clinicas",
    name: "Hospitais e Clínicas",
    detail: {
      summary: "Gases medicinais e redes de gases medicinais para unidades de saúde.",
      intro:
        "Os cuidados ao doente dependem da pureza do gás ao longo de toda a rede e da continuidade do fornecimento na tomada. A rede leva o gás desde a fonte, no exterior da unidade de saúde, até às enfermarias, blocos operatórios e salas de recobro.",
      applications: [
        {
          title: "Oxigenoterapia",
          body: "Oxigénio medicinal para oxigenoterapia aguda ou crónica, em forma líquida, em quadros ou em garrafas.",
        },
        {
          title: "Gases medicinais",
          body: "Protóxido de azoto, ar sintético, azoto medicinal, Carbox e dióxido de carbono medicinal.",
        },
        {
          title: "Redes à medida",
          body: "Montagem de redes de gases medicinais adaptadas às necessidades de cada clínica ou hospital.",
        },
        {
          title: "Manutenção e formação",
          body: "Manutenção, auditoria das redes e formação das equipas.",
        },
      ],
      substances: [
        "oxygen",
        "nitrous-oxide",
        "medical-air",
        "nitrogen",
        "carbox",
        "carbon-dioxide",
      ],
      categories: ["gases-medicinais"],
      seo: {
        title: "Hospitais e Clínicas",
        description:
          "Gases medicinais e redes de gases medicinais para hospitais e clínicas em Angola: oxigenoterapia, projeto, instalação e manutenção.",
      },
    },
  },
  {
    slug: "metalomecanica-soldadura",
    name: "Metalomecânica e Soldadura",
    detail: {
      summary: "Gases e misturas para soldadura MIG/MAG e TIG, corte por plasma e oxicorte.",
      intro:
        "A qualidade da soldadura depende da proteção do banho de fusão e da estabilidade do arco. A gama de gases e misturas cobre aços ao carbono, aços de baixa liga e aços inoxidáveis.",
      applications: [
        {
          title: "Aços ao carbono",
          body: "Misturas Arco 8, Arco 20, Arco T5 e Arco T12 para MIG/MAG, consoante a espessura e o modo de transferência.",
        },
        {
          title: "Aços inoxidáveis",
          body: "Helarco para MIG/MAG, com maior velocidade de soldadura e bom aspeto do cordão.",
        },
        {
          title: "TIG",
          body: "Árgon puro e misturas Helar 5, Helar 30 e Hidarg.",
        },
        {
          title: "Corte",
          body: "Azoto e misturas com hidrogénio para corte por plasma; acetileno para oxicorte.",
        },
      ],
      substances: ["argon", "carbon-dioxide", "nitrogen", "acetylene"],
      categories: ["gases-soldadura-corte"],
      seo: {
        title: "Metalomecânica e Soldadura",
        description:
          "Gases e misturas para soldadura MIG/MAG e TIG, corte por plasma e oxicorte, para aços ao carbono e inoxidáveis.",
      },
    },
  },
  { slug: "petroleo-gas", name: "Petróleo e Gás" },
  {
    slug: "tratamento-aguas",
    name: "Tratamento de Águas e Ambiente",
    detail: {
      summary: "Ozono para tratamento de águas, controlo de odores e águas residuais.",
      intro:
        "O ozono é um oxidante e desinfetante forte. Elimina bactérias e vírus e, ao decompor-se em oxigénio, não deixa resíduos nem satura os meios tratados com químicos indesejados.",
      applications: [
        {
          title: "Água para consumo",
          body: "Tratamento de água para consumo humano e de água engarrafada.",
        },
        {
          title: "Controlo de odores",
          body: "Controlo de odores em estações de tratamento de águas residuais e em matadouros.",
        },
        {
          title: "Águas residuais",
          body: "Tratamento de águas residuais por oxidação, sem odores.",
        },
        {
          title: "Aquários e bivalves",
          body: "Tratamento de água em aquários e depuração de bivalves.",
        },
      ],
      substances: ["ozone", "carbon-dioxide"],
      categories: ["gas-ambiente"],
      seo: {
        title: "Tratamento de Águas e Ambiente",
        description:
          "Ozono para tratamento de água potável e engarrafada, controlo de odores em ETAR e matadouros e tratamento de águas residuais.",
      },
    },
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}

export const industriesWithDetail = industries.filter(
  (industry): industry is Industry & { detail: NonNullable<Industry["detail"]> } =>
    industry.detail !== undefined,
);
