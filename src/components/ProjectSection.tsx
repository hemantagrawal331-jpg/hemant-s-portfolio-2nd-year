"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { hrefFor, isPlaceholder, portfolioData, type Project } from "@/data/portfolioData";
import { ProjectCard } from "./ProjectCard";
import { RevealGroup, RevealItem } from "./Reveal";
import { TerminalKicker } from "./TerminalKicker";

export function ProjectSection() {
  const [active, setActive] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.body.classList.toggle("menu-open", Boolean(active));
    return () => document.body.classList.remove("menu-open");
  }, [active]);

  useEffect(() => {
    if (!active) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(null);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = [
        ...dialogRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lastFocus.current?.focus();
    };
  }, [active]);

  return (
    <section id="work" className="section">
      <RevealGroup className="stage">
        <RevealItem index={0}>
          <TerminalKicker text="// PROJECTS · BUILD" className="mb-4" />
        </RevealItem>
        <RevealItem as="h2" index={1} className="heading text-3xl text-fg sm:text-4xl md:text-5xl lg:text-6xl">
          Featured Projects
        </RevealItem>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {portfolioData.projects.map((project, index) => (
            <RevealItem key={project.id} index={2 + index} className="h-full">
              <ProjectCard project={project} onOpen={setActive} />
            </RevealItem>
          ))}
        </div>
      </RevealGroup>

      <AnimatePresence>
        {active && (
          <motion.div
            ref={dialogRef}
            className="fixed inset-0 z-[70] overflow-y-auto bg-bg/95 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            aria-describedby="case-study-copy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="stage py-20 md:py-24">
              <div className="mb-10 flex items-start justify-between gap-6">
                <div>
                  <p className="label mb-4">{`// PROJECT ${active.index}`}</p>
                  <h3 id="case-study-title" className="font-display text-4xl font-semibold text-fg md:text-5xl">
                    {active.name}
                  </h3>
                  <p className="mt-3 font-mono text-[11px] tracking-[0.16em] text-muted">{active.tag}</p>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setActive(null)}
                  className="rounded-full border border-line p-3 text-fg"
                  aria-label="Close case study"
                  data-cursor="link"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {active.image && (
                <div className="mb-8 overflow-hidden rounded-[24px] border border-line bg-[#111318]">
                  <Image
                    src={active.image}
                    alt={`${active.company || active.name} visual`}
                    width={1600}
                    height={900}
                    className={`h-auto w-full ${active.imageFit === "contain" ? "object-contain" : "object-cover"}`}
                  />
                </div>
              )}
              <p id="case-study-copy" className="max-w-3xl text-lg leading-relaxed text-muted">
                {active.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {active.tech.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-10 grid gap-3 md:grid-cols-2">
                {active.highlights.map((item, index) => (
                  <div key={item} className="card p-5 text-sm leading-relaxed text-muted">
                    <p className="mb-2 font-mono text-[11px] tracking-[0.16em] text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {hrefFor(active.live) && (
                  <a
                    href={active.live}
                    target="_blank"
                    rel="noopener noreferrer"
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
                    rel="noopener noreferrer"
                    className="rounded-full border border-line px-6 py-4 text-[12px] text-fg"
                    data-cursor="link"
                  >
                    GITHUB ↗
                  </a>
                ) : active.companyRepo ? (
                  <span className="rounded-full border border-line px-6 py-4 text-[12px] text-muted">
                    {active.company} · company repository
                  </span>
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
