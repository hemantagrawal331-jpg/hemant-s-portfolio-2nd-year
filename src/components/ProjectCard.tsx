"use client";

import Image from "next/image";
import { hrefFor, isPlaceholder, type Project } from "@/data/portfolioData";

function titleLines(name: string) {
  if (name === "AI-Powered Social Media Authenticity & Risk Analysis") {
    return ["AI-Powered Social Media", "Authenticity & Risk Analysis"];
  }
  return [name];
}

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (project: Project) => void;
}) {
  const live = hrefFor(project.live);
  const github = hrefFor(project.github);
  const index = project.index.replace(/\D/g, "").padStart(3, "0");
  const techLine = project.tech.map((item) => item.toUpperCase()).join(" · ");

  return (
    <article className="project-case">
      <button
        type="button"
        className="w-full p-6 text-left sm:p-8 md:p-10"
        onClick={() => onOpen(project)}
        data-cursor="view"
      >
        <div className="flex items-center justify-between gap-4">
          <p className="meta">
            {index} / {project.tag}
          </p>
          <span className="meta">
            VIEW <span className="project-arrow">↗</span>
          </span>
        </div>

        <h3 className="project-case-title mt-6 max-w-4xl text-fg">
          {titleLines(project.name).map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h3>

        <div className="project-visual mt-8">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.company || project.name} visual`}
              width={1600}
              height={900}
              className={project.imageFit === "contain" ? "object-contain object-center" : "object-cover object-center"}
            />
          ) : (
            <div className="h-full w-full bg-[linear-gradient(135deg,var(--accent-dim),transparent_62%)]" />
          )}
        </div>

        <p className="meta mt-8">{techLine}</p>
      </button>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line px-6 py-5 sm:px-8 md:px-10">
        {live && (
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-[0.14em] text-fg"
            data-cursor="link"
          >
            LIVE DEMO <span className="project-arrow">↗</span>
          </a>
        )}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-[0.14em] text-fg"
            data-cursor="link"
          >
            GITHUB <span className="project-arrow">↗</span>
          </a>
        )}
        {project.companyRepo && (
          <span className="font-mono text-[11px] tracking-[0.14em] text-muted">
            {project.company} · company repository
          </span>
        )}
        {!github && !project.companyRepo && isPlaceholder(project.github) && (
          <span className="font-mono text-[11px] tracking-[0.14em] text-muted">
            GITHUB — YOUR_GITHUB_URL
          </span>
        )}
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="ml-auto font-mono text-[11px] tracking-[0.14em] text-muted"
        >
          CASE STUDY <span className="project-arrow">→</span>
        </button>
      </div>
    </article>
  );
}
