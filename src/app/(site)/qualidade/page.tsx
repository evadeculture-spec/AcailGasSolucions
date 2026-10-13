import type { Metadata } from "next";
import { FileText, FlaskConical, ShieldCheck } from "lucide-react";

import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { verifiedCertifications } from "@/content/pt/company";
import { siteConfig } from "@/config/site";
import { contactHref, routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Qualidade e Segurança",
  description:
    "Gases medicinais produzidos segundo as Boas Práticas de Fabrico, Fichas de Dados de Segurança e informação ao público sobre prevenção de acidentes graves.",
  path: routes.quality,
});

const commitments = [
  {
    icon: FlaskConical,
    title: "Boas Práticas de Fabrico",
    body: "Os gases medicinais são classificados como medicamentos e são produzidos segundo as Boas Práticas de Fabrico, com níveis elevados de pureza.",
  },
  {
    icon: FileText,
    title: "Fichas de Dados de Segurança",
    body: "As Fichas de Dados de Segurança são elaboradas de acordo com o Regulamento (UE) 2020/878 e identificam perigos, utilizações e medidas de manuseamento seguro.",
  },
  {
    icon: ShieldCheck,
    title: "Prevenção de acidentes graves",
    body: "O estabelecimento está abrangido pelo regime de prevenção de acidentes graves (Decreto-Lei n.º 150/2015, de 5 de agosto), com informação ao público disponível.",
  },
];

export default function QualityPage() {
  return (
    <>
      <PageHero
        eyebrow="Qualidade e segurança"
        title="Qualidade com rigor documentado."
        lead="A produção e o fornecimento de gases exigem controlo de pureza, documentação técnica e segurança em todas as etapas."
        breadcrumbs={[
          { name: "Início", path: routes.home },
          { name: "Qualidade e segurança", path: routes.quality },
        ]}
      />

      <Section aria-labelledby="compromissos">
        <Container>
          <Eyebrow index="01" className="mb-5">
            Compromissos
          </Eyebrow>
          <h2 id="compromissos" className="sr-only">
            Compromissos de qualidade e segurança
          </h2>
          <ul className="grid gap-px overflow-hidden rounded-sm border border-steel-200 bg-steel-200 lg:grid-cols-3">
            {commitments.map((item) => (
              <li key={item.title} className="bg-white p-8 md:p-10" data-reveal>
                <item.icon aria-hidden="true" className="size-7 text-blue-600" strokeWidth={1.4} />
                <h3 className="mt-10 text-h3 text-navy-900">{item.title}</h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-steel-600">{item.body}</p>
              </li>
            ))}
          </ul>

          {verifiedCertifications.length > 0 ? (
            <div className="mt-16">
              <h2 className="text-h3 text-navy-900">Certificações</h2>
              <ul className="mt-6 flex flex-wrap gap-4">
                {verifiedCertifications.map((certification) => (
                  <li
                    key={certification.name}
                    className="rounded-sm border border-steel-200 px-5 py-4"
                  >
                    <p className="font-display text-xl text-navy-900">{certification.name}</p>
                    {certification.scope ? (
                      <p className="mt-1 text-sm text-steel-600">{certification.scope}</p>
                    ) : null}
                    {certification.issuer ? (
                      <p className="text-sm text-steel-500">{certification.issuer}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Container>
      </Section>

      <Section tone="muted" aria-labelledby="documentacao">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div data-reveal>
            <Eyebrow index="02" className="mb-5">
              Documentação técnica
            </Eyebrow>
            <h2 id="documentacao" className="text-h2 text-navy-900">
              Fichas técnicas e de segurança
            </h2>
            <p className="mt-6 max-w-lg text-lead text-steel-600">
              A ficha técnica e a Ficha de Dados de Segurança de cada gás ou mistura podem ser
              solicitadas à nossa equipa.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href={contactHref("fds")}>Pedir Ficha de Dados de Segurança</ButtonLink>
            </div>
          </div>
          <div className="rounded-sm border border-steel-200 bg-white p-8 md:p-10" data-reveal>
            <p className="font-mono text-label text-steel-500 uppercase">Informação ao público</p>
            <h3 className="mt-4 text-h3 text-navy-900">Regime de prevenção de acidentes graves</h3>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-steel-600">
              Informação a comunicar ao público sobre o estabelecimento da Acail Gás, nos termos do
              Decreto-Lei n.º 150/2015, de 5 de agosto (documento de março de 2025).
            </p>
            <ButtonLink
              href={siteConfig.links.publicSafetyInfo}
              variant="secondary"
              className="mt-8"
            >
              Consultar documento (PDF)
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Precisa de documentação técnica?"
        body="Indique o gás ou a mistura e a utilização prevista. A nossa equipa envia a documentação aplicável."
        primary={{ label: "Pedir documentação", href: contactHref("fds") }}
      />
    </>
  );
}
