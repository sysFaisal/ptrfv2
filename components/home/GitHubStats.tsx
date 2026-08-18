"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import { config } from "@/lib/config";

const { gh } = config;
const USERNAME = gh.username;
const ENDPOINT = `https://github-contributions-api.jogruber.de/v4/${gh.username}?y=last`;
const TIMEOUT_MS = 8000;
const SKELETON_COUNT = 371;
const LEVELS = [
  "var(--shimmer-1)",
  "rgba(57,211,83,0.18)",
  "rgba(57,211,83,0.40)",
  "rgba(57,211,83,0.70)",
  "#39d353",
];

type Day = { date: string; contributionCount: number };

type Stats = {
  total: number;
  longest: number;
  current: number;
  bestCount: number;
  bestDate: string;
};

function levelFor(count: number): number {
  if (count <= 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

function fmtNum(n: number): string {
  return n.toLocaleString("en-US");
}

function fmtMonth(date: Date): string {
  return date.toLocaleString("en-US", { month: "short", year: "numeric" });
}

function fmtBestDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function computeStats(days: Day[]): Stats {
  let total = 0;
  let bestCount = 0;
  let bestDate = "";
  for (const d of days) {
    total += d.contributionCount;
    if (d.contributionCount > bestCount) {
      bestCount = d.contributionCount;
      bestDate = d.date;
    }
  }
  let longest = 0;
  let run = 0;
  for (const d of days) {
    if (d.contributionCount > 0) {
      run++;
      if (run > longest) longest = run;
    } else {
      run = 0;
    }
  }
  let current = 0;
  for (let k = days.length - 1; k >= 0; k--) {
    if (days[k].contributionCount > 0) current++;
    else break;
  }
  return { total, longest, current, bestCount, bestDate };
}

export default function GitHubStats() {
  const [days, setDays] = useState<Day[] | null>(null);
  const [range, setRange] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ctrl =
      typeof AbortController === "function" ? new AbortController() : null;
    const timer = setTimeout(() => ctrl?.abort(), TIMEOUT_MS);

    fetch(ENDPOINT, {
      headers: { Accept: "application/vnd.github+json" },
      signal: ctrl ? ctrl.signal : undefined,
    })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then((data: { contributions?: { date: string; count: number }[] }) => {
        clearTimeout(timer);
        const raw = data?.contributions;
        if (!raw || raw.length === 0) {
          setError(true);
          setLoading(false);
          return;
        }
        const flat: Day[] = raw.map((d) => ({
          date: d.date,
          contributionCount: d.count,
        }));
        setDays(flat);
        setStats(computeStats(flat));
        if (flat.length > 0) {
          setRange(
            `${fmtMonth(new Date(flat[0].date + "T00:00:00Z"))} — ${fmtMonth(
              new Date(flat[flat.length - 1].date + "T00:00:00Z"),
            )}`,
          );
        }
        setLoading(false);
      })
      .catch(() => {
        clearTimeout(timer);
        setError(true);
        setLoading(false);
      });

    return () => {
      clearTimeout(timer);
      ctrl?.abort();
    };
  }, []);

  const skeleton = Array.from({ length: SKELETON_COUNT }, (_, i) => i);

  return (
    <section
      id="github-contrib"
      className="px-6 md:px-10 py-24 md:py-36 border-t hairline"
    >
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-[-0.03em] leading-[1.05] mb-4 max-w-2xl text-balance">
            {gh.heading.pre}
            <span className="text-accent italic font-medium">{gh.heading.accent}</span>
            {gh.heading.post}
          </h2>
          <p className="text-ink-300 leading-[1.6] max-w-xl">
            {gh.subline}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 2xl:gap-8">
          <Reveal delay={1}>
            <div className="bezel">
              <div className="bezel-inner p-5 md:p-7 relative">
                <div
                  className="cloud cloud-1 -top-20 -left-16 w-[420px] h-[420px]"
                  aria-hidden="true"
                ></div>
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-ink-400 font-mono mb-1.5">
                      {gh.graphLabel}
                    </p>
                    <p className="text-sm text-ink-200 font-mono tracking-[-0.01em]">
                      {range || "—"}
                    </p>
                  </div>
                  <a
                    href={`https://github.com/${USERNAME}`}
                    target="_blank"
                    rel="noopener"
                    className="text-xs font-mono text-ink-400 hover:text-ink-100 transition-colors duration-300 inline-flex items-center gap-1.5"
                  >
                    @{USERNAME}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </a>
                </div>

                <div
                  className="gh-grid"
                  role="figure"
                  aria-label="GitHub contribution graph"
                >
                  {loading
                    ? skeleton.map((i) => (
                        <span
                          key={i}
                          className="gh-cell gh-skel"
                          aria-hidden="true"
                        />
                      ))
                    : days?.map((day) => (
                        <button
                          key={day.date}
                          type="button"
                          className="gh-cell"
                          style={{
                            background: LEVELS[levelFor(day.contributionCount)],
                          }}
                          aria-label={`${day.date}, ${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"}`}
                          title={`${fmtBestDate(day.date)}: ${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"}`}
                        />
                      ))}
                </div>

                <div className="flex items-center justify-between mt-5 text-[10px] uppercase tracking-[0.18em] text-ink-400 font-mono">
                  <span>{gh.last12Months}</span>
                  <div className="flex items-center gap-1.5">
                    <span>{gh.less}</span>
                    {LEVELS.map((color) => (
                      <span
                        key={color}
                        className="gh-legend-swatch"
                        style={{ background: color }}
                        aria-hidden="true"
                      />
                    ))}
                    <span>{gh.more}</span>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <p className="mt-4 text-xs font-mono text-ink-400">
                {gh.error}
                <a
                  className="underline hover:text-ink-100 transition-colors duration-300"
                  href={`https://github.com/${USERNAME}`}
                  target="_blank"
                  rel="noopener"
                >
                  github.com/{USERNAME}
                </a>{" "}
                {gh.errorSuffix}
              </p>
            )}
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {gh.stats.map((stat) => (
              <StatCard
                key={stat.key}
                label={stat.label}
                value={
                  stats
                    ? stat.key === "total"
                      ? fmtNum(stats.total)
                      : stat.key === "current"
                        ? String(stats.current)
                        : stat.key === "longest"
                          ? String(stats.longest)
                          : fmtNum(stats.bestCount)
                    : "—"
                }
                suffix={stat.suffix}
                sub={
                  stat.key === "best"
                    ? stats?.bestDate
                      ? fmtBestDate(stats.bestDate)
                      : "—"
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  label,
  value,
  suffix,
  sub,
}: {
  label: string;
  value: string;
  suffix?: string;
  sub?: string;
}) {
  return (
    <div className="bezel">
      <div className="bezel-inner p-5 relative">
        <div
          className="cloud cloud-2 -bottom-12 -right-12 w-[220px] h-[220px]"
          aria-hidden="true"
        ></div>
        <p className="text-[10px] uppercase tracking-[0.18em] text-ink-400 mb-3">
          {label}
        </p>
        <p className="font-mono text-4xl md:text-5xl tracking-[-0.04em] leading-none text-ink-50">
          {value}
          {suffix && (
            <span className="text-ink-400 text-2xl ml-1">{suffix}</span>
          )}
        </p>
        {sub && <p className="text-xs text-ink-400 mt-2 font-mono">{sub}</p>}
      </div>
    </div>
  );
}
