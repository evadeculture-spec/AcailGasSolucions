"use client";

import Link from "next/link";
import { useEffect, useId, useRef } from "react";
import { ChevronDown } from "lucide-react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import type { NavGroup } from "@/types/content";

import { isActivePath } from "./nav-utils";
import { useRouteScopedState } from "./use-route-scoped-state";

export function DesktopNav({ groups }: { groups: NavGroup[] }) {
  const [openLabel, setOpenLabel, pathname] = useRouteScopedState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const baseId = useId();

  useEffect(() => {
    if (!openLabel) return;

    function onPointerDown(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) setOpenLabel(null);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      const trigger = navRef.current?.querySelector<HTMLButtonElement>(`[aria-expanded="true"]`);
      setOpenLabel(null);
      trigger?.focus();
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openLabel, setOpenLabel]);

  return (
    <nav ref={navRef} aria-label="Navegação principal" className="hidden xl:block">
      <ul className="flex items-center gap-1">
        {groups.map((group) => {
          const active = isActivePath(pathname, group.href);
          if (!group.children) {
            return (
              <li key={group.label}>
                <Link
                  href={group.href}
                  aria-current={pathname === group.href ? "page" : undefined}
                  className={cn(navItemClass, active && "text-white after:scale-x-100")}
                >
                  {group.label}
                </Link>
              </li>
            );
          }

          const open = openLabel === group.label;
          const panelId = `${baseId}-${group.label}`;
          return (
            <li key={group.label}>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenLabel(open ? null : group.label)}
                className={cn(
                  navItemClass,
                  "gap-1.5",
                  (active || open) && "text-white after:scale-x-100",
                )}
              >
                {group.label}
                <ChevronDown
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className={cn(
                    "size-3.5 transition-transform duration-(--duration-base)",
                    open && "rotate-180",
                  )}
                />
              </button>
              <div
                id={panelId}
                hidden={!open}
                className="absolute inset-x-0 top-full border-t border-white/10 bg-navy-900 shadow-float"
              >
                <Container className="grid grid-cols-12 gap-10 py-10">
                  <div className="col-span-3">
                    <p className="font-display text-2xl text-white">{group.label}</p>
                    <Link
                      href={group.href}
                      onClick={() => setOpenLabel(null)}
                      className="mt-4 inline-flex font-mono text-label text-cryo-300 uppercase hover:text-white"
                    >
                      Ver visão geral →
                    </Link>
                  </div>
                  <ul className="col-span-9 grid grid-cols-2 gap-x-10 gap-y-1">
                    {group.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={() => setOpenLabel(null)}
                          aria-current={pathname === child.href ? "page" : undefined}
                          className="group/item block rounded-sm border-l border-white/10 px-5 py-3.5 transition-colors hover:border-cryo-300 hover:bg-white/[0.04] aria-[current=page]:border-cryo-300"
                        >
                          <span className="block font-medium text-white">{child.label}</span>
                          {child.description ? (
                            <span className="mt-1 line-clamp-2 block text-sm text-steel-400 group-hover/item:text-steel-300">
                              {child.description}
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Container>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

const navItemClass =
  "relative inline-flex h-(--spacing-header) items-center px-3.5 text-[0.9375rem] text-steel-300 transition-colors duration-(--duration-fast) hover:text-white after:absolute after:inset-x-3.5 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-cryo-400 after:transition-transform after:duration-(--duration-base) after:ease-(--ease-out-quart)";
