import { skillCategories } from "@/lib/data";
import { config } from "@/lib/config";
import Reveal from "./Reveal";
import SkillRow from "./SkillRow";
import StackLogos from "./StackLogos";

export default function Skills() {
  return (
    <section
      id="techstack"
      className="px-6 md:px-10 py-24 md:py-36 border-t hairline"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-[65ch] mb-14 md:mb-20">
          <Reveal>
            <h2 className="text-balance text-[clamp(2.25rem,5.2vw,4.5rem)] font-medium tracking-[-0.04em] leading-[1.02] pb-2">
              {config.skills.heading.pre}
              <span className="text-accent italic font-medium">{config.skills.heading.accent}</span>
              {config.skills.heading.post}
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="text-ink-300 text-lg leading-[1.6] mt-6">
              {config.skills.subline}
            </p>
          </Reveal>
        </div>

        {skillCategories.map((cat, i) => {
          const isLast = i === skillCategories.length - 1;
          return (
            <div key={cat.name}>
              {cat.order === "card-first" ? (
                <div
                  className={`grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 ${isLast ? "" : "mb-10 md:mb-14"} items-start`}
                >
                  <CategoryCard cat={cat} />
                  <CategoryList cat={cat} />
                </div>
              ) : (
                <div
                  className={`grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 ${
                    isLast ? "" : "mb-10 md:mb-14"
                  } items-end lg:items-start`}
                >
                  {/* Menggunakan order untuk membalik posisi, serta cat.cardCols/listCols */}
                  <div className={`${cat.cardCols} order-1 md:order-2`}>
                    <CategoryCard cat={cat} />
                  </div>

                  <div className={`${cat.listCols} order-2 md:order-1`}>
                    <CategoryList cat={cat} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CategoryCard({ cat }: { cat: (typeof skillCategories)[number] }) {
  const visualClass = cat.short
    ? "cat-card-visual--short"
    : cat.tall
      ? "cat-card-visual--tall"
      : "";
  return (
    <Reveal className={cat.cardCols}>
      <article className="h-full">
        <div className="bezel h-full">
          <div className="bezel-inner h-full flex flex-col">
            <div className={`cat-card-visual ${visualClass}`}>
              <h3>{cat.name}</h3>
            </div>
            <div className="p-6 md:p-7">
              <StackLogos stack={cat.stack} ariaLabel={cat.stackAria} large />
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function CategoryList({ cat }: { cat: (typeof skillCategories)[number] }) {
  return (
    <Reveal delay={1} className={cat.listCols}>
      <div className="bezel h-full">
        <div className="bezel-inner p-6 md:p-7">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-400">
              {cat.name}
            </span>
            <span className="font-mono text-[10px] text-ink-500">
              {String(cat.count).padStart(2, "0")}
            </span>
          </div>
          <ul className="divide-y divide-[#969696]/35">
            {cat.skills.map((skill) => (
              <li key={skill.name}>
                <SkillRow skill={skill} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
