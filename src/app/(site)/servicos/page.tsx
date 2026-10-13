import type { Metadata } from "next";
import { Gauge, Radio } from "lucide-react";

import { CtaBand } from "@/components/sections/cta-band";
import { IsobarField } from "@/components/sections/isobar-field";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { Section } from "@/components/ui/section";
import { acailVision, supplyModes } from "@/content/pt/services";
import { supplyModeIcons } from "@/features/services/supply-mode-list";
import { contactHref, routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Serviços e Soluções",
  description:
    "Garrafas e quadros, líquidos criogénicos a granel, produção on-site de azoto, oxigénio e hidrogénio, equipamentos e telemetria Acail Vision.",
  path: routes.services,
});

const placeholders: Partial<Record<(typeof supplyModes)[number]["id"], string>> = {
  bulk: "Camião cisterna da frota Acail Gás e tanque criogénico instalado num cliente.",
  "on-site": "Unidade de produção on-site instalada nas instalações de um cliente.",
};

export default function ServicesPage() {
  const modes = supplyModes.filter((mode) => mode.id !== "telemetry");
  return (
    <>
      <PageHero
        eyebrow="Serviços e soluções"
        title="Sistemas de fornecimento à medida do consumo."
        lead="Da garrafa individual à produção nas instalações do cliente, a solução é dimensionada em função do volume, da pressão, do caudal e da utilização."
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

      <Section
        tone="dark"
        id="acail-vision"
        className="scroll-mt-16 overflow-hidden"
        aria-labelledby="acail-vision-title"
      >
        <IsobarField animated={false} className="absolute inset-0 h-full w-full opacity-30" />
        <Container className="relative grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6" data-reveal>
            <Eyebrow index="05" tone="dark" className="mb-5">
              Telemetria e gestão
            </Eyebrow>
            <h2 id="acail-vision-title" className="text-h1 text-white">
              {acailVision.name}
            </h2>
            <p className="mt-8 max-w-xl text-lead text-steel-300">{acailVision.statement}</p>
          </div>
          <div className="grid gap-px self-end overflow-hidden rounded-sm border border-white/12 bg-white/12 lg:col-span-5 lg:col-start-8">
            <div className="bg-navy-900 p-8">
              <Gauge aria-hidden="true" className="size-6 text-cryo-300" strokeWidth={1.4} />
              <h3 className="mt-6 text-xl text-white">Granel</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-steel-300">
                {acailVision.telemetry}
              </p>
            </div>
            <div className="bg-navy-900 p-8">
              <Radio aria-hidden="true" className="size-6 text-cryo-300" strokeWidth={1.4} />
              <h3 className="mt-6 text-xl text-white">Gases medicinais</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-steel-300">
                Gestão modular de redes e garrafas de gases medicinais, adaptada às necessidades de
                cada cliente.
              </p>
            </div>
          </div>
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
