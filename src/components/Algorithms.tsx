"use client";

import { portfolioData } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Algorithms() {
  const data = portfolioData.algorithms;

  return (
    <section className="section bg-bg">
      <div className="stage">
        <Reveal>
          <SectionHeading
            kicker="// ADA"
            title={data.title}
            text={`${data.description} Implemented in ${data.language}.`}
          />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {data.items.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.04}>
              <article className="card card-interactive h-full p-5">
                <p className="text-sm text-muted">{item.name}</p>
                <p className="mt-3 font-mono text-2xl text-fg md:text-3xl">{item.complexity}</p>
                <p className="mt-2 text-[12px] text-muted">{item.note}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {data.topics.map((topic) => (
            <span key={topic} className="chip">
              {topic}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
