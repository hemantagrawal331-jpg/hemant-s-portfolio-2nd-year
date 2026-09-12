"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import { useActiveSection } from "@/lib/useActiveSection";
import { useTheme } from "@/lib/ThemeProvider";
import { ThemeToggle } from "./ThemeToggle";

const NAV_IDS = portfolioData.nav.map((item) => item.href);

function navLinkTone(isActive: boolean, lightNav: boolean) {
  if (isActive) return "text-accent";
  if (lightNav) return "text-ink/50 hover:text-ink";
  return "text-fg/50 hover:text-fg";
}

export function Navbar() {
  const { theme } = useTheme();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV_IDS);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    document.getElementById("content")?.toggleAttribute("inert", open);
    document.querySelector("footer")?.toggleAttribute("inert", open);
    return () => {
      document.body.classList.remove("menu-open");
      document.getElementById("content")?.removeAttribute("inert");
      document.querySelector("footer")?.removeAttribute("inert");
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      if (wasOpen.current) toggleRef.current?.focus();
      return;
    }

    wasOpen.current = true;
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const onHero = !scrolled && !open;
  const lightNav = theme === "light" || onHero;

  return (
    <header
      className={["site-nav", scrolled && "is-compact", open && "is-open"].filter(Boolean).join(" ")}
    >
      <div className="site-nav-bar">
        <div className="site-nav-inner stage">
          <a
            href="#top"
            className={`site-nav-brand ${lightNav ? "text-ink" : "text-fg"}`}
            aria-label="Hemant Agrawal — home"
            data-cursor="link"
            onClick={() => setOpen(false)}
          >
            Hemant Agrawal
          </a>

          <nav className="site-nav-links" aria-label="Primary">
            {portfolioData.nav.map((item) => {
              const isActive = active === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`site-nav-link ${navLinkTone(isActive, lightNav)}`}
                  data-cursor="link"
                  aria-current={isActive ? "location" : undefined}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle lightNav={lightNav} />
            <a
              href={portfolioData.social.resume}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-line hidden rounded-full px-4 py-2 font-mono text-[11px] font-medium tracking-[0.12em] uppercase lg:inline-flex ${
                lightNav ? "bg-ink text-white" : "bg-fg text-bg"
              }`}
              data-cursor="link"
            >
              Resume <span className="arrow">↗</span>
            </a>
            <button
              ref={toggleRef}
              type="button"
              className={`site-nav-toggle ${lightNav ? "text-ink" : "text-fg"}`}
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            ref={menuRef}
            id="mobile-nav"
            aria-label="Mobile"
            className="site-nav-menu lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="site-nav-menu-links">
              {portfolioData.nav.map((item) => {
                const isActive = active === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "location" : undefined}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
            <a
              href={portfolioData.social.resume}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn-line mt-6 min-h-12 w-full rounded-full bg-invert px-6 py-4 text-center text-sm text-invert-fg"
            >
              VIEW RESUME <span className="arrow">↗</span>
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
