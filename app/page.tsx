import Nav from "@/components/home/Nav";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import About from "@/components/home/About";
import Skills from "@/components/home/Skills";
import Work from "@/components/home/Work";
import GitHubStats from "@/components/home/GitHubStats";
import CodingStats from "@/components/home/CodingStats";
import Contact from "@/components/home/Contact";
import Footer from "@/components/home/Footer";
// import GrainOverlay from "@/components/GrainOverlay";

export default function Home() {
  return (
    <>
      {/*<GrainOverlay /> */}
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
