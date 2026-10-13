import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { routes } from "@/lib/routes";
import type { NewsArticle } from "@/types/content";

export function NewsList({
  articles,
  headingLevel = "h3",
}: {
  articles: NewsArticle[];
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <ul className="grid gap-px overflow-hidden rounded-sm border border-steel-200 bg-steel-200 md:grid-cols-3">
      {articles.map((article, index) => (
        <li
          key={article.slug}
          className="bg-white"
          data-reveal
          style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
        >
          <Link
            href={routes.newsArticle(article.slug)}
            className="group flex h-full flex-col gap-6 p-6 transition-colors hover:bg-steel-50 md:p-8"
          >
            <span className="font-mono text-label text-blue-600 uppercase">Notícia</span>
            <Heading className="text-xl leading-snug text-navy-900 group-hover:text-blue-600">
              {article.title}
            </Heading>
            <p className="text-[0.9375rem] leading-relaxed text-steel-600">{article.summary}</p>
            <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-blue-600">
              Ler notícia
              <ArrowRight
                aria-hidden="true"
                strokeWidth={1.75}
                className="size-4 transition-transform group-hover:translate-x-1"
              />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
