"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { hrefFor, isPlaceholder, portfolioData, type Project } from "@/data/portfolio";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    document.body.classList.toggle("menu-open", Boolean(active));
    return () => document.body.classList.remove("menu-open");
  }, [active]);

  return (
    <section id="work" className="relative bg-bg py-24 md:py-32">
      <div className="stage">
        <p className="label mb-4">{"// PROJECTS"}</p>
        <h2 className="font-display text-4xl font-semibold tracking-tight text-fg md:text-6xl">
          Featured Projects
        </h2>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {portfolioData.projects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setActive} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[70] overflow-y-auto bg-bg/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="stage py-24">
              <div className="mb-10 flex items-start justify-between gap-6">
                <div>
                  <p className="label mb-4">{`// PROJECT ${active.index}`}</p>
                  <h3 className="font-display text-4xl font-semibold text-fg md:text-5xl">{active.name}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="rounded-full border border-line p-3 text-fg"
                  aria-label="Close case study"
                  data-cursor="link"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="max-w-3xl text-lg leading-relaxed text-muted">{active.description}</p>
              <div className="mt-10 grid gap-3 md:grid-cols-2">
                {active.highlights.map((item) => (
                  <div key={item} className="card p-5 text-sm text-muted">
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {hrefFor(active.live) && (
                  <a
                    href={active.live}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-invert px-6 py-4 text-[12px] text-invert-fg"
                    data-cursor="link"
                  >
                    LIVE DEMO ↗
                  </a>
                )}
                {hrefFor(active.github) ? (
                  <a
                    href={active.github}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-line px-6 py-4 text-[12px] text-fg"
                    data-cursor="link"
                  >
                    GITHUB ↗
                  </a>
                ) : (
                  isPlaceholder(active.github) && (
                    <span className="rounded-full border border-line px-6 py-4 text-[12px] text-muted">
                      GITHUB — YOUR_GITHUB_URL
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
