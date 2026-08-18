import Image from "next/image";
import ArrowIcon from "@/components/ArrowIcon";
import MobileMenu from "@/components/MobileMenu";
import ThemeToggle from "@/components/ThemeToggle";
import { config } from "@/lib/config";

const { nav, site } = config;

export default function Nav() {
  return (
    <header className="fixed top-5 left-0 right-0 mx-auto z-50 w-[calc(100%-1.5rem)] max-w-3xl">
      <nav
        className="nav-pill backdrop-blur-[20px] backdrop-saturate-[180%] rounded-full px-2 py-2 flex items-center justify-between"
        aria-label={nav.ariaLabel}
      >
        <div className="flex items-center gap-2 sm:md-3 pl-3">
          <MobileMenu />
          <a href="#top" className="flex items-center gap-2.5 pr-4 py-1.5">
            <span className="w-7 h-7 rounded-full overflow-hidden">
              <Image
                src="/me.jpg"
                alt={site.name}
                width={28}
                height={28}
                className="w-full h-full object-cover"
              />
            </span>
            <span className="font-medium text-sm tracking-tight hidden sm:block">
              {site.name}
            </span>
          </a>
        </div>
        <div className="flex items-center gap-2">
          <ul className="hidden md:flex items-center gap-1 text-sm">
            {nav.items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="px-3 py-1.5 text-ink-300 hover:text-ink-100 transition-colors duration-300 rounded-full"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-row items-center">
          <ThemeToggle />
          <a href="#contact" className="ml-2 btn-primary" aria-label={nav.cta}>
            <span className="hidden sm:inline">{nav.cta}</span>
            <span className="sm:hidden">{nav.ctaShort}</span>
            <span className="btn-icon">
              <ArrowIcon />
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
}
