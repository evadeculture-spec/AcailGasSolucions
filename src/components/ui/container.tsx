import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils";

type ContainerProps<T extends ElementType> = {
  as?: T;
  /** "prose" narrows the measure for long-form text. */
  size?: "site" | "prose";
} & ComponentPropsWithoutRef<T>;

export function Container<T extends ElementType = "div">({
  as,
  size = "site",
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";
  return (
    <Component
      className={cn(
        "mx-auto w-full px-(--spacing-gutter)",
        size === "site"
          ? "max-w-(--container-site)"
          : "max-w-[calc(var(--container-prose)+2*var(--spacing-gutter))]",
        className,
      )}
      {...props}
    />
  );
}
