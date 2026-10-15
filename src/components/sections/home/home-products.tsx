import { ArrowLink } from "@/components/ui/arrow-link";
import { Section, SectionHeader } from "@/components/ui/section";
import { productCategories } from "@/content/pt/products";
import { CategoryIndex } from "@/features/products/category-index";
import { routes } from "@/lib/routes";

export function HomeProducts() {
  return (
    <Section tone="muted" aria-labelledby="produtos-title">
      <SectionHeader
        id="produtos-title"
        eyebrow="Produtos"
        index="02"
        title="Cinco linhas de gás, produzidas em Luanda."
        intro="Gases puros e misturas para soldadura e corte, indústria alimentar, saúde, tratamento de águas e energia."
        action={<ArrowLink href={routes.products}>Ver todos os produtos</ArrowLink>}
      />
      <CategoryIndex categories={productCategories} />
    </Section>
  );
}
