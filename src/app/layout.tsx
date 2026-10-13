import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { JsonLd } from "@/components/ui/json-ld";
import { siteConfig } from "@/config/site";
import { languageAlternates } from "@/lib/seo/metadata";
import { organizationSchema, websiteSchema } from "@/lib/seo/structured-data";

import "./globals.css";

const inter = localFont({
  src: "../styles/fonts/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const archivo = localFont({
  src: "../styles/fonts/archivo-latin-wdth-normal.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
});

const jetbrains = localFont({
  src: "../styles/fonts/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--font-jetbrains",
  weight: "100 800",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: siteConfig.url, languages: languageAlternates("/") },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.ogLocale,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#08172b",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-PT" className={`${inter.variable} ${archivo.variable} ${jetbrains.variable}`}>
      <body className="flex min-h-dvh flex-col">
        {children}
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
