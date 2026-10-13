import type { Metadata } from "next";
import { Mail, MapPin, Phone, Printer } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/sections/page-hero";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { formatAddressLines, siteConfig } from "@/config/site";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contactos",
  description:
    "Contacte a Acail Gás: sede em Souto, Santa Maria da Feira. Pedidos de proposta, informação técnica e Fichas de Dados de Segurança.",
  path: routes.contact,
});

export default function ContactPage() {
  const { contact, links } = siteConfig;
  return (
    <>
      <PageHero
        eyebrow="Contactos"
        title="Fale connosco."
        lead="Pedidos de proposta, informação técnica, Fichas de Dados de Segurança ou contacto com a rede de distribuição."
        breadcrumbs={[
          { name: "Início", path: routes.home },
          { name: "Contactos", path: routes.contact },
        ]}
      />

      <Section>
        <Container className="grid gap-16 lg:grid-cols-12">
          <aside aria-labelledby="sede-titulo" className="lg:col-span-4">
            <h2 id="sede-titulo" className="text-h3 text-navy-900">
              Sede
            </h2>
            <p className="mt-2 text-steel-600">{siteConfig.legalName}</p>

            <ul className="mt-8 divide-y divide-steel-200 border-y border-steel-200">
              <li className="flex gap-4 py-5">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-blue-600"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="font-mono text-label text-steel-500 uppercase">Morada</p>
                  <address className="mt-1.5 text-steel-900 not-italic">
                    {formatAddressLines().map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  <a
                    href={links.mapSearch}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm text-blue-600 underline underline-offset-2"
                  >
                    Ver no mapa<span className="sr-only"> (abre numa nova janela)</span>
                  </a>
                </div>
              </li>
              <li className="flex gap-4 py-5">
                <Phone
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-blue-600"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="font-mono text-label text-steel-500 uppercase">Telefone</p>
                  <ul className="mt-1.5 space-y-1">
                    {contact.phones.map((phone) => (
                      <li key={phone.href}>
                        <a href={phone.href} className="text-steel-900 hover:text-blue-600">
                          {phone.display}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-1.5 text-xs text-steel-500">{contact.phoneNotice}</p>
                </div>
              </li>
              <li className="flex gap-4 py-5">
                <Printer
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-blue-600"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="font-mono text-label text-steel-500 uppercase">Fax</p>
                  <p className="mt-1.5 text-steel-900">{contact.fax}</p>
                </div>
              </li>
              <li className="flex gap-4 py-5">
                <Mail
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-blue-600"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="font-mono text-label text-steel-500 uppercase">Email</p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="mt-1.5 block text-steel-900 hover:text-blue-600"
                  >
                    {contact.email}
                  </a>
                </div>
              </li>
            </ul>

            <div className="mt-10 space-y-4">
              <ArrowLink href={routes.distributors}>Rede de distribuidores</ArrowLink>
              <p className="text-sm text-steel-600">
                Cuidados respiratórios domiciliários:{" "}
                <a
                  href={links.medicare}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline underline-offset-2"
                >
                  Acail Medicare<span className="sr-only"> (abre numa nova janela)</span>
                </a>
              </p>
            </div>
          </aside>

          <div id="formulario" className="scroll-mt-28 lg:col-span-7 lg:col-start-6">
            <h2 className="text-h3 text-navy-900">Formulário de contacto</h2>
            <p className="mt-2 mb-10 text-steel-600">
              Responderemos com a maior brevidade possível.
            </p>
            <ContactForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
