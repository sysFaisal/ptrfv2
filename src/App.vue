<script setup lang="ts">
import Nav from "@/components/home/Nav.vue";
import Hero from "@/components/home/Hero.vue";
import Marquee from "@/components/home/Marquee.vue";
import About from "@/components/home/About.vue";
import Skills from "@/components/home/Skills.vue";
import Work from "@/components/home/Work.vue";
import GitHubStats from "@/components/home/GitHubStats.vue";
import CodingStats from "@/components/home/CodingStats.vue";
import Contact from "@/components/home/Contact.vue";
import Footer from "@/components/home/Footer.vue";
import GrainOverlay from "@/components/GrainOverlay.vue";
</script>

<template>
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
  <GrainOverlay />
</template>