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
    // Pages of the corporate Angola website (acailangola.com) mapped to this site.
    const legacy: Array<[string, string]> = [
      ["/quem-somos.php", "/empresa"],
      ["/contactos.php", "/contactos"],
      ["/noticias.php", "/noticias"],
      ["/servicos.php", "/servicos"],
      ["/saude-gas-medicinal.php", "/produtos/gases-medicinais"],
      ["/saude-redes-gases-medicinais.php", "/servicos#medical-networks"],
      [
        "/produtos-industriais-gas-industrial-gas-soldadura-e-corte.php",
        "/produtos/gases-soldadura-corte",
      ],
      ["/produtos-industriais-gas-industrial-gases-alimentares.php", "/produtos/gases-alimentares"],
      ["/produtos-industriais-gas-industrial-gases-ambiente.php", "/produtos/gas-ambiente"],
      ["/produtos-industriais-redes-de-gases-industriais.php", "/servicos#industrial-networks"],
      ["/acail-gas-propano.php", "/produtos/gas-propano"],
      ["/distribuidores", "/contactos"],
    ];

    return [
      ...legacy.map(([source, destination]) => ({ source, destination, permanent: true })),
      // English and Spanish versions are planned; until they launch, send visitors to Portuguese.
      { source: "/en/:path*", destination: "/", permanent: false },
      { source: "/es/:path*", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
