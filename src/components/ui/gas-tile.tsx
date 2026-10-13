import { getSubstance } from "@/data/substances";
import { cn } from "@/lib/utils";
import type { SubstanceId } from "@/types/content";

import { Formula } from "./formula";

interface GasTileProps {
  substance: SubstanceId;
  /** Omit when the name is already shown next to the tile. */
  name?: string;
  variant?: string;
  size?: "md" | "lg";
  tone?: "light" | "dark";
  /** Show the EN 1089-3 shoulder colour (only meaningful for cylinder products). */
  showSwatch?: boolean;
  /** Show the CAS number label (hide when it is listed alongside the tile). */
  showCas?: boolean;
  className?: string;
}

/**
 * Periodic-table style tile: formula, name, CAS number and the EN 1089-3
 * cylinder shoulder colour.
 */
export function GasTile({
  substance,
  name,
  variant,
  size = "md",
  tone = "light",
  showSwatch = true,
  showCas = true,
  className,
}: GasTileProps) {
  const data = getSubstance(substance);
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "relative flex flex-col justify-between overflow-hidden rounded-sm border p-4",
        size === "lg" ? "aspect-[4/5] min-h-56 p-5" : "aspect-square min-h-36",
        dark ? "border-white/12 bg-white/[0.03]" : "border-steel-200 bg-white",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={cn(
            "font-mono text-[0.6875rem] uppercase",
            dark ? "text-steel-400" : "text-steel-500",
          )}
        >
          {showCas ? (data.cas ? `CAS ${data.cas}` : "Mistura") : null}
        </span>
        {showSwatch ? <ShoulderSwatch substance={substance} /> : null}
      </div>
      <Formula
        substance={substance}
        className={cn(
          "font-display leading-none font-medium tracking-[-0.04em]",
          size === "lg" ? "text-6xl" : "text-[2.75rem]",
          dark ? "text-white" : "text-navy-900",
        )}
      />
      {name ? (
        <div>
          <p className={cn("text-sm font-medium", dark ? "text-white" : "text-steel-900")}>
            {name}
          </p>
          {variant ? (
            <p className={cn("mt-0.5 text-xs", dark ? "text-steel-400" : "text-steel-500")}>
              {variant}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function ShoulderSwatch({ substance }: { substance: SubstanceId }) {
  const { shoulder } = getSubstance(substance);
  const label = `Cor da ogiva (EN 1089-3): ${shoulder.map((colour) => `${colour.label}, ${colour.ral}`).join(" e ")}`;
  return (
    <span
      role="img"
      aria-label={label}
      title={label}
      className="flex h-3 w-6 overflow-hidden rounded-full ring-1 ring-black/15"
    >
      {shoulder.map((colour) => (
        <span key={colour.ral} className="h-full flex-1" style={{ backgroundColor: colour.hex }} />
      ))}
    </span>
  );
}
