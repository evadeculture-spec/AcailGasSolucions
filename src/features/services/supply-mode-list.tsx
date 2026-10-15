import { Cylinder, Droplets, Flame, HeartPulse, Network } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { SupplyMode, SupplyModeId } from "@/types/content";

const icons: Record<SupplyModeId, LucideIcon> = {
  cylinders: Cylinder,
  liquid: Droplets,
  "industrial-networks": Network,
  "medical-networks": HeartPulse,
  "welding-equipment": Flame,
};

/** Compact list of supply modes (used on product and home pages). */
export function SupplyModeList({
  modes,
  tone = "light",
}: {
  modes: SupplyMode[];
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <ul
      className={
        dark
          ? "divide-y divide-white/10 border-y border-white/10"
          : "divide-y divide-steel-200 border-y border-steel-200"
      }
    >
      {modes.map((mode) => {
        const Icon = icons[mode.id];
        return (
          <li key={mode.id} className="grid grid-cols-[auto_1fr] gap-5 py-6" data-reveal>
            <span
              className={
                dark
                  ? "flex size-11 items-center justify-center rounded-sm border border-white/15 text-cryo-300"
                  : "flex size-11 items-center justify-center rounded-sm border border-steel-200 bg-steel-50 text-blue-600"
              }
            >
              <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
            </span>
            <div>
              <h3 className={dark ? "text-lg text-white" : "text-lg text-navy-900"}>
                {mode.title}
              </h3>
              <p
                className={
                  dark
                    ? "mt-1.5 text-[0.9375rem] leading-relaxed text-steel-300"
                    : "mt-1.5 text-[0.9375rem] leading-relaxed text-steel-600"
                }
              >
                {mode.summary}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export { icons as supplyModeIcons };
