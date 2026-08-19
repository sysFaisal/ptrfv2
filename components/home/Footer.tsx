import Img from "@/components/Img";
import { config } from "@/lib/config";

const { footer, site } = config;

export default function Footer() {
  return (
    <footer className="px-6 md:px-10 py-10 md:py-12 border-t hairline">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span
            className="w-7 h-7 rounded-full overflow-hidden"
            aria-hidden="true"
          >
            <Img
              src="/me.jpg"
              alt={site.name}
              width={28}
              height={28}
              className="w-full h-full object-cover"
            />
          </span>
          <div>
            <p className="text-sm font-medium">{site.name}</p>
            <p className="text-xs text-ink-400 font-mono">
              {footer.location}
            </p>
          </div>
        </div>

        <nav
          aria-label="Social"
          className="flex items-center gap-5 text-sm text-ink-300"
        >
          {footer.socials.map((soc) => (
            <a
              key={soc.label}
              href={soc.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink-100 transition-colors duration-300"
            >
              {soc.label}
            </a>
          ))}
        </nav>

        <p className="text-xs text-ink-500 font-mono">{footer.copyright}</p>
      </div>
    </footer>
  );
}