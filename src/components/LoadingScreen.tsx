"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolioData";

export function LoadingScreen({ onComplete }: Readonly<{ onComplete: () => void }>) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let frame = 0;
    let doneTimer = 0;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      setProgress(100);
      setVisible(false);
      onComplete();
    };

    const failsafe = window.setTimeout(finish, 1800);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      doneTimer = window.setTimeout(finish, 40);
      return () => {
        window.clearTimeout(failsafe);
        window.clearTimeout(doneTimer);
      };
    }

    const started = performance.now();
    const duration = 1100;

    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        doneTimer = window.setTimeout(finish, 160);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => {
      window.clearTimeout(failsafe);
      window.clearTimeout(doneTimer);
      cancelAnimationFrame(frame);
    };
  }, [onComplete]);

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
            <p className="mt-14 font-mono text-[11px] tracking-[0.22em] text-white/35">
              INITIALIZING SYSTEM...
            </p>
            <div className="mt-4 flex w-full items-center gap-4">
              <div className="h-[3px] flex-1 overflow-hidden bg-white/12">
                <motion.div
                  className="h-full bg-white"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>
              <span className="font-mono text-[11px] tracking-[0.16em] text-white/55">
                {String(progress).padStart(3, "0")}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
