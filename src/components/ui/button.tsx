import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { cn, isExternalHref } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Tone = "light" | "dark";

const base =
  "group/button inline-flex min-h-12 items-center justify-center gap-3 rounded-sm px-6 text-[0.9375rem] font-medium tracking-[-0.005em] transition-[background-color,color,border-color,box-shadow] duration-(--duration-base) ease-(--ease-out-quart)";

const variants: Record<Tone, Record<Variant, string>> = {
  light: {
    primary: "bg-navy-800 text-white hover:bg-blue-600",
    secondary:
      "border border-steel-300 text-steel-900 hover:border-navy-800 hover:bg-navy-800 hover:text-white",
    ghost: "px-0 text-blue-600 hover:text-navy-800",
  },
  dark: {
    primary: "bg-white text-navy-900 hover:bg-cryo-200",
    secondary:
      "border border-white/30 text-white hover:border-white hover:bg-white hover:text-navy-900",
    ghost: "px-0 text-cryo-300 hover:text-white",
  },
};

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  tone?: Tone;
  className?: string;
  /** Hide the trailing arrow (e.g. for icon-led buttons). */
  plain?: boolean;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  tone = "light",
  className,
  plain = false,
}: ButtonLinkProps) {
  const external = isExternalHref(href) && !href.startsWith("mailto:") && !href.startsWith("tel:");
  const Icon = external ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      <span>{children}</span>
      {plain ? null : (
        <Icon
          aria-hidden="true"
          className="size-4 shrink-0 transition-transform duration-(--duration-base) ease-(--ease-out-quart) group-hover/button:translate-x-0.5"
          strokeWidth={1.75}
        />
      )}
      {external ? <span className="sr-only">(abre numa nova janela)</span> : null}
    </>
  );
  const classes = cn(base, variants[tone][variant], className);

  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
