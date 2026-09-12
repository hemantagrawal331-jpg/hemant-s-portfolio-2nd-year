"use client";

import { portfolioData } from "@/data/portfolioData";
import { headingRevealCount, RevealGroup, RevealItem } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Education() {
  const edu = portfolioData.education;

  return (
    <section id="education" className="section bg-bg">
      <RevealGroup className="stage">
        <SectionHeading kicker="// EDUCATION" title="Education" />
        <RevealItem index={headingRevealCount(false)} className="relative mt-12 pl-6 md:pl-10">
          <span className="timeline-line absolute bottom-2 left-[5px] top-2 w-px origin-top bg-line md:left-[9px]" />
          <span className="absolute left-0 top-3 h-3 w-3 rounded-full border border-[var(--accent)] bg-bg shadow-[0_0_0_4px_var(--accent-dim)] md:left-1" />
          <article className="card card-interactive p-6 md:p-10">
            <p className="font-mono text-[12px] tracking-[0.16em] text-muted">01 / {edu.year}</p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-fg md:text-3xl">{edu.school}</h3>
            <p className="mt-2 text-lg text-fg/80">{edu.program}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {edu.areas.map((area) => (
                <span key={area} className="chip">
                  {area}
                </span>
              ))}
            </div>
          </article>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
