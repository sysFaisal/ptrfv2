const WAKAPI_URL =
  process.env.WAKAPI_INTERNAL_URL ?? "https://wakapi.sakuspace.my.id";
const WAKAPI_USERNAME = "sahaduka";
const TIMEOUT_MS = 4000;
const CACHE_TTL_MS = 3600 * 1000;
const TODAY_CACHE_TTL_MS = 60 * 1000;
const PORT = Number(process.env.PORT ?? 3000);
const DIST = new URL("./dist/", import.meta.url);
const ALLOWED_ORIGINS = (
  process.env.ALLOWED_ORIGINS ?? "https://sahaduka.my.id"
)
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

type CacheEntry = { data: unknown; expires: number };
let cache: CacheEntry | null = null;
let todayCache: CacheEntry | null = null;

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 30;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

function getClientIP(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  let entry = rateLimitMap.get(ip);
  if (!entry || entry.resetAt < now) {
    entry = { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };
    rateLimitMap.set(ip, entry);
  }
  entry.count++;
  return entry.count <= RATE_LIMIT_MAX;
}

function cleanRateLimit() {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (entry.resetAt < now) rateLimitMap.delete(ip);
  }
}

setInterval(cleanRateLimit, RATE_LIMIT_WINDOW_MS);

function getOrigin(req: Request): string | null {
  return req.headers.get("origin") ?? req.headers.get("referer");
}

function isOriginAllowed(req: Request): boolean {
  const origin = getOrigin(req);
  if (!origin) return true;
  return ALLOWED_ORIGINS.some((allowed) => origin.includes(allowed));
}

function corsHeaders(origin: string | null): Record<string, string> {
  const matched = origin && ALLOWED_ORIGINS.some((a) => origin.includes(a));
  const allowedOrigin = matched ? origin : ALLOWED_ORIGINS[0] ?? "*";
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Accept, Content-Type",
    "Access-Control-Max-Age": "86400",
    "Access-Control-Allow-Credentials": "true",
  };
}

async function codingStats(): Promise<Response> {
  const now = Date.now();
  if (cache && cache.expires > now) {
    return json(cache.data, 200, CACHE_TTL_MS / 1000);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const endpoint = `${WAKAPI_URL}/api/compat/wakatime/v1/users/${WAKAPI_USERNAME}/stats/?username=${WAKAPI_USERNAME}`;

  try {
    const response = await fetch(endpoint, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    if (!response.ok) {
      return json(
        { error: `Wakapi returned HTTP ${response.status}` },
        502,
        60,
      );
    }

    const data = await response.json();
    cache = { data, expires: now + CACHE_TTL_MS };
    return json(data, 200, CACHE_TTL_MS / 1000);
  } catch {
    return json({ error: "Unable to fetch coding stats from Wakapi" }, 502, 60);
  } finally {
    clearTimeout(timeout);
  }
}

async function todayStats(): Promise<Response> {
  const now = Date.now();
  if (todayCache && todayCache.expires > now) {
    return json(todayCache.data, 200, TODAY_CACHE_TTL_MS / 1000);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const endpoint = `${WAKAPI_URL}/api/compat/wakatime/v1/users/${WAKAPI_USERNAME}/stats/today`;

  try {
    const response = await fetch(endpoint, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    if (!response.ok) {
      return json(
        { error: `Wakapi returned HTTP ${response.status}` },
        502,
        60,
      );
    }

    const data = await response.json();
    todayCache = { data, expires: now + TODAY_CACHE_TTL_MS };
    return json(data, 200, TODAY_CACHE_TTL_MS / 1000);
  } catch {
    return json(
      { error: "Unable to fetch today's stats from Wakapi" },
      502,
      60,
    );
  } finally {
    clearTimeout(timeout);
  }
}

function json(body: unknown, status: number, maxAge: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": `public, s-maxage=${maxAge}, stale-while-revalidate=${maxAge * 4}`,
    },
  });
}

function handleError(req: Request, status: number, message: string): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      ...corsHeaders(getOrigin(req)),
    },
  });
}

async function serveStatic(pathname: string): Promise<Response> {
  const clean = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const file = Bun.file(new URL(clean, DIST));
  if (await file.exists()) {
    return new Response(file);
  }
  const index = Bun.file(new URL("index.html", DIST));
  return new Response(index, {
    headers: { "Content-Type": "text/html" },
  });
}

Bun.serve({
  port: PORT,
  fetch: async (req) => {
    if (req.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders(getOrigin(req)),
      });
    }

    const url = new URL(req.url);

    if (url.pathname === "/api/coding-stats" || url.pathname === "/api/coding-today") {
      if (!isOriginAllowed(req)) {
        return handleError(req, 403, "Forbidden");
      }
      const ip = getClientIP(req);
      if (!checkRateLimit(ip)) {
        return handleError(req, 429, "Too Many Requests");
      }

      if (url.pathname === "/api/coding-stats") return codingStats();
      return todayStats();
    }

    return serveStatic(url.pathname);
  },
});

console.log(`listening on http://0.0.0.0:${PORT}`);
