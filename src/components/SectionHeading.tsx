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
        <TerminalKicker text={kicker} className="mb-6" />
      </RevealItem>
      <RevealItem as="h2" index={1} className="heading text-fg">
        {title}
      </RevealItem>
      {text ? (
        <RevealItem as="p" index={2} className="body-copy mt-5 max-w-xl text-muted">
          {text}
        </RevealItem>
      ) : null}
    </div>
  );
}
