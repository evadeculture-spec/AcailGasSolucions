import { cn } from "@/lib/utils";

/**
 * PROVISIONAL typographic wordmark.
 * The official Acail Gás logo could not be obtained during the audit; replace
 * this component's markup with the official vector logo (see docs/CONTENT_AUDIT.md §13).
 */
export function Logo({
  tone = "dark",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const onDark = tone === "dark";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)} data-provisional-logo>
      <svg aria-hidden="true" viewBox="0 0 28 28" className="size-7 shrink-0">
        <rect width="28" height="28" rx="3" className={onDark ? "fill-white" : "fill-navy-800"} />
        <path
          d="M8 20.5 14 7l6 13.5M10.4 15.2h7.2"
          fill="none"
          strokeWidth="2.1"
          strokeLinecap="square"
          className={onDark ? "stroke-navy-900" : "stroke-white"}
        />
      </svg>
      <span
        className={cn(
          "font-display text-[1.1875rem] leading-none font-semibold tracking-[-0.02em]",
          onDark ? "text-white" : "text-navy-900",
        )}
      >
        Acail
        <span className={cn("ml-1 font-normal", onDark ? "text-cryo-300" : "text-blue-500")}>
          Gás
        </span>
      </span>
    </span>
  );
}
