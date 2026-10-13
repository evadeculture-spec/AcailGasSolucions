import type { NextConfig } from "next";

/**
 * Content Security Policy.
 * `'unsafe-inline'` in script-src is required by the inline bootstrap scripts
 * Next.js emits for statically prerendered pages (nonces would force every
 * page to render dynamically). No third-party origins are allowed.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'" +
    (process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""),
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    // Legacy routes of the previous website mapped to the new information architecture.
    const legacyGasTypes: Array<[string, string]> = [
      ["Industriais", "gases-industriais"],
      ["Alimentares", "gases-alimentares"],
      ["Medicinais", "gases-medicinais"],
      ["Especiais", "gases-especiais"],
      ["Dispositivo.Medico", "gases-dispositivo-medico"],
      ["Gelo.Seco", "gelo-seco"],
    ];
    const legacyIndustries: Array<[string, string]> = [
      ["Metalurgia", "metalurgia"],
      ["Metalomecanica", "metalomecanica"],
      ["Alimentar", "alimentar"],
      ["Laboratorios", "laboratorios"],
      ["Quimica.*", "quimica"],
      ["Ambiente", "ambiente"],
      ["Soldadura", "soldadura"],
    ];

    return [
      ...legacyGasTypes.map(([type, slug]) => ({
        source: "/gases/index",
        has: [{ type: "query" as const, key: "type", value: type }],
        destination: `/produtos/${slug}`,
        permanent: true,
      })),
      ...legacyIndustries.map(([industry, slug]) => ({
        source: "/industria/post",
        has: [{ type: "query" as const, key: "industry", value: industry }],
        destination: `/industrias/${slug}`,
        permanent: true,
      })),
      // English and Spanish versions are planned; until they launch, send visitors to Portuguese.
      { source: "/en/:path*", destination: "/", permanent: false },
      { source: "/es/:path*", destination: "/", permanent: false },
      { source: "/empresa/historia", destination: "/empresa#historia", permanent: true },
      { source: "/gases", destination: "/produtos", permanent: true },
      { source: "/gases/index", destination: "/produtos", permanent: true },
      { source: "/industria", destination: "/industrias", permanent: true },
      { source: "/industria/post", destination: "/industrias", permanent: true },
      { source: "/noticia", destination: "/noticias", permanent: true },
      {
        source: "/resolucao-alternativa-litigios.html",
        destination: "/termos#resolucao-litigios",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
