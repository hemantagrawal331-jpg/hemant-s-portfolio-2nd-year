"use client";

import Image from "next/image";
import { hrefFor, isPlaceholder, type Project } from "@/data/portfolioData";

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (project: Project) => void;
}) {
  const live = hrefFor(project.live);
  const github = hrefFor(project.github);

  return (
    <article className="group card card-interactive relative flex min-h-[360px] flex-col justify-between overflow-hidden p-0">
      <button
        type="button"
        className="flex flex-1 flex-col p-6 text-left sm:p-7"
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
              className={`h-full w-full object-center transition-transform duration-700 ease-cinematic group-hover:scale-[1.04] ${
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
      <div className="flex flex-wrap items-center gap-3 border-t border-line px-6 py-4 sm:px-7">
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
  );
}
