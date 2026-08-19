import nextDynamic from "next/dynamic";
import Nav from "@/components/home/Nav";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import About from "@/components/home/About";
import Skills from "@/components/home/Skills";

export const dynamic = "force-static";

const Work = nextDynamic(() => import("@/components/home/Work"));
const GitHubStats = nextDynamic(() => import("@/components/home/GitHubStats"));
const CodingStats = nextDynamic(() => import("@/components/home/CodingStats"));
const Contact = nextDynamic(() => import("@/components/home/Contact"));
const Footer = nextDynamic(() => import("@/components/home/Footer"));

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Work />
        <GitHubStats />
        <CodingStats />
        <Contact />
      </main>
      <Footer />
    </>
  );
}