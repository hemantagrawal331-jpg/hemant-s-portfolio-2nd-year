"use client";

import { FormEvent, useState } from "react";
import { hrefFor, portfolioData } from "@/data/portfolioData";

export function Contact() {
  const [sent, setSent] = useState(false);
  const email = hrefFor(portfolioData.social.email, "email");
  const github = hrefFor(portfolioData.social.github);
  const linkedin = hrefFor(portfolioData.social.linkedin);
  const instagram = hrefFor(portfolioData.social.instagram);
  const phone = hrefFor(portfolioData.social.phone, "phone");

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
    <section id="contact" className="section bg-bg">
      <div className="stage grid items-start gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="label mb-4">{"// CONTACT"}</p>
          <h2 className="heading max-w-xl text-3xl text-fg sm:text-4xl md:text-5xl lg:text-6xl">
            {portfolioData.contact.heading}
          </h2>
          <p className="mt-6 max-w-md text-muted">{portfolioData.contact.text}</p>
          <div className="mt-6 flex flex-col gap-1">
            <a href={email} className="text-fg" data-cursor="link">
              {portfolioData.social.email}
            </a>
            <a
              href={hrefFor(portfolioData.social.personalEmail, "email")}
              className="text-sm text-muted"
              data-cursor="link"
            >
              {portfolioData.social.personalEmail}
            </a>
            {phone && (
              <a href={phone} className="text-sm text-muted" data-cursor="link">
                {portfolioData.social.phone}
              </a>
            )}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-line rounded-full border border-line px-5 py-3 text-[12px] text-fg"
                data-cursor="link"
              >
                LinkedIn <span className="arrow">↗</span>
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-line rounded-full border border-line px-5 py-3 text-[12px] text-fg"
                data-cursor="link"
              >
                GitHub <span className="arrow">↗</span>
              </a>
            )}
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-line rounded-full border border-line px-5 py-3 text-[12px] text-fg"
                data-cursor="link"
              >
                Instagram <span className="arrow">↗</span>
              </a>
            )}
          </div>
        </div>

        <form onSubmit={onSubmit} className="glass grid gap-3 p-6">
          <label className="grid gap-2">
            <span className="text-[12px] tracking-[0.14em] text-muted">NAME</span>
            <input
              name="name"
              required
              autoComplete="name"
              className="rounded-2xl border border-line bg-bg/60 px-4 py-4 text-sm text-fg outline-none focus:border-[var(--accent)]"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-[12px] tracking-[0.14em] text-muted">EMAIL</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="rounded-2xl border border-line bg-bg/60 px-4 py-4 text-sm text-fg outline-none focus:border-[var(--accent)]"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-[12px] tracking-[0.14em] text-muted">MESSAGE</span>
            <textarea
              name="message"
              required
              className="min-h-32 rounded-2xl border border-line bg-bg/60 px-4 py-4 text-sm text-fg outline-none focus:border-[var(--accent)]"
            />
          </label>
          <button
            type="submit"
            disabled={!email}
            className="w-full rounded-full bg-invert px-6 py-4 text-[12px] tracking-[0.16em] text-invert-fg disabled:opacity-40 sm:w-auto"
            data-cursor="link"
          >
            {!email ? "ADD YOUR_EMAIL TO ENABLE" : sent ? "OPENING EMAIL" : "SEND MESSAGE ↗"}
          </button>
        </form>
      </div>
    </section>
  );
}
