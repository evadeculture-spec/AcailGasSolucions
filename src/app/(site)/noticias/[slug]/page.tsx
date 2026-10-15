import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getNewsArticle, newsArticles } from "@/content/pt/news";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/noticias/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) return {};
  return buildMetadata({ ...article.seo, path: routes.newsArticle(article.slug), type: "article" });
}

export default async function NewsArticlePage({ params }: PageProps<"/noticias/[slug]">) {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) notFound();

  return (
    <>
      <PageHero
        eyebrow={article.dateLabel ? `Notícia · ${article.dateLabel}` : "Notícia"}
        title={article.title}
        lead={article.summary}
        breadcrumbs={[
          { name: "Início", path: routes.home },
          { name: "Notícias", path: routes.news },
          { name: article.title, path: routes.newsArticle(article.slug) },
        ]}
      />
      <Section>
        <Container className="grid gap-14 lg:grid-cols-12">
          <article className="prose-editorial lg:col-span-7">
            {article.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
          {article.facts ? (
            <aside aria-label="Dados da notícia" className="lg:col-span-4 lg:col-start-9">
              <dl className="border-t border-navy-900">
                {article.facts.map((fact) => (
                  <div key={fact.label} className="border-b border-steel-200 py-5">
                    <dt className="font-mono text-label text-steel-500 uppercase">{fact.label}</dt>
                    <dd className="mt-2 font-display text-3xl tracking-[-0.02em] text-navy-900">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>
          ) : null}
        </Container>
        <Container className="mt-16">
          <ArrowLink href={routes.news}>Voltar às notícias</ArrowLink>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
