"use client";

import { portfolioData } from "@/data/portfolio";
import { Reveal } from "./Reveal";

export function Resume() {
  return (
    <section id="resume" className="section bg-bg">
      <Reveal className="stage">
        <div className="glass flex flex-col items-start justify-between gap-8 p-6 sm:p-8 md:flex-row md:items-center md:p-12">
          <div>
            <p className="label mb-4">{"// RESUME"}</p>
            <h2 className="heading text-3xl text-fg md:text-4xl">Resume</h2>
            <p className="mt-4 max-w-xl text-sm text-muted md:text-base">
              Download the latest resume as a Word document, or open it from the button on the right.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href={portfolioData.resume}
              download="Hemant_Agrawal_Resume.docx"
              className="rounded-full bg-invert px-6 py-4 text-center text-[12px] text-invert-fg"
              data-cursor="link"
            >
              Download Resume
            </a>
            <a
              href={portfolioData.resume}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line px-6 py-4 text-center text-[12px] text-fg"
              data-cursor="link"
            >
              View Resume
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
