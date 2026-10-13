import type { SubstanceId } from "@/types/content";

/**
 * Universal reference data for gases (not company claims).
 * - Formula and CAS registry numbers: standard chemical identifiers.
 * - Cylinder shoulder colours: EN 1089-3 colour code (RAL references).
 */

export interface CylinderColour {
  label: string;
  ral: string;
  hex: string;
}

export interface Substance {
  id: SubstanceId;
  /** Portuguese common name. */
  name: string;
  /** Formula split into segments so subscripts can be rendered accessibly. */
  formula: Array<string | { sub: string }>;
  /** Plain-text formula for aria labels and metadata. */
  formulaText: string;
  cas?: string;
  shoulder: CylinderColour[];
}

const white: CylinderColour = { label: "Branco", ral: "RAL 9010", hex: "#F4F4EE" };
const black: CylinderColour = { label: "Preto", ral: "RAL 9005", hex: "#141414" };

export const substances: Record<SubstanceId, Substance> = {
  oxygen: {
    id: "oxygen",
    name: "Oxigénio",
    formula: ["O", { sub: "2" }],
    formulaText: "O2",
    cas: "7782-44-7",
    shoulder: [white],
  },
  nitrogen: {
    id: "nitrogen",
    name: "Azoto",
    formula: ["N", { sub: "2" }],
    formulaText: "N2",
    cas: "7727-37-9",
    shoulder: [black],
  },
  argon: {
    id: "argon",
    name: "Árgon",
    formula: ["Ar"],
    formulaText: "Ar",
    cas: "7440-37-1",
    shoulder: [{ label: "Verde escuro", ral: "RAL 6001", hex: "#287233" }],
  },
  "carbon-dioxide": {
    id: "carbon-dioxide",
    name: "Dióxido de carbono",
    formula: ["CO", { sub: "2" }],
    formulaText: "CO2",
    cas: "124-38-9",
    shoulder: [{ label: "Cinzento", ral: "RAL 7037", hex: "#7D7F7D" }],
  },
  helium: {
    id: "helium",
    name: "Hélio",
    formula: ["He"],
    formulaText: "He",
    cas: "7440-59-7",
    shoulder: [{ label: "Castanho", ral: "RAL 8008", hex: "#6F4F28" }],
  },
  hydrogen: {
    id: "hydrogen",
    name: "Hidrogénio",
    formula: ["H", { sub: "2" }],
    formulaText: "H2",
    cas: "1333-74-0",
    shoulder: [{ label: "Vermelho", ral: "RAL 3000", hex: "#AF2B1E" }],
  },
  acetylene: {
    id: "acetylene",
    name: "Acetileno",
    formula: ["C", { sub: "2" }, "H", { sub: "2" }],
    formulaText: "C2H2",
    cas: "74-86-2",
    shoulder: [{ label: "Castanho avermelhado", ral: "RAL 3009", hex: "#6D342D" }],
  },
  "nitrous-oxide": {
    id: "nitrous-oxide",
    name: "Protóxido de azoto",
    formula: ["N", { sub: "2" }, "O"],
    formulaText: "N2O",
    cas: "10024-97-2",
    shoulder: [{ label: "Azul", ral: "RAL 5010", hex: "#0E294B" }],
  },
  "sulfur-dioxide": {
    id: "sulfur-dioxide",
    name: "Dióxido de enxofre",
    formula: ["SO", { sub: "2" }],
    formulaText: "SO2",
    cas: "7446-09-5",
    shoulder: [{ label: "Amarelo", ral: "RAL 1018", hex: "#F8D600" }],
  },
  "medical-air": {
    id: "medical-air",
    name: "Ar medicinal",
    // Synthetic medical air is a mixture of oxygen and nitrogen.
    formula: ["O", { sub: "2" }, "/N", { sub: "2" }],
    formulaText: "O2/N2",
    shoulder: [white, black],
  },
};

export function getSubstance(id: SubstanceId): Substance {
  return substances[id];
}
