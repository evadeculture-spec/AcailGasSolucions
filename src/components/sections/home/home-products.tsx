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
        title="Seis categorias. Uma gama completa de gases."
        intro="Gases puros, liquefeitos e misturas para a indústria, o setor alimentar, a saúde e o laboratório."
        action={<ArrowLink href={routes.products}>Ver todos os produtos</ArrowLink>}
      />
      <CategoryIndex categories={productCategories} />
    </Section>
  );
}
