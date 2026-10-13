import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}

/** Inline text link with an animated arrow. */
export function ArrowLink({ href, children, tone = "light", className }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group/link inline-flex items-center gap-2 text-[0.9375rem] font-medium underline-offset-4 hover:underline",
        tone === "dark" ? "text-cryo-300 hover:text-white" : "text-blue-600 hover:text-navy-800",
        className,
      )}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        strokeWidth={1.75}
        className="size-4 transition-transform duration-(--duration-base) ease-(--ease-out-quart) group-hover/link:translate-x-1"
      />
    </Link>
  );
}
