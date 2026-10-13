import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Container } from "./container";
import { Eyebrow } from "./eyebrow";

type Tone = "light" | "muted" | "dark" | "navy";

const toneClasses: Record<Tone, string> = {
  light: "bg-white text-steel-900",
  muted: "bg-steel-50 text-steel-900",
  dark: "dark-surface bg-navy-900 text-white",
  navy: "dark-surface bg-navy-800 text-white",
};

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  tone?: Tone;
  /** Removes the default vertical rhythm, e.g. for full-bleed compositions. */
  flush?: boolean;
}

export function Section({
  tone = "light",
  flush = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(toneClasses[tone], !flush && "py-(--spacing-section)", "relative", className)}
      {...props}
    >
      {children}
    </section>
  );
}

interface SectionHeaderProps {
  id?: string;
  eyebrow?: string;
  index?: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeader({
  id,
  eyebrow,
  index,
  title,
  intro,
  action,
  tone = "light",
  as: Heading = "h2",
  className,
}: SectionHeaderProps) {
  return (
    <Container className={cn("mb-12 grid gap-8 md:mb-16 lg:grid-cols-12 lg:items-end", className)}>
      <div className="lg:col-span-7">
        {eyebrow ? (
          <Eyebrow index={index} tone={tone} className="mb-5">
            {eyebrow}
          </Eyebrow>
        ) : null}
        <Heading id={id} className="text-h2">
          {title}
        </Heading>
      </div>
      {intro || action ? (
        <div className="flex flex-col gap-6 lg:col-span-5 lg:items-start">
          {intro ? (
            <p className={cn("text-lead", tone === "dark" ? "text-steel-300" : "text-steel-600")}>
              {intro}
            </p>
          ) : null}
          {action}
        </div>
      ) : null}
    </Container>
  );
}
