import type { SupplyMode, SupplyModeId } from "@/types/content";

/** Source: acailgas.pt/servicos (PT/EN) and homepage. */
export const supplyModes: SupplyMode[] = [
  {
    id: "cylinders",
    index: "01",
    title: "Garrafas e quadros",
    summary:
      "Garrafas individuais ou interligadas, adequadas a consumos mensais baixos ou médios que exigem mobilidade.",
    points: [
      "Garrafas individuais para utilização móvel",
      "Garrafas interligadas em quadro para maior autonomia",
      "Adequado a consumos mensais baixos ou médios",
    ],
  },
  {
    id: "bulk",
    index: "02",
    title: "Líquidos criogénicos a granel",
    summary:
      "Gases criogénicos entregues pela frota própria de camiões em todo o território e armazenados nas instalações do cliente.",
    points: [
      "Frota própria de camiões em todo o território",
      "Tanques criogénicos isolados a vácuo nas instalações do cliente",
      "Tanque dimensionado com o cliente em função do volume, pressão, caudal e utilização",
    ],
  },
  {
    id: "on-site",
    index: "03",
    title: "Produção on-site",
    summary:
      "Sistemas de produção de azoto, oxigénio e hidrogénio nas instalações do cliente, construídos, operados e mantidos pela Acail Gás.",
    points: [
      "Produção de azoto, oxigénio e hidrogénio",
      "Componentes normalizados",
      "Unidade central com sistema de back-up",
      "Construção, operação e manutenção asseguradas pela Acail Gás",
    ],
  },
  {
    id: "equipment",
    index: "04",
    title: "Equipamentos",
    summary: "Equipamentos para armazenagem, gaseificação e distribuição de gases.",
    points: [
      "Gaseificadores",
      "Quadros elétricos",
      "Tanques e vasos evaporadores",
      "Válvulas e acessórios",
    ],
  },
  {
    id: "telemetry",
    index: "05",
    title: "Acail Vision",
    summary:
      "Telemetria e gestão: monitorização contínua do nível de produto no reservatório e gestão modular de redes e garrafas de gases medicinais.",
    points: [
      "Monitorização contínua do nível de produto no reservatório",
      "Planeamento de entregas com base nos dados de consumo",
      "Sistema modular de gestão de redes e garrafas de gases medicinais",
      "Adaptado às necessidades de cada cliente",
    ],
  },
];

export function getSupplyMode(id: SupplyModeId): SupplyMode {
  const mode = supplyModes.find((item) => item.id === id);
  if (!mode) throw new Error(`Unknown supply mode: ${id}`);
  return mode;
}

export const acailVision = {
  name: "Acail Vision",
  statement:
    "Um sistema modular de gestão de redes e garrafas de gases medicinais, adaptado às necessidades de cada cliente, para maior economia e fiabilidade na utilização de recursos.",
  telemetry:
    "Nos fornecimentos a granel, a telemetria Acail Vision monitoriza continuamente o nível de produto no reservatório, o que facilita o planeamento das entregas.",
} as const;
