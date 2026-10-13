import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { newsArticles } from "@/content/pt/news";
import { NewsList } from "@/features/news/news-list";
import { routes } from "@/lib/routes";

export function HomeNews() {
  return (
    <Section aria-labelledby="noticias-title">
      <SectionHeader
        id="noticias-title"
        eyebrow="Notícias"
        index="07"
        title="Atualidade"
        action={<ArrowLink href={routes.news}>Todas as notícias</ArrowLink>}
      />
      <Container>
        <NewsList articles={newsArticles.slice(0, 3)} />
      </Container>
    </Section>
  );
}
