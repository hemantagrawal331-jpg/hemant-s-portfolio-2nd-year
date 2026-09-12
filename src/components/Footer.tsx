"use client";

import { hrefFor, portfolioData } from "@/data/portfolioData";

export function Footer() {
  const github = hrefFor(portfolioData.social.github);
  const linkedin = hrefFor(portfolioData.social.linkedin);
  const instagram = hrefFor(portfolioData.social.instagram);
  const email = hrefFor(portfolioData.social.email, "email");

  return (
    <footer className="border-t border-line py-8">
      <div className="stage flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <p className="font-display text-fg">{portfolioData.personal.firstName.toLowerCase()}.</p>
        <p className="text-[12px] tracking-[0.16em] text-muted">{portfolioData.personal.brand.toUpperCase()}</p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm tracking-[0.16em] text-muted md:text-[12px]">
          {github ? (
            <a href={github} target="_blank" rel="noopener noreferrer" className="link tap-link" data-cursor="link">
              GITHUB
            </a>
          ) : (
            <span className="tap-link">GITHUB</span>
          )}
          {linkedin ? (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="link tap-link" data-cursor="link">
              LINKEDIN
            </a>
          ) : (
            <span className="tap-link">LINKEDIN</span>
          )}
          {instagram && (
            <a href={instagram} target="_blank" rel="noopener noreferrer" className="link tap-link" data-cursor="link">
              INSTAGRAM
            </a>
          )}
          {email && (
            <a href={email} className="link tap-link" data-cursor="link">
              EMAIL
            </a>
          )}
          <a href="#resume" className="link tap-link" data-cursor="link">
            RESUME
          </a>
        </div>
      </div>
      <div className="stage mt-6 flex items-center justify-between border-t border-line pt-5 text-sm tracking-[0.16em] text-muted md:text-[11px]">
        <p>© 2026 {portfolioData.personal.name.toUpperCase()}</p>
        <a href="#top" className="link tap-link" data-cursor="link">
          BACK TO TOP ↑
        </a>
      </div>
    </footer>
  );
}
