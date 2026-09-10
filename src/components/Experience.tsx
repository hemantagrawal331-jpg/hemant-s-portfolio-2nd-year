"use client";

import { portfolioData } from "@/data/portfolio";

export function Experience() {
  const job = portfolioData.experience[0];

  return (
    <section id="experience" className="relative bg-bg py-24 md:py-32">
      <div className="stage">
        <p className="label mb-4">{"// EXPERIENCE"}</p>
        <h2 className="font-display text-4xl font-semibold tracking-tight text-fg md:text-6xl">
          Experience
        </h2>
        <article className="card mt-12 p-6 md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[12px] tracking-[0.16em] text-muted">{job.status}</p>
              <h3 className="mt-3 font-display text-3xl font-semibold text-fg">{job.role}</h3>
              <p className="mt-2 text-lg text-fg/80">{job.company}</p>
            </div>
          </div>
          <p className="mt-6 max-w-3xl leading-relaxed text-muted">{job.summary}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {job.tech.map((item) => (
              <span key={item} className="rounded-full border border-line px-3 py-1 text-[11px] text-fg/80">
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
      </div>
    </section>
  );
}
