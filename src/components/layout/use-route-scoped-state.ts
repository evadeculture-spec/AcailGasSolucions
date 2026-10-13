"use client";

import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";

/**
 * State that automatically resets when the route changes.
 * The value is stored together with the pathname it was set on and is only
 * returned while that pathname is current — no effect needed to reset it.
 */
export function useRouteScopedState<T>(initial: T) {
  const pathname = usePathname();
  const [state, setState] = useState<{ value: T; pathname: string }>({ value: initial, pathname });

  const value = state.pathname === pathname ? state.value : initial;
  const setValue = useCallback(
    (next: T | ((previous: T) => T)) => {
      setState((previous) => {
        const base = previous.pathname === pathname ? previous.value : initial;
        const resolved = typeof next === "function" ? (next as (previous: T) => T)(base) : next;
        return { value: resolved, pathname };
      });
    },
    [pathname, initial],
  );

  return [value, setValue, pathname] as const;
}
