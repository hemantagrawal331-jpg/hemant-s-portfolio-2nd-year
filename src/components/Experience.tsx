"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  const job = portfolioData.experience[0];

  return (
    <section id="experience" className="section bg-bg">
      <div className="stage">
        <Reveal>
          <SectionHeading kicker="// EXPERIENCE · 02 AUTOMATE" title="Experience" />
        </Reveal>
        <Reveal className="relative mt-12 pl-6 md:pl-10">
          <motion.span
            className="timeline-line absolute bottom-2 left-[5px] top-2 w-px bg-line md:left-[9px]"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
          <span className="absolute left-0 top-3 h-3 w-3 rounded-full border border-[var(--accent)] bg-bg shadow-[0_0_0_4px_var(--accent-dim)] md:left-1" />
          <article className="card card-interactive p-6 md:p-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-mono text-[12px] tracking-[0.18em] text-muted">01 / {job.status}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-fg md:text-4xl">{job.role}</h3>
                <p className="mt-2 text-lg text-fg/80">{job.company}</p>
              </div>
              <p className="font-mono text-[11px] tracking-[0.14em] text-muted">QA / SDET</p>
            </div>
            <p className="mt-6 max-w-3xl leading-relaxed text-muted">{job.summary}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {job.tech.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
            <ul className="mt-8 grid gap-3 md:grid-cols-2">
              {job.work.map((item) => (
                <li key={item} className="border-l border-line pl-4 text-sm leading-relaxed text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
