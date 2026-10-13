import { expect, test } from "@playwright/test";

test("robots.txt references the sitemap and blocks the API", async ({ request }) => {
  const body = await (await request.get("/robots.txt")).text();
  expect(body).toContain("Disallow: /api/");
  expect(body).toMatch(/Sitemap: https?:\/\/.+\/sitemap\.xml/);
});

test("sitemap lists product, industry and news pages", async ({ request }) => {
  const body = await (await request.get("/sitemap.xml")).text();
  expect(body).toContain("/produtos/gases-medicinais");
  expect(body).toContain("/industrias/metalurgia");
  expect(body).toContain("/noticias/nova-morada-em-espanha");
  expect(body).toContain('hreflang="pt-PT"');
});

test("pages expose valid structured data", async ({ page }) => {
  await page.goto("/produtos/gases-industriais");
  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
  const types = blocks.flatMap((block) => {
    const data = JSON.parse(block) as unknown;
    return (Array.isArray(data) ? data : [data]).map(
      (item) => (item as { "@type": string })["@type"],
    );
  });
  expect(types).toEqual(expect.arrayContaining(["Organization", "WebSite", "BreadcrumbList"]));
});

test("Open Graph image is generated", async ({ request }) => {
  const response = await request.get("/opengraph-image");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toBe("image/png");
});

test("security headers are present", async ({ request }) => {
  const headers = (await request.get("/")).headers();
  expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["x-powered-by"]).toBeUndefined();
});
