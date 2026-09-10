"use client";

import { hrefFor, portfolioData } from "@/data/portfolio";

export function GithubSection() {
  const github = hrefFor(portfolioData.github);

  return (
    <section className="relative bg-bg py-24 md:py-32">
      <div className="stage">
        <p className="label mb-4">{"// ENGINEERING"}</p>
        <h2 className="font-display text-4xl font-semibold tracking-tight text-fg md:text-6xl">
          Code, every day.
        </h2>
        <div className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="card p-6 md:p-8">
            <p className="label mb-6">Contribution graph — placeholder</p>
            <div className="grid grid-cols-12 gap-1.5 md:grid-cols-[repeat(14,minmax(0,1fr))]">
              {Array.from({ length: 84 }).map((_, index) => (
                <div key={index} className="aspect-square rounded-[3px] bg-fg/10" />
              ))}
            </div>
            <p className="mt-6 text-sm text-muted">
              Profile connected: github.com/hemantagrawal331-jpg. Contribution counts are not shown because
              they are not pulled from the GitHub API.
            </p>
          </div>
          <div className="grid gap-3">
            <div className="card p-5">
              <p className="label">Known repository</p>
              <p className="mt-3 font-display text-2xl text-fg">{portfolioData.githubRepoName}</p>
              <p className="mt-2 text-sm text-muted">Java API automation framework from internship work.</p>
            </div>
            <div className="card p-5">
              <p className="label">Focus</p>
              <p className="mt-3 text-fg">Readable tests, reusable helpers, honest results.</p>
            </div>
            {github ? (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="card p-5 text-[12px] tracking-[0.16em] text-fg"
                data-cursor="link"
              >
                VIEW GITHUB ↗
              </a>
            ) : (
              <div className="card p-5 text-[12px] tracking-[0.16em] text-muted">
                VIEW GITHUB — YOUR_GITHUB_URL
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
