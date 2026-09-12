"use client";

import { useTypedLine } from "@/lib/useTypedLine";
import { useRevealVisible } from "./Reveal";

export function TerminalKicker({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const visible = useRevealVisible();
  const typed = useTypedLine(text, visible);

  return (
    <p className={`label font-mono ${className}`} aria-label={text}>
      <span aria-hidden>{typed}</span>
      <span className="terminal-caret" aria-hidden />
    </p>
  );
}
