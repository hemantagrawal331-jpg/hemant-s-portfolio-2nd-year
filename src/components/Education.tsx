"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Education() {
  const edu = portfolioData.education;

  return (
    <section id="education" className="section bg-bg">
      <div className="stage">
        <Reveal>
          <SectionHeading kicker="// EDUCATION" title="Education" />
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
            <p className="text-[12px] tracking-[0.16em] text-muted">{edu.year}</p>
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
        </Reveal>
      </div>
    </section>
  );
}
