import type { ProductCategory, ProductCategorySlug } from "@/types/content";

/**
 * Gas product lines of Acail Angola. Sources: acailangola.com product pages and
 * the ISO 22000:2018 certificate — see docs/CONTENT_SOURCES.md.
 * Cylinder sizes, purities and prices are only published when confirmed.
 */

const CONTACT_NOTE =
  "Para disponibilidade, capacidades e condições, contacte o departamento de gás.";

export const productCategories: ProductCategory[] = [
  {
    slug: "gases-soldadura-corte",
    index: "01",
    name: "Gases para Soldadura e Corte",
    summary:
      "Árgon, misturas para MIG/MAG e TIG, azoto para corte por plasma e acetileno em garrafas.",
    intro: [
      "Gases puros e misturas para os processos de soldadura MIG/MAG e TIG e para corte por plasma, identificados segundo a classificação da norma ISO 14175.",
      "A escolha da mistura depende do material, da espessura e do modo de transferência do arco: arco curto, spray ou pulsado.",
    ],
    items: [
      {
        name: "Árgon",
        substance: "argon",
        variant: "ISO 14175 I1",
        description: "Gás de proteção para soldadura TIG.",
      },
      {
        name: "Dióxido de Carbono",
        substance: "carbon-dioxide",
        description: "Gás de soldadura e componente das misturas Arco.",
      },
      {
        name: "Azoto",
        substance: "nitrogen",
        variant: "ISO 14175 F1",
        description: "Gás para corte por plasma.",
      },
      {
        name: "Acetileno",
        substance: "acetylene",
        variant: "Garrafas de 14 L, 5 L e tara perdida de 1 L",
        description: "Fornecido com reguladores e centrais de acetileno.",
      },
    ],
    mixtures: {
      title: "Misturas para soldadura",
      description:
        "Misturas de árgon com dióxido de carbono, oxigénio, hélio ou hidrogénio, para cada material e processo.",
      entries: [
        {
          name: "Arco 8",
          composition: "Ar / CO₂",
          standard: "ISO 14175 M21",
          use: "MIG/MAG em arco curto e spray",
        },
        {
          name: "Arco 20",
          composition: "Ar / CO₂",
          standard: "ISO 14175 M21",
          use: "MIG/MAG em arco curto; aços ao carbono de maior espessura, boa penetração",
        },
        { name: "Arco T5", use: "MIG/MAG em chapa até 4 mm" },
        {
          name: "Arco T12",
          composition: "Ar / CO₂ / O₂",
          standard: "ISO 14175 M24",
          use: "MIG/MAG em arco curto, spray e pulsado; chapa acima de 4 mm, velocidades elevadas",
        },
        {
          name: "Helarco",
          composition: "Ar / He / CO₂",
          use: "MIG/MAG em aços inoxidáveis; maior velocidade de soldadura e bom aspeto do cordão",
        },
        { name: "Helar 5", use: "TIG" },
        {
          name: "Helar 30",
          use: "TIG em aços ao carbono e de baixa liga; velocidade elevada e boa penetração",
        },
        {
          name: "Hidarg",
          use: "TIG e corte por plasma, apenas em materiais que admitem hidrogénio",
        },
        {
          name: "Hidazo",
          use: "TIG e corte por plasma, apenas em materiais que admitem hidrogénio",
        },
      ],
    },
    applications: [
      {
        title: "MIG/MAG",
        body: "Misturas Arco para aços ao carbono e Helarco para aços inoxidáveis, em arco curto, spray ou pulsado.",
      },
      {
        title: "TIG",
        body: "Árgon puro e misturas Helar e Hidarg, consoante o material e a velocidade pretendida.",
      },
      {
        title: "Corte por plasma",
        body: "Azoto e misturas com hidrogénio para corte por plasma.",
      },
      {
        title: "Oxicorte",
        body: "Acetileno em garrafas de várias capacidades, com reguladores e centrais.",
      },
    ],
    supplyModes: ["cylinders", "welding-equipment"],
    industries: ["metalomecanica-soldadura"],
    onRequestNote: CONTACT_NOTE,
    seo: {
      title: "Gases para Soldadura e Corte",
      description:
        "Árgon, misturas Arco, Helar, Helarco, Hidarg e Hidazo, azoto para plasma e acetileno em garrafas, em Luanda.",
    },
  },
  {
    slug: "gases-alimentares",
    index: "02",
    name: "Gases Alimentares",
    summary:
      "Azoto, dióxido de carbono, árgon e oxigénio para inertização, congelação e refrigeração, com certificação ISO 22000.",
    intro: [
      "A fábrica do Pólo Industrial de Viana está certificada segundo a norma ISO 22000:2018 para a produção, comercialização e distribuição de azoto, oxigénio e dióxido de carbono para a indústria alimentar.",
    ],
    items: [
      {
        name: "Azoto",
        substance: "nitrogen",
        variant: "Abrangido pela certificação ISO 22000",
        description: "Inertização, congelação e refrigeração de alimentos.",
      },
      {
        name: "Dióxido de Carbono",
        substance: "carbon-dioxide",
        variant: "Abrangido pela certificação ISO 22000",
        description: "Inertização, congelação e refrigeração de alimentos.",
      },
      {
        name: "Oxigénio",
        substance: "oxygen",
        variant: "Abrangido pela certificação ISO 22000",
      },
      {
        name: "Árgon",
        substance: "argon",
        description: "Inertização de produtos sensíveis.",
      },
    ],
    applications: [
      {
        title: "Inertização",
        body: "Evitar atmosferas explosivas no armazenamento e embalagem de produtos inflamáveis e proteger produtos sensíveis da oxidação, da humidade e dos micróbios.",
      },
      {
        title: "Congelação",
        body: "Congelação de alimentos com dióxido de carbono e azoto.",
      },
      {
        title: "Refrigeração",
        body: "Refrigeração de alimentos, incluindo uva e mosto nas vindimas.",
      },
      {
        title: "Transporte a temperatura controlada",
        body: "Transporte de alimentos ou medicamentos a temperatura controlada.",
      },
    ],
    supplyModes: ["cylinders"],
    industries: ["alimentar-bebidas"],
    onRequestNote: CONTACT_NOTE,
    seo: {
      title: "Gases Alimentares",
      description:
        "Azoto, dióxido de carbono, oxigénio e árgon para a indústria alimentar, produzidos em Luanda com certificação ISO 22000:2018.",
    },
  },
  {
    slug: "gases-medicinais",
    index: "03",
    name: "Gases Medicinais",
    summary:
      "Oxigénio medicinal, protóxido de azoto, ar sintético, azoto medicinal, Carbox e dióxido de carbono medicinal.",
    intro: [
      "Gases medicinais de elevada pureza para hospitais e clínicas, produzidos na fábrica de gases do Pólo Industrial de Viana, em Luanda.",
      "O oxigénio para inalação é utilizado sobretudo em oxigenoterapia aguda ou crónica e é fornecido em forma líquida, em quadros e em garrafas.",
    ],
    items: [
      {
        name: "Oxigénio Medicinal",
        substance: "oxygen",
        variant: "Líquido, quadros e garrafas",
        description:
          "Elevada pureza e isento de contaminações. Também disponível em garrafas Compact B de 2, 5 e 15 litros, com redutor-debitómetro integrado.",
      },
      { name: "Protóxido de Azoto", substance: "nitrous-oxide" },
      {
        name: "Ar Sintético",
        substance: "medical-air",
        description: "Composição de cerca de 79% de azoto e 21% de oxigénio.",
      },
      {
        name: "Azoto Medicinal",
        substance: "nitrogen",
        description: "Elevada pureza e isento de contaminações.",
      },
      {
        name: "Carbox",
        substance: "carbox",
        description: "Mistura de dióxido de carbono e oxigénio.",
      },
      { name: "Dióxido de Carbono Medicinal", substance: "carbon-dioxide" },
    ],
    applications: [
      {
        title: "Oxigenoterapia",
        body: "Oxigénio para inalação em oxigenoterapia aguda ou crónica.",
      },
      {
        title: "Hospitais e clínicas",
        body: "Fornecimento de gases medicinais a unidades de saúde.",
      },
      {
        title: "Redes de gases medicinais",
        body: "Projeto, instalação, manutenção, auditoria e formação para redes de gases em clínicas e hospitais.",
      },
    ],
    regulatory: [
      "A utilização de gases medicinais deve seguir a prescrição e a orientação de profissionais de saúde.",
    ],
    supplyModes: ["liquid", "cylinders", "medical-networks"],
    industries: ["hospitais-clinicas"],
    onRequestNote: "Para disponibilidade e condições, contacte o departamento de gás medicinal.",
    seo: {
      title: "Gases Medicinais",
      description:
        "Oxigénio medicinal líquido e em garrafas, protóxido de azoto, ar sintético, azoto medicinal e Carbox para hospitais e clínicas em Angola.",
    },
  },
  {
    slug: "gas-ambiente",
    index: "04",
    name: "Gás Ambiente",
    summary: "Ozono e ácido carbónico para tratamento de águas, controlo de odores e desinfeção.",
    intro: [
      "O ozono (O₃) é um oxidante forte, utilizado no tratamento de águas e de odores. Ao decompor-se em oxigénio, não deixa os meios tratados saturados de químicos indesejados.",
      "O ozono é também um desinfetante potente, que elimina bactérias e vírus sem deixar resíduos.",
    ],
    items: [
      {
        name: "Ozono",
        substance: "ozone",
        cylinder: false,
        description: "Oxidação e desinfeção de águas e controlo de odores.",
      },
      {
        name: "Ácido Carbónico",
        substance: "carbon-dioxide",
        cylinder: false,
        description: "Tratamento de água potável.",
      },
    ],
    applications: [
      {
        title: "Água para consumo",
        body: "Tratamento de água para consumo humano e de água engarrafada, e desinfeção de garrafas.",
      },
      {
        title: "Aquários e bivalves",
        body: "Tratamento de água em aquários e depuração de bivalves.",
      },
      {
        title: "Controlo de odores",
        body: "Controlo de odores em estações de tratamento de águas residuais e em matadouros.",
      },
      {
        title: "Águas residuais",
        body: "Tratamento de águas residuais por oxidação, sem odores.",
      },
    ],
    supplyModes: [],
    industries: ["tratamento-aguas", "aquicultura", "alimentar-bebidas"],
    onRequestNote:
      "Cada instalação de tratamento é estudada caso a caso. Contacte o departamento de gás.",
    seo: {
      title: "Gás Ambiente: Ozono",
      description:
        "Ozono e ácido carbónico para tratamento de água potável e engarrafada, controlo de odores, águas residuais e depuração de bivalves.",
    },
  },
  {
    slug: "gas-propano",
    index: "05",
    name: "Gás Propano",
    summary: "Propano em garrafas de 12 kg e de 45 kg e a granel.",
    intro: [
      "A Acail Angola disponibiliza gás propano em garrafas de 12 kg e de 45 kg e em fornecimento a granel.",
    ],
    items: [
      {
        name: "Propano",
        substance: "propane",
        cylinder: false,
        variant: "Garrafas de 12 kg e 45 kg · granel",
      },
    ],
    applications: [],
    supplyModes: ["cylinders", "liquid"],
    industries: [],
    onRequestNote: CONTACT_NOTE,
    seo: {
      title: "Gás Propano",
      description: "Gás propano em garrafas de 12 kg e 45 kg e a granel, em Luanda, Angola.",
    },
  },
];

export function getProductCategory(slug: string): ProductCategory | undefined {
  return productCategories.find((category) => category.slug === slug);
}

export function getProductCategoryOrThrow(slug: ProductCategorySlug): ProductCategory {
  const category = getProductCategory(slug);
  if (!category) throw new Error(`Unknown product category: ${slug}`);
  return category;
}
