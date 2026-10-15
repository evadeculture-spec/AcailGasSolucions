"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";

import { primaryPhone, siteConfig } from "@/config/site";
import { productCategories } from "@/content/pt/products";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import {
  contactFormSchema,
  contactSubjects,
  isContactSubject,
  isProductValue,
  type ContactApiResponse,
  type ContactFormValues,
} from "@/lib/validation/contact";

import { Field, inputClass } from "./field";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; code: Exclude<ContactApiResponse, { ok: true }>["code"] | "network" };

const defaultValues: ContactFormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  subject: "proposta",
  product: "",
  message: "",
  consent: false,
};

const fieldNames = Object.keys(defaultValues) as Array<keyof ContactFormValues>;

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const startedAtRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    setFocus,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
    mode: "onTouched",
    // Focus is handled in onInvalid so it follows the visual (DOM) order of the fields.
    shouldFocusError: false,
  });

  function onInvalid(fieldErrors: Partial<Record<keyof ContactFormValues, unknown>>) {
    const first = fieldNames.find((name) => fieldErrors[name]);
    if (first) setFocus(first);
  }

  // Start the anti-spam timer and apply ?assunto=…&produto=… without making the page dynamic.
  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
    const params = new URLSearchParams(window.location.search);
    const subject = params.get("assunto");
    const product = params.get("produto");
    if (isContactSubject(subject)) setValue("subject", subject);
    if (isProductValue(product)) setValue("product", product);
  }, [setValue]);

  useEffect(() => {
    if (status.state === "success") successRef.current?.focus();
  }, [status.state]);

  async function onSubmit(values: ContactFormValues, event?: React.BaseSyntheticEvent) {
    // Anti-spam signals travel as uncontrolled inputs outside the validated form values.
    const formData = new FormData(event?.target as HTMLFormElement);
    setStatus({ state: "submitting" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          website: String(formData.get("website") ?? ""),
          startedAt: Number(formData.get("startedAt")) || 0,
        }),
      });
      const result = (await response.json().catch(() => null)) as ContactApiResponse | null;

      if (result?.ok) {
        reset(defaultValues);
        setStatus({ state: "success" });
        return;
      }
      if (result && result.code === "invalid" && result.fieldErrors) {
        for (const name of fieldNames) {
          const message = result.fieldErrors[name];
          if (message) setError(name, { message });
        }
        onInvalid(result.fieldErrors);
      }
      setStatus({ state: "error", code: result?.code ?? "delivery_failed" });
    } catch {
      setStatus({ state: "error", code: "network" });
    }
  }

  if (status.state === "success") {
    return (
      <div
        role="status"
        className="rounded-sm border border-success-600/30 bg-success-50 p-8 md:p-10"
      >
        <CircleCheck aria-hidden="true" className="size-8 text-success-600" strokeWidth={1.5} />
        <h3 ref={successRef} tabIndex={-1} className="mt-6 text-h3 text-navy-900 outline-none">
          Mensagem enviada
        </h3>
        <p className="mt-3 text-steel-700">
          Obrigado pelo seu contacto. A nossa equipa responderá com a maior brevidade possível.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className="mt-8 inline-flex min-h-11 items-center rounded-sm border border-steel-300 px-5 text-sm font-medium text-navy-900 hover:border-navy-800"
        >
          Enviar nova mensagem
        </button>
      </div>
    );
  }

  const submitting = status.state === "submitting";

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      aria-describedby="formulario-nota"
      className="grid gap-6 md:grid-cols-2"
    >
      <p id="formulario-nota" className="text-sm text-steel-600 md:col-span-2">
        Os campos assinalados com <span className="text-danger-600">*</span> são obrigatórios.
      </p>

      <Field id="nome" label="Nome" required error={errors.name?.message}>
        {(describedBy) => (
          <input
            id="nome"
            type="text"
            autoComplete="name"
            aria-required="true"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy}
            className={inputClass}
            {...register("name")}
          />
        )}
      </Field>

      <Field id="empresa" label="Empresa" error={errors.company?.message}>
        {(describedBy) => (
          <input
            id="empresa"
            type="text"
            autoComplete="organization"
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={describedBy}
            className={inputClass}
            {...register("company")}
          />
        )}
      </Field>

      <Field id="email" label="Email" required error={errors.email?.message}>
        {(describedBy) => (
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            aria-required="true"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy}
            className={inputClass}
            {...register("email")}
          />
        )}
      </Field>

      <Field id="telefone" label="Telefone" error={errors.phone?.message}>
        {(describedBy) => (
          <input
            id="telefone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={describedBy}
            className={inputClass}
            {...register("phone")}
          />
        )}
      </Field>

      <Field id="assunto" label="Assunto" required error={errors.subject?.message}>
        {(describedBy) => (
          <select
            id="assunto"
            aria-required="true"
            aria-invalid={errors.subject ? true : undefined}
            aria-describedby={describedBy}
            className={cn(
              inputClass,
              "appearance-none bg-[url('/icons/chevron-down.svg')] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10",
            )}
            {...register("subject")}
          >
            {contactSubjects.map((subject) => (
              <option key={subject.value} value={subject.value}>
                {subject.label}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field id="produto" label="Produto de interesse" error={errors.product?.message}>
        {(describedBy) => (
          <select
            id="produto"
            aria-invalid={errors.product ? true : undefined}
            aria-describedby={describedBy}
            className={cn(
              inputClass,
              "appearance-none bg-[url('/icons/chevron-down.svg')] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10",
            )}
            {...register("product")}
          >
            <option value="">Sem preferência</option>
            {productCategories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field
        id="mensagem"
        label="Mensagem"
        required
        hint="Indique, se possível, o gás, a quantidade estimada, a forma de fornecimento e a localização."
        error={errors.message?.message}
        className="md:col-span-2"
      >
        {(describedBy) => (
          <textarea
            id="mensagem"
            rows={6}
            aria-required="true"
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy}
            className={cn(inputClass, "resize-y")}
            {...register("message")}
          />
        )}
      </Field>

      {/* Honeypot: hidden from people and assistive technology; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>
      <input ref={startedAtRef} type="hidden" name="startedAt" defaultValue="0" />

      <div className="md:col-span-2">
        <div className="flex gap-3">
          <input
            id="consentimento"
            type="checkbox"
            aria-required="true"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "consentimento-erro" : undefined}
            className="mt-0.5 size-5 shrink-0 rounded-xs border-steel-400 accent-navy-800"
            {...register("consent")}
          />
          <label htmlFor="consentimento" className="text-sm leading-relaxed text-steel-700">
            Li e aceito a{" "}
            <Link href={routes.privacy} className="text-blue-600 underline underline-offset-2">
              Política de Privacidade
            </Link>{" "}
            e autorizo o tratamento dos meus dados para resposta a este pedido.
            <span className="text-danger-600" aria-hidden="true">
              {" "}
              *
            </span>
          </label>
        </div>
        {errors.consent ? (
          <p id="consentimento-erro" className="mt-2 text-sm text-danger-600">
            {errors.consent.message}
          </p>
        ) : null}
      </div>

      <div aria-live="polite" className="md:col-span-2">
        {status.state === "error" ? <ErrorMessage code={status.code} /> : null}
      </div>

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-12 items-center gap-3 rounded-sm bg-navy-800 px-7 font-medium text-white transition-colors hover:bg-blue-600 disabled:cursor-wait disabled:opacity-70"
        >
          {submitting ? <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> : null}
          {submitting ? "A enviar…" : "Enviar mensagem"}
        </button>
      </div>
    </form>
  );
}

function ErrorMessage({ code }: { code: Extract<Status, { state: "error" }>["code"] }) {
  const { email } = siteConfig.contact;
  const phone = primaryPhone;
  const fallback = (
    <>
      Contacte-nos diretamente para{" "}
      <a href={`mailto:${email}`} className="font-medium underline">
        {email}
      </a>{" "}
      ou pelo{" "}
      <a href={phone.href} className="font-medium underline">
        {phone.display}
      </a>
      .
    </>
  );

  const messages: Record<typeof code, string> = {
    invalid: "Verifique os campos assinalados e tente novamente.",
    rate_limited:
      "Recebemos vários pedidos seguidos a partir desta ligação. Aguarde alguns minutos e tente novamente.",
    not_configured: "O envio de mensagens através do website ainda não está ativo.",
    delivery_failed: "Não foi possível enviar a sua mensagem.",
    bad_request: "Não foi possível processar o pedido.",
    network: "Sem ligação ao servidor. Verifique a sua ligação à internet e tente novamente.",
  };

  return (
    <p
      role="alert"
      className="flex gap-3 rounded-sm border border-danger-600/30 bg-danger-50 p-4 text-sm text-steel-800"
    >
      <CircleAlert
        aria-hidden="true"
        className="mt-0.5 size-4 shrink-0 text-danger-600"
        strokeWidth={1.75}
      />
      <span>
        {messages[code]} {code === "invalid" ? null : fallback}
      </span>
    </p>
  );
}
