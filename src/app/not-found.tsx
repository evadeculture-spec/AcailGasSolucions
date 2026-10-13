import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/site-shell";
import { IsobarField } from "@/components/sections/isobar-field";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <SiteShell>
      <section className="dark-surface relative isolate overflow-hidden bg-navy-900">
        <div aria-hidden="true" className="tech-grid absolute inset-0 -z-10" />
        <IsobarField animated={false} className="absolute inset-0 -z-10 h-full w-full opacity-40" />
        <Container className="flex min-h-[70svh] flex-col justify-center py-24">
          <Eyebrow tone="dark" className="mb-6">
            Erro 404
          </Eyebrow>
          <h1 className="max-w-3xl text-h1 text-white">Esta página não existe ou foi movida.</h1>
          <p className="mt-6 max-w-xl text-lead text-steel-300">
            O endereço pode ter mudado com o novo website. Utilize a navegação ou regresse à página
            inicial.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href={routes.home} tone="dark">
              Página inicial
            </ButtonLink>
            <ButtonLink href={routes.products} tone="dark" variant="secondary">
              Produtos
            </ButtonLink>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
