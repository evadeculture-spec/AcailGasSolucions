import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import type { Industry } from "@/types/content";

/** All sectors; those with verified detail content link to a dedicated page. */
export function IndustryIndex({
  items,
  tone = "light",
}: {
  items: Industry[];
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <ul
      className={cn(
        "grid border-t sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3",
        dark ? "border-white/10" : "border-steel-200",
      )}
    >
      {items.map((industry) => {
        const rowClass = cn(
          "flex min-h-18 items-center justify-between gap-4 border-b py-4 pr-2 text-lg",
          dark ? "border-white/10" : "border-steel-200",
        );
        return (
          <li key={industry.slug}>
            {industry.detail ? (
              <Link
                href={routes.industry(industry.slug)}
                className={cn(
                  rowClass,
                  "group transition-colors",
                  dark ? "text-white hover:text-cryo-300" : "text-navy-900 hover:text-blue-600",
                )}
              >
                <span className="font-display">{industry.name}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="size-5 shrink-0 transition-transform duration-(--duration-base) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            ) : (
              <span
                className={cn(rowClass, "font-display", dark ? "text-steel-400" : "text-steel-500")}
              >
                {industry.name}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
