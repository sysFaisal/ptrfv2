import Image from "next/image";
import Reveal from "./Reveal";
import { config } from "@/lib/config";

const { about } = config;

export default function About() {
  return (
    <section id="about" className="px-6 md:px-10 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-10 mb-14 md:mb-20">
          <div>
            <Reveal>
              <h2 className="text-balance text-[clamp(2.25rem,5.2vw,4.5rem)] font-medium tracking-[-0.04em] leading-[1.02] pb-2">
                {about.heading.pre}
                <span className="text-accent italic font-medium">{about.heading.accent}</span>
                {about.heading.post}
              </h2>
            </Reveal>
          </div>

          <Reveal delay={1}>
            <div className="font-mono text-sm md:text-[15px] leading-[1.75] text-ink-300 space-y-4 max-w-md md:max-w-lg 2xl:max-w-xl">
              {about.codeLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          <Reveal delay={1} className="md:col-span-5">
            <article className="h-full">
              <div className="bezel h-full">
                <div className="bezel-inner p-6 md:p-7 relative">
                  <div
                    className="cloud cloud-2 -bottom-16 -left-20 w-[300px] h-[300px]"
                    aria-hidden="true"
                  ></div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-400">
                      {about.locations.label}
                    </span>
                    <span className="font-mono text-[10px] text-ink-500">
                      {about.locations.badge}
                    </span>
                  </div>

                  <ul className="divide-y hairline">
                    {about.locations.items.map((loc) => (
                      <li key={loc.name} className="flex items-baseline justify-between gap-4 py-3">
                        <div className="flex items-baseline gap-3 min-w-0">
                          <span className="font-mono text-[10px] text-ink-500 w-6 shrink-0">
                            {loc.index}
                          </span>
                          <span className="text-base md:text-lg text-ink-100 font-medium tracking-tight">
                            {loc.name}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400 shrink-0">
                          {loc.timezone}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={2} className="md:col-span-7">
            <article className="h-full">
              <div className="bezel h-full">
                <div className="bezel-inner p-6 md:p-7 relative">
                  <div
                    className="cloud cloud-1 -top-20 -right-16 w-[360px] h-[360px]"
                    aria-hidden="true"
                  ></div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-400">
                      {about.education.label}
                    </span>
                    <span className="font-mono text-[10px] text-ink-500">
                      {about.education.badge}
                    </span>
                  </div>

                  <ul className="space-y-4">
                    <li className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-accent/25 shrink-0">
                        <Image
                          src="/unjayni.png"
                          alt={about.education.school}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1 pt-0.5">
                        <p className="text-base md:text-lg text-ink-100 font-medium tracking-tight leading-tight">
                          {about.education.school}
                        </p>
                        <p className="font-mono text-[11px] uppercase hidden tracking-[0.18em] text-ink-400 mt-1">
                          {about.education.degree}
                        </p>
                      </div>
                      <div className="shrink-0 pt-0.5 text-right">
                        <p className="stat-num text-lg md:text-xl font-medium tracking-tight text-ink-100">
                          {about.education.gpa}
                        </p>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400 mt-0.5">
                          {about.education.gpaLabel}
                        </p>
                      </div>
                    </li>
                    <li className="pt-3 border-t hairline hidden">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400 mb-1.5">
                        Bachelor thesis
                      </p>
                      <p className="text-sm md:text-[15px] text-ink-200 leading-[1.55] max-w-2xl">
                        Type-safe effect systems for distributed dataflow,
                        advised by Prof. Chen. Awarded the Hoopes Prize for
                        outstanding undergraduate work, 2022.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
