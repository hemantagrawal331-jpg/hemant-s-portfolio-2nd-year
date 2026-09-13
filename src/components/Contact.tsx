"use client";

import { FormEvent, useState } from "react";
import { hrefFor, portfolioData } from "@/data/portfolioData";
import { validateContactInput } from "@/lib/contactForm";
import { MagneticButton } from "./MagneticButton";
import { RevealGroup, RevealItem } from "./Reveal";
import { TerminalKicker } from "./TerminalKicker";

type FormStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");
  const email = hrefFor(portfolioData.social.email, "email");
  const github = hrefFor(portfolioData.social.github);
  const linkedin = hrefFor(portfolioData.social.linkedin);
  const instagram = hrefFor(portfolioData.social.instagram);
  const phone = hrefFor(portfolioData.social.phone, "phone");
  const contactHeading = (() => {
    const words = portfolioData.contact.heading.toUpperCase().replace(/\.$/, "").split(" ");
    return [words.slice(0, 2).join(" "), words[2] ?? "", `${words.slice(3).join(" ")}.`].filter(Boolean);
  })();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const field = (key: string) => {
      const value = data.get(key);
      return typeof value === "string" ? value : "";
    };
    const payload = {
      name: field("name"),
      email: field("email"),
      message: field("message"),
      website: field("website"),
    };

    const invalid = validateContactInput(payload);
    if (invalid) {
      setStatus("error");
      setError(invalid);
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

      if (!response.ok || !result?.ok) {
        setStatus("error");
        setError(result?.error || "Could not send the message. Try again.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Could not send the message. Try again.");
    }
  };

  return (
    <section id="contact" className="section">
      <RevealGroup className="stage grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <RevealItem index={0}>
            <TerminalKicker text="// CONTACT" className="mb-5" />
          </RevealItem>
          <RevealItem as="h2" index={1} className="display max-w-3xl text-fg">
            {contactHeading.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </RevealItem>
          <RevealItem as="p" index={2} className="lede mt-6 max-w-md text-muted">
            Have an idea? Let&apos;s talk.
          </RevealItem>
          <RevealItem as="p" index={3} className="body-copy mt-3 max-w-md text-muted">
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
          <form
            onSubmit={onSubmit}
            noValidate
            className="relative glass grid gap-3 p-6"
            aria-busy={status === "loading"}
          >
            <label className="grid gap-2">
              <span className="text-[12px] tracking-[0.14em] text-muted">NAME</span>
              <input
                name="name"
                required
                minLength={2}
                maxLength={80}
                autoComplete="name"
                disabled={status === "loading"}
                onChange={() => status !== "idle" && setStatus("idle")}
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
                disabled={status === "loading"}
                onChange={() => status !== "idle" && setStatus("idle")}
                className="rounded-[var(--radius)] border border-line bg-bg/60 px-4 py-4 font-mono text-sm text-fg outline-none focus:border-[var(--accent)]"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-[12px] tracking-[0.14em] text-muted">MESSAGE</span>
              <textarea
                name="message"
                required
                minLength={10}
                maxLength={2000}
                disabled={status === "loading"}
                onChange={() => status !== "idle" && setStatus("idle")}
                className="min-h-32 rounded-[var(--radius)] border border-line bg-bg/60 font-mono text-sm text-fg outline-none focus:border-[var(--accent)]"
              />
            </label>
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
              <label>
                Website
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            {status === "error" && error ? (
              <p className="text-sm text-muted" role="alert">
                {error}
              </p>
            ) : null}
            {status === "success" ? (
              <p className="text-sm text-fg" role="status">
                Message sent.
              </p>
            ) : null}
            <MagneticButton
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-full bg-invert px-6 py-4 text-[12px] tracking-[0.16em] text-invert-fg disabled:opacity-40 sm:w-auto"
            >
              {status === "loading" ? "SENDING…" : null}
              {status === "success" ? "MESSAGE SENT" : null}
              {status === "idle" || status === "error" ? "SEND MESSAGE ↗" : null}
            </MagneticButton>
          </form>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
