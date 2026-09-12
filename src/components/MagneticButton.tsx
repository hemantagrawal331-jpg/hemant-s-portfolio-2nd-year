"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { useMedia } from "@/lib/useMedia";

type Props = {
  children: ReactNode;
  className?: string;
  href?: string;
  download?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  strength?: number;
  radius?: number;
};

export function MagneticButton({
  children,
  className = "",
  href,
  download,
  target,
  rel,
  type = "button",
  disabled,
  onClick,
  strength = 14,
  radius = 88,
}: Props) {
  const coarse = useMedia("(pointer: coarse)");
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const magnetic = !coarse && !reduced && !disabled;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 340, damping: 22, mass: 0.28 });
  const springY = useSpring(y, { stiffness: 340, damping: 22, mass: 0.28 });
  const linkRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!magnetic) {
      x.set(0);
      y.set(0);
      return;
    }

    const node = href ? linkRef.current : buttonRef.current;
    if (!node) return;

    const onMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const distance = Math.hypot(dx, dy);

      if (distance >= radius) {
        x.set(0);
        y.set(0);
        return;
      }

      const falloff = 1 - distance / radius;
      x.set(dx * (strength / radius) * falloff * 2.2);
      y.set(dy * (strength / radius) * falloff * 2.2);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [href, magnetic, radius, strength, x, y]);

  const shared = {
    className,
    onClick,
    style: magnetic ? { x: springX, y: springY } : undefined,
    "data-cursor": "link" as const,
  };

  if (href) {
    return (
      <motion.a
        ref={linkRef}
        href={href}
        download={download}
        target={target}
        rel={rel}
        {...shared}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button ref={buttonRef} type={type} disabled={disabled} {...shared}>
      {children}
    </motion.button>
  );
}
