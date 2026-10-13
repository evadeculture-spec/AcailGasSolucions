import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { siteConfig } from "@/config/site";
import { routes } from "@/lib/routes";

interface CtaBandProps {
  eyebrow?: string;
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
}

/** Closing call to action used at the end of pages. */
export function CtaBand({
  eyebrow = "Contacto",
  title = "Fale com a nossa equipa.",
  body = "Para pedidos de proposta, informação técnica ou Fichas de Dados de Segurança, envie-nos uma mensagem ou contacte diretamente a sede.",
  primary = { label: "Enviar pedido", href: routes.contact },
}: CtaBandProps) {
  const phone = siteConfig.contact.phones[0];
  return (
    <section
      className="dark-surface relative overflow-hidden bg-blue-600"
      aria-labelledby="cta-title"
    >
      <div aria-hidden="true" className="tech-grid absolute inset-0 opacity-70" />
      <Container className="relative grid gap-10 py-20 md:py-24 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7" data-reveal>
          <Eyebrow tone="dark" className="mb-5">
            {eyebrow}
          </Eyebrow>
          <h2 id="cta-title" className="text-h2 text-white">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-lead text-blue-100">{body}</p>
        </div>
        <div className="flex flex-col gap-5 lg:col-span-5 lg:items-end" data-reveal>
          <ButtonLink href={primary.href} tone="dark">
            {primary.label}
          </ButtonLink>
          <p className="text-sm text-blue-100 lg:text-right">
            Ou ligue{" "}
            <a href={phone.href} className="font-medium text-white underline underline-offset-4">
              {phone.display}
            </a>
            <span className="block text-xs text-blue-100/80">{siteConfig.contact.phoneNotice}</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
