"use client";

import { portfolioData } from "@/data/portfolio";

export function Algorithms() {
  const data = portfolioData.algorithms;

  return (
    <section className="relative bg-bg py-24 md:py-32">
      <div className="stage">
        <p className="label mb-4">{"// ADA"}</p>
        <h2 className="font-display text-4xl font-semibold tracking-tight text-fg md:text-6xl">
          {data.title}
        </h2>
        <p className="mt-4 max-w-2xl text-muted">{data.description}</p>
        <p className="mt-3 text-sm text-muted">Implemented in {data.language}.</p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {data.items.map((item) => (
            <article key={item.name} className="card p-5">
              <p className="text-sm text-muted">{item.name}</p>
              <p className="mt-3 font-display text-3xl text-fg">{item.complexity}</p>
              <p className="mt-2 text-[12px] text-muted">{item.note}</p>
            </article>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {data.topics.map((topic) => (
            <span key={topic} className="rounded-full border border-line px-3 py-1 text-[12px] text-muted">
              {topic}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
