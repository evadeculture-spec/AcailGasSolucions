import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Formula } from "@/components/ui/formula";
import { routes } from "@/lib/routes";
import type { ProductCategory, SubstanceId } from "@/types/content";

function distinctSubstances(category: ProductCategory, max = 5): SubstanceId[] {
  const ids = category.items.flatMap((item) => (item.substance ? [item.substance] : []));
  return [...new Set(ids)].slice(0, max);
}

/** Editorial index of the product categories. */
export function CategoryIndex({
  categories,
  headingLevel = "h3",
}: {
  categories: ProductCategory[];
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <Container>
      <ul className="border-t border-steel-200">
        {categories.map((category, position) => (
          <li
            key={category.slug}
            data-reveal
            style={{ "--reveal-delay": `${position * 60}ms` } as React.CSSProperties}
          >
            <Link
              href={routes.product(category.slug)}
              className="group grid gap-4 border-b border-steel-200 py-8 transition-colors duration-(--duration-base) hover:bg-steel-50 md:grid-cols-12 md:items-center md:gap-8 md:px-4 lg:py-10"
            >
              <span className="font-mono text-label text-blue-600 md:col-span-1">
                {category.index}
              </span>
              <div className="md:col-span-6 lg:col-span-5">
                <Heading className="text-h3 text-navy-900 transition-colors group-hover:text-blue-600">
                  {category.name}
                </Heading>
                <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-steel-600">
                  {category.summary}
                </p>
              </div>
              <div
                aria-hidden="true"
                className="flex flex-wrap gap-x-5 gap-y-1 font-display text-2xl text-steel-500 transition-colors group-hover:text-navy-800 md:col-span-4 lg:col-span-5 lg:justify-end"
              >
                {distinctSubstances(category).map((id) => (
                  <Formula key={id} substance={id} />
                ))}
              </div>
              <span className="hidden justify-end md:col-span-1 md:flex">
                <span className="flex size-11 items-center justify-center rounded-full border border-steel-300 transition-colors duration-(--duration-base) group-hover:border-navy-800 group-hover:bg-navy-800 group-hover:text-white">
                  <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
