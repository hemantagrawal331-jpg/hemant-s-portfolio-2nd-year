"use client";

import { useCallback, useState } from "react";
import { About } from "@/components/About";
import { Algorithms } from "@/components/Algorithms";
import { Contact } from "@/components/Contact";
import { CustomCursor } from "@/components/CustomCursor";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { GithubSection } from "@/components/GithubSection";
import { Hero } from "@/components/Hero";
import { Learning } from "@/components/Learning";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { ProjectSection } from "@/components/ProjectSection";
import { Resume } from "@/components/Resume";
import { SiteAtmosphere } from "@/components/SiteAtmosphere";
import { Skills } from "@/components/Skills";
import { SmoothScroll } from "@/lib/SmoothScroll";

export default function HomePage() {
  const [ready, setReady] = useState(false);
  const onComplete = useCallback(() => {
    setReady(true);
    const hash = window.location.hash;
    if (hash) {
      window.setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ block: "start" });
      }, 50);
    }
  }, []);

  return (
    <>
      <LoadingScreen onComplete={onComplete} />
      <SmoothScroll ready={ready} />
      <CustomCursor />
      <SiteAtmosphere />
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="content">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <ProjectSection />
        <Algorithms />
        <Education />
        <Learning />
        <GithubSection />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
