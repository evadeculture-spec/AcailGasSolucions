import "server-only";

import { MailNotConfiguredError, sendContactEmail } from "@/lib/mail/contact-mailer";
import { createRateLimiter, type RateLimiter } from "@/lib/rate-limit";
import {
  contactRequestSchema,
  isLikelySpam,
  type ContactApiResponse,
  type ContactFormValues,
} from "@/lib/validation/contact";

const MAX_BODY_BYTES = 16 * 1024;

export interface ContactHandlerDeps {
  send: (values: ContactFormValues) => Promise<void>;
  rateLimiter: RateLimiter;
  now: () => number;
  log: (message: string, error?: unknown) => void;
}

const defaultDeps: ContactHandlerDeps = {
  send: sendContactEmail,
  rateLimiter: createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 }),
  now: () => Date.now(),
  log: (message, error) => console.error(`[contact] ${message}`, error ?? ""),
};

function json(body: ContactApiResponse, status: number, headers?: HeadersInit) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

/** Rejects cross-site submissions: the Origin header, when present, must match the host. */
function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function handleContactRequest(
  request: Request,
  deps: ContactHandlerDeps = defaultDeps,
): Promise<Response> {
  if (!isSameOrigin(request)) return json({ ok: false, code: "bad_request" }, 403);

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ ok: false, code: "bad_request" }, 415);
  }

  const rate = deps.rateLimiter.check(clientKey(request), deps.now());
  if (!rate.allowed) {
    return json({ ok: false, code: "rate_limited" }, 429, {
      "Retry-After": String(rate.retryAfterSeconds),
    });
  }

  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
    return json({ ok: false, code: "bad_request" }, 413);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json({ ok: false, code: "bad_request" }, 400);
  }

  const parsed = contactRequestSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactFormValues, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !(field in fieldErrors)) {
        fieldErrors[field as keyof ContactFormValues] = issue.message;
      }
    }
    return json({ ok: false, code: "invalid", fieldErrors }, 422);
  }

  const { website, startedAt, ...values } = parsed.data;

  // Spam signals: answer as if accepted so automated senders learn nothing, but send nothing.
  if (isLikelySpam({ website, startedAt }, deps.now())) {
    return json({ ok: true }, 200);
  }

  try {
    await deps.send(values);
    return json({ ok: true }, 200);
  } catch (error) {
    if (error instanceof MailNotConfiguredError) {
      deps.log("Delivery not configured (RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL).");
      return json({ ok: false, code: "not_configured" }, 503);
    }
    deps.log("Delivery failed", error);
    return json({ ok: false, code: "delivery_failed" }, 502);
  }
}
