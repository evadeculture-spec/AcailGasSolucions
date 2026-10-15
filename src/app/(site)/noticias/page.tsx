import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { newsArticles } from "@/content/pt/news";
import { NewsList } from "@/features/news/news-list";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Notícias",
  description:
    "Notícias da fábrica de gases da Acail no Pólo Industrial de Viana, em Luanda: certificação, novos produtos e visitas.",
  path: routes.news,
});

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Notícias"
        title="Atualidade da Acail Gás Solucions."
        breadcrumbs={[
          { name: "Início", path: routes.home },
          { name: "Notícias", path: routes.news },
        ]}
      />
      <Section aria-label="Lista de notícias">
        <Container>
          <NewsList articles={newsArticles} headingLevel="h2" />
        </Container>
      </Section>
    </>
  );
}
