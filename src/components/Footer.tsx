"use client";

import { hrefFor, portfolioData } from "@/data/portfolioData";

export function Footer() {
  const github = hrefFor(portfolioData.social.github);
  const linkedin = hrefFor(portfolioData.social.linkedin);
  const instagram = hrefFor(portfolioData.social.instagram);

  return (
    <footer className="border-t border-line bg-bg py-8">
      <div className="stage flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <p className="font-display text-fg">{portfolioData.personal.firstName.toLowerCase()}.</p>
        <p className="text-[12px] tracking-[0.16em] text-muted">{portfolioData.personal.brand.toUpperCase()}</p>
        <div className="flex gap-5 text-[12px] tracking-[0.16em] text-muted">
          {github ? (
            <a href={github} target="_blank" rel="noreferrer" data-cursor="link">
              GITHUB
            </a>
          ) : (
            <span>GITHUB</span>
          )}
          {linkedin ? (
            <a href={linkedin} target="_blank" rel="noreferrer" data-cursor="link">
              LINKEDIN
            </a>
          ) : (
            <span>LINKEDIN</span>
          )}
          {instagram && (
            <a href={instagram} target="_blank" rel="noreferrer" data-cursor="link">
              INSTAGRAM
            </a>
          )}
        </div>
      </div>
      <div className="stage mt-6 flex items-center justify-between border-t border-line pt-5 text-[11px] tracking-[0.16em] text-muted">
        <p>© 2026 {portfolioData.personal.name.toUpperCase()}</p>
        <a href="#top" className="text-fg" data-cursor="link">
          BACK TO TOP ↑
        </a>
      </div>
    </footer>
  );
}
