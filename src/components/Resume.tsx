"use client";

import { portfolioData } from "@/data/portfolioData";
import { MagneticButton } from "./MagneticButton";
import { Reveal } from "./Reveal";

export function Resume() {
  const resumeHref = portfolioData.social.resume;
  const resumeFileName = portfolioData.social.resumeFileName;

  return (
    <section id="resume" className="section bg-bg">
      <Reveal className="stage">
        <div className="flex flex-col justify-between gap-10 border border-line bg-elevated p-6 sm:p-8 md:flex-row md:items-end md:p-10">
          <div className="max-w-xl">
            <p className="label mb-4">{"// RESUME"}</p>
            <h2 className="display text-[clamp(2.4rem,8vw,5.5rem)] text-fg">RESUME</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted md:text-base">
              {portfolioData.social.resumeText}
            </p>
            <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <MagneticButton
                href={resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-line min-h-12 w-full rounded-full bg-invert px-6 py-3.5 text-center text-[12px] tracking-[0.08em] text-invert-fg sm:w-auto"
              >
                VIEW RESUME <span className="arrow">↗</span>
              </MagneticButton>
              <MagneticButton
                href={resumeHref}
                download={resumeFileName}
                className="btn-line min-h-12 w-full rounded-full border border-line px-6 py-3.5 text-center text-[12px] tracking-[0.08em] text-fg sm:w-auto"
              >
                DOWNLOAD PDF
              </MagneticButton>
            </div>
            <p className="mt-4 font-mono text-[11px] tracking-[0.16em] text-muted">
              {portfolioData.social.resumeMeta}
            </p>
          </div>

          <div className="w-full max-w-xs border border-line px-5 py-6 md:ml-auto">
            <p className="label">RESUME</p>
            <p className="mt-4 font-display text-2xl tracking-tight text-fg">
              {portfolioData.personal.name}
            </p>
            <p className="mt-2 text-sm text-muted">CSE · AI/ML · QA Automation</p>
            <p className="mt-6 font-mono text-[11px] tracking-[0.18em] text-muted">PDF</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
