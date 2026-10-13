import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import type { LegalDocument } from "@/types/content";

import { PageHero } from "./page-hero";

export function LegalDocumentView({ document, path }: { document: LegalDocument; path: string }) {
  return (
    <>
      <PageHero
        eyebrow="Informação legal"
        title={document.title}
        lead={document.intro}
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: document.title, path },
        ]}
      />
      <Section>
        <Container className="grid gap-14 lg:grid-cols-12">
          <nav aria-label="Índice" className="lg:col-span-3">
            <div className="lg:sticky lg:top-[calc(var(--spacing-header)+2rem)]">
              <p className="font-mono text-label text-steel-500 uppercase">Índice</p>
              <ol className="mt-4 space-y-2 text-sm">
                {document.sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="text-steel-600 hover:text-blue-600">
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
          <div className="prose-editorial lg:col-span-8 lg:col-start-5">
            <p className="font-mono text-label text-steel-500 uppercase">{document.updatedLabel}</p>
            {document.sections.map((section) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-titulo`}>
                <h2 id={`${section.id}-titulo`}>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list ? (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
