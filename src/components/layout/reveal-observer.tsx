"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Progressive reveal for elements marked with `data-reveal`.
 * Content is visible by default; the hiding class is only added once JS runs,
 * motion is allowed, and elements already in view are marked as revealed.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed='true'])"),
    );
    const viewportHeight = window.innerHeight;
    for (const element of elements) {
      if (element.getBoundingClientRect().top < viewportHeight * 0.95) {
        element.dataset.revealed = "true";
      }
    }
    document.documentElement.classList.add("js-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealed = "true";
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    for (const element of elements) {
      if (element.dataset.revealed !== "true") observer.observe(element);
    }
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
