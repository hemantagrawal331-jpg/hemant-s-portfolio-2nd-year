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
import { Projects } from "@/components/Projects";
import { Resume } from "@/components/Resume";
import { Skills } from "@/components/Skills";
import { SmoothScroll } from "@/lib/SmoothScroll";

export default function HomePage() {
  const [ready, setReady] = useState(false);
  const onComplete = useCallback(() => setReady(true), []);

  return (
    <>
      <LoadingScreen onComplete={onComplete} />
      {ready && (
        <>
          <SmoothScroll ready />
          <CustomCursor />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Algorithms />
            <Education />
            <Learning />
            <GithubSection />
            <Resume />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
