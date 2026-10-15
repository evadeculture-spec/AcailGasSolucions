import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { industries } from "@/content/pt/industries";
import { IndustryIndex } from "@/features/industries/industry-index";
import { routes } from "@/lib/routes";

export function HomeIndustries() {
  return (
    <Section tone="dark" className="overflow-hidden" aria-labelledby="industrias-title">
      <div aria-hidden="true" className="tech-grid absolute inset-0 opacity-50" />
      <div className="relative">
        <SectionHeader
          id="industrias-title"
          tone="dark"
          eyebrow="Indústrias"
          index="03"
          title="Gases para a indústria angolana."
          intro="Da metalomecânica aos hospitais, da indústria alimentar ao tratamento de águas: cada setor tem processos e formas de fornecimento próprios."
          action={
            <ArrowLink href={routes.industries} tone="dark">
              Explorar indústrias e aplicações
            </ArrowLink>
          }
        />
        <Container>
          <IndustryIndex items={industries} tone="dark" />
        </Container>
      </div>
    </Section>
  );
}
