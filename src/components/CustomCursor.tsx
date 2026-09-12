"use client";

import { useEffect, useRef, useState } from "react";

type CursorMode = "default" | "interactive" | "link" | "project" | "image" | "hidden";

const LABELS: Partial<Record<CursorMode, string>> = {
  link: "VIEW ↗",
  project: "OPEN",
  image: "VIEW CASE",
};

function useDesktopCursor() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let touched = false;

    const update = () => {
      if (touched) {
        setEnabled(false);
        return;
      }
      const fine = window.matchMedia("(pointer: fine)").matches;
      const hover = window.matchMedia("(hover: hover)").matches;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const mobile = window.matchMedia("(max-width: 768px)").matches;
      setEnabled(fine && hover && !reduced && !mobile);
    };

    update();
    const queries = [
      window.matchMedia("(pointer: fine)"),
      window.matchMedia("(hover: hover)"),
      window.matchMedia("(prefers-reduced-motion: reduce)"),
      window.matchMedia("(max-width: 768px)"),
    ];
    queries.forEach((query) => query.addEventListener("change", update));

    const onTouch = () => {
      touched = true;
      setEnabled(false);
    };
    window.addEventListener("touchstart", onTouch, { passive: true });

    return () => {
      queries.forEach((query) => query.removeEventListener("change", update));
      window.removeEventListener("touchstart", onTouch);
    };
  }, []);

  return enabled;
}

function modeFromTarget(target: EventTarget | null): CursorMode {
  const node = target instanceof Element ? target : null;
  if (!node) return "default";
  if (node.closest("input, textarea, select, [contenteditable='true']")) return "hidden";

  const tagged = node.closest("[data-cursor]") as HTMLElement | null;
  const kind = tagged?.dataset.cursor;
  if (kind === "image" || kind === "project" || kind === "link") return kind;
  if (node.closest("a[href]")) return "link";
  if (node.closest("button, [role='button'], [role='tab']")) return "interactive";
  return "default";
}

export function CustomCursor() {
  const enabled = useDesktopCursor();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const chip = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<CursorMode>("default");

  useEffect(() => {
    document.body.classList.toggle("has-custom-cursor", enabled);
    return () => document.body.classList.remove("has-custom-cursor");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const dotNode = dot.current;
    const ringNode = ring.current;
    const chipNode = chip.current;
    if (!dotNode || !ringNode || !chipNode) return;

    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;
    let lx = 0;
    let ly = 0;
    let tx = 0;
    let ty = 0;
    let frame = 0;
    let visible = false;
    let primed = false;
    let current: CursorMode = "default";

    const show = () => {
      if (visible) return;
      visible = true;
    };

    const hide = () => {
      visible = false;
      dotNode.style.opacity = "0";
      ringNode.style.opacity = "0";
      chipNode.style.opacity = "0";
    };

    const applyMode = (next: CursorMode) => {
      if (next === current) return;
      current = next;
      setMode(next);
    };

    const onMove = (event: MouseEvent) => {
      tx = event.clientX;
      ty = event.clientY;
      if (!primed) {
        x = y = rx = ry = lx = ly = tx;
        primed = true;
      }
      const next = modeFromTarget(event.target);
      applyMode(next);
      if (next === "hidden") {
        hide();
        return;
      }
      show();
    };

    const tick = () => {
      x += (tx - x) * 0.36;
      y += (ty - y) * 0.36;
      rx += (tx - rx) * 0.14;
      ry += (ty - ry) * 0.14;
      lx += (tx + 16 - lx) * 0.12;
      ly += (ty + 12 - ly) * 0.12;

      const on = visible && current !== "hidden";
      const labeled = Boolean(LABELS[current]);
      dotNode.style.opacity = on ? "1" : "0";
      ringNode.style.opacity = on && !labeled ? "1" : "0";
      chipNode.style.opacity = on && labeled ? "1" : "0";
      dotNode.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ringNode.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      chipNode.style.transform = `translate3d(${lx}px, ${ly}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);
    document.documentElement.addEventListener("mouseenter", show);
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", hide);
      document.documentElement.removeEventListener("mouseenter", show);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={ring} className={`cursor-ring${mode === "interactive" ? " is-interactive" : ""}`} aria-hidden />
      <div ref={chip} className="cursor-chip" aria-hidden>
        {LABELS[mode] ?? ""}
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}
