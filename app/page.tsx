import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Work from "@/components/Work";
import GitHubStats from "@/components/GitHubStats";
import CodingStats from "@/components/CodingStats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GrainOverlay from "@/components/GrainOverlay";

export default function Home() {
  return (
    <>
      <GrainOverlay />
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