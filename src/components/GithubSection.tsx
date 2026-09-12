"use client";

import { portfolioData } from "@/data/portfolioData";
import { headingRevealCount, RevealGroup, RevealItem } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function GithubSection() {
  const start = headingRevealCount(true);

  return (
    <section className="section">
      <RevealGroup className="stage">
        <SectionHeading
          kicker="// ENGINEERING"
          title="Code, every day."
          text="Internship automation work at Attentive.ai, plus personal projects. Contribution counts are not shown because they are not pulled from the GitHub API."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <RevealItem index={start}>
            <div className="card p-6 md:p-8">
              <p className="label mb-6">GitHub</p>
              <div className="grid grid-cols-12 gap-1.5 md:grid-cols-[repeat(14,minmax(0,1fr))]">
                {Array.from({ length: 84 }).map((_, index) => (
                  <div key={index} className="aspect-square rounded-[3px] bg-fg/[0.07]" />
                ))}
              </div>
              <p className="mt-6 font-mono text-sm text-muted">github.com/hemantagrawal331-jpg</p>
            </div>
          </RevealItem>
          <div className="grid gap-3">
            <RevealItem index={start + 1}>
              <div className="card card-interactive p-5">
                <p className="label">Major internship project</p>
                <p className="mt-3 font-display text-2xl text-fg">{portfolioData.personal.githubRepoName}</p>
                <p className="mt-2 text-sm text-muted">
                  Java API automation framework at Attentive.ai. Pushed to the company repository — no public GitHub link.
                </p>
              </div>
            </RevealItem>
            <RevealItem index={start + 2}>
              <div className="card card-interactive p-5">
                <p className="label">More internship projects</p>
                <p className="mt-3 text-fg">Beam MT API Automation</p>
                <p className="mt-2 text-sm text-muted">
                  Plus authentication, file-upload, request-status, and other API workflows during the Attentive.ai internship. Also in the company repository.
                </p>
              </div>
            </RevealItem>
            <RevealItem index={start + 3}>
              <div className="card card-interactive p-5">
                <p className="label">Focus</p>
                <p className="mt-3 text-fg">
                  Curious, practical, automation-minded, and quality-focused — with honest results.
                </p>
              </div>
            </RevealItem>
          </div>
        </div>
      </RevealGroup>
    </section>
  );
}
