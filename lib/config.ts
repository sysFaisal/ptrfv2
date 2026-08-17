export type NavItem = { href: string; label: string };

export type WorkTabId = "all" | "frontend" | "backend";

export type Heading = { pre: string; accent: string; post: string };

export const config = {
  site: {
    name: "Faisal Fajari",
    initial: "F",
    role: "Fullstack developer",
    email: "faisalfofficial27@gmail.com",
    location: "Cimahi, ID · WIB (UTC+07:00)",
  },

  meta: {
    title: "Faisal · Fullstack Developer",
    description:
      "Independent creative technologist working between distributed systems, expressive interfaces, and the strange territory where they meet.",
    themeColor: "#0a0a0a",
  },

  nav: {
    ariaLabel: "Primary",
    items: [
      { href: "#top", label: "Home" },
      { href: "#about", label: "About" },
      { href: "#work", label: "Project" },
      { href: "#techstack", label: "Techstack" },
      { href: "#codingstat", label: "Codingstats" },
    ] as NavItem[],
    cta: "Start a project",
    ctaShort: "Contact",
  },

  menu: {
    heading: { pre: "Me", accent: "nu" },
    imageAlt: "Profile reference 1",
    cta: "Start a project",
    openLabel: "Open menu",
    closeLabel: "Close menu",
    dialogLabel: "Navigation menu",
  },

  hero: {
    availability: "Studying", //Available for select work, Q1 2026
    headline: {
      pre: "Building resilient systems and the",
      accent: "interfaces",
      post: "that make them legible.",
    },
    subline:
      "I am Faisal Fajari, an independent creative technologist working between distributed systems, expressive UI, and the strange territory where they meet.",
    ctaPrimary: "Start a project",
    ctaSecondary: "View selected work",
    nowLabel: "Now",
    workingFrom: { pre: "Working from ", accent: "Cimahi", post: ", ID" },
    openLabel: "Open",
    portrait: {
      src: "/me.jpg", //https://picsum.photos/seed/mira-aoki-portrait-kyoto-2026/640/800
      alt: "Just Profile Picture", //Portrait of Mira Aoki
    },
    nameCard: "Faisal Fajari",
    roleCard: "Fullstack developer",
    stats: [
      { value: 1, srLabel: "Years building", label: "Years building" },
      { value: 3, srLabel: "Shipped projects", label: "Shipped projects" },
      { value: 0, srLabel: "Open source libraries", label: "OSS libraries" },
    ],
  },

  about: {
    heading: { pre: "A short ", accent: "file", post: " , kept current." },
    codeLines: [
      "// based in USA. working remote-first across PT, ET, and everywhere in between.",
      "// eleven years of shipping distributed systems, expressive interfaces, and the glue between them. small teams, long horizons, code i would still respect in five years.",
      "// currently open to select work, q1 2026. briefs welcome.",
    ],
    locations: {
      label: "Locations",
      badge: "INA",
      items: [{ index: "01", name: "Cimahi, Java East", timezone: "WIB" }],
    },
    education: {
      label: "Education",
      badge: "INA",
      initial: "U",
      school: "University Jendral Achamd Yani",
      degree: "Cimahi, MA · B.A., Software Engineer",
      gpa: "3.33",
      gpaLabel: "GPA",
    },
  },

  marquee: {
    ariaLabel: "Capabilities",
    items: [
      "Distributed systems",
      "Real-time interfaces",
      "TypeScript & Rust",
      "Creative tooling",
      "Edge compute",
      "Design systems",
      "Developer experience",
    ],
  },

  skills: {
    heading: { pre: "A ", accent: "working", post: " toolkit." },
    subline:
      "Sixteen tools across four areas. The card gives the shape; the list gives the stack.",
  },

  work: {
    heading: { pre: "Projects, picked by ", accent: "ofc me", post: "." }, //craft
    subline:
      "Seven things from the last 24 months. Filter by surface, shipped, still in production somewhere.",
    tabs: [
      { id: "all", label: "All" },
      { id: "frontend", label: "Frontend" },
      { id: "backend", label: "Backend" },
    ] as { id: WorkTabId; label: string }[],
    filterAria: "Filter projects by category",
  },

  gh: {
    username: "sysFaisal",
    heading: { pre: "What 2026 looked like, in ", accent: "pixels", post: "." },
    subline: "Pulled live from GitHub. Quiet weeks and loud ones, no edits.",
    graphLabel: "Contribution graph",
    last12Months: "Last 12 months",
    less: "Less",
    more: "More",
    error: "E. Try ",
    errorSuffix: "directly.",
    stats: [
      { key: "total", label: "Contributions in 2026" },
      { key: "current", label: "Current streak", suffix: "d" },
      { key: "longest", label: "Longest streak", suffix: "d" },
      { key: "best", label: "Best day" },
    ] as {
      key: "total" | "current" | "longest" | "best";
      label: string;
      suffix?: string;
    }[],
  },

  coding: {
    heading: { pre: "Where the ", accent: "hours", post: " go." },
    subline: "Time tracked across languages. Real data, no guesses.",
    breakdown: "Language breakdown",
    error: "Coding stats unavailable. Using cached data.",
  },

  contact: {
    heading: { pre: "Tell me what you are ", accent: "building", post: "." },
    subline:
      "Briefs under a paragraph are welcome. I usually reply within two days, often with a question or two.",
    ctaPrimary: "Start a project",
    ctaSecondary: "Read my writing",
  },

  footer: {
    location: "Cimahi, ID · WIB (UTC+07:00)",
    socials: [
      { label: "GitHub", href: "https://github.com/sysFaisal" },
      { label: "Linkedin", href: "#" },
      { label: "CV", href: "#" },
      { label: "Email", href: "mailto:faisalfofficial27@gmail.com" },
    ] as { label: string; href: string }[],
    copyright: "© 2026 Faisal Fajari",
  },
};
