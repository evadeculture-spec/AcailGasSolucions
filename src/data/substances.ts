import type { SubstanceId } from "@/types/content";

/**
 * Universal reference data for gases (not company claims).
 * - Formula and CAS registry numbers: standard chemical identifiers.
 * - Cylinder shoulder colours: EN 1089-3 colour code (RAL references). Empty
 *   when the product is not supplied in EN 1089-3 cylinders (ozone, LPG).
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
  carbox: {
    id: "carbox",
    name: "Carbox",
    // Medical mixture of carbon dioxide and oxygen.
    formula: ["CO", { sub: "2" }, "/O", { sub: "2" }],
    formulaText: "CO2/O2",
    shoulder: [white, { label: "Cinzento", ral: "RAL 7037", hex: "#7D7F7D" }],
  },
  ozone: {
    id: "ozone",
    name: "Ozono",
    formula: ["O", { sub: "3" }],
    formulaText: "O3",
    cas: "10028-15-6",
    shoulder: [],
  },
  propane: {
    id: "propane",
    name: "Propano",
    formula: ["C", { sub: "3" }, "H", { sub: "8" }],
    formulaText: "C3H8",
    cas: "74-98-6",
    shoulder: [],
  },
  "medical-air": {
    id: "medical-air",
    name: "Ar sintético",
    // Synthetic air: approx. 79 % nitrogen and 21 % oxygen.
    formula: ["O", { sub: "2" }, "/N", { sub: "2" }],
    formulaText: "O2/N2",
    shoulder: [white, black],
  },
};

export function getSubstance(id: SubstanceId): Substance {
  return substances[id];
}
