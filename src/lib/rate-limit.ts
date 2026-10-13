/**
 * Fixed-window, in-memory rate limiter.
 *
 * Limitation: state lives in the memory of each server instance, so on
 * serverless platforms the limit applies per instance. For stricter limits,
 * replace the store with a shared one (e.g. Redis/Upstash) — see docs/DEPLOYMENT.md.
 */

interface Window {
  count: number;
  resetAt: number;
}

export interface RateLimiter {
  check(key: string, now?: number): { allowed: boolean; retryAfterSeconds: number };
}

export function createRateLimiter({
  limit,
  windowMs,
  maxKeys = 5000,
}: {
  limit: number;
  windowMs: number;
  maxKeys?: number;
}): RateLimiter {
  const windows = new Map<string, Window>();

  return {
    check(key, now = Date.now()) {
      const current = windows.get(key);

      if (!current || current.resetAt <= now) {
        if (windows.size >= maxKeys) {
          for (const [storedKey, window] of windows) {
            if (window.resetAt <= now) windows.delete(storedKey);
          }
          // Still full: evict the oldest entry to bound memory.
          if (windows.size >= maxKeys) {
            const oldest = windows.keys().next().value;
            if (oldest !== undefined) windows.delete(oldest);
          }
        }
        windows.set(key, { count: 1, resetAt: now + windowMs });
        return { allowed: true, retryAfterSeconds: 0 };
      }

      current.count += 1;
      const allowed = current.count <= limit;
      return {
        allowed,
        retryAfterSeconds: allowed ? 0 : Math.ceil((current.resetAt - now) / 1000),
      };
    },
  };
}
