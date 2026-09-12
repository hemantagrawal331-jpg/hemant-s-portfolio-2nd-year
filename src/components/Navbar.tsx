"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import { useActiveSection } from "@/lib/useActiveSection";
import { useTheme } from "@/lib/ThemeProvider";
import { ThemeToggle } from "./ThemeToggle";

const NAV_IDS = portfolioData.nav.map((item) => item.href);

export function Navbar() {
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  const onHero = !scrolled && !open;
  const lightNav = theme === "light" || onHero;

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        <div
          className={`border-b transition-all duration-500 ${
            scrolled || open ? "glass border-line" : "border-transparent bg-transparent"
          }`}
        >
          <div
            className={`stage flex items-center justify-between transition-[height] duration-500 ${
              scrolled ? "h-14 md:h-16" : "h-16 md:h-[72px]"
            }`}
          >
            <a
              href="#top"
              className={`flex items-center gap-2.5 ${
                lightNav ? "text-ink" : "text-fg"
              }`}
              aria-label="Hemant Agrawal — home"
              data-cursor="link"
              onClick={() => setOpen(false)}
            >
              <span className="monogram">{portfolioData.personal.monogram}</span>
              <span className="font-display text-lg font-semibold tracking-tight">Hemant</span>
            </a>

            <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Primary">
              {portfolioData.nav.map((item) => {
                const isActive = active === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`group relative font-mono text-[11px] tracking-[0.12em] uppercase transition-colors ${
                      lightNav
                        ? isActive
                          ? "text-ink"
                          : "text-ink/50 hover:text-ink"
                        : isActive
                          ? "text-fg"
                          : "text-fg/50 hover:text-fg"
                    }`}
                    data-cursor="link"
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-current transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
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
                className={`btn-line hidden rounded-full px-4 py-2 font-mono text-[11px] font-medium tracking-[0.12em] uppercase sm:inline-flex ${
                  lightNav ? "bg-ink text-white" : "bg-fg text-bg"
                }`}
                data-cursor="link"
              >
                Resume <span className="arrow">↗</span>
              </a>
              <button
                type="button"
                className={`relative flex h-10 w-10 items-center justify-center rounded-[4px] border lg:hidden ${
                  lightNav ? "border-ink/15" : "border-line"
                }`}
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? "Close menu" : "Open menu"}
              >
                <span
                  className={`absolute h-px w-4 transition-transform duration-300 ${
                    lightNav ? "bg-ink" : "bg-fg"
                  } ${open ? "rotate-45" : "-translate-y-1"}`}
                />
                <span
                  className={`absolute h-px w-4 transition-transform duration-300 ${
                    lightNav ? "bg-ink" : "bg-fg"
                  } ${open ? "-rotate-45" : "translate-y-1"}`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col justify-between bg-bg px-6 pb-8 pt-8 lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
          >
            <div className="space-y-1">
              {portfolioData.nav.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between border-b border-line py-4"
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.04 * index }}
                >
                  <span className="font-display text-3xl tracking-tight text-fg sm:text-4xl">
                    {item.label}
                  </span>
                  <span className="font-mono text-[11px] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </motion.a>
              ))}
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
    </>
  );
}
