import type { Metadata } from "next";

import { LegalDocumentView } from "@/components/sections/legal-document";
import { cookiePolicy } from "@/content/pt/legal";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({ ...cookiePolicy.seo, path: routes.cookies });

export default function CookiesPage() {
  return <LegalDocumentView document={cookiePolicy} path={routes.cookies} />;
}
