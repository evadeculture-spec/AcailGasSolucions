import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { formatAddressLines, siteConfig } from "@/config/site";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contactos",
  description:
    "Contacte a Acail Gás Solucions: fábrica de gases no Pólo Industrial de Viana, Estrada Nacional Luanda–Catete, km 23. Gás industrial, medicinal e soldadura.",
  path: routes.contact,
});

export default function ContactPage() {
  const { contact, links } = siteConfig;
  return (
    <>
      <PageHero
        eyebrow="Contactos"
        title="Fale connosco."
        lead="Encomendas, pedidos de proposta, informação técnica e projetos de redes de gases."
        breadcrumbs={[
          { name: "Início", path: routes.home },
          { name: "Contactos", path: routes.contact },
        ]}
      />

      <Section>
        <Container className="grid gap-16 lg:grid-cols-12">
          <aside aria-labelledby="fabrica-titulo" className="lg:col-span-5">
            <h2 id="fabrica-titulo" className="text-h3 text-navy-900">
              {contact.address.name}
            </h2>
            <p className="mt-2 text-steel-600">{siteConfig.legalName}</p>

            <div className="mt-8 flex gap-4 border-y border-steel-200 py-5">
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
                <p className="mt-1.5 text-sm text-steel-600">GPS {contact.address.gps}</p>
                <a
                  href={links.mapSearch}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm text-blue-600 underline underline-offset-2"
                >
                  Ver no mapa<span className="sr-only"> (abre numa nova janela)</span>
                </a>
              </div>
            </div>

            <ul className="mt-2 divide-y divide-steel-200 border-b border-steel-200">
              {contact.departments.map((department) => (
                <li key={department.id} className="py-6">
                  <h3 className="text-lg text-navy-900">{department.name}</h3>
                  <p className="mt-1 text-sm text-steel-600">{department.description}</p>
                  <ul className="mt-4 space-y-2 text-[0.9375rem]">
                    {department.phones.map((phone) => (
                      <li key={phone.href} className="flex items-center gap-3">
                        <Phone
                          aria-hidden="true"
                          className="size-4 shrink-0 text-blue-600"
                          strokeWidth={1.5}
                        />
                        <a href={phone.href} className="text-steel-900 hover:text-blue-600">
                          {phone.display}
                        </a>
                      </li>
                    ))}
                    <li className="flex items-center gap-3">
                      <Mail
                        aria-hidden="true"
                        className="size-4 shrink-0 text-blue-600"
                        strokeWidth={1.5}
                      />
                      <a
                        href={`mailto:${department.email}`}
                        className="text-steel-900 hover:text-blue-600"
                      >
                        {department.email}
                      </a>
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
          </aside>

          <div id="formulario" className="scroll-mt-28 lg:col-span-6 lg:col-start-7">
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
