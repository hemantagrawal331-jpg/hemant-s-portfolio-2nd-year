"use client";

import { portfolioData } from "@/data/portfolioData";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="section bg-bg">
      <div className="stage">
        <Reveal>
          <SectionHeading
            kicker="// SKILLS"
            title="Technical Skills"
            text="Tools and concepts used in coursework, internship work, and personal projects — shown as working knowledge, not claimed expertise."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {portfolioData.skills.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.04}>
              <article className="card card-interactive h-full p-6">
                <div className="mb-5 flex items-center justify-between">
                  <p className="font-mono text-[11px] tracking-[0.16em] text-muted">
                    {`0${index + 1} / ${String(portfolioData.skills.length).padStart(2, "0")}`}
                  </p>
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                </div>
                <h3 className="text-xl text-fg">{group.title}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
