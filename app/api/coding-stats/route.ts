import { NextResponse } from "next/server";

const WAKAPI_URL =
  process.env.WAKAPI_INTERNAL_URL ?? "http://wakapi:3000";
const WAKAPI_USERNAME = "sahaduka";
const TIMEOUT_MS = 4000;
const REVALIDATE_SECONDS = 3600;

export const revalidate = 3600;

export async function GET() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const endpoint = `${WAKAPI_URL}/api/compat/wakatime/v1/users/${WAKAPI_USERNAME}/stats/?username=${WAKAPI_USERNAME}`;

  try {
    const response = await fetch(endpoint, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
      next: { revalidate: REVALIDATE_SECONDS, tags: ["coding-stats"] },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Wakapi returned HTTP ${response.status}` },
        {
          status: 502,
          headers: {
            "Cache-Control": `public, s-maxage=60, stale-while-revalidate=600`,
          },
        },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=${REVALIDATE_SECONDS * 4}`,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to fetch coding stats from Wakapi" },
      {
        status: 502,
        headers: {
          "Cache-Control": `public, s-maxage=60, stale-while-revalidate=600`,
        },
      },
    );
  } finally {
    clearTimeout(timeout);
  }
}