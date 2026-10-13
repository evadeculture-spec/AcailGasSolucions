import type { Metadata } from "next";

import { LegalDocumentView } from "@/components/sections/legal-document";
import { privacyPolicy } from "@/content/pt/legal";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({ ...privacyPolicy.seo, path: routes.privacy });

export default function PrivacyPage() {
  return <LegalDocumentView document={privacyPolicy} path={routes.privacy} />;
}
