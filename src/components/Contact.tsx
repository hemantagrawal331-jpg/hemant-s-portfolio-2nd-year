"use client";

import { FormEvent, useState } from "react";
import { hrefFor, portfolioData } from "@/data/portfolio";

export function Contact() {
  const [sent, setSent] = useState(false);
  const email = hrefFor(portfolioData.email, "email");
  const github = hrefFor(portfolioData.github);
  const linkedin = hrefFor(portfolioData.linkedin);
  const instagram = hrefFor(portfolioData.instagram);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) return;
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent("Portfolio inquiry");
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`,
    );
    window.location.href = `${email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative bg-bg py-24 md:py-32">
      <div className="stage grid items-start gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="label mb-4">{"// CONTACT"}</p>
          <h2 className="font-display max-w-xl text-4xl font-semibold tracking-tight text-fg md:text-6xl">
            {portfolioData.contact.heading}
          </h2>
          <p className="mt-6 max-w-md text-muted">{portfolioData.contact.text}</p>
          <div className="mt-6 flex flex-col gap-1">
            <a href={email} className="text-fg" data-cursor="link">
              {portfolioData.email}
            </a>
            <a
              href={hrefFor(portfolioData.personalEmail, "email")}
              className="text-sm text-muted"
              data-cursor="link"
            >
              {portfolioData.personalEmail}
            </a>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-line px-5 py-3 text-[12px] text-fg"
                data-cursor="link"
              >
                LinkedIn ↗
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-line px-5 py-3 text-[12px] text-fg"
                data-cursor="link"
              >
                GitHub ↗
              </a>
            )}
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-line px-5 py-3 text-[12px] text-fg"
                data-cursor="link"
              >
                Instagram ↗
              </a>
            )}
          </div>
        </div>

        <form onSubmit={onSubmit} className="card grid gap-3 p-6">
          <input
            name="name"
            required
            placeholder="Name"
            className="rounded-2xl border border-line bg-bg px-4 py-4 text-sm text-fg outline-none placeholder:text-muted"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="rounded-2xl border border-line bg-bg px-4 py-4 text-sm text-fg outline-none placeholder:text-muted"
          />
          <textarea
            name="message"
            required
            placeholder="Message"
            className="min-h-32 rounded-2xl border border-line bg-bg px-4 py-4 text-sm text-fg outline-none placeholder:text-muted"
          />
          <button
            type="submit"
            disabled={!email}
            className="rounded-full bg-invert px-6 py-4 text-[12px] tracking-[0.16em] text-invert-fg disabled:opacity-40"
            data-cursor="link"
          >
            {email ? (sent ? "OPENING EMAIL" : "SEND MESSAGE ↗") : "ADD YOUR_EMAIL TO ENABLE"}
          </button>
        </form>
      </div>
    </section>
  );
}
