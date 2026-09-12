"use client";

import { useEffect, useRef } from "react";
import { useMedia } from "@/lib/useMedia";

const DOT_COUNT = 28;

export function SiteAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useMedia("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dots = Array.from({ length: DOT_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00018,
      vy: (Math.random() - 0.5) * 0.00014,
      r: Math.random() * 1.1 + 0.5,
    }));

    let frame = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const tick = () => {
      if (document.hidden) {
        frame = requestAnimationFrame(tick);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      const styles = getComputedStyle(document.documentElement);
      ctx.fillStyle = styles.getPropertyValue("--fg").trim() || "#f4f4f5";

      for (const dot of dots) {
        dot.x += dot.vx;
        dot.y += dot.vy;
        if (dot.x < 0 || dot.x > 1) dot.vx *= -1;
        if (dot.y < 0 || dot.y > 1) dot.vy *= -1;
        ctx.globalAlpha = 0.09;
        ctx.beginPath();
        ctx.arc(dot.x * width, dot.y * height, dot.r, 0, Math.PI * 2);
        ctx.fill();
      }

      frame = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <div className="site-atmosphere pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="mesh-field" aria-hidden>
        <span className="mesh-blob mesh-a" />
        <span className="mesh-blob mesh-b" />
      </div>
      <div className="tech-grid tech-grid-shift absolute inset-0" />
      {!reduced && <canvas ref={canvasRef} className="absolute inset-0" role="presentation" />}
      <div className="grain absolute inset-0" />
    </div>
  );
}
