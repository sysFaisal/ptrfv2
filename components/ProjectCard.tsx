import type { Project } from "@/lib/data";
import ArrowIcon from "./ArrowIcon";
import StackLogos from "./StackLogos";
import Image from "next/image";
export default function ProjectCard({
  project,
  hidden,
}: {
  project: Project;
  hidden: boolean;
}) {
  const { cols, large } = project;
  return (
    <article className={`${cols} ${hidden ? "hidden" : ""}`} data-cat={project.cat}>
      <a
        href="#"
        className={`project-card bezel${large ? " bezel-lg" : ""} block h-full`}
        aria-label={project.ariaLabel}
      >
        <div className="bezel-inner h-full flex flex-col relative">
          <div
            className="absolute -bottom-14 -right-14 w-[280px] h-[280px] bg-white/[0.04] rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          ></div>
          <div className={`${large ? "aspect-[16/10]" : "aspect-[16/9]"} overflow-hidden relative`}>
            <Image
              src={project.image}
              alt={project.alt}
              className="project-image object-cover"
              fill
              sizes="(min-width: 1280px) 640px, (min-width: 768px) 50vw, 100vw"
            />
            {large && (
              <div className="absolute inset-0 bg-gradient-to-t from-bg/40 via-transparent to-transparent"></div>
            )}
          </div>
          <div
            className={`${large ? "p-6 md:p-8" : "p-5 md:p-6"} flex flex-col flex-1`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-400">
                {project.meta}
              </span>
              <span
                className={`project-arrow ${large ? "w-8 h-8" : "w-7 h-7"} rounded-full bg-ink-50/5 text-ink-100 flex items-center justify-center`}
              >
                <ArrowIcon size={large ? 13 : 12} />
              </span>
            </div>
            <StackLogos stack={project.stack} ariaLabel={project.stackAria} className="mb-3" />
            <h3
              className={`${large ? "text-2xl md:text-3xl" : "text-xl"} font-medium ${large ? "tracking-[-0.02em]" : "tracking-tight"} ${large ? "mb-2" : "mb-1.5"}`}
            >
              {project.name}
            </h3>
            <p
              className={`text-ink-300 leading-[1.55] ${large ? "" : "text-sm"}`}
            >
              {project.desc}
            </p>
          </div>
        </div>
      </a>
    </article>
  );
}
