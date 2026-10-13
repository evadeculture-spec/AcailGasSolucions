import { describe, expect, it } from "vitest";

import {
  MIN_FILL_TIME_MS,
  contactFormSchema,
  contactRequestSchema,
  isLikelySpam,
  type ContactFormValues,
} from "@/lib/validation/contact";

const valid: ContactFormValues = {
  name: "Maria Silva",
  company: "Metalúrgica Exemplo, Lda.",
  email: "maria@example.pt",
  phone: "+351 256 000 000",
  subject: "proposta",
  product: "gases-industriais",
  message: "Pretendemos fornecimento de árgon em garrafas para soldadura.",
  consent: true,
};

describe("contactFormSchema", () => {
  it("accepts a complete, valid submission", () => {
    expect(contactFormSchema.safeParse(valid).success).toBe(true);
  });

  it("accepts optional fields left empty", () => {
    const result = contactFormSchema.safeParse({ ...valid, company: "", phone: "", product: "" });
    expect(result.success).toBe(true);
  });

  it("trims whitespace", () => {
    const result = contactFormSchema.parse({ ...valid, name: "  Maria  " });
    expect(result.name).toBe("Maria");
  });

  it.each([
    ["name", { name: "M" }],
    ["email", { email: "não-é-email" }],
    ["phone", { phone: "abc" }],
    ["message", { message: "curta" }],
    ["consent", { consent: false }],
  ] as const)("rejects an invalid %s with a Portuguese message", (field, override) => {
    const result = contactFormSchema.safeParse({ ...valid, ...override });
    expect(result.success).toBe(false);
    const issue = result.error?.issues.find((item) => item.path[0] === field);
    expect(issue?.message).toMatch(/[a-zà-ú]/i);
  });

  it("rejects unknown subjects and products", () => {
    expect(contactFormSchema.safeParse({ ...valid, subject: "spam" }).success).toBe(false);
    expect(contactFormSchema.safeParse({ ...valid, product: "plutónio" }).success).toBe(false);
  });

  it("rejects messages above 4000 characters", () => {
    expect(contactFormSchema.safeParse({ ...valid, message: "a".repeat(4001) }).success).toBe(
      false,
    );
  });
});

describe("spam signals", () => {
  const now = 1_000_000;

  it("flags a filled honeypot", () => {
    expect(isLikelySpam({ website: "http://spam", startedAt: now - 60_000 }, now)).toBe(true);
  });

  it("flags submissions faster than a person can type", () => {
    expect(isLikelySpam({ website: "", startedAt: now - (MIN_FILL_TIME_MS - 1) }, now)).toBe(true);
  });

  it("accepts a normal submission", () => {
    expect(isLikelySpam({ website: "", startedAt: now - 30_000 }, now)).toBe(false);
  });

  it("requires the anti-spam fields in the request payload", () => {
    expect(contactRequestSchema.safeParse(valid).success).toBe(false);
    expect(contactRequestSchema.safeParse({ ...valid, website: "", startedAt: now }).success).toBe(
      true,
    );
  });
});
