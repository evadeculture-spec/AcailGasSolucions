import { describe, expect, it } from "vitest";

import { isActivePath } from "@/components/layout/nav-utils";
import { localizedPath } from "@/config/i18n";
import { createRateLimiter } from "@/lib/rate-limit";
import { contactHref } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/structured-data";
import { serializeJsonLd } from "@/lib/utils";

describe("serializeJsonLd", () => {
  it("escapes characters that could close the script tag", () => {
    const output = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
    expect(output).not.toContain("<");
    expect(JSON.parse(output).name).toBe("</script><script>alert(1)</script>");
  });
});

describe("routing helpers", () => {
  it("builds contact links with subject and product", () => {
    expect(contactHref("fds", "gases-especiais")).toBe(
      "/contactos?assunto=fds&produto=gases-especiais#formulario",
    );
  });

  it("detects active sections", () => {
    expect(isActivePath("/produtos/gelo-seco", "/produtos")).toBe(true);
    expect(isActivePath("/produtos-x", "/produtos")).toBe(false);
    expect(isActivePath("/empresa", "/empresa#historia")).toBe(true);
    expect(isActivePath("/empresa", "/")).toBe(false);
  });

  it("prefixes non-default locales only", () => {
    expect(localizedPath("pt", "/empresa")).toBe("/empresa");
    expect(localizedPath("en", "/empresa")).toBe("/en/empresa");
    expect(localizedPath("es", "/")).toBe("/es");
  });
});

describe("seo", () => {
  it("builds canonical and hreflang alternates", () => {
    const metadata = buildMetadata({ title: "Saúde", description: "d", path: "/saude" });
    expect(metadata.alternates?.canonical).toBe("https://www.acailgas.pt/saude");
    expect(metadata.alternates?.languages).toMatchObject({
      "pt-PT": "https://www.acailgas.pt/saude",
    });
  });

  it("numbers breadcrumb positions from 1", () => {
    const schema = breadcrumbSchema([
      { name: "Início", path: "/" },
      { name: "Produtos", path: "/produtos" },
    ]);
    expect(schema.itemListElement.map((item) => item.position)).toEqual([1, 2]);
  });
});

describe("rate limiter", () => {
  it("allows up to the limit and resets after the window", () => {
    const limiter = createRateLimiter({ limit: 2, windowMs: 1000 });
    expect(limiter.check("a", 0).allowed).toBe(true);
    expect(limiter.check("a", 10).allowed).toBe(true);
    expect(limiter.check("a", 20)).toEqual({ allowed: false, retryAfterSeconds: 1 });
    expect(limiter.check("a", 1001).allowed).toBe(true);
  });

  it("bounds memory usage", () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 60_000, maxKeys: 2 });
    limiter.check("a", 0);
    limiter.check("b", 0);
    limiter.check("c", 0);
    // "a" was evicted, so it starts a fresh window.
    expect(limiter.check("a", 1).allowed).toBe(true);
  });
});
