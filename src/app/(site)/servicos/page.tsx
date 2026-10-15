import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { Section } from "@/components/ui/section";
import { supplyModes } from "@/content/pt/services";
import { supplyModeIcons } from "@/features/services/supply-mode-list";
import { contactHref, routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Serviços e Soluções",
  description:
    "Garrafas e quadros, fornecimento a granel, redes de gases industriais e medicinais e material de soldadura e corte, em Luanda.",
  path: routes.services,
});

const placeholders: Partial<Record<(typeof supplyModes)[number]["id"], string>> = {
  "industrial-networks": "Rede de gases industriais instalada pela Acail numa unidade industrial.",
  "medical-networks": "Rede de gases medicinais numa unidade de saúde.",
};

export default function ServicesPage() {
  const modes = supplyModes;
  return (
    <>
      <PageHero
        eyebrow="Serviços e soluções"
        title="Fornecimento e redes de gases à medida."
        lead="Da garrafa individual à rede de gases de uma unidade industrial ou hospitalar: fornecimento, projeto, instalação e manutenção."
        breadcrumbs={[
          { name: "Início", path: routes.home },
          { name: "Serviços", path: routes.services },
        ]}
      />

      <Section aria-label="Formas de fornecimento">
        <Container className="space-y-24 md:space-y-32">
          {modes.map((mode, index) => {
            const Icon = supplyModeIcons[mode.id];
            const reversed = index % 2 === 1;
            const placeholder = placeholders[mode.id];
            return (
              <article
                key={mode.id}
                id={mode.id}
                aria-labelledby={`${mode.id}-title`}
                className="grid scroll-mt-28 gap-10 lg:grid-cols-12 lg:items-center"
              >
                <div
                  className={reversed ? "lg:order-2 lg:col-span-5 lg:col-start-8" : "lg:col-span-5"}
                  data-reveal
                >
                  <div className="flex items-center gap-4">
                    <span className="flex size-12 items-center justify-center rounded-sm bg-navy-800 text-cryo-300">
                      <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
                    </span>
                    <span className="font-mono text-label text-blue-600">{mode.index}</span>
                  </div>
                  <h2 id={`${mode.id}-title`} className="mt-8 text-h2 text-navy-900">
                    {mode.title}
                  </h2>
                  <p className="mt-5 text-lead text-steel-600">{mode.summary}</p>
                </div>
                <div
                  className={reversed ? "lg:order-1 lg:col-span-6" : "lg:col-span-6 lg:col-start-7"}
                >
                  {placeholder ? (
                    <MediaPlaceholder brief={placeholder} ratio="16/9" className="mb-8" />
                  ) : null}
                  <ul className="border-t border-steel-200">
                    {mode.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-4 border-b border-steel-200 py-4 text-[1.0625rem] text-steel-800"
                      >
                        <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-blue-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </Container>
      </Section>

      <CtaBand
        title="Dimensionamos a solução consigo."
        body="Indique o gás, o consumo estimado e as condições de utilização. Propomos a forma de fornecimento adequada."
        primary={{ label: "Pedir proposta", href: contactHref("proposta") }}
      />
    </>
  );
}
