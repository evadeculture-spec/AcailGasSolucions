import type { Metadata } from "next";

import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { distributorRegions } from "@/content/pt/distributors";
import { RegionList } from "@/features/distributors/region-list";
import { contactHref, routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Rede de Distribuidores",
  description:
    "Sede em Souto (Santa Maria da Feira) e pontos de distribuição em Portugal continental, Madeira, Açores e Espanha.",
  path: routes.distributors,
});

export default function DistributorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Rede de distribuidores"
        title="Proximidade em Portugal e Espanha."
        lead="Uma rede de pontos de distribuição no continente, nas regiões autónomas e em várias comunidades autónomas de Espanha."
        breadcrumbs={[
          { name: "Início", path: routes.home },
          { name: "Distribuidores", path: routes.distributors },
        ]}
      />
      <Section>
        <Container>
          <p className="mb-14 max-w-2xl text-lead text-steel-600">
            Para conhecer o ponto de distribuição mais próximo e os respetivos contactos, contacte a
            sede. A nossa equipa encaminha o seu pedido.
          </p>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
            {distributorRegions.map((region) => (
              <RegionList key={region.id} region={region} />
            ))}
          </div>
        </Container>
      </Section>
      <CtaBand
        title="Encontre o ponto de distribuição mais próximo."
        body="Indique a sua localidade e o tipo de gás de que necessita. Encaminhamos o pedido para o ponto de distribuição adequado."
        primary={{ label: "Contactar a sede", href: contactHref("distribuicao") }}
      />
    </>
  );
}
