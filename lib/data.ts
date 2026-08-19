export type StackLogo = {
  src?: string;
  label?: string;
};

export type Skill = {
  name: string;
  icon: string;
  proficiency: string;
  experience: string;
  projects: number;
  notes: string;
};

export type SkillCategory = {
  name: string;
  short?: boolean;
  tall?: boolean;
  count: number;
  order: "card-first" | "list-first";
  cardCols: string;
  listCols: string;
  stack: StackLogo[];
  stackAria: string;
  skills: Skill[];
};

export type Project = {
  name: string;
  cat: "frontend" | "backend" | "fullstack";
  cols: string;
  large?: boolean;
  image: string;
  alt: string;
  meta: string;
  ariaLabel: string;
  stack: StackLogo[];
  stackAria: string;
  desc: string;
};

export type CodingStat = {
  name: string;
  total_seconds: number;
  percent: number;
};

export type CodingData = {
  languages: CodingStat[];
  total_seconds: number;
  days_tracked: number;
  days_including_holidays?: number;
  daily_average: number;
};

export { projects } from "./projects";
export { skillCategories } from "./skills";
export { fallbackCodingStats } from "./coding-fallback";