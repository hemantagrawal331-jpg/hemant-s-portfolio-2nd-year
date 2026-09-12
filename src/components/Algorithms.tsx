"use client";

import { portfolioData } from "@/data/portfolioData";
import { headingRevealCount, RevealGroup, RevealItem } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Algorithms() {
  const data = portfolioData.algorithms;
  const start = headingRevealCount(true);

  return (
    <section className="section bg-bg">
      <RevealGroup className="stage">
        <SectionHeading
          kicker="// ADA"
          title={data.title}
          text={`${data.description} Implemented in ${data.language}.`}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {data.items.map((item, index) => (
            <RevealItem key={item.name} index={start + index}>
              <article className="card card-interactive h-full p-5">
                <p className="text-sm text-muted">{item.name}</p>
                <p className="mt-3 font-mono text-2xl text-fg md:text-3xl">{item.complexity}</p>
                <p className="mt-2 text-[12px] text-muted">{item.note}</p>
              </article>
            </RevealItem>
          ))}
        </div>
        <RevealItem index={start + data.items.length} className="mt-6 flex flex-wrap gap-2">
          {data.topics.map((topic) => (
            <span key={topic} className="chip">
              {topic}
            </span>
          ))}
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
