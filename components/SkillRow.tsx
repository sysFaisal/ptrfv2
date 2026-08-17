"use client";

import { useState } from "react";
import type { Skill } from "@/lib/data";

export default function SkillRow({ skill }: { skill: Skill }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="skill-row w-full flex items-center justify-between gap-4 py-3.5 text-left"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex items-center gap-4 min-w-0">
          <img
            src={skill.icon}
            alt={`${skill.name} logo`}
            className="w-5 h-5 shrink-0 opacity-80"
            loading="lazy"
          />
          <span className="text-base md:text-lg text-ink-100 font-medium tracking-tight truncate">
            {skill.name}
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-300 px-2 py-0.5 rounded-full border hairline">
            {skill.proficiency}
          </span>
          <svg
            className="skill-chevron w-4 h-4 text-ink-400 transition-transform duration-400 ease-spring"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </button>
      <div className="skill-note grid grid-rows-[0fr] transition-[grid-template-rows] duration-[400ms] ease-spring">
        <div className="overflow-hidden">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 pb-5 pl-0 md:pl-9 pr-4">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400 mb-1">
                Experience
              </dt>
              <dd className="text-sm text-ink-100">{skill.experience}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400 mb-1">
                Proficiency
              </dt>
              <dd className="text-sm text-ink-100">{skill.proficiency}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400 mb-1">
                Projects
              </dt>
              <dd className="text-sm text-ink-100 stat-num">
                {skill.projects} projects
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400 mb-1">
                Notes
              </dt>
              <dd className="text-sm text-ink-200 leading-[1.55]">
                {skill.notes}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}