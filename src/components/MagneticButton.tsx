"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
};

export function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  strength = 18,
}: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.3 });
  const linkRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onMove = (event: React.MouseEvent<HTMLElement>) => {
    const node = href ? linkRef.current : buttonRef.current;
    if (!node || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = node.getBoundingClientRect();
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * strength);
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (href) {
    return (
      <motion.a
        ref={linkRef}
        href={href}
        onClick={onClick}
        className={className}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ x: springX, y: springY }}
        data-cursor="link"
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: springX, y: springY }}
      data-cursor="link"
    >
      {children}
    </motion.button>
  );
}
