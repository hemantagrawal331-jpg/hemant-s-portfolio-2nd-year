"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolio";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(1);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setProgress(100);
      const done = window.setTimeout(() => {
        setVisible(false);
        onComplete();
      }, 160);
      return () => window.clearTimeout(done);
    }

    const started = performance.now();
    const duration = 1400;
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.max(1, Math.round(eased * 100)));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => {
          setVisible(false);
          onComplete();
        }, 220);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex w-[min(420px,80vw)] flex-col items-center text-center">
            <motion.p
              className="display text-[clamp(1.8rem,6vw,3.4rem)] text-white"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {portfolioData.name.replace(" ", "").toUpperCase()}
            </motion.p>
            <p className="mt-3 text-[11px] tracking-[0.28em] text-white/40">
              AI & ML · QA AUTOMATION
            </p>
            <p className="mt-14 font-display text-5xl font-semibold tracking-tight text-white md:text-6xl">
              {progress}%
            </p>
            <div className="mt-8 h-[2px] w-full overflow-hidden bg-white/15">
              <motion.div
                className="h-full bg-white"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.12, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
