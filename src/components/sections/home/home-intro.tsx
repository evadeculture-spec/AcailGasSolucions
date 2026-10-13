import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { company } from "@/content/pt/company";
import { industries } from "@/content/pt/industries";
import { productCategories } from "@/content/pt/products";
import { siteConfig } from "@/config/site";
import { routes } from "@/lib/routes";

const facts = [
  { value: String(siteConfig.foundingYear), label: "Ano de fundação da Acail Gás" },
  { value: String(productCategories.length).padStart(2, "0"), label: "Categorias de produto" },
  { value: String(industries.length), label: "Setores de aplicação" },
  { value: "PT · ES", label: "Rede de distribuição em Portugal e Espanha" },
];

export function HomeIntro() {
  return (
    <Section aria-labelledby="apresentacao-title">
      <Container className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow index="01">A Acail Gás</Eyebrow>
        </div>
        <div className="lg:col-span-8" data-reveal>
          <h2 id="apresentacao-title" className="text-h2 text-navy-900">
            Desde 1996, a produzir gás a alta pressão para a indústria, a saúde e o setor alimentar.
          </h2>
          <p className="mt-8 max-w-2xl text-lead text-steel-600">
            {company.origin} {company.statement}
          </p>
          <ArrowLink href={routes.company} className="mt-8">
            Conhecer a empresa
          </ArrowLink>
        </div>
      </Container>

      <Container className="mt-20 md:mt-28">
        <dl className="grid grid-cols-2 gap-px overflow-hidden border-y border-steel-200 bg-steel-200 lg:grid-cols-4">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="flex flex-col-reverse justify-end gap-3 bg-white px-5 py-8 lg:px-6 lg:py-10"
              data-reveal
            >
              <dt className="max-w-[16ch] text-sm text-steel-600">{fact.label}</dt>
              <dd className="font-display text-5xl tracking-[-0.04em] text-navy-900 md:text-6xl">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
