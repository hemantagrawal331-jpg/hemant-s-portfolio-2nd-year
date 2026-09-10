"use client";

import { portfolioData } from "@/data/portfolio";

export function Skills() {
  return (
    <section id="skills" className="relative bg-bg py-24 md:py-32">
      <div className="stage">
        <p className="label mb-4">{"// SKILLS"}</p>
        <h2 className="font-display text-4xl font-semibold tracking-tight text-fg md:text-6xl">
          Technical Skills
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Tools and concepts used in coursework, internship work, and personal projects — shown as working
          knowledge, not claimed expertise.
        </p>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {portfolioData.skillGroups.map((group) => (
            <article
              key={group.title}
              className="card p-6 transition duration-500 hover:-translate-y-1 hover:border-fg/20"
            >
              <h3 className="text-xl text-fg">{group.title}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full border border-line px-3 py-1 text-[12px] text-muted">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
