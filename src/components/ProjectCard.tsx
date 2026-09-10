"use client";

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
    <article className="group card card-interactive flex min-h-[320px] flex-col justify-between p-5 sm:p-6">
      <button
        type="button"
        className="flex flex-1 flex-col text-left"
        onClick={() => onOpen(project)}
        data-cursor="view"
      >
        <div className="mb-6 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-fg/20" />
          <span className="h-2 w-2 rounded-full bg-fg/20" />
          <span className="h-2 w-2 rounded-full bg-fg/20" />
          <p className="ml-2 font-mono text-[11px] tracking-[0.14em] text-muted">
            {`// PROJECT ${project.index} · ${project.tag}`}
          </p>
        </div>
        <h3 className="font-display text-2xl font-semibold tracking-tight text-fg transition-transform duration-500 group-hover:-translate-y-0.5 md:text-3xl">
          {project.name}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-muted">{project.summary}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span key={item} className="chip">
              {item}
            </span>
          ))}
        </div>
      </button>
      <div className="mt-5 flex flex-wrap items-center gap-3">
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
