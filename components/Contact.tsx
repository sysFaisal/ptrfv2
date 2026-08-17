import ArrowIcon from "./ArrowIcon";
import Reveal from "./Reveal";
import { config } from "@/lib/config";

const { contact } = config;

export default function Contact() {
  return (
    <section id="contact" className="px-6 md:px-10 py-24 md:py-36 border-t hairline">
      <div className="max-w-6xl mx-auto">
        <div className="bezel bezel-lg">
          <div className="bezel-inner px-8 py-16 md:px-20 md:py-24 lg:py-28 text-center relative overflow-hidden">
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/8 rounded-full blur-3xl pointer-events-none"
              aria-hidden="true"
            ></div>

            <div className="relative">
              <Reveal>
                <h2 className="text-balance text-5xl md:text-7xl lg:text-[5.5rem] font-medium tracking-[-0.04em] leading-[0.95] mb-7 max-w-3xl mx-auto">
                  {contact.heading.pre}{" "}
                  <span className="text-accent italic font-medium">{contact.heading.accent}</span>
                  {contact.heading.post}
                </h2>
              </Reveal>
              <Reveal delay={1}>
                <p className="text-ink-300 text-lg max-w-xl mx-auto leading-[1.6] mb-10">
                  {contact.subline}
                </p>
              </Reveal>
              <Reveal delay={2} className="flex flex-wrap items-center justify-center gap-3">
                <a href="mailto:hello@miraaoki.com" className="btn-primary">
                  <span>{contact.ctaPrimary}</span>
                  <span className="btn-icon">
                    <ArrowIcon />
                  </span>
                </a>
                <a href="#" className="btn-ghost">
                  <span>{contact.ctaSecondary}</span>
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}