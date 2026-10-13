"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Mail, Phone } from "lucide-react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import type { NavGroup, NavItem } from "@/types/content";

import { isActivePath } from "./nav-utils";
import { useRouteScopedState } from "./use-route-scoped-state";

const PANEL_ID = "menu-movel";

export function MobileNav({ groups, contact }: { groups: NavGroup[]; contact: NavItem }) {
  const [open, setOpen, pathname] = useRouteScopedState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      // Keep focus within the toggle button and the open panel.
      const focusable = [
        toggleRef.current,
        ...panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ].filter(
        (element): element is HTMLElement => element !== null && element.offsetParent !== null,
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, setOpen]);

  function close() {
    setOpen(false);
  }

  return (
    <div className="xl:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={PANEL_ID}
        onClick={() => setOpen(!open)}
        className="relative z-10 -mr-2 inline-flex h-11 items-center gap-3 rounded-sm px-2 text-sm font-medium text-white"
      >
        <span>{open ? "Fechar" : "Menu"}</span>
        <span aria-hidden="true" className="relative block h-3 w-5">
          <span
            className={cn(
              "absolute inset-x-0 top-0 h-px bg-current transition-transform duration-(--duration-base) ease-(--ease-out-quart)",
              open && "translate-y-1.5 rotate-45",
            )}
          />
          <span
            className={cn(
              "absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-(--duration-base) ease-(--ease-out-quart)",
              open && "-translate-y-1.5 -rotate-45",
            )}
          />
        </span>
      </button>

      <div
        id={PANEL_ID}
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-(--spacing-header) bottom-0 overflow-y-auto overscroll-contain bg-navy-900"
      >
        <nav aria-label="Navegação principal" className="px-(--spacing-gutter) pt-4 pb-10">
          <ul className="divide-y divide-white/10 border-b border-white/10">
            {groups.map((group) => {
              const active = isActivePath(pathname, group.href);
              if (!group.children) {
                return (
                  <li key={group.label}>
                    <Link
                      href={group.href}
                      onClick={close}
                      aria-current={pathname === group.href ? "page" : undefined}
                      className={cn(mobileItemClass, active && "text-cryo-300")}
                    >
                      {group.label}
                    </Link>
                  </li>
                );
              }
              const isExpanded = expanded === group.label;
              const subId = `${PANEL_ID}-${group.href.replace(/\W/g, "")}`;
              return (
                <li key={group.label}>
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={subId}
                    onClick={() => setExpanded(isExpanded ? null : group.label)}
                    className={cn(
                      mobileItemClass,
                      "w-full justify-between",
                      active && "text-cryo-300",
                    )}
                  >
                    {group.label}
                    <ChevronDown
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className={cn(
                        "size-5 transition-transform duration-(--duration-base)",
                        isExpanded && "rotate-180",
                      )}
                    />
                  </button>
                  <ul id={subId} hidden={!isExpanded} className="pb-4">
                    <li>
                      <Link href={group.href} onClick={close} className={mobileSubItemClass}>
                        Visão geral
                      </Link>
                    </li>
                    {group.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={close}
                          aria-current={pathname === child.href ? "page" : undefined}
                          className={cn(mobileSubItemClass, "aria-[current=page]:text-cryo-300")}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>

          <Link
            href={contact.href}
            onClick={close}
            className="mt-8 flex min-h-12 items-center justify-center rounded-sm bg-white px-6 font-medium text-navy-900"
          >
            {contact.label}
          </Link>

          <div className="mt-8 space-y-3 text-sm text-steel-300">
            <a
              href={siteConfig.contact.phones[0].href}
              className="flex items-center gap-3 hover:text-white"
            >
              <Phone aria-hidden="true" className="size-4 text-cryo-300" strokeWidth={1.5} />
              {siteConfig.contact.phones[0].display}
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center gap-3 hover:text-white"
            >
              <Mail aria-hidden="true" className="size-4 text-cryo-300" strokeWidth={1.5} />
              {siteConfig.contact.email}
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}

const mobileItemClass =
  "flex min-h-16 items-center font-display text-2xl tracking-[-0.02em] text-white transition-colors hover:text-cryo-300";
const mobileSubItemClass = "block py-2.5 pl-4 text-base text-steel-300 hover:text-white";
