import "server-only";

import { siteConfig } from "@/config/site";
import { subjectLabel, type ContactFormValues } from "@/lib/validation/contact";

import { getProductCategory } from "@/content/pt/products";

export class MailNotConfiguredError extends Error {
  constructor() {
    super("Contact email delivery is not configured.");
    this.name = "MailNotConfiguredError";
  }
}

export class MailDeliveryError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "MailDeliveryError";
  }
}

interface MailConfig {
  apiKey: string;
  to: string;
  from: string;
}

export function readMailConfig(
  env: Record<string, string | undefined> = process.env,
): MailConfig | null {
  const apiKey = env.RESEND_API_KEY?.trim();
  const to = env.CONTACT_TO_EMAIL?.trim();
  const from = env.CONTACT_FROM_EMAIL?.trim();
  if (!apiKey || !to || !from) return null;
  return { apiKey, to, from };
}

/** Plain-text body: no HTML is generated, so user input cannot inject markup. */
export function buildContactEmail(values: ContactFormValues) {
  const product = values.product ? getProductCategory(values.product)?.name : undefined;
  const subject = `[Website] ${subjectLabel(values.subject)} — ${values.name}`.slice(0, 200);

  const lines = [
    `Novo pedido de contacto recebido em ${siteConfig.url}`,
    "",
    `Assunto: ${subjectLabel(values.subject)}`,
    `Produto de interesse: ${product ?? "—"}`,
    "",
    `Nome: ${values.name}`,
    `Empresa: ${values.company || "—"}`,
    `Email: ${values.email}`,
    `Telefone: ${values.phone || "—"}`,
    "",
    "Mensagem:",
    values.message,
    "",
    "—",
    "Consentimento para tratamento de dados: aceite.",
  ];

  return { subject, text: lines.join("\n") };
}

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export async function sendContactEmail(
  values: ContactFormValues,
  config: MailConfig | null = readMailConfig(),
): Promise<void> {
  if (!config) throw new MailNotConfiguredError();

  const { subject, text } = buildContactEmail(values);

  let response: Response;
  try {
    response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: values.email,
        subject,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch (error) {
    throw new MailDeliveryError(
      error instanceof Error ? error.message : "Network error while sending email",
    );
  }

  if (!response.ok) {
    throw new MailDeliveryError(
      `Email provider responded with ${response.status}`,
      response.status,
    );
  }
}
