"use client";

import { useMemo, useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const CATEGORIES = [
  { label: "AI / ML", titles: ["AI / ML"] },
  { label: "SOFTWARE", titles: ["Programming Languages", "Computer Science"] },
  { label: "QA AUTOMATION", titles: ["QA & Automation"] },
  { label: "APIs", titles: ["Backend / API"] },
  { label: "DATABASE", titles: ["Database"] },
  { label: "TOOLS", titles: ["Development & Tools"] },
] as const;

export function Skills() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]["label"]>("QA AUTOMATION");

  const items = useMemo(() => {
    const titles = CATEGORIES.find((category) => category.label === active)?.titles ?? [];
    return portfolioData.skills
      .filter((group) => (titles as readonly string[]).includes(group.title))
      .flatMap((group) => group.items);
  }, [active]);

  return (
    <section id="skills" className="section bg-bg">
      <div className="stage">
        <Reveal>
          <SectionHeading
            kicker="// SKILLS · 03 TEST"
            title="Technical Skills"
            text="Tools and concepts used in coursework, internship work, and personal projects — shown as working knowledge, not claimed expertise."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {CATEGORIES.map((category, index) => {
              const selected = active === category.label;
              return (
                <button
                  key={category.label}
                  type="button"
                  onMouseEnter={() => setActive(category.label)}
                  onFocus={() => setActive(category.label)}
                  onClick={() => setActive(category.label)}
                  className={`card flex items-center justify-between px-5 py-4 text-left transition-colors duration-300 ${
                    selected ? "border-[color-mix(in_srgb,var(--accent)_45%,var(--line))] bg-[var(--accent-dim)]" : ""
                  }`}
                  data-cursor="link"
                >
                  <span className="font-display text-lg text-fg md:text-xl">{category.label}</span>
                  <span className="font-mono text-[11px] text-muted">{String(index + 1).padStart(2, "0")}</span>
                </button>
              );
            })}
          </div>
          <div className="card min-h-[280px] p-6 md:p-8">
            <p className="label">{active}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {items.map((item) => (
                <span key={item} className="chip text-fg">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
