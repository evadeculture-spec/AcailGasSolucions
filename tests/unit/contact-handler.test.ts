import { describe, expect, it, vi } from "vitest";

import { handleContactRequest, type ContactHandlerDeps } from "@/lib/contact-handler";
import { MailDeliveryError, MailNotConfiguredError } from "@/lib/mail/contact-mailer";
import { createRateLimiter } from "@/lib/rate-limit";

const NOW = 10_000_000;

const payload = {
  name: "Maria Silva",
  company: "",
  email: "maria@example.pt",
  phone: "",
  subject: "fds",
  product: "gases-especiais",
  message: "Solicito a ficha de dados de segurança do hélio.",
  consent: true,
  website: "",
  startedAt: NOW - 20_000,
};

function deps(overrides: Partial<ContactHandlerDeps> = {}): ContactHandlerDeps {
  return {
    send: vi.fn().mockResolvedValue(undefined),
    rateLimiter: createRateLimiter({ limit: 5, windowMs: 60_000 }),
    now: () => NOW,
    log: vi.fn(),
    ...overrides,
  };
}

function request(body: unknown, headers: Record<string, string> = {}) {
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", host: "localhost:3000", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("handleContactRequest", () => {
  it("sends a valid request and returns ok", async () => {
    const d = deps();
    const response = await handleContactRequest(request(payload), d);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(d.send).toHaveBeenCalledOnce();
    expect(d.send).toHaveBeenCalledWith(
      expect.not.objectContaining({ website: expect.anything() }),
    );
  });

  it("returns field errors for invalid input without sending", async () => {
    const d = deps();
    const response = await handleContactRequest(request({ ...payload, email: "x" }), d);
    expect(response.status).toBe(422);
    const body = await response.json();
    expect(body.code).toBe("invalid");
    expect(body.fieldErrors.email).toBeTruthy();
    expect(d.send).not.toHaveBeenCalled();
  });

  it("silently drops honeypot submissions", async () => {
    const d = deps();
    const response = await handleContactRequest(request({ ...payload, website: "spam" }), d);
    expect(response.status).toBe(200);
    expect(d.send).not.toHaveBeenCalled();
  });

  it("reports 503 when email delivery is not configured", async () => {
    const d = deps({ send: vi.fn().mockRejectedValue(new MailNotConfiguredError()) });
    const response = await handleContactRequest(request(payload), d);
    expect(response.status).toBe(503);
    expect((await response.json()).code).toBe("not_configured");
  });

  it("reports 502 when the provider fails", async () => {
    const d = deps({ send: vi.fn().mockRejectedValue(new MailDeliveryError("down", 500)) });
    const response = await handleContactRequest(request(payload), d);
    expect(response.status).toBe(502);
  });

  it("rejects cross-origin requests", async () => {
    const response = await handleContactRequest(
      request(payload, { origin: "https://evil.example" }),
      deps(),
    );
    expect(response.status).toBe(403);
  });

  it("rejects non-JSON and malformed bodies", async () => {
    const d = deps();
    expect((await handleContactRequest(request("{", {}), d)).status).toBe(400);
    expect(
      (await handleContactRequest(request(payload, { "content-type": "text/plain" }), d)).status,
    ).toBe(415);
  });

  it("rejects oversized bodies", async () => {
    const response = await handleContactRequest(
      request({ ...payload, message: "a".repeat(20_000) }),
      deps(),
    );
    expect(response.status).toBe(413);
  });

  it("rate limits repeated requests from the same client", async () => {
    const d = deps({ rateLimiter: createRateLimiter({ limit: 2, windowMs: 60_000 }) });
    const headers = { "x-forwarded-for": "203.0.113.7" };
    await handleContactRequest(request(payload, headers), d);
    await handleContactRequest(request(payload, headers), d);
    const response = await handleContactRequest(request(payload, headers), d);
    expect(response.status).toBe(429);
    expect(response.headers.get("retry-after")).toBe("60");
  });
});
