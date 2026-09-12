"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { portfolioData } from "@/data/portfolioData";

const SEEN_KEY = "ha-boot-seen";
const LINES = [
  "INITIALIZING SYSTEM...",
  ...portfolioData.personal.loaderSteps.map((step) => `${step.index}  ${step.label}`),
  portfolioData.personal.loaderLine,
];
const GAPS = [280, 430, 190, 520, 240, 460, 310];
const END_PAUSE = 640;

export function LoadingScreen({ onComplete }: Readonly<{ onComplete: () => void }>) {
  const [visible, setVisible] = useState(true);
  const [resolved, setResolved] = useState(0);
  const [canSkip, setCanSkip] = useState(false);
  const finished = useRef(false);
  const timers = useRef<number[]>([]);

  const lines = useMemo(() => LINES, []);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    setResolved(lines.length);
    setVisible(false);
    try {
      window.localStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore quota / private mode */
    }
    onComplete();
  }, [lines.length, onComplete]);

  useEffect(() => {
    let seen = false;
    try {
      seen = window.localStorage.getItem(SEEN_KEY) === "1";
    } catch {
      seen = false;
    }
    setCanSkip(seen);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const id = window.setTimeout(finish, 40);
      timers.current.push(id);
      return () => window.clearTimeout(id);
    }

    let elapsed = 0;
    lines.forEach((_, index) => {
      elapsed += GAPS[index] ?? 300;
      const id = window.setTimeout(() => setResolved(index + 1), elapsed);
      timers.current.push(id);
    });

    const endId = window.setTimeout(finish, elapsed + END_PAUSE);
    timers.current.push(endId);

    return () => {
      timers.current.forEach((id) => window.clearTimeout(id));
      timers.current = [];
    };
  }, [finish, lines]);

  useEffect(() => {
    if (!canSkip) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [canSkip, finish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black"
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0.4 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex w-[min(440px,84vw)] flex-col items-center text-center">
            <motion.p
              className="display text-[clamp(2rem,7vw,4rem)] text-white"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {portfolioData.personal.name.toUpperCase()}
            </motion.p>
            <p className="mt-4 text-[11px] tracking-[0.28em] text-white/42">
              CSE × AI/ML × AUTOMATION
            </p>
            <ul className="mt-12 w-full space-y-2 text-left font-mono text-[11px] tracking-[0.16em] text-white/70">
              {lines.slice(0, resolved).map((line) => (
                <li key={line} className="flex items-center justify-between gap-4">
                  <span>{line}</span>
                  <span className="text-white/35">ok</span>
                </li>
              ))}
              {resolved < lines.length ? (
                <li className="flex h-4 items-center">
                  <span className="terminal-caret" aria-hidden />
                </li>
              ) : null}
            </ul>
          </div>
          {canSkip && (
            <button
              type="button"
              onClick={finish}
              className="absolute bottom-6 right-6 font-mono text-[11px] tracking-[0.18em] text-white/45 transition-colors hover:text-white"
            >
              SKIP ↵
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
