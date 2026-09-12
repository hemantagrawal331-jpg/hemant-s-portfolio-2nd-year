"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const SECTIONS = ["top", "about", "experience", "skills", "work", "education", "resume", "contact"] as const;

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.25 });
  const [index, setIndex] = useState(1);

  useEffect(() => {
    const nodes = SECTIONS.map((id) => document.getElementById(id)).filter(
      (node): node is HTMLElement => Boolean(node),
    );
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const next = SECTIONS.indexOf(visible.target.id as (typeof SECTIONS)[number]);
        if (next >= 0) setIndex(next + 1);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0.12, 0.3] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[70]">
      <motion.div
        className="h-[2px] origin-left bg-[var(--accent)]"
        style={{ scaleX }}
        aria-hidden
      />
      <p className="absolute right-[max(14px,calc((100%-1320px)/2))] top-3 hidden font-mono text-[10px] tracking-[0.18em] text-muted md:block">
        {String(index).padStart(2, "0")} / {String(SECTIONS.length).padStart(2, "0")}
      </p>
    </div>
  );
}
