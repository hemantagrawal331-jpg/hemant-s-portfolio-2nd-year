"use client";

import { portfolioData } from "@/data/portfolioData";
import { headingRevealCount, RevealGroup, RevealItem } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  const job = portfolioData.experience[0];

  return (
    <section id="experience" className="section">
      <RevealGroup className="stage">
        <SectionHeading
          kicker="// EXPERIENCE · 02 AUTOMATE"
          title="Experience"
          text={`${job.role} at ${job.company}. ${job.status}.`}
        />
        <RevealItem index={headingRevealCount(true)} className="relative mt-12 pl-6 md:pl-12">
          <span className="timeline-line absolute bottom-4 left-[5px] top-3 w-px origin-top bg-line md:left-[9px]" />

          <div className="relative">
            <span className="absolute -left-6 top-3 h-3 w-3 rounded-full border border-[var(--accent)] bg-bg shadow-[0_0_0_4px_var(--accent-dim)] md:-left-11" />
            <article className="card p-6 md:p-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="meta">01 / {job.status}</p>
                  <h3 className="heading mt-3 text-fg">{job.role}</h3>
                  <p className="lede mt-2 text-fg/80">{job.company}</p>
                </div>
                <p className="meta">QA / SDET</p>
              </div>
              <p className="body-copy mt-6 max-w-3xl text-muted">{job.summary}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {job.tech.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          </div>

          <p className="label mb-2 mt-10">Selected work</p>
          <ol>
            {job.work.map((item, index) => (
              <li key={item} className="relative py-5">
                <span className="absolute -left-6 top-7 h-2.5 w-2.5 rounded-full border border-[var(--accent)] bg-bg md:-left-[43px]" />
                <p className="meta mb-2">
                  {String(index + 1).padStart(2, "0")} / {job.company}
                </p>
                <p className="max-w-3xl text-sm leading-relaxed text-fg/85 md:text-[15px]">{item}</p>
              </li>
            ))}
          </ol>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
