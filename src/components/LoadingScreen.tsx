"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolioData";

const BOOT_LINE = "INITIALIZING SYSTEM...";
const GLITCH = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>-_#";

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function scrambleToward(target: string, amount: number) {
  return target
    .split("")
    .map((char, index) => {
      if (char === " ") return " ";
      if (index / Math.max(target.length - 1, 1) <= amount) return char;
      return GLITCH[Math.floor(Math.random() * GLITCH.length)];
    })
    .join("");
}

export function LoadingScreen({ onComplete }: Readonly<{ onComplete: () => void }>) {
  const name = portfolioData.personal.name.toUpperCase();
  const [progress, setProgress] = useState(0);
  const [headline, setHeadline] = useState(BOOT_LINE);
  const [phase, setPhase] = useState<"boot" | "resolve" | "gone">("boot");
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    let frame = 0;
    let resolveTimer = 0;
    let finished = false;

    const exit = () => {
      if (finished) return;
      finished = true;
      setPhase("gone");
      onComplete();
    };

    const failsafe = window.setTimeout(exit, 3200);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setHeadline(name);
      setProgress(100);
      resolveTimer = window.setTimeout(exit, 40);
      return () => {
        window.clearTimeout(failsafe);
        window.clearTimeout(resolveTimer);
      };
    }

    const started = performance.now();
    const duration = 1280;

    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / duration);
      setProgress(Math.round(easeInOutCubic(t) * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }

      setProgress(100);
      setFlash(true);
      setPhase("resolve");
      window.setTimeout(() => setFlash(false), 220);

      const resolveFrom = performance.now();
      const resolveFor = 560;
      const resolveTick = (stamp: number) => {
        const rt = Math.min(1, (stamp - resolveFrom) / resolveFor);
        const reveal = rt * rt;
        setHeadline(rt === 1 ? name : scrambleToward(name, reveal));
        if (rt < 1) {
          frame = requestAnimationFrame(resolveTick);
        } else {
          resolveTimer = window.setTimeout(exit, 280);
        }
      };
      frame = requestAnimationFrame(resolveTick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      window.clearTimeout(failsafe);
      window.clearTimeout(resolveTimer);
      cancelAnimationFrame(frame);
    };
  }, [name, onComplete]);

  const resolved = phase !== "boot";

  return (
    <AnimatePresence>
      {phase !== "gone" && (
        <motion.div
          className="loader-screen fixed inset-0 z-[90] flex items-center justify-center bg-black"
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          initial={{ clipPath: "inset(0 0 0 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.62, ease: [0.76, 0, 0.24, 1] }}
        >
          {flash && <span className="loader-flash" aria-hidden />}
          <div className="relative flex w-[min(480px,84vw)] flex-col items-center text-center">
            <p
              className={`min-h-[1.1em] text-white ${
                resolved
                  ? "display text-[clamp(2rem,7vw,4rem)]"
                  : "font-mono text-[clamp(1.05rem,4vw,1.7rem)] tracking-[0.14em]"
              }`}
            >
              {headline}
              {!resolved && <span className="terminal-caret" aria-hidden />}
            </p>
            <p
              className={`mt-4 text-[11px] tracking-[0.28em] text-white/42 transition-opacity duration-300 ${
                resolved ? "opacity-100" : "opacity-0"
              }`}
            >
              CSE × AI/ML × AUTOMATION
            </p>
            <p className="mt-14 font-mono text-[11px] tracking-[0.22em] text-white/35">
              {resolved ? "SYSTEM READY" : BOOT_LINE}
            </p>
            <div className="mt-4 flex w-full items-center gap-4">
              <div className="h-[3px] flex-1 overflow-hidden bg-white/12">
                <div className="h-full bg-white" style={{ width: `${progress}%` }} />
              </div>
              <span className="font-mono text-[11px] tracking-[0.16em] text-white/55">
                {String(progress).padStart(3, "0")}%
              </span>
            </div>
            <p className="mt-5 font-mono text-[10px] tracking-[0.2em] text-white/28">
              {portfolioData.personal.loaderLine}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
