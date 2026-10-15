import { z } from "zod";

import type { ContactSubject } from "@/lib/routes";
import type { ProductCategorySlug } from "@/types/content";

export const contactSubjects: Array<{ value: ContactSubject; label: string }> = [
  { value: "proposta", label: "Pedido de proposta comercial" },
  { value: "informacao-tecnica", label: "Informação técnica" },
  { value: "redes", label: "Projeto de redes de gases" },
  { value: "saude", label: "Gases medicinais" },
  { value: "soldadura", label: "Soldadura e corte" },
  { value: "outro", label: "Outro assunto" },
];

const subjectValues = contactSubjects.map((subject) => subject.value) as [
  ContactSubject,
  ...ContactSubject[],
];

const productValues = [
  "gases-soldadura-corte",
  "gases-alimentares",
  "gases-medicinais",
  "gas-ambiente",
  "gas-propano",
] as const satisfies readonly ProductCategorySlug[];

// Allows international formats: digits, spaces, +, parentheses, dots and hyphens.
const phonePattern = /^\+?[0-9\s().-]{9,20}$/;

/** Fields the visitor fills in. Shared by the client form and the API route. */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { error: "Indique o seu nome." })
    .max(100, { error: "O nome não pode exceder 100 caracteres." }),
  company: z.string().trim().max(120, { error: "Máximo de 120 caracteres." }),
  email: z
    .string()
    .trim()
    .min(1, { error: "Indique o seu email." })
    .max(160, { error: "Máximo de 160 caracteres." })
    .pipe(z.email({ error: "Indique um email válido." })),
  phone: z
    .string()
    .trim()
    .refine((value) => value === "" || phonePattern.test(value), {
      error: "Indique um número de telefone válido.",
    }),
  subject: z.enum(subjectValues, { error: "Selecione o assunto." }),
  product: z.union([z.enum(productValues), z.literal("")]),
  message: z
    .string()
    .trim()
    .min(20, { error: "A mensagem deve ter pelo menos 20 caracteres." })
    .max(4000, { error: "A mensagem não pode exceder 4000 caracteres." }),
  consent: z.boolean().refine((value) => value, {
    error: "É necessário aceitar a Política de Privacidade.",
  }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

/** Minimum time (ms) a human needs to fill the form; faster submissions are treated as bots. */
export const MIN_FILL_TIME_MS = 3000;

/** Full request payload: form fields plus anti-spam signals. */
export const contactRequestSchema = contactFormSchema.extend({
  /** Honeypot field, hidden from people. Must stay empty. */
  website: z.string().max(200),
  /** Timestamp (ms) when the form was rendered. */
  startedAt: z.number().int().positive(),
});

export type ContactRequest = z.infer<typeof contactRequestSchema>;

export function isLikelySpam(request: Pick<ContactRequest, "website" | "startedAt">, now: number) {
  return request.website.trim() !== "" || now - request.startedAt < MIN_FILL_TIME_MS;
}

export function isContactSubject(value: string | null): value is ContactSubject {
  return subjectValues.includes(value as ContactSubject);
}

export function isProductValue(value: string | null): value is (typeof productValues)[number] {
  return productValues.includes(value as (typeof productValues)[number]);
}

export function subjectLabel(value: ContactSubject): string {
  return contactSubjects.find((subject) => subject.value === value)?.label ?? value;
}

export type ContactApiResponse =
  | { ok: true }
  | {
      ok: false;
      code: "invalid" | "rate_limited" | "not_configured" | "delivery_failed" | "bad_request";
      fieldErrors?: Partial<Record<keyof ContactFormValues, string>>;
    };
