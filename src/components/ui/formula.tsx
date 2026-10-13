import { getSubstance } from "@/data/substances";
import type { SubstanceId } from "@/types/content";

/** Chemical formula with semantic subscripts, e.g. CO₂. */
export function Formula({ substance, className }: { substance: SubstanceId; className?: string }) {
  const { formula } = getSubstance(substance);
  return (
    <span className={className}>
      {formula.map((part, index) =>
        typeof part === "string" ? (
          <span key={index}>{part}</span>
        ) : (
          <sub key={index}>{part.sub}</sub>
        ),
      )}
    </span>
  );
}
