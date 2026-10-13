import type { Metadata } from "next";

import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { Section, SectionHeader } from "@/components/ui/section";
import { company, milestones } from "@/content/pt/company";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "A Empresa",
  description:
    "Fundada em 1996 e integrada no Grupo Acail, a Acail Gás produz, comercializa e distribui gases industriais, medicinais e alimentares.",
  path: routes.company,
});

export default function CompanyPage() {
  return (
    <>
      <PageHero
        eyebrow="A Empresa"
        title="Produção de gás a alta pressão, desde 1996."
        lead={company.intro}
        breadcrumbs={[
          { name: "Início", path: routes.home },
          { name: "A Empresa", path: routes.company },
        ]}
      />

      <Section aria-labelledby="quem-somos">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6" data-reveal>
            <Eyebrow index="01" className="mb-5">
              Quem somos
            </Eyebrow>
            <h2 id="quem-somos" className="text-h2 text-navy-900">
              Uma gama completa de gases atmosféricos e gases específicos para cada indústria.
            </h2>
            <div className="prose-editorial mt-8">
              <p>{company.origin}</p>
              <p>{company.statement}</p>
              <p>{company.group}</p>
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-steel-200 pt-8">
              <div>
                <dt className="font-mono text-label text-steel-500 uppercase">Fundação</dt>
                <dd className="mt-2 font-display text-3xl text-navy-900">1996</dd>
              </div>
              <div>
                <dt className="font-mono text-label text-steel-500 uppercase">
                  CAE {company.activityCode.code}
                </dt>
                <dd className="mt-2 text-steel-800">{company.activityCode.label}</dd>
              </div>
            </dl>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <MediaPlaceholder
              ratio="3/4"
              brief="Instalações de produção da Acail Gás em Souto, Santa Maria da Feira."
            />
          </div>
        </Container>
      </Section>

      <Section tone="navy" aria-labelledby="missao">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <Eyebrow index="02" tone="dark" className="mb-5">
              Missão
            </Eyebrow>
            <h2 id="missao" className="text-h2 text-white">
              {company.mission}
            </h2>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            <div>
              <h3 className="font-mono text-label text-steel-400 uppercase">Valores</h3>
              <ul className="mt-5 space-y-2">
                {company.values.map((value) => (
                  <li key={value} className="font-display text-3xl tracking-[-0.02em] text-white">
                    {value}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-label text-steel-400 uppercase">
                Pilares do Grupo Acail
              </h3>
              <ul className="mt-5 space-y-3 text-lg text-steel-200">
                {company.pillars.map((pillar) => (
                  <li key={pillar} className="flex items-center gap-3">
                    <span aria-hidden="true" className="h-px w-4 bg-cryo-400" />
                    {pillar}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="historia" aria-labelledby="historia-title">
        <SectionHeader
          id="historia-title"
          eyebrow="História e identidade"
          index="03"
          title="Um percurso construído com visão empreendedora."
          intro="Marcos confirmados do percurso da Acail Gás em Portugal e Espanha."
        />
        <Container>
          <ol className="relative grid gap-px overflow-hidden rounded-sm border border-steel-200 bg-steel-200 md:grid-cols-2 lg:grid-cols-4">
            {milestones.map((milestone) => (
              <li key={milestone.title} className="flex flex-col bg-white p-6 md:p-8" data-reveal>
                <span className="font-display text-4xl tracking-[-0.03em] text-blue-600">
                  {milestone.year ?? "—"}
                </span>
                <h3 className="mt-8 text-lg text-navy-900">{milestone.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-steel-600">
                  {milestone.body}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
            <ArrowLink href={routes.distributors}>
              Rede de distribuidores em Portugal e Espanha
            </ArrowLink>
            <ArrowLink href={routes.quality}>Qualidade e segurança</ArrowLink>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
