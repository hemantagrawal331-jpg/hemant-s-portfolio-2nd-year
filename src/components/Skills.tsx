"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { portfolioData } from "@/data/portfolioData";
import { useTypedLine } from "@/lib/useTypedLine";
import { headingRevealCount, RevealGroup, RevealItem, useRevealVisible } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const CATEGORIES = [
  { label: "AI / ML", titles: ["AI / ML"] },
  { label: "SOFTWARE", titles: ["Programming Languages", "Computer Science"] },
  { label: "QA AUTOMATION", titles: ["QA & Automation"] },
  { label: "APIs", titles: ["Backend / API"] },
  { label: "DATABASE", titles: ["Database"] },
  { label: "TOOLS", titles: ["Development & Tools"] },
] as const;

function skillPath(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function SkillPanel({
  active,
  items,
}: {
  active: string;
  items: readonly string[];
}) {
  const visible = useRevealVisible();
  const panelIndex = headingRevealCount(true) + CATEGORIES.length;
  const command = `ls skills/${skillPath(active)}.txt`;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!visible) {
      setReady(false);
      return;
    }
    const timer = window.setTimeout(() => setReady(true), panelIndex * 80);
    return () => window.clearTimeout(timer);
  }, [visible, panelIndex]);

  const typed = useTypedLine(command, ready);
  const showChips = ready && typed === command;

  return (
    <RevealItem index={panelIndex} className="card min-h-[280px] p-6 md:p-8">
      <p className="label font-mono">
        <span className="text-[var(--accent)]">$</span> {typed}
        <span className="terminal-caret" aria-hidden />
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {showChips
          ? items.map((item, index) => (
              <span
                key={`${active}-${item}`}
                className="chip skill-chip text-fg"
                style={{ "--reveal-i": index } as CSSProperties}
              >
                {item}
              </span>
            ))
          : null}
      </div>
    </RevealItem>
  );
}

export function Skills() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]["label"]>("QA AUTOMATION");
  const start = headingRevealCount(true);

  const items = useMemo(() => {
    const titles = CATEGORIES.find((category) => category.label === active)?.titles ?? [];
    return portfolioData.skills
      .filter((group) => (titles as readonly string[]).includes(group.title))
      .flatMap((group) => group.items);
  }, [active]);

  return (
    <section id="skills" className="section">
      <RevealGroup className="stage" stagger={80}>
        <SectionHeading
          kicker="// SKILLS · 03 TEST"
          title="Technical Skills"
          text="Tools and concepts used in coursework, internship work, and personal projects — shown as working knowledge, not claimed expertise."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1" role="tablist" aria-label="Skill categories">
            {CATEGORIES.map((category, index) => {
              const selected = active === category.label;
              return (
                <RevealItem key={category.label} index={start + index}>
                  <button
                    type="button"
                    role="tab"
                    id={`skill-tab-${index}`}
                    aria-selected={selected}
                    aria-controls="skill-panel"
                    tabIndex={selected ? 0 : -1}
                    onMouseEnter={() => setActive(category.label)}
                    onFocus={() => setActive(category.label)}
                    onClick={() => setActive(category.label)}
                    onKeyDown={(event) => {
                      if (event.key !== "ArrowDown" && event.key !== "ArrowRight" && event.key !== "ArrowUp" && event.key !== "ArrowLeft") {
                        return;
                      }
                      event.preventDefault();
                      const delta = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
                      const next = (index + delta + CATEGORIES.length) % CATEGORIES.length;
                      setActive(CATEGORIES[next].label);
                      document.getElementById(`skill-tab-${next}`)?.focus();
                    }}
                    className={`card flex w-full items-center justify-between px-5 py-4 text-left transition-colors duration-300 ${
                      selected ? "border-[color-mix(in_srgb,var(--accent)_45%,var(--line))] bg-[var(--accent-dim)]" : ""
                    }`}
                    data-cursor="link"
                  >
                    <span className="font-display text-lg text-fg md:text-xl">{category.label}</span>
                    <span className="font-mono text-[11px] text-muted">{String(index + 1).padStart(2, "0")}</span>
                  </button>
                </RevealItem>
              );
            })}
          </div>
          <div role="tabpanel" id="skill-panel" aria-labelledby={`skill-tab-${CATEGORIES.findIndex((item) => item.label === active)}`}>
            <SkillPanel active={active} items={items} />
          </div>
        </div>
      </RevealGroup>
    </section>
  );
}
