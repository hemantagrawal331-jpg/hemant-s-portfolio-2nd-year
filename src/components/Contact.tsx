"use client";

import { FormEvent, useState } from "react";
import { hrefFor, portfolioData } from "@/data/portfolioData";
import { MagneticButton } from "./MagneticButton";
import { RevealGroup, RevealItem } from "./Reveal";
import { TerminalKicker } from "./TerminalKicker";

export function Contact() {
  const [sent, setSent] = useState(false);
  const email = hrefFor(portfolioData.social.email, "email");
  const github = hrefFor(portfolioData.social.github);
  const linkedin = hrefFor(portfolioData.social.linkedin);
  const instagram = hrefFor(portfolioData.social.instagram);
  const phone = hrefFor(portfolioData.social.phone, "phone");
  const contactHeading = (() => {
    const words = portfolioData.contact.heading.toUpperCase().replace(/\.$/, "").split(" ");
    return [words.slice(0, 2).join(" "), words[2] ?? "", `${words.slice(3).join(" ")}.`].filter(Boolean);
  })();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) return;
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent("Portfolio inquiry");
    const name = String(data.get("name") ?? "");
    const from = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${from}\n\n${message}`);
    window.location.href = `${email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="section">
      <RevealGroup className="stage grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <RevealItem index={0}>
            <TerminalKicker text="// CONTACT" className="mb-5" />
          </RevealItem>
          <RevealItem as="h2" index={1} className="display max-w-3xl text-[clamp(2.6rem,8vw,7rem)] text-fg">
            {contactHeading.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </RevealItem>
          <RevealItem as="p" index={2} className="mt-6 max-w-md text-lg text-muted">
            Have an idea? Let&apos;s talk.
          </RevealItem>
          <RevealItem as="p" index={3} className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            {portfolioData.contact.text}
          </RevealItem>
          <RevealItem index={4} className="mt-6 flex flex-col gap-1">
            <a href={email} className="link" data-cursor="link">
              {portfolioData.social.email}
            </a>
            <a
              href={hrefFor(portfolioData.social.personalEmail, "email")}
              className="link text-sm text-muted"
              data-cursor="link"
            >
              {portfolioData.social.personalEmail}
            </a>
            {phone && (
              <a href={phone} className="link text-sm text-muted" data-cursor="link">
                {portfolioData.social.phone}
              </a>
            )}
          </RevealItem>
          <RevealItem index={5} className="mt-8 flex flex-col gap-3 sm:flex-row">
            {linkedin && (
              <MagneticButton
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-line rounded-full border border-line px-5 py-3 text-[12px] text-fg"
              >
                LinkedIn <span className="arrow">↗</span>
              </MagneticButton>
            )}
            {github && (
              <MagneticButton
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-line rounded-full border border-line px-5 py-3 text-[12px] text-fg"
              >
                GitHub <span className="arrow">↗</span>
              </MagneticButton>
            )}
            {instagram && (
              <MagneticButton
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-line rounded-full border border-line px-5 py-3 text-[12px] text-fg"
              >
                Instagram <span className="arrow">↗</span>
              </MagneticButton>
            )}
          </RevealItem>
        </div>

        <RevealItem index={6}>
          <form onSubmit={onSubmit} className="glass grid gap-3 p-6">
          <label className="grid gap-2">
            <span className="text-[12px] tracking-[0.14em] text-muted">NAME</span>
            <input
              name="name"
              required
              autoComplete="name"
              className="rounded-[var(--radius)] border border-line bg-bg/60 px-4 py-4 font-mono text-sm text-fg outline-none focus:border-[var(--accent)]"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-[12px] tracking-[0.14em] text-muted">EMAIL</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="rounded-[var(--radius)] border border-line bg-bg/60 px-4 py-4 font-mono text-sm text-fg outline-none focus:border-[var(--accent)]"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-[12px] tracking-[0.14em] text-muted">MESSAGE</span>
            <textarea
              name="message"
              required
              className="min-h-32 rounded-[var(--radius)] border border-line bg-bg/60 font-mono text-sm text-fg outline-none focus:border-[var(--accent)]"
            />
          </label>
          <MagneticButton
            type="submit"
            disabled={!email}
            className="w-full rounded-full bg-invert px-6 py-4 text-[12px] tracking-[0.16em] text-invert-fg disabled:opacity-40 sm:w-auto"
          >
            {!email ? "ADD YOUR_EMAIL TO ENABLE" : sent ? "OPENING EMAIL" : "SEND MESSAGE ↗"}
          </MagneticButton>
        </form>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
