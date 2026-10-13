import Link from "next/link";

import { Container } from "@/components/ui/container";
import { contactNavItem, primaryNavigation } from "@/content/pt/navigation";

import { DesktopNav } from "./desktop-nav";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  // No backdrop-filter on the header: it would become the containing block of the fixed mobile panel.
  return (
    <header className="dark-surface sticky top-0 z-50 border-b border-white/10 bg-navy-900">
      <Container className="flex h-(--spacing-header) items-center justify-between gap-6">
        <Link href="/" className="shrink-0 rounded-xs" aria-label="Acail Gás — página inicial">
          <Logo />
        </Link>
        <DesktopNav groups={primaryNavigation} />
        <div className="flex items-center gap-4">
          <Link
            href={contactNavItem.href}
            className="hidden min-h-10 items-center rounded-sm border border-white/25 px-5 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white hover:text-navy-900 xl:inline-flex"
          >
            {contactNavItem.label}
          </Link>
          <MobileNav groups={primaryNavigation} contact={contactNavItem} />
        </div>
      </Container>
    </header>
  );
}
