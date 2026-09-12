"use client";

import { useEffect, useRef, useState } from "react";
import { useMedia } from "@/lib/useMedia";

export function CustomCursor() {
  const coarse = useMedia("(pointer: coarse)");
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [mode, setMode] = useState<"default" | "link" | "view">("default");

  useEffect(() => {
    if (coarse || reduced) return;

    const dotNode = dot.current;
    const ringNode = ring.current;
    if (!dotNode || !ringNode) return;

    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;
    let tx = 0;
    let ty = 0;
    let frame = 0;
    let visible = false;
    let primed = false;

    const show = () => {
      if (visible) return;
      visible = true;
      dotNode.style.opacity = "1";
      ringNode.style.opacity = "1";
    };

    const hide = () => {
      visible = false;
      dotNode.style.opacity = "0";
      ringNode.style.opacity = "0";
    };

    const onMove = (event: MouseEvent) => {
      tx = event.clientX;
      ty = event.clientY;
      if (!primed) {
        x = y = rx = ry = tx;
        primed = true;
      }
      show();

      const target = event.target as HTMLElement | null;
      const cursor = (target?.closest("[data-cursor]") as HTMLElement | null)?.dataset.cursor;
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
      x += (tx - x) * 0.48;
      y += (ty - y) * 0.48;
      rx += (tx - rx) * 0.13;
      ry += (ty - ry) * 0.13;
      dotNode.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ringNode.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", hide);
    document.documentElement.addEventListener("mouseenter", show);
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", hide);
      document.documentElement.removeEventListener("mouseenter", show);
      cancelAnimationFrame(frame);
    };
  }, [coarse, reduced]);

  if (coarse || reduced) return null;

  const ringSize = mode === "view" ? 108 : mode === "link" ? 44 : 28;
  const ringFace = mode === "default" ? "" : `is-${mode}`;

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden>
        <div className={`cursor-ring-face ${ringFace}`} style={{ width: ringSize, height: ringSize }}>
          {label}
        </div>
      </div>
      <div ref={dot} className={`cursor-dot ${mode === "view" ? "is-view" : ""}`} aria-hidden />
    </>
  );
}
