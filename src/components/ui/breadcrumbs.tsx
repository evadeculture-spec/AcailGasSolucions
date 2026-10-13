import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { breadcrumbSchema, type BreadcrumbEntry } from "@/lib/seo/structured-data";

import { JsonLd } from "./json-ld";

/** Visual breadcrumbs plus BreadcrumbList structured data. The first entry should be the homepage. */
export function Breadcrumbs({ items }: { items: BreadcrumbEntry[] }) {
  return (
    <>
      <nav aria-label="Percurso de navegação">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.6875rem] tracking-[0.08em] text-steel-400 uppercase">
          {items.map((item, index) => {
            const last = index === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-steel-200">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link href={item.path} className="transition-colors hover:text-white">
                      {item.name}
                    </Link>
                    <ChevronRight aria-hidden="true" className="size-3" strokeWidth={1.5} />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(items)} />
    </>
  );
}
