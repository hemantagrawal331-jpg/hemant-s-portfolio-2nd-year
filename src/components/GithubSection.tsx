"use client";

import { hrefFor, portfolioData } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function GithubSection() {
  const github = hrefFor(portfolioData.github);

  return (
    <section className="section bg-bg">
      <div className="stage">
        <Reveal>
          <SectionHeading
            kicker="// ENGINEERING"
            title="Code, every day."
            text="Profile connected. Contribution counts are not shown because they are not pulled from the GitHub API."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <div className="card p-6 md:p-8">
              <p className="label mb-6">Activity placeholder</p>
              <div className="grid grid-cols-12 gap-1.5 md:grid-cols-[repeat(14,minmax(0,1fr))]">
                {Array.from({ length: 84 }).map((_, index) => (
                  <div key={index} className="aspect-square rounded-[3px] bg-fg/[0.07]" />
                ))}
              </div>
              <p className="mt-6 font-mono text-sm text-muted">github.com/hemantagrawal331-jpg</p>
            </div>
          </Reveal>
          <div className="grid gap-3">
            <Reveal delay={0.05}>
              <div className="card card-interactive p-5">
                <p className="label">Known repository</p>
                <p className="mt-3 font-display text-2xl text-fg">{portfolioData.githubRepoName}</p>
                <p className="mt-2 text-sm text-muted">Java API automation framework from internship work.</p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="card card-interactive p-5">
                <p className="label">Focus</p>
                <p className="mt-3 text-fg">Readable tests, reusable helpers, honest results.</p>
              </div>
            </Reveal>
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="card card-interactive p-5 text-[12px] tracking-[0.16em] text-fg"
                data-cursor="link"
              >
                VIEW GITHUB ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
