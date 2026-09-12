"use client";

import { RevealItem } from "./Reveal";
import { TerminalKicker } from "./TerminalKicker";

export function SectionHeading({
  kicker,
  title,
  text,
}: {
  kicker: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="max-w-3xl">
      <RevealItem index={0}>
        <TerminalKicker text={kicker} className="mb-4" />
      </RevealItem>
      <RevealItem as="h2" index={1} className="heading text-3xl text-fg sm:text-4xl md:text-5xl lg:text-6xl">
        {title}
      </RevealItem>
      {text ? (
        <RevealItem as="p" index={2} className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
          {text}
        </RevealItem>
      ) : null}
    </div>
  );
}
