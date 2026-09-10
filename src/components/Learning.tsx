"use client";

import { portfolioData } from "@/data/portfolio";

export function Learning() {
  return (
    <section className="relative bg-bg py-24 md:py-32">
      <div className="stage">
        <p className="label mb-4">{"// NOW"}</p>
        <h2 className="font-display text-4xl font-semibold tracking-tight text-fg md:text-6xl">
          Currently Learning
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {portfolioData.learning.map((item) => (
            <article key={item.title} className="card p-6">
              <h3 className="text-xl text-fg">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
