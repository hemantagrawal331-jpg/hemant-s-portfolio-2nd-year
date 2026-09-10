"use client";

import { useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useMedia } from "./useMedia";

export function usePointerParallax(strength = 10) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 90, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 90, damping: 22, mass: 0.4 });
  const coarse = useMedia("(pointer: coarse)");
  const reduced = useMedia("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (coarse || reduced) return;

    const onMove = (event: MouseEvent) => {
      const nx = (event.clientX / window.innerWidth - 0.5) * 2;
      const ny = (event.clientY / window.innerHeight - 0.5) * 2;
      x.set(nx * strength);
      y.set(ny * strength);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [coarse, reduced, strength, x, y]);

  return { x: springX, y: springY, disabled: coarse || reduced };
}
