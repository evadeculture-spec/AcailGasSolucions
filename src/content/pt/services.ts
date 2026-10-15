import type { SupplyMode, SupplyModeId } from "@/types/content";

/** Sources: acailangola.com — services, gas networks, medical gas and welding pages. */
export const supplyModes: SupplyMode[] = [
  {
    id: "cylinders",
    index: "01",
    title: "Garrafas e quadros",
    summary:
      "Gases em garrafas de várias capacidades e em quadros, conjuntos de garrafas ligadas entre si.",
    points: [
      "Garrafas clássicas de várias capacidades",
      "Quadros: conjuntos de garrafas ligadas entre si",
      "Oxigénio medicinal em garrafas Compact B de 2, 5 e 15 litros, com redutor-debitómetro integrado",
      "Acetileno em garrafas de 14 L, 5 L e tara perdida de 1 L",
      "Propano em garrafas de 12 kg e 45 kg",
    ],
  },
  {
    id: "liquid",
    index: "02",
    title: "Fornecimento a granel",
    summary: "Oxigénio medicinal em forma líquida e propano a granel.",
    points: ["Oxigénio medicinal em forma líquida", "Propano a granel"],
  },
  {
    id: "industrial-networks",
    index: "03",
    title: "Redes de gases industriais",
    summary: "Redes de gases industriais à medida, segundo as normas internacionais aplicáveis.",
    points: [
      "Conceção da rede segundo normas internacionais",
      "Especificações técnicas e planos",
      "Seleção de equipamentos e materiais adequados a cada gás",
      "Instalações de elevada segurança",
      "Inspeção e manutenção",
    ],
  },
  {
    id: "medical-networks",
    index: "04",
    title: "Redes de gases medicinais",
    summary:
      "Redes que levam o gás desde a fonte, no exterior da unidade de saúde, até às enfermarias, blocos operatórios e salas de recobro.",
    points: [
      "Projeto adaptado a cada clínica ou hospital",
      "Instalação",
      "Manutenção",
      "Auditoria",
      "Formação das equipas",
    ],
  },
  {
    id: "welding-equipment",
    index: "05",
    title: "Soldadura e corte",
    summary: "Material e acessórios para a utilização segura dos gases de soldadura e corte.",
    points: [
      "Reguladores e centrais de acetileno",
      "Carros de garrafas",
      "Material de soldadura e acessórios",
      "Serviço de oxicorte",
    ],
  },
];

export function getSupplyMode(id: SupplyModeId): SupplyMode {
  const mode = supplyModes.find((item) => item.id === id);
  if (!mode) throw new Error(`Unknown supply mode: ${id}`);
  return mode;
}
