"use client";

import { useGSAP } from "@gsap/react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { hrefFor, portfolioData } from "@/data/portfolioData";
import { usePointerParallax } from "@/lib/usePointerParallax";
import { HeroNetwork } from "./HeroNetwork";
import { MagneticButton } from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

function headlineBlocks(lines: readonly string[]) {
  return lines.map((line) => {
    const text = line.toUpperCase();
    if (text.startsWith("I BUILD")) return ["I BUILD", "INTELLIGENT", "SYSTEMS."];
    if (text.startsWith("AUTOMATE")) return ["AUTOMATE QUALITY."];
    if (text.startsWith("SOLVE")) return ["SOLVE REAL", "PROBLEMS."];
    return [text];
  });
}

export function Hero({ ready }: { ready: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const grid = usePointerParallax(6);
  const network = usePointerParallax(10);
  const text = usePointerParallax(4);

  const socials = [
    { href: hrefFor(portfolioData.social.github), label: "GitHub", icon: Github },
    { href: hrefFor(portfolioData.social.linkedin), label: "LinkedIn", icon: Linkedin },
    { href: hrefFor(portfolioData.social.instagram), label: "Instagram", icon: Instagram },
    { href: hrefFor(portfolioData.social.email, "email"), label: "Email", icon: Mail },
  ];

  useGSAP(
    () => {
      if (!ready || reduce || !sectionRef.current) return;
      gsap.to(sectionRef.current, {
        opacity: 0.28,
        y: -36,
        scale: 0.985,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { dependencies: [ready, reduce] },
  );

  const show = ready || reduce;
  const roles = portfolioData.personal.rotatingRoles;
  const headlines = headlineBlocks(portfolioData.personal.heroHeadline);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (reduce || roles.length < 2) return;
    const timer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, [reduce, roles.length]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-paper text-hero-fg"
    >
      <motion.div
        className="tech-grid pointer-events-none absolute inset-0 opacity-50"
        style={{ x: grid.x, y: grid.y }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(255,255,255,0.42),transparent_58%)]" />

      <div className="stage relative flex min-h-[calc(100svh-4.5rem)] flex-col justify-end pb-8 pt-10 lg:min-h-[calc(100svh-4.5rem)] lg:justify-center lg:pb-0">
        <div className="relative z-10 flex flex-col gap-10 lg:grid lg:grid-cols-[1.15fr_0.7fr_0.95fr] lg:items-center">
          <motion.div className="max-w-2xl" style={{ x: text.x, y: text.y }}>
            <p className="mb-3 text-[13px] tracking-[0.08em] text-ink/50">
              {portfolioData.personal.eyebrow}
            </p>
            <p className="mb-5 h-5 overflow-hidden font-mono text-[11px] tracking-[0.18em] text-ink/55">
              <motion.span
                key={roles[roleIndex]}
                className="block"
                initial={reduce ? false : { y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {roles[roleIndex]}
              </motion.span>
            </p>
            <h1 className="display w-full text-[clamp(2.05rem,5vw,4.15rem)] text-ink">
              {headlines.map((block, blockIndex) => (
                <span key={block.join(" ")} className={blockIndex > 0 ? "mt-3 block" : "block"}>
                  {block.map((line, lineIndex) => (
                    <span key={line} className="block overflow-hidden">
                      <motion.span
                        className="block"
                        initial={reduce ? false : { y: "110%" }}
                        animate={show ? { y: "0%" } : { y: "110%" }}
                        transition={{
                          duration: 0.85,
                          delay: 0.08 + blockIndex * 0.22 + lineIndex * 0.07,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        {line}
                      </motion.span>
                    </span>
                  ))}
                </span>
              ))}
            </h1>
            <p className="mt-5 font-display text-lg tracking-tight text-ink/78 md:text-xl">
              {portfolioData.personal.heroLine}
            </p>
            <motion.p
              className="mt-4 max-w-xl text-sm leading-relaxed text-ink/62 md:text-base"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
            >
              {portfolioData.personal.heroDescription}
            </motion.p>
          </motion.div>

          <motion.div
            className="relative mx-auto h-[min(46vh,360px)] w-auto lg:hidden"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <Portrait />
          </motion.div>

          <div className="hidden lg:block" />

          <motion.div className="relative z-10 max-w-sm lg:ml-auto lg:text-right" style={{ x: network.x, y: network.y }}>
            <HeroNetwork />
            <p className="mt-1 text-center font-mono text-[10px] tracking-[0.16em] text-ink/32 lg:text-right">
              AI / ML → AUTOMATION → SOFTWARE QUALITY
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:justify-end">
              <MagneticButton
                href="#work"
                className="btn-line rounded-full bg-ink px-5 py-3 text-[12px] text-white"
              >
                View My Work <span className="arrow">↗</span>
              </MagneticButton>
              <MagneticButton
                href={portfolioData.social.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-line rounded-full border border-ink/15 px-5 py-3 text-[12px] text-ink"
              >
                VIEW RESUME <span className="arrow">↗</span>
              </MagneticButton>
              <MagneticButton
                href="#contact"
                className="btn-line rounded-full border border-ink/15 px-5 py-3 text-[12px] text-ink"
              >
                Contact Me
              </MagneticButton>
            </div>
            <div className="mt-5 flex gap-3 lg:justify-end">
              {socials.map(({ href, label, icon: Icon }) =>
                href ? (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target={label === "Email" ? undefined : "_blank"}
                    rel={label === "Email" ? undefined : "noopener noreferrer"}
                    className="icon-btn flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink"
                    data-cursor="link"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ) : (
                  <span
                    key={label}
                    title={`${label} placeholder — add YOUR_* in portfolioData.ts`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink/30"
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                ),
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-1/2 hidden h-[min(68vh,580px)] -translate-x-1/2 lg:block">
        <motion.div
          className="h-full origin-bottom"
          initial={reduce ? false : { opacity: 0, y: 36 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
          transition={{ duration: 1.05, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          <Portrait />
        </motion.div>
      </div>

    </section>
  );
}

function Portrait() {
  return (
    <div className="portrait-3d relative mx-auto h-full w-auto">
      <span className="portrait-ground" aria-hidden />
      <Image
        src="/images/hero-portrait.png"
        alt={`${portfolioData.personal.name} portrait`}
        width={222}
        height={347}
        priority
        className="relative z-10 h-full w-auto object-contain object-bottom"
      />
    </div>
  );
}
