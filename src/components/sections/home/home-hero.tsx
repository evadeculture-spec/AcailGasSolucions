import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Formula } from "@/components/ui/formula";
import { company } from "@/content/pt/company";
import { getSubstance } from "@/data/substances";
import { routes } from "@/lib/routes";
import type { SubstanceId } from "@/types/content";

import { IsobarField } from "../isobar-field";

const featuredGases: SubstanceId[] = [
  "oxygen",
  "nitrogen",
  "argon",
  "carbon-dioxide",
  "nitrous-oxide",
  "ozone",
  "propane",
  "acetylene",
];

export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="dark-surface relative isolate overflow-hidden bg-navy-900"
    >
      <div aria-hidden="true" className="tech-grid absolute inset-0 -z-10" />
      <IsobarField className="absolute inset-y-0 right-0 -z-10 h-full w-full opacity-70 lg:w-[72%]" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,var(--color-navy-900)_0%,rgb(8_23_43/0.92)_38%,rgb(8_23_43/0.35)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-navy-900 to-transparent"
      />

      <Container className="flex min-h-[min(calc(100svh-var(--spacing-header)),60rem)] flex-col justify-between gap-16 pt-16 pb-10 md:pt-24 lg:pt-28">
        <div className="max-w-4xl">
          <Eyebrow tone="dark" className="mb-8 animate-fade-up">
            Gases industriais · medicinais · alimentares · Angola
          </Eyebrow>
          <h1
            id="hero-title"
            className="animate-fade-up text-display text-white [animation-delay:80ms]"
          >
            Precisão industrial.
            <span className="block text-steel-400">Soluções que fazem avançar.</span>
          </h1>
          <p className="mt-8 max-w-2xl animate-fade-up text-lead text-steel-300 [animation-delay:160ms]">
            {company.intro} {company.statement}
          </p>
          <div className="mt-10 flex animate-fade-up flex-wrap gap-4 [animation-delay:240ms]">
            <ButtonLink href={routes.products} tone="dark">
              Conhecer as soluções
            </ButtonLink>
            <ButtonLink href={routes.contact} tone="dark" variant="secondary">
              Contactar
            </ButtonLink>
          </div>
        </div>

        <div className="animate-fade-up [animation-delay:360ms]">
          <p className="mb-4 font-mono text-label text-steel-400 uppercase">Gama de gases</p>
          <ul className="grid grid-cols-4 border-t border-white/12 sm:grid-cols-8">
            {featuredGases.map((id) => (
              <li key={id} className="border-b border-white/12 py-4 pr-3 sm:border-b-0">
                <Formula
                  substance={id}
                  className="block font-display text-2xl text-white md:text-[1.75rem]"
                />
                <span className="mt-1 block text-xs leading-tight text-steel-400">
                  {getSubstance(id).name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
