// Simple client-side rate limiter
// Chống spam API calls từ UI

const rateLimitMap = new Map<string, number>();

export function rateLimit(key: string, cooldownMs: number = 3000): boolean {
  const now = Date.now();
  const lastCall = rateLimitMap.get(key);

  if (lastCall && now - lastCall < cooldownMs) {
    return false; // Blocked — quá nhanh
  }

  rateLimitMap.set(key, now);
  return true; // Allowed
}

// Cleanup old entries every 5 minutes
if (typeof window !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, time] of rateLimitMap) {
      if (now - time > 300000) {
        // 5 minutes
        rateLimitMap.delete(key);
      }
    }
  }, 300000);
}
