import { afterEach, describe, expect, it, vi } from "vitest";

import {
  MailNotConfiguredError,
  buildContactEmail,
  readMailConfig,
  sendContactEmail,
} from "@/lib/mail/contact-mailer";
import type { ContactFormValues } from "@/lib/validation/contact";

const values: ContactFormValues = {
  name: "<script>alert(1)</script>",
  company: "",
  email: "cliente@example.pt",
  phone: "",
  subject: "proposta",
  product: "gelo-seco",
  message: "Pedido de proposta para gelo seco.",
  consent: true,
};

afterEach(() => vi.unstubAllGlobals());

describe("contact mailer", () => {
  it("requires all three environment variables", () => {
    expect(readMailConfig({ RESEND_API_KEY: "k", CONTACT_TO_EMAIL: "a@b.pt" })).toBeNull();
    expect(
      readMailConfig({
        RESEND_API_KEY: "k",
        CONTACT_TO_EMAIL: "a@b.pt",
        CONTACT_FROM_EMAIL: "c@d.pt",
      }),
    ).toEqual({ apiKey: "k", to: "a@b.pt", from: "c@d.pt" });
  });

  it("builds a plain-text email with the product name", () => {
    const email = buildContactEmail(values);
    expect(email.subject).toContain("Pedido de proposta comercial");
    expect(email.text).toContain("Produto de interesse: Gelo Seco");
    expect(email.text).toContain("Empresa: —");
  });

  it("never sends without configuration", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    await expect(sendContactEmail(values, null)).rejects.toBeInstanceOf(MailNotConfiguredError);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("posts to the provider with reply-to set to the visitor", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchSpy);
    await sendContactEmail(values, {
      apiKey: "key",
      to: "geral@example.pt",
      from: "site@example.pt",
    });
    const [, init] = fetchSpy.mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(String(init.body));
    expect(body).toMatchObject({ to: ["geral@example.pt"], reply_to: "cliente@example.pt" });
    expect(body.html).toBeUndefined();
  });
});
