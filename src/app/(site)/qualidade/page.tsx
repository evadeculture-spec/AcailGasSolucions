import type { Metadata } from "next";
import { FileCheck2, Network, ShieldCheck } from "lucide-react";

import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { company, verifiedCertifications } from "@/content/pt/company";
import { contactHref, routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Qualidade e Certificação",
  description:
    "Certificação ISO 22000:2018 para azoto, oxigénio e dióxido de carbono alimentares e compromisso com a qualidade, a segurança e o ambiente.",
  path: routes.quality,
});

const commitments = [
  {
    icon: FileCheck2,
    title: "Segurança alimentar",
    body: "A produção, comercialização e distribuição de azoto, oxigénio e dióxido de carbono para a indústria alimentar está certificada segundo a ISO 22000:2018.",
  },
  {
    icon: ShieldCheck,
    title: "Qualidade, segurança e ambiente",
    body: company.mission,
  },
  {
    icon: Network,
    title: "Redes de gases",
    body: "As redes de gases industriais e medicinais são concebidas segundo normas internacionais, com instalações de elevada segurança, inspeção e manutenção.",
  },
];

export default function QualityPage() {
  return (
    <>
      <PageHero
        eyebrow="Qualidade e certificação"
        title="Qualidade certificada."
        lead="A produção e o fornecimento de gases exigem pureza, segurança e controlo em todas as etapas, da fábrica à tomada de utilização."
        breadcrumbs={[
          { name: "Início", path: routes.home },
          { name: "Qualidade e certificação", path: routes.quality },
        ]}
      />

      <Section aria-labelledby="certificacoes">
        <Container>
          <Eyebrow index="01" className="mb-5">
            Certificação
          </Eyebrow>
          <h2 id="certificacoes" className="text-h2 text-navy-900">
            Certificações
          </h2>
          <ul className="mt-10 grid gap-6 lg:grid-cols-2">
            {verifiedCertifications.map((certification) => (
              <li
                key={certification.name}
                className="flex flex-col rounded-sm border border-steel-200 bg-white p-8 md:p-10"
                data-reveal
              >
                <p className="font-display text-4xl tracking-[-0.02em] text-navy-900">
                  {certification.name}
                </p>
                {certification.scope ? (
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-steel-600">
                    {certification.scope}
                  </p>
                ) : null}
                {certification.issued ? (
                  <p className="mt-4 font-mono text-label text-steel-500 uppercase">
                    Emitido em {certification.issued}
                  </p>
                ) : null}
                {certification.documentUrl ? (
                  <ButtonLink
                    href={certification.documentUrl}
                    variant="secondary"
                    className="mt-8 self-start"
                  >
                    Ver certificado (PDF)
                  </ButtonLink>
                ) : null}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="muted" aria-labelledby="compromissos">
        <Container>
          <Eyebrow index="02" className="mb-5">
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
        </Container>
      </Section>

      <CtaBand
        title="Precisa de documentação técnica?"
        body="Indique o gás ou a mistura e a utilização prevista. A nossa equipa envia a informação aplicável."
        primary={{ label: "Pedir informação técnica", href: contactHref("informacao-tecnica") }}
      />
    </>
  );
}
