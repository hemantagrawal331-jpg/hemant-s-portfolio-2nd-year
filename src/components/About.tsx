"use client";

import Image from "next/image";
import { portfolioData } from "@/data/portfolio";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="section bg-bg">
      <div className="stage">
        <Reveal>
          <p className="label mb-4">{"// ABOUT"}</p>
          <p className="mb-10 max-w-2xl font-display text-2xl tracking-tight text-fg md:text-3xl">
            {portfolioData.brand}
          </p>
        </Reveal>
        <div className="grid items-start gap-10 lg:grid-cols-[340px_1fr] lg:gap-16">
          <Reveal>
            <div className="overflow-hidden rounded-[32px] border border-line bg-elevated p-3">
              <Image
                src="/images/about-portrait.png"
                alt={`${portfolioData.name}`}
                width={892}
                height={1536}
                className="aspect-[4/5] w-full rounded-[24px] object-cover object-[70%_18%] transition duration-700 hover:scale-[1.03]"
              />
              <div className="flex items-center gap-2 px-3 py-4">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                <span className="text-[11px] tracking-[0.16em] text-muted">OPEN TO OPPORTUNITIES</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="text-muted">Hello, I&apos;m</p>
            <h2 className="heading mt-2 text-3xl text-fg sm:text-4xl md:text-5xl lg:text-6xl">
              {portfolioData.name}
            </h2>
            <p className="mt-3 text-sm text-muted">{portfolioData.title}</p>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted md:text-lg">
              <p>{portfolioData.about.intro}</p>
              <p>{portfolioData.about.experience}</p>
              <p>{portfolioData.about.learning}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {portfolioData.aboutPills.map((pill) => (
                <span key={pill} className="chip text-fg">
                  {pill}
                </span>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {portfolioData.about.facts.map((fact) => (
                <div key={fact.label} className="card p-4">
                  <p className="label">{fact.label}</p>
                  <p className="mt-2 text-sm text-fg md:text-base">{fact.value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
