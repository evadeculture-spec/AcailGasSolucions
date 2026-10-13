import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { BreadcrumbEntry } from "@/lib/seo/structured-data";

import { IsobarField } from "./isobar-field";

interface PageHeroProps {
  title: ReactNode;
  lead?: ReactNode;
  eyebrow?: string;
  index?: string;
  breadcrumbs: BreadcrumbEntry[];
  /** Optional element placed on the right on large screens (e.g. gas tiles). */
  aside?: ReactNode;
  children?: ReactNode;
}

/** Dark editorial header for internal pages. */
export function PageHero({
  title,
  lead,
  eyebrow,
  index,
  breadcrumbs,
  aside,
  children,
}: PageHeroProps) {
  return (
    <section className="dark-surface relative isolate overflow-hidden bg-navy-900">
      <div aria-hidden="true" className="tech-grid absolute inset-0 -z-10 opacity-60" />
      <IsobarField
        animated={false}
        className="absolute top-0 right-0 -z-10 h-full w-full opacity-40 md:w-3/4 lg:opacity-60"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-900 via-navy-900/90 to-navy-900/30"
      />
      <Container className="pt-8 pb-16 md:pt-10 md:pb-24">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            {eyebrow ? (
              <Eyebrow index={index} tone="dark" className="mb-6">
                {eyebrow}
              </Eyebrow>
            ) : null}
            <h1 className="text-h1 text-white">{title}</h1>
            {lead ? <p className="mt-6 max-w-2xl text-lead text-steel-300">{lead}</p> : null}
            {children ? <div className="mt-10 flex flex-wrap gap-4">{children}</div> : null}
          </div>
          {aside ? <div className="lg:col-span-4">{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}
