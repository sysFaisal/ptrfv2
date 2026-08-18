"use client";

import { useEffect, useState } from "react";
import { fallbackCodingStats } from "@/lib/data";
import { config } from "@/lib/config";
import Reveal from "./Reveal";

const { coding } = config;

type CodingStat = { name: string; total_seconds: number; percent: number };
type CodingData = {
  languages: CodingStat[];
  total_seconds: number;
  days_tracked: number;
  daily_average: number;
};

const WAKAPI_ENDPOINT: string =
  "https://wakapi.sakuspace.my.id/api/compat/wakatime/v1/users/sahaduka/stats/";
const WAKAPI_USERNAME: string = "sahaduka";
const TIMEOUT_MS = 4000;

function formatHours(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
}

function CodingRow({
  lang,
  maxPercent,
  rank,
}: {
  lang: CodingStat;
  maxPercent: number;
  rank: number;
}) {
  const barWidth = (lang.percent / maxPercent) * 100;
  return (
    <div className="cs-row">
      <span className="cs-rank">#{rank}</span>
      <div className="cs-lang">
        <span className="cs-lang-name">{lang.name}</span>
        <div className="cs-bar">
          <div className="cs-fill" style={{ width: `${barWidth}%` }} />
        </div>
      </div>
      <span className="cs-time">{formatHours(lang.total_seconds)}</span>
      <span className="cs-percent">{lang.percent.toFixed(1)}%</span>
    </div>
  );
}

export default function CodingStats() {
  const [data, setData] = useState<CodingData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    function render(d: CodingData) {
      setData(d);
    }
    function renderError() {
      setError(true);
    }

    if (!WAKAPI_ENDPOINT || !WAKAPI_USERNAME) {
      render(fallbackCodingStats);
      return;
    }
    if (typeof fetch !== "function") {
      render(fallbackCodingStats);
      return;
    }

    const ctrl =
      typeof AbortController === "function" ? new AbortController() : null;
    const timer = setTimeout(() => ctrl?.abort(), TIMEOUT_MS);

    const url =
      WAKAPI_ENDPOINT.indexOf("?") === -1
        ? `${WAKAPI_ENDPOINT}?username=${WAKAPI_USERNAME}`
        : `${WAKAPI_ENDPOINT}&username=${WAKAPI_USERNAME}`;

    fetch(url, {
      headers: { Accept: "application/json" },
      signal: ctrl ? ctrl.signal : undefined,
    })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then((d: { data: CodingData }) => {
        clearTimeout(timer);
        //console.log("Coding stats fetched:", d);
        const data = d?.data;
        if (!data || !Array.isArray(data.languages)) {
          renderError();
          return;
        }
        render({
          languages: data.languages,
          total_seconds: data.total_seconds,
          days_tracked: data.days_including_holidays,
          daily_average: data.daily_average,
        } as CodingData);
      })
      .catch(() => {
        clearTimeout(timer);
        renderError();
      });

    return () => {
      clearTimeout(timer);
      ctrl?.abort();
    };
  }, []);

  const maxPercent = data?.languages.length ? data.languages[0].percent : 100;

  return (
    <section
      id="codingstat"
      className="px-6 md:px-10 py-24 md:py-36 border-t hairline"
    >
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-[-0.03em] leading-[1.05] mb-4 max-w-2xl text-balance">
            {coding.heading.pre}
            <span className="text-accent italic font-medium">
              {coding.heading.accent}
            </span>
            {coding.heading.post}
          </h2>
          <p className="text-ink-300 leading-[1.6] max-w-xl">
            {coding.subline}
          </p>
        </Reveal>

        <Reveal delay={1}>
          <div className="bezel">
            <div className="bezel-inner p-5 pb-5 md:p-7 md:pb-7 relative">
              <div
                className="absolute -top-24 -right-16 w-[420px] h-[420px] bg-white/[0.04] rounded-full blur-3xl pointer-events-none"
                aria-hidden="true"
              ></div>
              <div className="cs-header">
                <p className="text-[10px] uppercase tracking-[0.18em] text-ink-400 font-mono mb-0 truncate">
                  {coding.breakdown}
                </p>
                <p className="cs-total">
                  <span className="cs-total-value">
                    {data ? formatHours(data.total_seconds) : "—"}
                  </span>{" "}
                  tracked · <span>{data ? data.days_tracked : "—"}</span> days
                </p>
              </div>
              <p className="cs-total cs-daily">
                avg{" "}
                <span className="cs-total-value">
                  {data ? formatHours(data.daily_average) : "—"}
                </span>{" "}
                <span className="cs-daily-label">/ day</span>
              </p>
              
              {data ? (
                data.languages
                  .slice(0, 6)
                  .map((lang, i) => (
                    <CodingRow
                      key={lang.name}
                      lang={lang}
                      maxPercent={maxPercent}
                      rank={i + 1}
                    />
                  ))
              ) : (
                <>
                  {[70, 50, 35, 25, 18, 12].map((w) => (
                    <div className="cs-row" key={w}>
                      <span className="cs-rank cs-skel">&nbsp;</span>
                      <div className="cs-lang">
                        <span className="cs-lang-name cs-skel">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        <div className="cs-bar">
                          <div
                            className="cs-fill cs-skel"
                            style={{ width: `${w}%` }}
                          />
                        </div>
                      </div>
                      <span className="cs-time cs-skel">
                        &nbsp;&nbsp;&nbsp;
                      </span>
                      <span className="cs-percent cs-skel">
                        &nbsp;&nbsp;&nbsp;
                      </span>
                    </div>
                  ))}
                </>
              )}

              {error && (
                <p className="mt-4 text-xs font-mono text-ink-400">
                  {coding.error}
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
