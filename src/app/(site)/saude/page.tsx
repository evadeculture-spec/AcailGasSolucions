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
import { siteConfig } from "@/config/site";
import { getProductCategoryOrThrow } from "@/content/pt/products";
import { acailVision } from "@/content/pt/services";
import { ProductItems } from "@/features/products/product-items";
import { contactHref, routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Saúde",
  description:
    "Gases medicinais produzidos segundo as Boas Práticas de Fabrico para hospitais, clínicas, lares, INEM e bombeiros, gases dispositivo médico e gestão Acail Vision.",
  path: routes.health,
});

const users = ["Hospitais", "Clínicas", "Lares", "INEM", "Bombeiros"];

export default function HealthPage() {
  const medicinal = getProductCategoryOrThrow("gases-medicinais");
  const medicalDevice = getProductCategoryOrThrow("gases-dispositivo-medico");

  return (
    <>
      <PageHero
        eyebrow="Saúde"
        title="Gases medicinais com a pureza que a saúde exige."
        lead="Os gases medicinais são classificados como medicamentos e são produzidos segundo as Boas Práticas de Fabrico, com níveis elevados de pureza."
        breadcrumbs={[
          { name: "Início", path: routes.home },
          { name: "Saúde", path: routes.health },
        ]}
      >
        <ButtonLink href={contactHref("saude", "gases-medicinais")} tone="dark">
          Contactar a equipa de saúde
        </ButtonLink>
      </PageHero>

      <Section aria-labelledby="utilizadores">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6" data-reveal>
            <Eyebrow index="01" className="mb-5">
              Quem servimos
            </Eyebrow>
            <h2 id="utilizadores" className="text-h2 text-navy-900">
              Utilizados diariamente por quem presta cuidados de saúde.
            </h2>
            <ul className="mt-10 flex flex-wrap gap-2">
              {users.map((user) => (
                <li
                  key={user}
                  className="rounded-sm border border-steel-300 px-4 py-2.5 text-[0.9375rem] text-navy-900"
                >
                  {user}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <MediaPlaceholder brief="Rede de gases medicinais numa unidade de saúde." ratio="4/3" />
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

      <Section aria-labelledby="dispositivo-medico">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div data-reveal>
            <Eyebrow index="03" className="mb-5">
              Dispositivo médico
            </Eyebrow>
            <h2 id="dispositivo-medico" className="text-h2 text-navy-900">
              {medicalDevice.name}
            </h2>
            <p className="mt-6 text-lead text-steel-600">{medicalDevice.summary}</p>
            <ArrowLink href={routes.product(medicalDevice.slug)} className="mt-8">
              Ver gases dispositivo médico
            </ArrowLink>
          </div>
          <div className="rounded-sm bg-navy-800 p-8 text-white md:p-10" data-reveal>
            <Eyebrow tone="dark" className="mb-5">
              Gestão de redes e garrafas
            </Eyebrow>
            <h2 className="text-h3 text-white">{acailVision.name}</h2>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-steel-300">
              {acailVision.statement}
            </p>
            <ArrowLink href={routes.acailVision} tone="dark" className="mt-8">
              Conhecer o Acail Vision
            </ArrowLink>
          </div>
        </Container>
      </Section>

      <Section tone="muted" aria-labelledby="domicilio">
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7" data-reveal>
            <Eyebrow index="04" className="mb-5">
              Cuidados respiratórios domiciliários
            </Eyebrow>
            <h2 id="domicilio" className="text-h2 text-navy-900">
              Acail Medicare
            </h2>
            <p className="mt-6 max-w-2xl text-lead text-steel-600">
              A Acail Medicare acompanha o doente respiratório no domicílio, com apoio técnico
              durante todo o tratamento prescrito pelo médico.
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:justify-self-end">
            <ButtonLink href={siteConfig.links.medicare} variant="secondary">
              Visitar acailmedicare.pt
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Fornecimento de gases medicinais"
        body="Para unidades de saúde, lares e serviços de emergência. Indique as suas necessidades e a nossa equipa responde."
        primary={{ label: "Contactar", href: contactHref("saude", "gases-medicinais") }}
      />
    </>
  );
}
