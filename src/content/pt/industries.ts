import type { Industry } from "@/types/content";

/**
 * Industries listed on acailgas.pt/industria. Only sectors with substantive,
 * verified content get a `detail` (and therefore a dedicated page).
 */
export const industries: Industry[] = [
  { slug: "agricultura-pecuaria-pescas", name: "Agricultura, Pecuária e Pescas" },
  {
    slug: "alimentar",
    name: "Alimentar",
    detail: {
      summary: "Inertização, desoxigenação e embalagem de alimentos e bebidas.",
      intro:
        "O oxigénio encurta a vida útil dos alimentos líquidos e afeta o seu valor nutricional. Gases como o azoto, o dióxido de carbono, o árgon e as respetivas misturas permitem inertizar e desoxigenar, preservando o produto.",
      applications: [
        {
          title: "Bebidas",
          body: "O azoto e o dióxido de carbono, puros ou combinados, evitam a oxidação sem recurso a antioxidantes.",
        },
        {
          title: "Embalagem com azoto líquido",
          body: "Uma gota de azoto líquido, introduzida imediatamente antes do fecho, purga o ar e pressuriza a embalagem.",
        },
        {
          title: "Lacticínios",
          body: "O dióxido de carbono é o gás mais utilizado na embalagem de lacticínios, por inibir ou reduzir a atividade microbiana.",
        },
        {
          title: "Hidrogenação",
          body: "O hidrogénio é utilizado na hidrogenação de gorduras vegetais, como na produção de margarina.",
        },
        {
          title: "Cadeia de frio",
          body: "O gelo seco garante a cadeia de frio no transporte de refeições e permite a congelação rápida de alimentos.",
        },
      ],
      substances: ["nitrogen", "carbon-dioxide", "argon", "hydrogen"],
      categories: ["gases-alimentares", "gelo-seco"],
      seo: {
        title: "Indústria Alimentar",
        description:
          "Gases para inertização, desoxigenação, bebidas, embalagem, lacticínios, hidrogenação e cadeia de frio.",
      },
    },
  },
  {
    slug: "ambiente",
    name: "Ambiente",
    detail: {
      summary: "Tratamento de águas, efluentes, resíduos e compostos orgânicos voláteis.",
      intro:
        "Os gases industriais intervêm em processos de tratamento que contribuem para o cumprimento das exigências ambientais.",
      applications: [
        {
          title: "Controlo de pH",
          body: "O dióxido de carbono é utilizado no tratamento de águas e águas residuais para controlo e neutralização de pH.",
        },
        {
          title: "Remineralização",
          body: "Remineralização de água produzida por osmose inversa com dióxido de carbono.",
        },
        {
          title: "Resíduos e COV",
          body: "Tratamento de resíduos e de compostos orgânicos voláteis, e recuperação de solventes.",
        },
      ],
      substances: ["carbon-dioxide"],
      categories: ["gases-industriais"],
      seo: {
        title: "Ambiente",
        description:
          "Gases para controlo de pH, remineralização de água, recuperação de solventes e tratamento de resíduos e COV.",
      },
    },
  },
  { slug: "construcao", name: "Construção" },
  { slug: "eletronica-telecomunicacoes", name: "Eletrónica e Telecomunicações" },
  { slug: "farmaceutica", name: "Farmacêutica" },
  {
    slug: "laboratorios",
    name: "Laboratórios",
    detail: {
      summary: "Gases de pureza ultra elevada e misturas para instrumentação analítica.",
      intro:
        "A instrumentação analítica depende de gases de muito elevada pureza e de misturas específicas. A Acail Gás fornece gases de pureza ultra elevada, como árgon, azoto, hélio e hidrogénio, e misturas de análise e calibração.",
      applications: [
        {
          title: "Cromatografia gasosa e líquida",
          body: "Gases para cromatógrafos gasosos com múltiplos detetores e para cromatógrafos líquidos. O hidrogénio é utilizado como gás de arraste e combustível.",
        },
        {
          title: "Espectrometria",
          body: "Gases para espectrómetros UV/VIS e de ressonância magnética nuclear (RMN).",
        },
        {
          title: "Calibração",
          body: "Misturas de análise e calibração, e gases de teste e calibração.",
        },
        {
          title: "Investigação e desenvolvimento",
          body: "Gases de elevada pureza para atividades de I&D.",
        },
      ],
      substances: ["argon", "nitrogen", "helium", "hydrogen"],
      categories: ["gases-especiais"],
      seo: {
        title: "Laboratórios",
        description:
          "Gases de pureza ultra elevada e misturas de calibração para cromatografia, espectrometria e I&D.",
      },
    },
  },
  { slug: "lazer", name: "Lazer" },
  {
    slug: "metalomecanica",
    name: "Metalomecânica",
    detail: {
      summary: "Oxicorte, corte por plasma e corte laser.",
      intro:
        "Os processos de corte de metais recorrem a gases combustíveis, comburentes e de assistência, ajustados ao material e à espessura.",
      applications: [
        {
          title: "Oxicorte",
          body: "Corte de aço com chama de acetileno e oxigénio.",
        },
        {
          title: "Corte por plasma",
          body: "Corte de metais através de um arco de plasma.",
        },
        {
          title: "Corte laser",
          body: "Corte de chapa fina e de outros materiais, como vidro e cerâmica.",
        },
      ],
      substances: ["acetylene", "oxygen"],
      categories: ["gases-industriais"],
      seo: {
        title: "Metalomecânica",
        description: "Gases e misturas para oxicorte, corte por plasma e corte laser.",
      },
    },
  },
  {
    slug: "metalurgia",
    name: "Metalurgia",
    detail: {
      summary: "Siderurgia, processos térmicos e hidrometalurgia.",
      intro:
        "Os gases intervêm em várias etapas da produção e transformação de metais: fundição, processos térmicos, fornos de arco elétrico e afinação.",
      applications: [
        {
          title: "Siderurgia",
          body: "Afinação do aço com oxigénio e homogeneização do aço com azoto e árgon.",
        },
        {
          title: "Fundição e processos térmicos",
          body: "Aplicações em processos de fundição de metais, processos térmicos e fornos de arco elétrico.",
        },
        {
          title: "Hidrometalurgia",
          body: "Processos de flutuação com azoto e dióxido de carbono, e lixiviação de cobre, ouro, prata e zinco com oxigénio.",
        },
        {
          title: "Atmosferas redutoras",
          body: "O hidrogénio atua como gás redutor em processos metalúrgicos e cerâmicos.",
        },
      ],
      substances: ["oxygen", "nitrogen", "argon", "carbon-dioxide", "hydrogen"],
      categories: ["gases-industriais"],
      seo: {
        title: "Metalurgia",
        description:
          "Gases para siderurgia, fundição, fornos de arco elétrico, afinação do aço e hidrometalurgia.",
      },
    },
  },
  {
    slug: "quimica",
    name: "Química",
    detail: {
      summary: "Matérias-primas, inertização e arrefecimento de reatores.",
      intro:
        "Na indústria química, os gases são simultaneamente matéria-prima e meio de controlo de processo.",
      applications: [
        {
          title: "Síntese",
          body: "O hidrogénio é um componente principal na produção de amoníaco e de metanol.",
        },
        {
          title: "Inertização",
          body: "Inertização de processos químicos.",
        },
        {
          title: "Arrefecimento de reatores",
          body: "Arrefecimento de reatores com recurso a gases industriais.",
        },
        {
          title: "Farmacêutica e cosmética",
          body: "O hidrogénio é utilizado na produção de vitaminas e de produtos cosméticos.",
        },
      ],
      substances: ["hydrogen", "nitrogen"],
      categories: ["gases-industriais"],
      seo: {
        title: "Química",
        description:
          "Gases para síntese de amoníaco e metanol, inertização e arrefecimento de reatores.",
      },
    },
  },
  { slug: "reciclagem", name: "Reciclagem" },
  {
    slug: "soldadura",
    name: "Soldadura",
    detail: {
      summary: "Gases de proteção, gases combustíveis e misturas de soldadura.",
      intro:
        "A qualidade de uma soldadura depende da proteção do banho de fusão e da estabilidade do arco. A gama inclui gases puros e misturas desenvolvidas para soldadura e corte.",
      applications: [
        {
          title: "Gases de proteção",
          body: "O árgon é utilizado como gás de proteção em processos de soldadura.",
        },
        {
          title: "Misturas de soldadura",
          body: "O hidrogénio é componente de misturas para soldadura de metais. A gama de misturas de gases industriais inclui ARCO, HELARCO, HIDARG e HIDAZO, entre outras.",
        },
        {
          title: "Soldadura e corte com acetileno",
          body: "O acetileno é utilizado em soldadura e corte. A sua chama atinge a temperatura mais elevada entre os gases combustíveis.",
        },
      ],
      substances: ["argon", "acetylene", "oxygen", "hydrogen"],
      categories: ["gases-industriais"],
      seo: {
        title: "Soldadura",
        description: "Gases de proteção, acetileno e misturas para soldadura e corte de metais.",
      },
    },
  },
  { slug: "transportes", name: "Transportes" },
  { slug: "vidro", name: "Vidro" },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}

export const industriesWithDetail = industries.filter(
  (industry): industry is Industry & { detail: NonNullable<Industry["detail"]> } =>
    industry.detail !== undefined,
);
