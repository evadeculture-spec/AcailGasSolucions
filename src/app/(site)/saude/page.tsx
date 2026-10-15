import type { Metadata } from "next";
import { Info } from "lucide-react";

import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { ArrowLink } from "@/components/ui/arrow-link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { Section, SectionHeader } from "@/components/ui/section";
import { getProductCategoryOrThrow } from "@/content/pt/products";
import { getSupplyMode } from "@/content/pt/services";
import { ProductItems } from "@/features/products/product-items";
import { contactHref, routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Saúde",
  description:
    "Gases medicinais de elevada pureza e redes de gases medicinais para hospitais e clínicas em Angola: oxigénio medicinal líquido, quadros e garrafas.",
  path: routes.health,
});

const routeSteps = [
  "Fonte exterior",
  "Rede de distribuição",
  "Enfermarias",
  "Blocos operatórios",
  "Salas de recobro",
];

export default function HealthPage() {
  const medicinal = getProductCategoryOrThrow("gases-medicinais");
  const networks = getSupplyMode("medical-networks");

  return (
    <>
      <PageHero
        eyebrow="Saúde"
        title="Gases medicinais da fonte à tomada."
        lead="Gases medicinais de elevada pureza e redes de gases medicinais para hospitais e clínicas, produzidos e instalados em Angola."
        breadcrumbs={[
          { name: "Início", path: routes.home },
          { name: "Saúde", path: routes.health },
        ]}
      >
        <ButtonLink href={contactHref("saude", "gases-medicinais")} tone="dark">
          Contactar o departamento de gás medicinal
        </ButtonLink>
      </PageHero>

      <Section aria-labelledby="pureza">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6" data-reveal>
            <Eyebrow index="01" className="mb-5">
              Pureza e continuidade
            </Eyebrow>
            <h2 id="pureza" className="text-h2 text-navy-900">
              O cuidado ao doente depende da pureza do gás e da continuidade do fornecimento.
            </h2>
            <p className="mt-6 text-lead text-steel-600">
              Por isso, a pureza deve manter-se ao longo de toda a rede, desde a fonte até à tomada
              de utilização.
            </p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <MediaPlaceholder
              brief="Rede de gases medicinais numa unidade de saúde em Angola."
              ratio="4/3"
            />
          </div>
        </Container>
      </Section>

      <Section tone="muted" aria-labelledby="gases-medicinais">
        <SectionHeader
          id="gases-medicinais"
          eyebrow="Gases medicinais"
          index="02"
          title="Gama de gases medicinais"
          action={
            <ArrowLink href={routes.product(medicinal.slug)}>Ver página de produto</ArrowLink>
          }
        />
        <Container>
          <ProductItems items={medicinal.items} />
          {medicinal.regulatory?.map((note) => (
            <p key={note} className="mt-8 flex gap-3 text-[0.9375rem] text-steel-700">
              <Info
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-blue-600"
                strokeWidth={1.6}
              />
              {note}
            </p>
          ))}
        </Container>
      </Section>

      <Section tone="dark" aria-labelledby="redes-medicinais">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <Eyebrow index="03" tone="dark" className="mb-5">
              Redes de gases medicinais
            </Eyebrow>
            <h2 id="redes-medicinais" className="text-h2 text-white">
              Uma rede adaptada a cada clínica ou hospital.
            </h2>
            <p className="mt-6 text-lead text-steel-300">{networks.summary}</p>
            <ArrowLink href={routes.medicalNetworks} tone="dark" className="mt-8">
              Ver serviço de redes
            </ArrowLink>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <ol className="border-t border-white/12">
              {routeSteps.map((step, index) => (
                <li
                  key={step}
                  className="flex items-baseline gap-6 border-b border-white/12 py-5"
                  data-reveal
                >
                  <span aria-hidden="true" className="font-mono text-label text-cryo-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-2xl text-white">{step}</span>
                </li>
              ))}
            </ol>
            <ul className="mt-8 flex flex-wrap gap-2">
              {networks.points.map((point) => (
                <li
                  key={point}
                  className="rounded-sm border border-white/20 px-4 py-2 text-sm text-steel-200"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Fornecimento de gases medicinais"
        body="Para hospitais e clínicas. Indique as suas necessidades de gases medicinais ou o projeto de rede e a nossa equipa responde."
        primary={{ label: "Contactar", href: contactHref("saude", "gases-medicinais") }}
      />
    </>
  );
}
