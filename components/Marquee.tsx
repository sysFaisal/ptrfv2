import { config } from "@/lib/config";

const items = config.marquee.items;

function Item({ children, ariaHidden }: { children: string; ariaHidden?: boolean }) {
  return (
    <>
      <span
        className="font-mono text-sm uppercase tracking-[0.15em] text-ink-300"
        aria-hidden={ariaHidden}
      >
        {children}
      </span>
      <span className="text-ink-600" aria-hidden="true">
        /
      </span>
    </>
  );
}

export default function Marquee() {
  return (
    <section
      className="border-y hairline bg-surface/40 py-6 marquee-mask overflow-hidden"
      aria-label={config.marquee.ariaLabel}
    >
      <div className="marquee-track flex items-center gap-10 whitespace-nowrap">
        {items.map((item) => (
          <Item key={item}>{item}</Item>
        ))}
        {items.map((item) => (
          <Item key={`dup-${item}`} ariaHidden>
            {item}
          </Item>
        ))}
      </div>
    </section>
  );
}
