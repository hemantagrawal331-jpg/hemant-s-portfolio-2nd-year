"use client";

import { portfolioData } from "@/data/portfolioData";
import { headingRevealCount, RevealGroup, RevealItem } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Learning() {
  const start = headingRevealCount(false);

  return (
    <section id="learning" className="section">
      <RevealGroup className="stage">
        <SectionHeading kicker="// NOW · 04 IMPROVE" title="Currently Learning" />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {portfolioData.learning.map((item, index) => (
            <RevealItem key={item.title} index={start + index}>
              <article className="card card-interactive h-full p-6">
                <p className="font-mono text-[11px] tracking-[0.16em] text-muted">
                  {`learn/${String(index + 1).padStart(2, "0")}`}
                </p>
                <h3 className="mt-4 text-xl text-fg">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
              </article>
            </RevealItem>
          ))}
        </div>
      </RevealGroup>
    </section>
  );
}
