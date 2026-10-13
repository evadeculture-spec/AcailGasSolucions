import type { ProductCategory, ProductCategorySlug } from "@/types/content";

/**
 * Product categories. Sources: acailgas.pt/gases (PT/EN/ES) — see docs/CONTENT_SOURCES.md.
 * Mixture compositions and purity grades are not published until confirmed.
 */

const ON_REQUEST = "Outros gases mediante consulta.";

export const productCategories: ProductCategory[] = [
  {
    slug: "gases-industriais",
    index: "01",
    name: "Gases Industriais",
    summary:
      "Gases atmosféricos, gases combustíveis e misturas para metalurgia, soldadura, corte, química e tratamento de águas.",
    intro: [
      "A Acail Gás produz uma gama completa de gases atmosféricos e desenvolve gases específicos para cada indústria.",
      "A oferta abrange gases puros, gases liquefeitos e misturas para processos de soldadura, corte, proteção, inertização, arrefecimento e tratamento.",
    ],
    items: [
      { name: "Oxigénio", substance: "oxygen" },
      {
        name: "Azoto",
        substance: "nitrogen",
        variant: "Gás e líquido",
        description:
          "Na forma líquida, é utilizado como gás de proteção, em limpeza e em arrefecimento.",
      },
      {
        name: "Árgon",
        substance: "argon",
        variant: "Gás e líquido",
        description:
          "Gás de proteção em soldadura, gás de purga, diluição e inertização, e gás de teste e calibração.",
      },
      {
        name: "Dióxido de Carbono",
        substance: "carbon-dioxide",
        description:
          "Utilizado no tratamento de águas e águas residuais, para controlo de pH e remineralização de água de osmose inversa.",
      },
      {
        name: "Hidrogénio",
        substance: "hydrogen",
        description:
          "Gás redutor em processos metalúrgicos e cerâmicos e componente de misturas para soldadura.",
      },
      {
        name: "Acetileno",
        substance: "acetylene",
        description:
          "Utilizado em soldadura e corte. A sua chama atinge a temperatura mais elevada entre os gases combustíveis.",
      },
      { name: "Hélio", substance: "helium" },
      { name: "Dióxido de Enxofre", substance: "sulfur-dioxide" },
    ],
    mixtures: {
      title: "Misturas de gases industriais",
      description:
        "Misturas para soldadura, corte laser e aplicações específicas, com ficha técnica e ficha de dados de segurança.",
      names: ["ARCO", "ARO", "HELAR", "HELARCO", "HELAZO", "HIDARG", "HIDAZO", "LASERMIX", "METAR"],
    },
    applications: [
      {
        title: "Metalurgia e siderurgia",
        body: "Fundição, processos térmicos, fornos de arco elétrico, afinação do aço com oxigénio e homogeneização com azoto e árgon.",
      },
      {
        title: "Soldadura e corte",
        body: "Gases de proteção e misturas para soldadura, oxicorte com acetileno e misturas para corte laser.",
      },
      {
        title: "Química",
        body: "O hidrogénio é um componente principal na produção de amoníaco e metanol. A inertização e o arrefecimento de reatores recorrem a gases industriais.",
      },
      {
        title: "Ambiente",
        body: "Neutralização de pH, remineralização de água e tratamento de efluentes, resíduos e compostos orgânicos voláteis.",
      },
    ],
    supplyModes: ["cylinders", "bulk", "on-site", "equipment", "telemetry"],
    industries: [
      "metalurgia",
      "metalomecanica",
      "soldadura",
      "quimica",
      "ambiente",
      "construcao",
      "vidro",
    ],
    onRequestNote: ON_REQUEST,
    seo: {
      title: "Gases Industriais",
      description:
        "Oxigénio, azoto, árgon, dióxido de carbono, hidrogénio, acetileno, hélio e misturas para soldadura, corte, metalurgia, química e ambiente.",
    },
  },
  {
    slug: "gases-alimentares",
    index: "02",
    name: "Gases Alimentares",
    summary:
      "Gases e misturas para inertização, desoxigenação, embalagem e conservação de alimentos e bebidas.",
    intro: [
      "O oxigénio encurta a vida útil dos alimentos líquidos e afeta o seu valor nutricional. O azoto, o dióxido de carbono, o árgon e as respetivas misturas permitem inertizar e desoxigenar, preservando a qualidade do produto.",
    ],
    items: [
      { name: "Azoto", substance: "nitrogen" },
      { name: "Dióxido de Carbono", substance: "carbon-dioxide" },
      { name: "Árgon", substance: "argon" },
      { name: "Oxigénio", substance: "oxygen" },
    ],
    mixtures: {
      title: "Misturas alimentares ALIMIX",
      description:
        "Gama de misturas para embalagem alimentar, com ficha técnica e ficha de dados de segurança.",
      names: ["ALIMIX 20", "ALIMIX 30", "ALIMIX 30/70", "ALIMIX 40/30", "ALIMIX A20"],
    },
    applications: [
      {
        title: "Bebidas",
        body: "O azoto e o dióxido de carbono, puros ou combinados, evitam a oxidação sem recurso a antioxidantes.",
      },
      {
        title: "Embalagem",
        body: "Uma gota de azoto líquido, introduzida imediatamente antes do fecho, purga o ar e pressuriza a embalagem, protegendo o produto da oxidação.",
      },
      {
        title: "Lacticínios",
        body: "O dióxido de carbono é o gás mais utilizado na embalagem de lacticínios, por inibir ou reduzir a atividade microbiana.",
      },
      {
        title: "Inertização de líquidos",
        body: "Desoxigenação de líquidos alimentares para preservar a vida útil e o valor nutricional.",
      },
    ],
    supplyModes: ["cylinders", "bulk", "telemetry"],
    industries: ["alimentar", "agricultura-pecuaria-pescas"],
    onRequestNote: ON_REQUEST,
    seo: {
      title: "Gases Alimentares",
      description:
        "Azoto, dióxido de carbono, árgon e misturas ALIMIX para inertização, desoxigenação, bebidas e embalagem alimentar.",
    },
  },
  {
    slug: "gases-medicinais",
    index: "03",
    name: "Gases Medicinais",
    summary:
      "Gases classificados como medicamentos, produzidos segundo as Boas Práticas de Fabrico, para hospitais, clínicas, lares e emergência médica.",
    intro: [
      "Os gases medicinais são classificados como medicamentos e são produzidos segundo as Boas Práticas de Fabrico. Todos os gases medicinais da Acail Gás apresentam níveis elevados de pureza.",
      "São utilizados diariamente por hospitais, clínicas, lares, pelo INEM e pelos bombeiros.",
    ],
    items: [
      {
        name: "Oxigénio",
        substance: "oxygen",
        notice: "Medicamento sujeito a receita médica. Consulte o folheto informativo.",
      },
      {
        name: "Oxigénio Líquido (API)",
        substance: "oxygen",
        variant: "Substância ativa",
        cylinder: false,
      },
      {
        name: "Oxigénio Criogénico",
        substance: "oxygen",
        variant: "Líquido criogénico",
        cylinder: false,
      },
      {
        name: "Ar Medicinal Sintético",
        substance: "medical-air",
        notice: "Medicamento sujeito a receita médica. Consulte o folheto informativo.",
      },
      {
        name: "Protóxido de Azoto",
        substance: "nitrous-oxide",
        description: "Utilizado como analgésico e auxiliar na anestesia.",
      },
    ],
    applications: [
      {
        title: "Hospitais e clínicas",
        body: "Fornecimento de gases medicinais para utilização diária em unidades de saúde.",
      },
      {
        title: "Lares",
        body: "Gases medicinais para utilização em lares.",
      },
      {
        title: "Emergência médica",
        body: "Gases medicinais utilizados pelo INEM e pelos bombeiros.",
      },
      {
        title: "Gestão de redes e garrafas",
        body: "O Acail Vision é um sistema modular de gestão de redes e garrafas de gases medicinais, adaptado a cada cliente.",
      },
    ],
    regulatory: [
      "Os gases medicinais são medicamentos. A informação nesta página não substitui o folheto informativo nem o aconselhamento de um profissional de saúde.",
    ],
    supplyModes: ["cylinders", "bulk", "telemetry"],
    industries: ["farmaceutica"],
    onRequestNote: ON_REQUEST,
    seo: {
      title: "Gases Medicinais",
      description:
        "Oxigénio medicinal, oxigénio líquido, ar medicinal sintético e protóxido de azoto, produzidos segundo as Boas Práticas de Fabrico.",
    },
  },
  {
    slug: "gases-especiais",
    index: "04",
    name: "Gases Especiais",
    summary:
      "Gases de pureza ultra elevada e misturas de análise e calibração para laboratório, biotecnologia, farmacêutica e eletrónica.",
    intro: [
      "A instrumentação analítica depende de gases de muito elevada pureza e de misturas específicas. A gama de gases especiais inclui gases puros e misturas para laboratório, biotecnologia, indústria farmacêutica e eletrónica.",
    ],
    items: [
      { name: "Árgon", substance: "argon", variant: "Pureza ultra elevada" },
      { name: "Azoto", substance: "nitrogen", variant: "Pureza ultra elevada" },
      { name: "Hélio", substance: "helium", variant: "Pureza ultra elevada" },
      {
        name: "Hidrogénio",
        substance: "hydrogen",
        variant: "Pureza ultra elevada",
        description: "Gás de arraste e gás combustível em cromatografia gasosa.",
      },
    ],
    applications: [
      {
        title: "Cromatografia",
        body: "Gases e misturas para cromatógrafos gasosos com múltiplos detetores e para cromatógrafos líquidos.",
      },
      {
        title: "Espectrometria",
        body: "Gases para espectrómetros UV/VIS e de ressonância magnética nuclear (RMN).",
      },
      {
        title: "Análise e calibração",
        body: "Misturas de análise e calibração para instrumentação analítica, e gases de teste e calibração.",
      },
      {
        title: "Investigação e desenvolvimento",
        body: "Gases de elevada pureza para laboratórios de I&D, biotecnologia e indústria farmacêutica.",
      },
    ],
    supplyModes: ["cylinders", "equipment"],
    industries: ["laboratorios", "farmaceutica", "eletronica-telecomunicacoes"],
    onRequestNote: ON_REQUEST,
    seo: {
      title: "Gases Especiais",
      description:
        "Gases de pureza ultra elevada (árgon, azoto, hélio, hidrogénio) e misturas de análise e calibração para laboratório e investigação.",
    },
  },
  {
    slug: "gases-dispositivo-medico",
    index: "05",
    name: "Gases Dispositivo Médico",
    summary:
      "Dióxido de carbono como agente de insuflação em cirurgia laparoscópica e endoscópica.",
    intro: [
      "Para além dos gases classificados como medicamentos, a Acail Gás disponibiliza gases enquadrados como dispositivo médico, destinados a procedimentos cirúrgicos.",
    ],
    items: [
      {
        name: "Dióxido de Carbono",
        substance: "carbon-dioxide",
        description: "Agente de insuflação em cirurgia laparoscópica e endoscópica.",
      },
    ],
    applications: [
      {
        title: "Cirurgia laparoscópica",
        body: "Insuflação da cavidade abdominal para criação do espaço de trabalho cirúrgico.",
      },
      {
        title: "Endoscopia",
        body: "Utilização como agente de insuflação em procedimentos endoscópicos.",
      },
    ],
    supplyModes: ["cylinders"],
    industries: ["farmaceutica"],
    onRequestNote: ON_REQUEST,
    seo: {
      title: "Gases Dispositivo Médico",
      description:
        "Dióxido de carbono para insuflação em cirurgia laparoscópica e endoscópica. Outros gases mediante consulta.",
    },
  },
  {
    slug: "gelo-seco",
    index: "06",
    name: "Gelo Seco",
    summary:
      "Dióxido de carbono sólido para limpeza criogénica, cadeia de frio e congelação rápida.",
    intro: [
      "O gelo seco é dióxido de carbono no estado sólido. Sublima sem deixar resíduo líquido, o que o torna adequado para aplicações em que a água não é admissível.",
    ],
    items: [
      { name: "Gelo Seco", substance: "carbon-dioxide", variant: "Estado sólido", cylinder: false },
    ],
    applications: [
      {
        title: "Limpeza criogénica",
        body: "Limpeza de equipamentos ou materiais sensíveis à água, através da projeção de gelo seco a alta pressão.",
      },
      {
        title: "Cadeia de frio",
        body: "O gelo seco garante a cadeia de frio no transporte de refeições.",
      },
      {
        title: "Congelação rápida",
        body: "Congelação rápida de produtos alimentares.",
      },
    ],
    supplyModes: ["bulk"],
    industries: ["alimentar", "transportes"],
    onRequestNote: "Formatos e quantidades mediante consulta.",
    seo: {
      title: "Gelo Seco",
      description:
        "Gelo seco para limpeza criogénica de equipamentos sensíveis à água, transporte em cadeia de frio e congelação rápida.",
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
