"use client";

import { useMemo, useState } from "react";
import { useMedia } from "@/lib/useMedia";

const NODES = [
  { id: "center", x: 180, y: 150, label: "HEMANT", sub: "SYSTEM", r: 34 },
  { id: "aiml", x: 68, y: 58, label: "AI / ML", sub: "", r: 8 },
  { id: "auto", x: 292, y: 64, label: "AUTOMATION", sub: "", r: 8 },
  { id: "quality", x: 180, y: 262, label: "SOFTWARE QUALITY", sub: "", r: 8 },
] as const;

export function HeroNetwork() {
  const coarse = useMedia("(pointer: coarse)");
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const [active, setActive] = useState<string | null>(null);
  const [cursor, setCursor] = useState({ x: 180, y: 150 });

  const paths = useMemo(
    () => [
      { id: "a", d: "M68 58 L180 150" },
      { id: "b", d: "M292 64 L180 150" },
      { id: "c", d: "M180 262 L180 150" },
    ],
    [],
  );

  return (
    <div
      className="relative mx-auto w-full max-w-[380px] lg:ml-auto lg:max-w-none"
      aria-hidden
      onMouseLeave={() => setActive(null)}
      onMouseMove={(event) => {
        if (coarse || reduced) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 360;
        const y = ((event.clientY - rect.top) / rect.height) * 300;
        setCursor({ x, y });
        const nearest = NODES.reduce(
          (best, node) => {
            const dist = Math.hypot(node.x - x, node.y - y);
            return dist < best.dist ? { id: node.id, dist } : best;
          },
          { id: "", dist: 64 },
        );
        setActive(nearest.id || null);
      }}
    >
      <svg viewBox="0 0 360 300" className="h-auto w-full text-ink">
        <defs>
          <linearGradient id="edge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.08" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.42" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        <circle cx="180" cy="150" r="98" fill="none" stroke="currentColor" strokeOpacity="0.05" />
        <circle cx="180" cy="150" r="68" fill="none" stroke="currentColor" strokeOpacity="0.045" />
        <circle
          cx="180"
          cy="150"
          r="68"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.06"
          strokeDasharray="2 10"
          className={reduced ? undefined : "orbit-spin"}
        />

        {paths.map((path) => (
          <path
            key={path.id}
            d={path.d}
            fill="none"
            stroke="url(#edge)"
            strokeWidth={active ? 1.45 : 1.1}
            className="network-path"
            opacity={active ? 0.95 : 0.7}
          />
        ))}

        {!reduced && (
          <>
            <circle r="2" fill="currentColor">
              <animateMotion dur="7.5s" repeatCount="indefinite" path="M68 58 L180 150" />
            </circle>
            <circle r="1.6" fill="currentColor">
              <animateMotion dur="9s" repeatCount="indefinite" path="M292 64 L180 150" />
            </circle>
            <circle r="1.8" fill="currentColor">
              <animateMotion dur="8s" repeatCount="indefinite" path="M180 262 L180 150" />
            </circle>
          </>
        )}

        {NODES.map((node) => {
          const hot = active === node.id;
          const isCenter = node.id === "center";
          return (
            <g key={node.id} className="transition-opacity duration-300" opacity={hot || !active ? 1 : 0.55}>
              <circle
                cx={node.x}
                cy={node.y}
                r={hot ? node.r + 3 : node.r}
                fill="none"
                stroke="currentColor"
                strokeWidth={isCenter ? 1.3 : 1.05}
              />
              {isCenter && <circle className="node-pulse" cx={node.x} cy={node.y} r={node.r} fill="none" stroke="currentColor" />}
              <circle cx={node.x} cy={node.y} r={isCenter ? 3.4 : 2.2} fill="currentColor" />
              <text
                x={node.x}
                y={isCenter ? node.y - 6 : node.y - 16}
                textAnchor="middle"
                fontSize={isCenter ? 8 : 8}
                letterSpacing="1.6"
                fill="currentColor"
                opacity={hot ? 1 : 0.72}
              >
                {node.label}
              </text>
              {node.sub && (
                <text
                  x={node.x}
                  y={node.y + 8}
                  textAnchor="middle"
                  fontSize="7"
                  letterSpacing="1.8"
                  fill="currentColor"
                  opacity="0.55"
                >
                  {node.sub}
                </text>
              )}
            </g>
          );
        })}

        {!coarse && !reduced && (
          <circle cx={cursor.x} cy={cursor.y} r="10" fill="none" stroke="currentColor" strokeOpacity="0.12" />
        )}
      </svg>
    </div>
  );
}
