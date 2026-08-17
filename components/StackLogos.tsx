import type { StackLogo } from "@/lib/data";

export default function StackLogos({
  stack,
  ariaLabel,
  className = "",
  large = false,
}: {
  stack: StackLogo[];
  ariaLabel: string;
  className?: string;
  large?: boolean;
}) {
  return (
    <div
      className={`stack-logos${large ? " stack-logos-lg" : ""} ${className}`}
      aria-label={ariaLabel}
    >
      {stack.map((logo, i) =>
        logo.src ? (
          <img
            key={i}
            src={logo.src}
            alt={logo.label}
            className="stack-logo"
            loading="lazy"
          />
        ) : (
          <span
            key={i}
            className="stack-logo inline-flex items-center justify-center rounded-full border hairline text-[9px] font-mono text-ink-300"
            aria-label={logo.label}
          >
            {logo.label?.slice(0, 2)}
          </span>
        ),
      )}
    </div>
  );
}
