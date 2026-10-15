import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";

import { ApplicationsGrid } from "@/components/sections/applications-grid";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { ArrowLink } from "@/components/ui/arrow-link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { GasTile } from "@/components/ui/gas-tile";
import { Section, SectionHeader } from "@/components/ui/section";
import { getIndustry } from "@/content/pt/industries";
import { getProductCategory, productCategories } from "@/content/pt/products";
import { getSupplyMode } from "@/content/pt/services";
import { ProductItems } from "@/features/products/product-items";
import { SupplyModeList } from "@/features/services/supply-mode-list";
import { contactHref, routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import type { ProductCategory } from "@/types/content";

export function generateStaticParams() {
  return productCategories.map((category) => ({ categoria: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/produtos/[categoria]">): Promise<Metadata> {
  const { categoria } = await params;
  const category = getProductCategory(categoria);
  if (!category) return {};
  return buildMetadata({ ...category.seo, path: routes.product(category.slug) });
}

function heroTiles(category: ProductCategory) {
  const seen = new Set<string>();
  return category.items
    .filter((item) => {
      if (!item.substance || seen.has(item.substance)) return false;
      seen.add(item.substance);
      return true;
    })
    .slice(0, 4);
}

export default async function ProductCategoryPage({ params }: PageProps<"/produtos/[categoria]">) {
  const { categoria } = await params;
  const category = getProductCategory(categoria);
  if (!category) notFound();

  const position = productCategories.indexOf(category);
  const previous =
    productCategories[(position - 1 + productCategories.length) % productCategories.length];
  const next = productCategories[(position + 1) % productCategories.length];
  const tiles = heroTiles(category);
  const modes = category.supplyModes.map(getSupplyMode);
  const hasApplications = category.applications.length > 0;
  const relatedIndustries = category.industries.flatMap((slug) => {
    const industry = getIndustry(slug);
    return industry ? [industry] : [];
  });

  return (
    <>
      <PageHero
        eyebrow={`Produtos · ${category.index}`}
        title={category.name}
        lead={category.summary}
        breadcrumbs={[
          { name: "Início", path: routes.home },
          { name: "Produtos", path: routes.products },
          { name: category.name, path: routes.product(category.slug) },
        ]}
        aside={
          <ul
            aria-label="Gases principais"
            className={tiles.length > 1 ? "grid grid-cols-2 gap-3" : "grid max-w-56 gap-3"}
          >
            {tiles.map((item) =>
              item.substance ? (
                <li key={item.substance}>
                  <GasTile
                    substance={item.substance}
                    name={item.name}
                    tone="dark"
                    showSwatch={item.cylinder !== false}
                  />
                </li>
              ) : null,
            )}
          </ul>
        }
      >
        <ButtonLink href={contactHref("proposta", category.slug)} tone="dark">
          Pedir proposta
        </ButtonLink>
        <ButtonLink
          href={contactHref("informacao-tecnica", category.slug)}
          tone="dark"
          variant="secondary"
        >
          Pedir informação técnica
        </ButtonLink>
      </PageHero>

      <Section aria-labelledby="gama">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow index="01" className="mb-5">
              Gama
            </Eyebrow>
            <h2 id="gama" className="text-h2 text-navy-900">
              Produtos
            </h2>
          </div>
          <div className="prose-editorial lg:col-span-7 lg:col-start-6">
            {category.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>

        {category.regulatory ? (
          <Container className="mt-10">
            {category.regulatory.map((note) => (
              <p
                key={note}
                className="flex gap-3 rounded-sm border border-blue-500/25 bg-blue-100/60 p-5 text-[0.9375rem] text-navy-800"
              >
                <Info
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-blue-600"
                  strokeWidth={1.6}
                />
                {note}
              </p>
            ))}
          </Container>
        ) : null}

        <Container className="mt-12">
          <ProductItems items={category.items} />
          <p className="mt-6 text-sm text-steel-600">{category.onRequestNote}</p>
        </Container>

        {category.mixtures ? (
          <Container className="mt-16">
            <div
              className="grid gap-8 rounded-sm bg-steel-50 p-8 md:p-12 lg:grid-cols-12"
              data-reveal
            >
              <div className="lg:col-span-5">
                <h3 className="text-h3 text-navy-900">{category.mixtures.title}</h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-steel-600">
                  {category.mixtures.description}
                </p>
                <ArrowLink href={contactHref("informacao-tecnica", category.slug)} className="mt-6">
                  Pedir informação técnica
                </ArrowLink>
              </div>
              <div
                role="region"
                aria-label={category.mixtures.title}
                tabIndex={0}
                className="overflow-x-auto lg:col-span-7 lg:col-start-6"
              >
                <table className="w-full min-w-[34rem] text-left text-sm">
                  <caption className="sr-only">{category.mixtures.title}</caption>
                  <thead>
                    <tr className="border-b border-steel-300 font-mono text-[0.6875rem] tracking-[0.08em] text-steel-500 uppercase">
                      <th scope="col" className="py-3 pr-4 font-normal">
                        Mistura
                      </th>
                      <th scope="col" className="py-3 pr-4 font-normal">
                        Composição
                      </th>
                      <th scope="col" className="py-3 font-normal">
                        Utilização
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.mixtures.entries.map((entry) => (
                      <tr key={entry.name} className="border-b border-steel-200 align-top">
                        <th scope="row" className="py-3 pr-4 font-mono font-medium text-navy-900">
                          {entry.name}
                        </th>
                        <td className="py-3 pr-4 text-steel-700">
                          {entry.composition ?? "—"}
                          {entry.standard ? (
                            <span className="block text-xs text-steel-500">{entry.standard}</span>
                          ) : null}
                        </td>
                        <td className="py-3 text-steel-700">{entry.use ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Container>
        ) : null}
      </Section>

      {hasApplications ? (
        <Section tone="dark" aria-labelledby="aplicacoes">
          <SectionHeader
            id="aplicacoes"
            tone="dark"
            eyebrow="Aplicações"
            index="02"
            title="Onde são utilizados"
          />
          <Container>
            <ApplicationsGrid items={category.applications} tone="dark" />
          </Container>
        </Section>
      ) : null}

      {modes.length > 0 || relatedIndustries.length > 0 ? (
        <Section aria-labelledby="fornecimento">
          <Container className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Eyebrow index={hasApplications ? "03" : "02"} className="mb-5">
                Fornecimento
              </Eyebrow>
              <h2 id="fornecimento" className="text-h2 text-navy-900">
                Formas de fornecimento
              </h2>
              <div className="mt-10">
                <SupplyModeList modes={modes} />
              </div>
              <ArrowLink href={routes.services} className="mt-8">
                Ver todos os serviços
              </ArrowLink>
            </div>
            {relatedIndustries.length > 0 ? (
              <div className="lg:col-span-5 lg:col-start-8">
                <h2 className="font-mono text-label text-steel-500 uppercase">
                  Indústrias relacionadas
                </h2>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {relatedIndustries.map((industry) => (
                    <li key={industry.slug}>
                      {industry.detail ? (
                        <Link
                          href={routes.industry(industry.slug)}
                          className="inline-flex min-h-10 items-center rounded-sm border border-steel-300 px-4 text-[0.9375rem] text-navy-900 transition-colors hover:border-navy-800 hover:bg-navy-800 hover:text-white"
                        >
                          {industry.name}
                        </Link>
                      ) : (
                        <span className="inline-flex min-h-10 items-center rounded-sm bg-steel-100 px-4 text-[0.9375rem] text-steel-600">
                          {industry.name}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Container>
        </Section>
      ) : null}

      <nav aria-label="Outras categorias de produto" className="border-t border-steel-200 bg-white">
        <Container className="grid sm:grid-cols-2">
          <Link
            href={routes.product(previous.slug)}
            className="group flex items-center gap-4 border-b border-steel-200 py-8 sm:border-r sm:border-b-0 sm:pr-8"
          >
            <ArrowLeft
              aria-hidden="true"
              className="size-5 text-blue-600 transition-transform group-hover:-translate-x-1"
              strokeWidth={1.5}
            />
            <span>
              <span className="block font-mono text-label text-steel-500 uppercase">Anterior</span>
              <span className="mt-1 block font-display text-xl text-navy-900 group-hover:text-blue-600">
                {previous.name}
              </span>
            </span>
          </Link>
          <Link
            href={routes.product(next.slug)}
            className="group flex items-center justify-end gap-4 py-8 text-right sm:pl-8"
          >
            <span>
              <span className="block font-mono text-label text-steel-500 uppercase">Seguinte</span>
              <span className="mt-1 block font-display text-xl text-navy-900 group-hover:text-blue-600">
                {next.name}
              </span>
            </span>
            <ArrowRight
              aria-hidden="true"
              className="size-5 text-blue-600 transition-transform group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
        </Container>
      </nav>

      <CtaBand
        title={`Pedido de proposta · ${category.name}`}
        body="Indique o gás, a quantidade estimada e a forma de fornecimento pretendida. A nossa equipa contacta-o com uma proposta."
        primary={{ label: "Pedir proposta", href: contactHref("proposta", category.slug) }}
      />
    </>
  );
}
