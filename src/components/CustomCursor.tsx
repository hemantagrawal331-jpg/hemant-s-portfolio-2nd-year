"use client";

import { useEffect, useRef, useState } from "react";
import { useMedia } from "@/lib/useMedia";

export function CustomCursor() {
  const coarse = useMedia("(pointer: coarse)");
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [mode, setMode] = useState<"default" | "link" | "view">("default");

  useEffect(() => {
    if (coarse || reduced) return;

    const node = dot.current;
    if (!node) return;

    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let frame = 0;

    const onMove = (event: MouseEvent) => {
      tx = event.clientX;
      ty = event.clientY;

      const target = event.target as HTMLElement | null;
      const cursor = target?.closest("[data-cursor]")?.getAttribute("data-cursor");
      if (cursor === "view") {
        setMode("view");
        setLabel("VIEW PROJECT ↗");
      } else if (cursor === "link" || target?.closest("a, button")) {
        setMode("link");
        setLabel("");
      } else {
        setMode("default");
        setLabel("");
      }
    };

    const tick = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [coarse, reduced]);

  if (coarse || reduced) return null;

  const size = mode === "view" ? 108 : mode === "link" ? 42 : 14;

  return (
    <div
      ref={dot}
      className="pointer-events-none fixed left-0 top-0 z-[80] mix-blend-difference"
      style={{ marginLeft: -size / 2, marginTop: -size / 2 }}
    >
      <div
        className="flex items-center justify-center rounded-full border border-white bg-white/10 text-center text-[9px] font-medium tracking-[0.16em] text-white transition-[width,height,background-color] duration-300 ease-cinematic"
        style={{ width: size, height: size }}
      >
        {label}
      </div>
    </div>
  );
}
