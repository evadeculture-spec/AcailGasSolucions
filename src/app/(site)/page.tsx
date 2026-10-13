import type { Metadata } from "next";

import { CtaBand } from "@/components/sections/cta-band";
import { HomeHero } from "@/components/sections/home/home-hero";
import { HomeIdentity } from "@/components/sections/home/home-identity";
import { HomeIndustries } from "@/components/sections/home/home-industries";
import { HomeIntro } from "@/components/sections/home/home-intro";
import { HomeNews } from "@/components/sections/home/home-news";
import { HomeProducts } from "@/components/sections/home/home-products";
import { HomeQualityHealth } from "@/components/sections/home/home-quality-health";
import { HomeServices } from "@/components/sections/home/home-services";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  ...buildMetadata({
    title: siteConfig.name,
    description: siteConfig.description,
    path: "/",
  }),
  title: { absolute: `${siteConfig.name} — ${siteConfig.tagline}` },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeIntro />
      <HomeProducts />
      <HomeIndustries />
      <HomeServices />
      <HomeQualityHealth />
      <HomeIdentity />
      <HomeNews />
      <CtaBand
        eyebrow="Contacto"
        title="Vamos encontrar a solução de gás certa para o seu processo."
        primary={{ label: "Pedir proposta", href: "/contactos?assunto=proposta#formulario" }}
      />
    </>
  );
}
