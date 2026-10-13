import { expect, test } from "@playwright/test";

test.describe("contact form", () => {
  test("shows accessible validation errors", async ({ page }) => {
    await page.goto("/contactos");
    await page.getByRole("button", { name: "Enviar mensagem" }).click();

    const name = page.getByLabel("Nome");
    await expect(name).toHaveAttribute("aria-invalid", "true");
    await expect(name).toBeFocused();
    await expect(page.getByText("Indique o seu nome.")).toBeVisible();
    await expect(page.getByText("É necessário aceitar a Política de Privacidade.")).toBeVisible();
  });

  test("pre-selects subject and product from the URL", async ({ page }) => {
    await page.goto("/contactos?assunto=fds&produto=gases-especiais#formulario");
    await expect(page.getByLabel("Assunto")).toHaveValue("fds");
    await expect(page.getByLabel(/Produto de interesse/)).toHaveValue("gases-especiais");
  });

  test("reports honestly when delivery is not configured", async ({ page }) => {
    await page.route("/api/contact", (route) =>
      route.fulfill({ status: 503, json: { ok: false, code: "not_configured" } }),
    );
    await fillValidForm(page);
    await expect(page.getByRole("alert").filter({ hasText: "O envio" })).toContainText(
      "ainda não está ativo",
    );
    await expect(page.getByRole("alert").filter({ hasText: "O envio" })).toContainText(
      "geral@acailgrupo.pt",
    );
  });

  test("shows a success state after a successful submission", async ({ page }) => {
    await page.route("/api/contact", (route) => route.fulfill({ status: 200, json: { ok: true } }));
    await fillValidForm(page);
    await expect(page.getByRole("heading", { name: "Mensagem enviada" })).toBeFocused();
  });

  test("the real endpoint validates input on the server", async ({ request, baseURL }) => {
    const response = await request.post("/api/contact", {
      data: { name: "x" },
      headers: { origin: baseURL ?? "" },
    });
    expect(response.status()).toBe(422);
  });
});

async function fillValidForm(page: import("@playwright/test").Page) {
  await page.goto("/contactos");
  await page.getByLabel("Nome").fill("Maria Silva");
  await page.getByLabel("Email").fill("maria@example.pt");
  await page
    .getByLabel(/Mensagem/)
    .fill("Pretendemos uma proposta para fornecimento de azoto líquido.");
  await page.getByLabel(/Li e aceito/).check();
  await page.getByRole("button", { name: "Enviar mensagem" }).click();
}
