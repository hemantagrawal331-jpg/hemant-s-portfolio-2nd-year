"use client";

import Image from "next/image";
import { useRef } from "react";
import { hrefFor, isPlaceholder, type Project } from "@/data/portfolioData";
import { useMedia } from "@/lib/useMedia";

const MAX_TILT = 7;

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (project: Project) => void;
}) {
  const live = hrefFor(project.live);
  const github = hrefFor(project.github);
  const cardRef = useRef<HTMLElement>(null);
  const coarse = useMedia("(pointer: coarse)");
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const liveTilt = !coarse && !reduced;

  const resetTilt = () => {
    const node = cardRef.current;
    if (!node) return;
    node.classList.remove("is-hot");
    node.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0px)";
    node.style.setProperty("--glow-x", "50%");
    node.style.setProperty("--glow-y", "50%");
  };

  const onMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!liveTilt) return;
    const node = cardRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - py) * (MAX_TILT * 2);
    const rotateY = (px - 0.5) * (MAX_TILT * 2);

    node.classList.add("is-hot");
    node.style.setProperty("--glow-x", `${(px * 100).toFixed(2)}%`);
    node.style.setProperty("--glow-y", `${(py * 100).toFixed(2)}%`);
    node.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
  };

  return (
    <div className="project-card-scene h-full">
      <article
        ref={cardRef}
        className="project-card group card card-interactive relative flex h-full min-h-[360px] flex-col justify-between p-0"
        onMouseMove={onMove}
        onMouseLeave={resetTilt}
      >
        <span className="project-card-glow" aria-hidden />
        <button
          type="button"
          className="relative z-[1] flex flex-1 flex-col p-6 text-left sm:p-7"
          onClick={() => onOpen(project)}
          data-cursor="view"
        >
          <div className="mb-8 flex items-center justify-between">
            <p className="font-mono text-[11px] tracking-[0.14em] text-muted">
              {`0${project.index} / ${project.tag}`}
            </p>
            <span className="text-[11px] tracking-[0.16em] text-muted transition-transform duration-500 group-hover:translate-x-1">
              VIEW ↗
            </span>
          </div>
          <div className="visual-panel mb-6 h-40 overflow-hidden rounded-2xl border border-line bg-[#111318]">
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.company || project.name} visual`}
                width={1400}
                height={600}
                className={`h-full w-full object-center transition-transform duration-700 ease-cinematic group-hover:scale-[1.045] ${
                  project.imageFit === "contain" ? "object-contain" : "object-cover"
                }`}
              />
            ) : (
              <div className="h-full w-full bg-[linear-gradient(135deg,var(--accent-dim),transparent_62%)]" />
            )}
          </div>
          <h3 className="font-display text-2xl font-semibold tracking-tight text-fg transition-transform duration-500 group-hover:-translate-y-1 md:text-3xl">
            {project.name}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted">{project.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2 opacity-80 transition-opacity duration-300 group-hover:opacity-100">
            {project.tech.map((item) => (
              <span key={item} className="chip">
                {item}
              </span>
            ))}
          </div>
        </button>
        <div className="relative z-[1] flex flex-wrap items-center gap-3 border-t border-line px-6 py-4 sm:px-7">
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-fg"
              data-cursor="link"
            >
              LIVE DEMO ↗
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-fg"
              data-cursor="link"
            >
              GITHUB ↗
            </a>
          )}
          {project.companyRepo && (
            <span className="text-[12px] text-muted">{project.company} · company repository</span>
          )}
          {!github && !project.companyRepo && isPlaceholder(project.github) && (
            <span className="text-[12px] text-muted">GITHUB — YOUR_GITHUB_URL</span>
          )}
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="ml-auto text-[11px] tracking-[0.16em] text-muted transition-transform duration-300 group-hover:translate-x-1"
          >
            CASE STUDY →
          </button>
        </div>
      </article>
    </div>
  );
}
