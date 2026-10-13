import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: ReactNode;
  index?: string;
  tone?: "light" | "dark";
  className?: string;
}

/** Monospaced technical label placed above headings. */
export function Eyebrow({ children, index, tone = "light", className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-label uppercase",
        tone === "dark" ? "text-cryo-300" : "text-blue-600",
        className,
      )}
    >
      {index ? (
        <>
          <span aria-hidden="true">{index}</span>
          <span
            aria-hidden="true"
            className={cn("h-px w-6", tone === "dark" ? "bg-cryo-300/50" : "bg-blue-500/40")}
          />
        </>
      ) : null}
      <span>{children}</span>
    </p>
  );
}
