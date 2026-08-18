import ArrowIcon from "./ArrowIcon";
import Reveal from "./Reveal";
import { config } from "@/lib/config";
import Star from "@/assets/star.svg"

const { hero } = config;
export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100dvh] hero-mesh pt-28 md:pt-32 pb-20 md:pb-24 px-6 md:px-10"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-400 mb-7 inline-flex items-center gap-2.5">
              <Star
                className="w-4 h-4 rounded-full text-accent pulse-dot"
                aria-hidden="true"
              ></Star>
              {hero.availability}
            </p>
          </Reveal>

          <Reveal delay={1}>
            <h1 className="text-balance text-[clamp(2.75rem,6.8vw,6.25rem)] font-medium tracking-[-0.04em] leading-[0.96] mb-8">
              {hero.headline.pre}
              <span
                className="text-accent italic font-medium"
                style={{ fontFeatureSettings: '"ss01"' }}
              >
                <br></br>
                {hero.headline.accent}
                <br></br>
              </span>
              {hero.headline.post}
            </h1>
          </Reveal>

          <Reveal delay={2}>
            <p className="text-lg md:text-xl text-ink-300 max-w-2xl leading-[1.55] mb-10">
              {hero.subline}
            </p>
          </Reveal>

          <Reveal delay={3} className="flex flex-wrap items-center gap-3">
            <a href="#contact" className="btn-primary">
              <span>{hero.ctaPrimary}</span>
              <span className="btn-icon">
                <ArrowIcon />
              </span>
            </a>
            <a href="#work" className="btn-ghost">
              <span>{hero.ctaSecondary}</span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={2} className="lg:col-span-5">
          <div className="bezel">
            <div className="bezel-inner p-6 md:p-7">
              <div className="flex items-start justify-between mb-7">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500 mb-1.5">
                    {hero.nowLabel}
                  </p>
                  <p className="text-sm text-ink-200">
                    {hero.workingFrom.pre}
                    <span className="text-ink-100">{hero.workingFrom.accent}</span>
                    {hero.workingFrom.post}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/25">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot"
                    aria-hidden="true"
                  ></span>
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-accent">
                    {hero.openLabel}
                  </span>
                </div>
              </div>

              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-ink-800 relative mb-6">
                <img
                  src={hero.portrait.src}
                  alt={hero.portrait.alt}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink-300 mb-0.5">
                    {hero.nameCard}
                  </p>
                  <p className="text-sm text-ink-100 font-medium">
                    {hero.roleCard}
                  </p>
                </div>
              </div>

              <dl className="grid grid-cols-3 gap-4 pt-5 border-t hairline">
                {hero.stats.map((stat) => (
                  <div key={stat.srLabel}>
                    <dt className="sr-only">{stat.srLabel}</dt>
                    <dd className="stat-num text-2xl font-medium tracking-tight">
                      {stat.value}
                    </dd>
                    <p className="text-[11px] text-ink-400 mt-1">{stat.label}</p>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
