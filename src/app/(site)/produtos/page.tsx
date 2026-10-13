import type { Metadata } from "next";

import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/ui/json-ld";
import { Section, SectionHeader } from "@/components/ui/section";
import { productCategories } from "@/content/pt/products";
import { supplyModes } from "@/content/pt/services";
import { CategoryIndex } from "@/features/products/category-index";
import { SupplyModeList } from "@/features/services/supply-mode-list";
import { contactHref, routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { itemListSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Produtos",
  description:
    "Gases industriais, alimentares, medicinais, especiais, gases dispositivo médico e gelo seco. Conheça a gama de produtos da Acail Gás.",
  path: routes.products,
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Produtos"
        title="Uma gama completa de gases."
        lead="Gases atmosféricos, gases combustíveis, gases de elevada pureza e misturas desenvolvidas para cada aplicação, organizados em seis categorias."
        breadcrumbs={[
          { name: "Início", path: routes.home },
          { name: "Produtos", path: routes.products },
        ]}
      />

      <Section aria-labelledby="categorias">
        <h2 id="categorias" className="sr-only">
          Categorias de produto
        </h2>
        <CategoryIndex categories={productCategories} headingLevel="h3" />
      </Section>

      <Section tone="muted" aria-labelledby="fornecimento">
        <SectionHeader
          id="fornecimento"
          eyebrow="Formas de fornecimento"
          title="Cada gás, na forma adequada ao consumo."
          intro="Garrafas e quadros, líquidos criogénicos a granel ou produção nas instalações do cliente."
          action={<ArrowLink href={routes.services}>Ver serviços e soluções</ArrowLink>}
        />
        <Container>
          <SupplyModeList modes={supplyModes.slice(0, 3)} />
        </Container>
      </Section>

      <CtaBand
        title="Não encontra o gás de que precisa?"
        body="Outros gases e misturas estão disponíveis mediante consulta. Descreva a sua aplicação e a nossa equipa responde com a solução adequada."
        primary={{ label: "Pedir informação técnica", href: contactHref("informacao-tecnica") }}
      />

      <JsonLd
        data={itemListSchema(
          "Categorias de produto Acail Gás",
          productCategories.map((category) => ({
            name: category.name,
            path: routes.product(category.slug),
          })),
        )}
      />
    </>
  );
}
