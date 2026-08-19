"use client";

import { useRef, useState } from "react";
import { projects, type Project } from "@/lib/data";
import { config } from "@/lib/config";
import ProjectCard from "@/components/ProjectCard";

import Reveal from "@/components/Reveal";
type Tab = "all" | Project["cat"];

const tabs = config.work.tabs;

const counts = {
  all: projects.length,
  frontend: projects.filter((p) => p.cat === "frontend").length,
  backend: projects.filter((p) => p.cat === "backend").length,
  fullstack: projects.filter((p) => p.cat === "fullstack").length,
};

const visibleTabs = tabs.filter((tab) => tab.id === "all" || counts[tab.id] > 0);

export default function Work() {
  const [active, setActive] = useState<Tab>("all");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function activate(tab: Tab) {
    setActive(tab);
  }

  function onKeyDown(e: React.KeyboardEvent, index: number) {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(e.key)) return;
    let idx = index;
    if (e.key === "ArrowRight") idx = (idx + 1) % visibleTabs.length;
    if (e.key === "ArrowLeft") idx = (idx - 1 + visibleTabs.length) % visibleTabs.length;
    if (e.key === "Home") idx = 0;
    if (e.key === "End") idx = visibleTabs.length - 1;
    const target = tabRefs.current[idx];
    if (target) {
      target.focus();
      target.click();
    }
    e.preventDefault();
  }

  return (
    <section id="work" className="px-6 md:px-10 py-24 md:py-36">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 md:mb-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-balance text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.035em] leading-[1.02]">
                {config.work.heading.pre}
                <span className="text-accent italic font-medium">{config.work.heading.accent}</span>
                {config.work.heading.post}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 flex lg:items-end">
            <Reveal delay={1}>
              <p className="text-ink-300 text-lg leading-[1.55] max-w-md">
                {config.work.subline}
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={2} className="flex flex-wrap items-center gap-2 mb-10 md:mb-14">
          <div
            role="tablist"
            aria-label={config.work.filterAria}
            className="flex flex-wrap items-center gap-2"
          >
            {visibleTabs.map((tab, i) => {
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  data-tab={tab.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  onClick={() => activate(tab.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-[400ms] ease-spring ${
                    isActive
                      ? "bg-accent text-bg"
                      : "border hairline text-ink-200 hover:text-ink-100"
                  }`}
                  style={
                    isActive
                      ? undefined
                      : { backgroundColor: "var(--bezel-bg)" }
                  }
                >
                  {tab.label}
                  <span className="font-mono text-[10px] ml-1.5 opacity-70">
                    {counts[tab.id]}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 auto-rows-fr">
          {projects.map((project) => (
            <ProjectCard
              key={project.name}
              project={project}
              hidden={active !== "all" && project.cat !== active}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
