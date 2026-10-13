import { Camera } from "lucide-react";

import { cn } from "@/lib/utils";

interface MediaPlaceholderProps {
  /** What the final photograph should show — used as the visible caption and alt text. */
  brief: string;
  ratio?: "4/3" | "16/9" | "3/4" | "1/1";
  className?: string;
}

const ratioClasses = {
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-video",
  "3/4": "aspect-[3/4]",
  "1/1": "aspect-square",
} as const;

/**
 * Clearly identified slot for an official photograph that has not yet been
 * supplied with usage rights. Replace with `next/image` once the asset exists
 * (see docs/CONTENT_SOURCES.md → "Imagens a fornecer").
 */
export function MediaPlaceholder({ brief, ratio = "4/3", className }: MediaPlaceholderProps) {
  return (
    <figure
      data-placeholder="image"
      className={cn(
        "tech-grid relative overflow-hidden rounded-sm bg-navy-800 text-white",
        ratioClasses[ratio],
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(120%_80%_at_80%_10%,rgb(79_195_227/0.22),transparent_60%)]"
      />
      <figcaption className="absolute inset-x-0 bottom-0 flex items-start gap-3 p-5 font-mono text-[0.6875rem] leading-relaxed tracking-[0.08em] text-steel-300 uppercase">
        <Camera
          aria-hidden="true"
          className="mt-0.5 size-4 shrink-0 text-cryo-300"
          strokeWidth={1.5}
        />
        <span>
          <span className="block text-cryo-300">Fotografia institucional a integrar</span>
          {brief}
        </span>
      </figcaption>
    </figure>
  );
}
