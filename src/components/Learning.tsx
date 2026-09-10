"use client";

import { portfolioData } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Learning() {
  return (
    <section className="section bg-bg">
      <div className="stage">
        <Reveal>
          <SectionHeading kicker="// NOW" title="Currently Learning" />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {portfolioData.learning.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <article className="card card-interactive h-full p-6">
                <p className="font-mono text-[11px] tracking-[0.16em] text-muted">
                  {`learn/${String(index + 1).padStart(2, "0")}`}
                </p>
                <h3 className="mt-4 text-xl text-fg">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
