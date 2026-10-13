import type { Metadata } from "next";

import { LegalDocumentView } from "@/components/sections/legal-document";
import { termsAndConditions } from "@/content/pt/legal";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({ ...termsAndConditions.seo, path: routes.terms });

export default function TermsPage() {
  return <LegalDocumentView document={termsAndConditions} path={routes.terms} />;
}
