"use client";

import { hrefFor, portfolioData } from "@/data/portfolioData";
import { headingRevealCount, RevealGroup, RevealItem } from "./Reveal";
import { MagneticButton } from "./MagneticButton";
import { SectionHeading } from "./SectionHeading";

export function GithubSection() {
  const start = headingRevealCount(true);
  const github = hrefFor(portfolioData.social.github);
  const handle = "github.com/hemantagrawal331-jpg";

  return (
    <section id="engineering" className="section">
      <RevealGroup className="stage">
        <SectionHeading
          kicker="// ENGINEERING"
          title="Code, every day."
          text="Internship automation work at Attentive.ai, plus personal projects. Contribution counts are not shown because they are not pulled from the GitHub API."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <RevealItem index={start}>
            <div className="card flex h-full flex-col justify-between p-6 md:p-8">
              <div>
                <p className="label mb-6">GitHub</p>
                <p className="font-display text-3xl tracking-tight text-fg md:text-5xl">
                  {portfolioData.personal.name}
                </p>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                  Public work lives here. Internship frameworks were pushed to the Attentive.ai company repository, so those have no public GitHub link.
                </p>
                <p className="mt-6 font-mono text-sm text-muted">{handle}</p>
              </div>
              {github && (
                <div className="mt-8">
                  <MagneticButton
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-line rounded-full bg-invert px-5 py-3 text-[12px] text-invert-fg"
                  >
                    Open GitHub <span className="arrow">↗</span>
                  </MagneticButton>
                </div>
              )}
            </div>
          </RevealItem>
          <div className="grid gap-3">
            <RevealItem index={start + 1}>
              <div className="card card-interactive p-5 md:p-6">
                <p className="label">Major internship project</p>
                <p className="mt-3 font-display text-2xl text-fg">{portfolioData.personal.githubRepoName}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Java API automation framework at Attentive.ai. Pushed to the company repository — no public GitHub link.
                </p>
              </div>
            </RevealItem>
            <RevealItem index={start + 2}>
              <div className="card card-interactive p-5 md:p-6">
                <p className="label">More internship projects</p>
                <p className="mt-3 font-display text-2xl text-fg">Beam MT API Automation</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Authentication, file-upload, request-status, and other API workflows during the Attentive.ai internship. Also in the company repository.
                </p>
              </div>
            </RevealItem>
          </div>
        </div>
      </RevealGroup>
    </section>
  );
}
