"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import { useTheme } from "@/lib/ThemeProvider";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
          className={`border-b transition-colors duration-500 ${
            scrolled || open ? "glass border-line" : "border-transparent bg-transparent"
          }`}
        >
          <div className="stage flex h-16 items-center justify-between md:h-[72px]">
            <a
              href="#top"
              className={`font-display text-lg font-semibold tracking-tight ${
                lightNav ? "text-ink" : "text-fg"
              }`}
              data-cursor="link"
              onClick={() => setOpen(false)}
            >
              {portfolioData.personal.firstName.toLowerCase()}.
            </a>

            <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Primary">
              {portfolioData.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`group relative text-[12px] tracking-[0.06em] transition-colors ${
                    lightNav ? "text-ink/55 hover:text-ink" : "text-fg/55 hover:text-fg"
                  }`}
                  data-cursor="link"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle lightNav={lightNav} />
              <a
                href={portfolioData.social.resume}
                download="Hemant_Agrawal_Resume.docx"
                className={`hidden rounded-full px-4 py-2 text-[12px] font-medium sm:inline-flex ${
                  lightNav ? "bg-ink text-white" : "bg-fg text-bg"
                }`}
                data-cursor="link"
              >
                Resume
              </a>
              <button
                type="button"
                className={`relative flex h-10 w-10 items-center justify-center rounded-full border lg:hidden ${
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
              download="Hemant_Agrawal_Resume.docx"
              onClick={() => setOpen(false)}
              className="mt-6 w-full rounded-full bg-invert px-6 py-4 text-center text-sm text-invert-fg"
            >
              Resume
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
