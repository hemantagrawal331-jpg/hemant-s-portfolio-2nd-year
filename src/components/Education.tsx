"use client";

import { portfolioData } from "@/data/portfolio";

export function Education() {
  const edu = portfolioData.education;

  return (
    <section id="education" className="relative bg-bg py-24 md:py-32">
      <div className="stage">
        <p className="label mb-4">{"// EDUCATION"}</p>
        <h2 className="font-display text-4xl font-semibold tracking-tight text-fg md:text-6xl">
          Education
        </h2>
        <article className="card mt-12 p-6 md:p-10">
          <p className="text-[12px] tracking-[0.16em] text-muted">{edu.year}</p>
          <h3 className="mt-3 font-display text-3xl font-semibold text-fg">{edu.school}</h3>
          <p className="mt-2 text-lg text-fg/80">{edu.program}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {edu.areas.map((area) => (
              <span key={area} className="rounded-full border border-line px-3 py-1 text-[12px] text-muted">
                {area}
              </span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
