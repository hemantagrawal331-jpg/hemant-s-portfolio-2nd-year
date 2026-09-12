"use client";

import { portfolioData } from "@/data/portfolioData";
import { headingRevealCount, RevealGroup, RevealItem } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  const job = portfolioData.experience[0];

  return (
    <section id="experience" className="section">
      <RevealGroup className="stage">
        <SectionHeading kicker="// EXPERIENCE · 02 AUTOMATE" title="Experience" />
        <RevealItem index={headingRevealCount(false)} className="relative mt-12 pl-6 md:pl-10">
          <span className="timeline-line absolute bottom-2 left-[5px] top-2 w-px origin-top bg-line md:left-[9px]" />
          <span className="absolute left-0 top-3 h-3 w-3 rounded-full border border-[var(--accent)] bg-bg shadow-[0_0_0_4px_var(--accent-dim)] md:left-1" />
          <article className="card card-interactive p-6 md:p-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="meta">01 / {job.status}</p>
                <h3 className="heading mt-3 text-fg">{job.role}</h3>
                <p className="lede mt-2 text-fg/80">{job.company}</p>
              </div>
              <p className="meta">QA / SDET</p>
            </div>
            <p className="mt-6 max-w-3xl leading-relaxed text-muted">{job.summary}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {job.tech.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
            <p className="label mt-10 mb-4">Selected work</p>
            <ul className="grid gap-3 md:grid-cols-2">
              {job.work.map((item, index) => (
                <li key={item} className="border-l border-line pl-4 text-sm leading-relaxed text-muted">
                  <span className="mr-2 font-mono text-[10px] tracking-[0.14em] text-muted/80">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
