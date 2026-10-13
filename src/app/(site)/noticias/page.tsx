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
    "Notícias e atualidade da Acail Gás: produção, instalações e rede em Portugal e Espanha.",
  path: routes.news,
});

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Notícias"
        title="Atualidade da Acail Gás."
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
