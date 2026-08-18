import type { StackLogo } from "@/lib/data";
import BrandIcon from "./BrandIcon";

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
      {stack.map((logo, i) => (
        <BrandIcon
          key={i}
          className="stack-logo text-ink-300"
          label={logo.label}
        />
      ))}
    </div>
  );
}
