"use client";

import { hrefFor, isPlaceholder, type Project } from "@/data/portfolio";

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
    <article
      className="card flex min-h-[340px] cursor-none flex-col justify-between p-6 transition duration-500 hover:-translate-y-1 hover:border-fg/20"
      data-cursor="view"
      onClick={() => onOpen(project)}
    >
      <div>
        <p className="text-[12px] tracking-[0.16em] text-muted">
          {`// PROJECT ${project.index} · ${project.tag}`}
        </p>
        <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-fg md:text-3xl">
          {project.name}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-muted">{project.description}</p>
      </div>
      <div>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span key={item} className="rounded-full border border-line px-3 py-1 text-[11px] text-muted">
              {item}
            </span>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3" onClick={(event) => event.stopPropagation()}>
          {live && (
            <a href={live} target="_blank" rel="noreferrer" className="text-[12px] text-fg" data-cursor="link">
              LIVE DEMO ↗
            </a>
          )}
          {github && (
            <a href={github} target="_blank" rel="noreferrer" className="text-[12px] text-fg" data-cursor="link">
              GITHUB ↗
            </a>
          )}
          {!github && isPlaceholder(project.github) && (
            <span className="text-[12px] text-muted">GITHUB — YOUR_GITHUB_URL</span>
          )}
        </div>
      </div>
    </article>
  );
}
