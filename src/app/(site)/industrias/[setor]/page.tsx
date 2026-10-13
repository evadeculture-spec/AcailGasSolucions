import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ApplicationsGrid } from "@/components/sections/applications-grid";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { GasTile } from "@/components/ui/gas-tile";
import { Section } from "@/components/ui/section";
import { getIndustry, industriesWithDetail } from "@/content/pt/industries";
import { getSubstance } from "@/data/substances";
import { getProductCategoryOrThrow } from "@/content/pt/products";
import { contactHref, routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return industriesWithDetail.map((industry) => ({ setor: industry.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/industrias/[setor]">): Promise<Metadata> {
  const { setor } = await params;
  const industry = getIndustry(setor);
  if (!industry?.detail) return {};
  return buildMetadata({ ...industry.detail.seo, path: routes.industry(industry.slug) });
}

export default async function IndustryPage({ params }: PageProps<"/industrias/[setor]">) {
  const { setor } = await params;
  const industry = getIndustry(setor);
  if (!industry?.detail) notFound();
  const { detail } = industry;
  const others = industriesWithDetail.filter((item) => item.slug !== industry.slug);

  return (
    <>
      <PageHero
        eyebrow="Indústrias"
        title={industry.name}
        lead={detail.summary}
        breadcrumbs={[
          { name: "Início", path: routes.home },
          { name: "Indústrias", path: routes.industries },
          { name: industry.name, path: routes.industry(industry.slug) },
        ]}
      />

      <Section aria-labelledby="contexto">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6" data-reveal>
            <Eyebrow index="01" className="mb-5">
              Contexto
            </Eyebrow>
            <h2 id="contexto" className="text-h2 text-navy-900">
              O papel dos gases
            </h2>
            <p className="mt-6 text-lead text-steel-600">{detail.intro}</p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <h2 className="font-mono text-label text-steel-500 uppercase">Gases utilizados</h2>
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
              {detail.substances.map((id) => (
                <li key={id}>
                  <GasTile substance={id} name={getSubstance(id).name} />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tone="dark" aria-labelledby="aplicacoes">
        <Container>
          <Eyebrow index="02" tone="dark" className="mb-5">
            Aplicações
          </Eyebrow>
          <h2 id="aplicacoes" className="mb-14 text-h2 text-white">
            Processos e aplicações
          </h2>
          <ApplicationsGrid items={detail.applications} tone="dark" />
        </Container>
      </Section>

      <Section aria-labelledby="produtos-relacionados">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow index="03" className="mb-5">
              Produtos
            </Eyebrow>
            <h2 id="produtos-relacionados" className="text-h2 text-navy-900">
              Categorias relacionadas
            </h2>
          </div>
          <ul className="space-y-4 lg:col-span-6 lg:col-start-7">
            {detail.categories.map((slug) => {
              const category = getProductCategoryOrThrow(slug);
              return (
                <li key={slug} className="border-b border-steel-200 pb-6">
                  <ArrowLink href={routes.product(slug)} className="text-lg">
                    {category.name}
                  </ArrowLink>
                  <p className="mt-2 text-[0.9375rem] text-steel-600">{category.summary}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      <nav aria-label="Outros setores" className="border-t border-steel-200 bg-steel-50 py-12">
        <Container>
          <p className="font-mono text-label text-steel-500 uppercase">Outros setores</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {others.map((item) => (
              <li key={item.slug}>
                <Link
                  href={routes.industry(item.slug)}
                  className="inline-flex min-h-10 items-center rounded-sm border border-steel-300 bg-white px-4 text-[0.9375rem] text-navy-900 transition-colors hover:border-navy-800 hover:bg-navy-800 hover:text-white"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      <CtaBand
        title={`Soluções para ${industry.name.toLowerCase()}`}
        body="Descreva o seu processo e os requisitos de consumo. A nossa equipa indica o gás e a forma de fornecimento adequados."
        primary={{ label: "Contactar a equipa técnica", href: contactHref("informacao-tecnica") }}
      />
    </>
  );
}
