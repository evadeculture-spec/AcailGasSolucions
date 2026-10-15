import Link from "next/link";

import { Container } from "@/components/ui/container";
import { formatAddressLines, siteConfig } from "@/config/site";
import { footerNavigation, legalNavigation } from "@/content/pt/navigation";

import { Logo } from "./logo";

export function SiteFooter() {
  const { contact } = siteConfig;
  const gasDepartment = contact.departments[0];
  return (
    <footer className="dark-surface border-t border-white/10 bg-ink-950 text-steel-300">
      <Container className="grid gap-14 py-16 md:py-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Link
            href="/"
            aria-label="Acail Gás Solucions — página inicial"
            className="inline-block rounded-xs"
          >
            <Logo />
          </Link>
          <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed">{siteConfig.tagline}.</p>

          <address className="mt-8 space-y-5 text-[0.9375rem] not-italic">
            <div>
              <p className="mb-1.5 font-mono text-label text-steel-400 uppercase">
                Fábrica de gases
              </p>
              {formatAddressLines().map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </div>
            <div>
              <p className="mb-1.5 font-mono text-label text-steel-400 uppercase">Telefone</p>
              <p className="flex flex-wrap gap-x-3">
                {gasDepartment.phones.map((phone) => (
                  <a
                    key={phone.href}
                    href={phone.href}
                    className="inline-flex min-h-6 items-center hover:text-white"
                  >
                    {phone.display}
                  </a>
                ))}
              </p>
            </div>
            <div>
              <p className="mb-1.5 font-mono text-label text-steel-400 uppercase">Email</p>
              <a href={`mailto:${contact.email}`} className="hover:text-white">
                {contact.email}
              </a>
            </div>
          </address>
        </div>

        <nav aria-label="Rodapé" className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
          {footerNavigation.map((column) => (
            <div key={column.title}>
              <p className="mb-5 font-mono text-label text-steel-400 uppercase">{column.title}</p>
              <ul className="space-y-3 text-[0.9375rem]">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition-colors hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-5 py-7 text-sm lg:flex-row lg:items-center lg:justify-between">
          <p className="text-steel-400">© {siteConfig.legalName}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
