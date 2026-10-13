import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Formula } from "@/components/ui/formula";
import { Section, SectionHeader } from "@/components/ui/section";
import { industries, industriesWithDetail } from "@/content/pt/industries";
import { IndustryIndex } from "@/features/industries/industry-index";
import { contactHref, routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Indústrias e Aplicações",
  description:
    "Gases para metalurgia, metalomecânica, soldadura, química, ambiente, laboratórios, indústria alimentar e outros setores.",
  path: routes.industries,
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Indústrias e aplicações"
        title="Gases para todas as indústrias."
        lead="Cada setor tem processos, requisitos de pureza e formas de consumo próprios. Conheça as principais aplicações dos nossos gases."
        breadcrumbs={[
          { name: "Início", path: routes.home },
          { name: "Indústrias", path: routes.industries },
        ]}
      />

      <Section aria-labelledby="setores-destaque">
        <SectionHeader
          id="setores-destaque"
          eyebrow="Aplicações em detalhe"
          index="01"
          title="Setores e processos"
        />
        <Container>
          <ul className="grid gap-px overflow-hidden rounded-sm border border-steel-200 bg-steel-200 md:grid-cols-2 xl:grid-cols-3">
            {industriesWithDetail.map((industry, index) => (
              <li
                key={industry.slug}
                className="bg-white"
                data-reveal
                style={{ "--reveal-delay": `${(index % 3) * 70}ms` } as React.CSSProperties}
              >
                <Link
                  href={routes.industry(industry.slug)}
                  className="group flex h-full flex-col p-7 transition-colors hover:bg-steel-50 md:p-9"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-h3 text-navy-900 group-hover:text-blue-600">
                      {industry.name}
                    </h3>
                    <ArrowUpRight
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="size-5 shrink-0 text-steel-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-600"
                    />
                  </div>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-steel-600">
                    {industry.detail.summary}
                  </p>
                  <p
                    aria-hidden="true"
                    className="mt-auto flex flex-wrap gap-x-4 pt-10 font-display text-xl text-steel-500 group-hover:text-navy-800"
                  >
                    {industry.detail.substances.map((id) => (
                      <Formula key={id} substance={id} />
                    ))}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="muted" aria-labelledby="todos-setores">
        <SectionHeader
          id="todos-setores"
          eyebrow="Setores servidos"
          index="02"
          title="Presença transversal"
          intro="Para além dos setores apresentados em detalhe, fornecemos gases para um vasto conjunto de atividades."
        />
        <Container>
          <IndustryIndex items={industries} />
        </Container>
      </Section>

      <CtaBand
        title="Fale-nos do seu processo."
        body="Descreva a aplicação, o consumo previsto e os requisitos de pureza. Indicamos o gás, a mistura e a forma de fornecimento adequados."
        primary={{ label: "Pedir informação técnica", href: contactHref("informacao-tecnica") }}
      />
    </>
  );
}
