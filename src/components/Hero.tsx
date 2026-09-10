"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { hrefFor, portfolioData } from "@/data/portfolio";
import { HeroNetwork } from "./HeroNetwork";

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setRoleIndex((value) => (value + 1) % portfolioData.rotatingRoles.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  const socials = [
    { href: hrefFor(portfolioData.github), label: "GitHub", icon: Github },
    { href: hrefFor(portfolioData.linkedin), label: "LinkedIn", icon: Linkedin },
    { href: hrefFor(portfolioData.instagram), label: "Instagram", icon: Instagram },
    { href: hrefFor(portfolioData.email, "email"), label: "Email", icon: Mail },
  ];

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-paper text-hero-fg">
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.55),transparent_58%)]" />

      <div className="stage relative flex min-h-[100svh] flex-col justify-end pb-8 pt-24 lg:justify-center lg:pb-0">
        <div className="relative z-10 flex flex-col gap-8 lg:grid lg:grid-cols-[1.05fr_0.7fr_1fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="mb-3 text-[12px] tracking-[0.18em] text-ink/45">
              {portfolioData.eyebrow.toUpperCase()}
            </p>
            <p className="mb-4 text-[11px] tracking-[0.16em] text-ink/40">
              AI/ML STUDENT · QA AUTOMATION ENGINEER · SOFTWARE DEVELOPER
            </p>
            <div className="relative min-h-[2.4em] overflow-visible">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={portfolioData.rotatingRoles[roleIndex]}
                  className="display w-full text-[clamp(2.2rem,5vw,3.6rem)] leading-[0.95] text-ink"
                  initial={{ y: 18, opacity: 0, filter: "blur(8px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -18, opacity: 0, filter: "blur(8px)" }}
                  transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
                >
                  {portfolioData.rotatingRoles[roleIndex]}
                </motion.h1>
              </AnimatePresence>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/55">{portfolioData.heroLine}</p>
          </div>

          <div className="relative mx-auto w-[min(420px,78vw)] lg:hidden">
            <Portrait roleIndex={roleIndex} />
          </div>

          <div className="hidden lg:block" />

          <div className="relative z-10 max-w-sm lg:ml-auto lg:text-right">
            <p className="text-sm leading-relaxed text-ink/55">{portfolioData.heroDescription}</p>
            <div className="mt-6 hidden lg:block">
              <HeroNetwork />
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:justify-end">
              <a
                href="#work"
                className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-[12px] text-white"
                data-cursor="link"
              >
                View My Work ↗
              </a>
              <a
                href={portfolioData.resume}
                download="Hemant_Agrawal_Resume.docx"
                className="inline-flex items-center justify-center rounded-full border border-ink/15 px-5 py-3 text-[12px] text-ink"
                data-cursor="link"
              >
                Download Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-ink/15 px-5 py-3 text-[12px] text-ink"
                data-cursor="link"
              >
                Contact Me
              </a>
            </div>
            <div className="mt-5 flex gap-3 lg:justify-end">
              {socials.map(({ href, label, icon: Icon }) =>
                href ? (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target={label === "Email" ? undefined : "_blank"}
                    rel={label === "Email" ? undefined : "noreferrer"}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink"
                    data-cursor="link"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ) : (
                  <span
                    key={label}
                    title={`${label} placeholder — add it in portfolio.ts`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink/30"
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-0 left-1/2 hidden w-[min(640px,48vw)] -translate-x-1/2 lg:block"
        key={`desk-${roleIndex}`}
        initial={{ opacity: 0.75, scale: 1.04, x: "-50%" }}
        animate={{ opacity: 1, scale: 1, x: "-50%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Portrait roleIndex={roleIndex} staticImage />
      </motion.div>

      <a
        href="#about"
        className="absolute bottom-5 left-[max(14px,calc((100%-1320px)/2+20px))] z-10 text-[11px] tracking-[0.18em] text-ink/40"
        data-cursor="link"
      >
        SCROLL TO DISCOVER
      </a>
    </section>
  );
}

function Portrait({
  roleIndex,
  staticImage = false,
}: {
  roleIndex: number;
  staticImage?: boolean;
}) {
  const image = (
    <div className="portrait-fade">
      <Image
        src="/images/hero-portrait.png"
        alt={`${portfolioData.name} portrait`}
        width={980}
        height={1220}
        priority
        className="h-auto w-full object-contain object-bottom"
      />
    </div>
  );

  if (staticImage) return image;

  return (
    <motion.div
      key={roleIndex}
      initial={{ opacity: 0.8, scale: 1.03 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
    >
      {image}
    </motion.div>
  );
}
