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
    "Gases para soldadura e corte, gases alimentares, gases medicinais, gás ambiente (ozono) e gás propano, produzidos em Luanda.",
  path: routes.products,
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Produtos"
        title="Cinco linhas de gás."
        lead="Gases puros e misturas produzidos na fábrica do Pólo Industrial de Viana, para a indústria, a saúde e o setor alimentar."
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
          intro="Garrafas e quadros, fornecimento a granel e redes de gases."
          action={<ArrowLink href={routes.services}>Ver serviços e soluções</ArrowLink>}
        />
        <Container>
          <SupplyModeList modes={supplyModes.slice(0, 3)} />
        </Container>
      </Section>

      <CtaBand
        title="Não encontra o gás de que precisa?"
        body="Descreva a sua aplicação e a nossa equipa responde com a solução adequada."
        primary={{ label: "Pedir informação técnica", href: contactHref("informacao-tecnica") }}
      />

      <JsonLd
        data={itemListSchema(
          "Linhas de gás Acail Gás Solucions",
          productCategories.map((category) => ({
            name: category.name,
            path: routes.product(category.slug),
          })),
        )}
      />
    </>
  );
}
