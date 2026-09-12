const WAKAPI_URL =
  process.env.WAKAPI_INTERNAL_URL ?? "https://wakapi.sakuspace.my.id";
const WAKAPI_USERNAME = "sahaduka";
const TIMEOUT_MS = 4000;
const CACHE_TTL_MS = 3600 * 1000;
const TODAY_CACHE_TTL_MS = 60 * 1000;
const PORT = Number(process.env.PORT ?? 3000);
const DIST = new URL("./dist/", import.meta.url);

type CacheEntry = { data: unknown; expires: number };
let cache: CacheEntry | null = null;
let todayCache: CacheEntry | null = null;

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
      return json({ error: `Wakapi returned HTTP ${response.status}` }, 502, 60);
    }

    const data = await response.json();
    todayCache = { data, expires: now + TODAY_CACHE_TTL_MS };
    return json(data, 200, TODAY_CACHE_TTL_MS / 1000);
  } catch {
    return json({ error: "Unable to fetch today's stats from Wakapi" }, 502, 60);
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
    const url = new URL(req.url);
    if (url.pathname === "/api/coding-stats") {
      return codingStats();
    }
    if (url.pathname === "/api/coding-today") {
      return todayStats();
    }
    return serveStatic(url.pathname);
  },
});

console.log(`listening on http://0.0.0.0:${PORT}`);
