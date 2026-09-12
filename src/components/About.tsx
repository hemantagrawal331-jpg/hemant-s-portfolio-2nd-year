"use client";

import Image from "next/image";
import { portfolioData } from "@/data/portfolioData";
import { EmphasisText } from "./EmphasisText";
import { RevealGroup, RevealItem } from "./Reveal";
import { TerminalKicker } from "./TerminalKicker";

export function About() {
  const [lead, ...rest] = portfolioData.personal.about.paragraphs;

  return (
    <section id="about" className="section relative overflow-hidden">
      <RevealGroup className="stage relative">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <RevealItem index={0}>
              <TerminalKicker text="// ABOUT" className="mb-4" />
            </RevealItem>
            <RevealItem as="h2" index={1} className="heading max-w-2xl text-fg">
              {portfolioData.personal.about.heading}
            </RevealItem>
          </div>
          <RevealItem as="p" index={2} className="hidden font-mono text-[11px] tracking-[0.2em] text-muted md:block">
            01 — BUILD
          </RevealItem>
        </div>
        <div className="grid items-start gap-10 lg:grid-cols-[340px_1fr] lg:gap-16">
          <RevealItem index={3}>
            <div className="overflow-hidden rounded-[var(--radius)] border border-line bg-elevated p-3">
              <Image
                src="/images/about-portrait.png"
                alt={`${portfolioData.personal.name}`}
                width={892}
                height={1536}
                className="aspect-[4/5] w-full rounded-[10px] object-cover object-[70%_18%] transition duration-700 hover:scale-[1.03]"
              />
              <div className="flex items-center gap-2 px-3 py-4">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                <span className="font-mono text-[11px] tracking-[0.16em] text-muted">OPEN TO OPPORTUNITIES</span>
              </div>
            </div>
          </RevealItem>

          <RevealItem index={4}>
            <div className="body-copy space-y-4 text-muted">
              <p>
                <EmphasisText text={lead} />
              </p>
              {rest.map((paragraph) => (
                <p key={paragraph}>
                  <EmphasisText text={paragraph} />
                </p>
              ))}
            </div>
            <div className="mt-8">
              <p className="label mb-3">{portfolioData.personal.about.approachLabel}</p>
              <p className="lede text-fg">
                {portfolioData.personal.about.approach}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {portfolioData.personal.aboutPills.map((pill) => (
                <span key={pill} className="chip text-fg">
                  {pill}
                </span>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {portfolioData.personal.about.facts.map((fact) => (
                <div key={fact.label} className="card p-4">
                  <p className="label">{fact.label}</p>
                  <p className="mt-2 text-sm text-fg md:text-base">{fact.value}</p>
                </div>
              ))}
            </div>
          </RevealItem>
        </div>
      </RevealGroup>
    </section>
  );
}
