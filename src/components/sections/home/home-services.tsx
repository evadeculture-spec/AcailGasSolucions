import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { supplyModes } from "@/content/pt/services";
import { SupplyModeList } from "@/features/services/supply-mode-list";
import { routes } from "@/lib/routes";

export function HomeServices() {
  return (
    <Section aria-labelledby="servicos-title">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--spacing-header)+3rem)]" data-reveal>
            <Eyebrow index="04" className="mb-5">
              Serviços e fornecimento
            </Eyebrow>
            <h2 id="servicos-title" className="text-h2 text-navy-900">
              Da garrafa ao tanque criogénico.
            </h2>
            <p className="mt-6 max-w-md text-lead text-steel-600">
              A forma de fornecimento é definida com cada cliente, em função do volume, da pressão,
              do caudal e da utilização.
            </p>
            <ArrowLink href={routes.services} className="mt-8">
              Ver serviços e soluções
            </ArrowLink>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <SupplyModeList modes={supplyModes} />
        </div>
      </Container>
    </Section>
  );
}
