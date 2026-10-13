import { useId } from "react";

import { cn } from "@/lib/utils";

/**
 * Generative technical artwork: flow lines evoking pressure isobars and gas
 * flow. Deterministic (server-rendered), decorative and lightweight — used
 * instead of generic stock photography until official imagery is available.
 */

const WIDTH = 1200;
const HEIGHT = 900;
const LINES = 18;
const SAMPLES = 36;

function linePath(index: number): string {
  const t = index / (LINES - 1);
  const baseY = 90 + t * (HEIGHT - 180);
  const amplitude = 26 + 70 * Math.sin(Math.PI * t);
  const phase = t * 2.4;
  const points: string[] = [];
  for (let s = 0; s <= SAMPLES; s += 1) {
    const u = s / SAMPLES;
    const x = u * WIDTH;
    // Lines converge towards the right edge, like flow through a nozzle.
    const converge = 1 - 0.55 * u * u;
    const y =
      HEIGHT / 2 +
      (baseY - HEIGHT / 2) * converge +
      amplitude * Math.sin(u * Math.PI * 2.2 + phase) * (0.35 + 0.65 * u);
    points.push(`${s === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return points.join("");
}

const paths = Array.from({ length: LINES }, (_, index) => linePath(index));

export function IsobarField({
  className,
  animated = true,
}: {
  className?: string;
  animated?: boolean;
}) {
  const gradientId = `isobar-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn("pointer-events-none", className)}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#4fc3e3" stopOpacity="0" />
          <stop offset="0.35" stopColor="#4fc3e3" stopOpacity="0.35" />
          <stop offset="1" stopColor="#b5e8f5" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#${gradientId})`} strokeWidth="1">
        {paths.map((d, index) => (
          <path key={index} d={d} strokeOpacity={index % 3 === 0 ? 0.9 : 0.45} />
        ))}
      </g>
      {animated ? (
        <g fill="none" stroke="#b5e8f5" strokeWidth="1.4" strokeLinecap="round">
          {paths
            .filter((_, index) => index % 4 === 1)
            .map((d, index) => (
              <path
                key={index}
                d={d}
                strokeDasharray="40 1160"
                className="animate-drift"
                style={{ animationDelay: `${index * -5.5}s` }}
              />
            ))}
        </g>
      ) : null}
    </svg>
  );
}
