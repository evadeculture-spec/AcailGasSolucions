import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = [
  "/",
  "/empresa",
  "/qualidade",
  "/produtos",
  "/produtos/gases-medicinais",
  "/industrias",
  "/industrias/metalurgia",
  "/servicos",
  "/saude",
  "/distribuidores",
  "/noticias",
  "/noticias/nova-unidade-de-producao-criogenica-de-gas",
  "/contactos",
  "/privacidade",
];

for (const path of pages) {
  test(`${path} has no WCAG 2.2 A/AA violations`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    const summary = results.violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      targets: violation.nodes.slice(0, 3).map((node) => node.target.join(" ")),
    }));
    expect(summary).toEqual([]);
  });
}

test("open mobile menu has no violations", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile only");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Menu" }).click();
  const results = await new AxeBuilder({ page })
    .include("header")
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  expect(
    results.violations.flatMap((violation) =>
      violation.nodes.map((node) => `${violation.id}: ${node.html}`),
    ),
  ).toEqual([]);
});
