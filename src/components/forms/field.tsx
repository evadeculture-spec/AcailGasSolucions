import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: (describedBy: string | undefined) => ReactNode;
}

/** Accessible form field wrapper: label, hint and error wired through aria-describedby. */
export function Field({ id, label, required, hint, error, className, children }: FieldProps) {
  const hintId = hint ? `${id}-ajuda` : undefined;
  const errorId = error ? `${id}-erro` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-medium text-steel-900">
        {label}
        {required ? (
          <span className="text-danger-600" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-steel-500"> (opcional)</span>
        )}
      </label>
      {children(describedBy)}
      {hint ? (
        <p id={hintId} className="text-xs text-steel-500">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-sm text-danger-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const inputClass =
  "w-full rounded-sm border border-steel-300 bg-white px-4 py-3 text-[0.9375rem] text-steel-900 placeholder:text-steel-400 transition-[border-color,box-shadow] duration-(--duration-fast) hover:border-steel-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none aria-[invalid=true]:border-danger-600 aria-[invalid=true]:focus:ring-danger-600/20";
