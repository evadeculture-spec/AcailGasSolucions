import { expect, test } from "@playwright/test";

import { sitemapPaths } from "../../src/lib/seo/sitemap-paths";

const paths = sitemapPaths().map((entry) => entry.path);

test.describe("every public page", () => {
  for (const path of paths) {
    test(`renders ${path} with one h1, metadata and no console errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      page.on("pageerror", (error) => errors.push(error.message));

      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page).toHaveTitle(/Acail Gás/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /^https?:\/\//);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{40,}/);
      expect(errors).toEqual([]);
    });
  }
});

test("internal links resolve", async ({ page, request }) => {
  const hrefs = new Set<string>();
  for (const path of ["/", "/produtos", "/industrias", "/contactos"]) {
    await page.goto(path);
    const found = await page
      .locator('a[href^="/"]')
      .evaluateAll((links) =>
        links.map((link) => (link.getAttribute("href") ?? "").split("#")[0]?.split("?")[0] ?? ""),
      );
    found.filter(Boolean).forEach((href) => hrefs.add(href));
  }
  for (const href of hrefs) {
    const response = await request.get(href);
    expect(response.status(), href).toBe(200);
  }
});

test("unknown routes return a 404 page", async ({ page }) => {
  const response = await page.goto("/pagina-inexistente");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("não existe");
});

test("legacy URLs of the corporate site redirect to the new architecture", async ({ page }) => {
  await page.goto("/saude-gas-medicinal.php");
  await expect(page).toHaveURL(/\/produtos\/gases-medicinais$/);
  await page.goto("/acail-gas-propano.php");
  await expect(page).toHaveURL(/\/produtos\/gas-propano$/);
});

test("skip link moves focus to the main content", async ({ page, isMobile }) => {
  test.skip(isMobile, "Keyboard navigation is checked on desktop");
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Saltar para o conteúdo" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#conteudo$/);
});

test.describe("desktop navigation", () => {
  test.skip(({ isMobile }) => isMobile, "Desktop only");

  test("product menu opens, closes with Escape and navigates", async ({ page }) => {
    await page.goto("/");
    const trigger = page
      .getByRole("navigation", { name: "Navegação principal" })
      .getByRole("button", { name: "Produtos" });
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toBeFocused();

    await trigger.click();
    await page
      .getByRole("link", { name: /Gás Propano/ })
      .first()
      .click();
    await expect(page).toHaveURL(/\/produtos\/gas-propano$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Gás Propano");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});

test.describe("mobile navigation", () => {
  test.skip(({ isMobile }) => !isMobile, "Mobile only");

  test("menu opens, expands groups, navigates and closes", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Menu" });
    await toggle.click();
    await expect(page.getByRole("button", { name: "Fechar" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );

    await page.locator("#menu-movel").getByRole("button", { name: "Produtos" }).click();
    await page.locator("#menu-movel").getByRole("link", { name: "Gases Medicinais" }).click();
    await expect(page).toHaveURL(/\/produtos\/gases-medicinais$/);
    await expect(page.locator("#menu-movel")).toBeHidden();
  });

  test("Escape closes the menu and returns focus", async ({ page }) => {
    await page.goto("/empresa");
    await page.getByRole("button", { name: "Menu" }).click();
    await page.keyboard.press("Escape");
    await expect(page.locator("#menu-movel")).toBeHidden();
    await expect(page.getByRole("button", { name: "Menu" })).toBeFocused();
  });

  test("pages do not scroll horizontally", async ({ page }) => {
    for (const path of ["/", "/produtos/gases-soldadura-corte", "/contactos", "/saude"]) {
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow, path).toBeLessThanOrEqual(0);
    }
  });
});
