"use client";

import {
  createContext,
  useContext,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { useInViewReveal } from "@/lib/useInViewReveal";

const RevealVisibleContext = createContext(true);

export function useRevealVisible() {
  return useContext(RevealVisibleContext);
}

export function headingRevealCount(hasText: boolean) {
  return hasText ? 3 : 2;
}

export function RevealGroup({
  children,
  className = "",
  stagger = 80,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const { ref, visible } = useInViewReveal();

  return (
    <RevealVisibleContext.Provider value={visible}>
      <div
        ref={ref}
        className={`reveal-group ${visible ? "is-visible" : ""} ${className}`}
        style={{ "--reveal-stagger": `${stagger}ms` } as CSSProperties}
      >
        {children}
      </div>
    </RevealVisibleContext.Provider>
  );
}

export function RevealItem({
  children,
  className = "",
  index = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  index?: number;
  as?: ElementType;
}) {
  return (
    <Tag className={`reveal-item ${className}`} style={{ "--reveal-i": index } as CSSProperties}>
      {children}
    </Tag>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <RevealGroup className={className} stagger={80}>
      <RevealItem index={Math.round(delay / 0.08)}>{children}</RevealItem>
    </RevealGroup>
  );
}
