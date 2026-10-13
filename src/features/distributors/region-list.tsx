import { distributorKindLabels } from "@/content/pt/distributors";
import { cn } from "@/lib/utils";
import type { DistributorRegion } from "@/types/content";

export function RegionList({ region }: { region: DistributorRegion }) {
  return (
    <section aria-labelledby={`regiao-${region.id}`}>
      <div className="flex items-baseline justify-between gap-4 border-b border-navy-900 pb-4">
        <h2 id={`regiao-${region.id}`} className="text-h3 text-navy-900">
          {region.country}
        </h2>
        <span className="font-mono text-label text-steel-500">
          {String(region.locations.length).padStart(2, "0")} locais
        </span>
      </div>
      <p className="mt-4 text-[0.9375rem] text-steel-600">{region.description}</p>
      <ul className="mt-6">
        {region.locations.map((location) => {
          const highlighted = location.kind !== "ponto";
          return (
            <li
              key={`${location.locality}-${location.kind}`}
              className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-steel-200 py-4"
            >
              <div>
                <p className="font-medium text-steel-900">
                  {location.locality}
                  {location.name ? (
                    <span className="font-normal text-steel-500"> · {location.name}</span>
                  ) : null}
                </p>
                <p className="mt-0.5 text-sm text-steel-500">{location.area}</p>
              </div>
              <span
                className={cn(
                  "rounded-xs px-2 py-1 font-mono text-[0.6875rem] tracking-[0.06em] uppercase",
                  highlighted ? "bg-navy-800 text-white" : "bg-steel-100 text-steel-600",
                )}
              >
                {distributorKindLabels[location.kind]}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
