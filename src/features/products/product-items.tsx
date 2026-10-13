import { CircleAlert } from "lucide-react";

import { Formula } from "@/components/ui/formula";
import { GasTile, ShoulderSwatch } from "@/components/ui/gas-tile";
import { getSubstance } from "@/data/substances";
import type { ProductItem } from "@/types/content";

const termClass = "font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-steel-500";

/** Technical product rows: periodic-style tile, description and reference data. */
export function ProductItems({ items }: { items: ProductItem[] }) {
  return (
    <ul className="border-t border-steel-200">
      {items.map((item) => (
        <li
          key={`${item.name}-${item.variant ?? ""}`}
          className="grid gap-6 border-b border-steel-200 py-8 sm:grid-cols-[8.5rem_1fr] md:gap-10 lg:grid-cols-[9.5rem_1fr_18rem]"
          data-reveal
        >
          {item.substance ? (
            <GasTile
              substance={item.substance}
              showSwatch={item.cylinder !== false}
              showCas={false}
              className="max-w-[9.5rem]"
            />
          ) : (
            <span />
          )}
          <div className="flex flex-col gap-3">
            <h3 className="text-h3 text-navy-900">{item.name}</h3>
            {item.variant ? <p className="text-sm text-steel-500">{item.variant}</p> : null}
            {item.description ? (
              <p className="max-w-xl text-[0.9375rem] leading-relaxed text-steel-700">
                {item.description}
              </p>
            ) : null}
            {item.notice ? (
              <p className="mt-1 flex max-w-xl gap-2.5 rounded-sm border border-blue-500/25 bg-blue-100/60 p-3 text-sm text-navy-800">
                <CircleAlert
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-blue-600"
                  strokeWidth={1.75}
                />
                {item.notice}
              </p>
            ) : null}
          </div>
          {item.substance ? (
            <dl className="grid h-fit grid-cols-[6rem_1fr] gap-x-4 gap-y-3 text-sm sm:col-start-2 lg:col-start-auto">
              <SubstanceFacts item={item} />
            </dl>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function SubstanceFacts({ item }: { item: ProductItem }) {
  if (!item.substance) return null;
  const substance = getSubstance(item.substance);
  return (
    <>
      <dt className={termClass}>Fórmula</dt>
      <dd className="text-steel-800">
        <Formula substance={item.substance} />
      </dd>
      {substance.cas ? (
        <>
          <dt className={termClass}>N.º CAS</dt>
          <dd className="text-steel-800">{substance.cas}</dd>
        </>
      ) : null}
      {item.cylinder !== false ? (
        <>
          <dt className={termClass}>Ogiva</dt>
          <dd className="flex items-center gap-2 text-steel-800">
            <ShoulderSwatch substance={item.substance} />
            {substance.shoulder.map((colour) => colour.label).join(" / ")}
          </dd>
        </>
      ) : null}
    </>
  );
}
