"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { useTheme } from "@/lib/ThemeProvider";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const { theme } = useTheme();
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0.4 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  const lightNav = theme === "light" || !pastHero;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="stage flex h-16 items-center justify-between md:h-20">
          <a
            href="#top"
            className={`font-display text-lg font-semibold tracking-tight ${lightNav ? "text-ink" : "text-white"}`}
            data-cursor="link"
          >
            {portfolioData.firstName.toLowerCase()}.
          </a>

          <nav className="hidden items-center gap-6 xl:flex">
            {portfolioData.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-[12px] tracking-[0.04em] transition-colors ${
                  lightNav ? "text-ink/55 hover:text-ink" : "text-white/55 hover:text-white"
                }`}
                data-cursor="link"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle lightNav={lightNav} />
            <a
              href={portfolioData.resume}
              download="Hemant_Agrawal_Resume.docx"
              className={`hidden rounded-full px-4 py-2 text-[12px] font-medium md:inline-flex ${
                lightNav ? "bg-ink text-white" : "bg-white text-ink"
              }`}
              data-cursor="link"
            >
              Resume
            </a>
            <button
              type="button"
              className={`relative flex h-10 w-10 items-center justify-center rounded-full border xl:hidden ${
                lightNav ? "border-ink/15" : "border-white/15"
              }`}
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span
                className={`absolute h-px w-4 transition-transform duration-300 ${
                  lightNav ? "bg-ink" : "bg-white"
                } ${open ? "rotate-45" : "-translate-y-1"}`}
              />
              <span
                className={`absolute h-px w-4 transition-transform duration-300 ${
                  lightNav ? "bg-ink" : "bg-white"
                } ${open ? "-rotate-45" : "translate-y-1"}`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-between bg-bg px-6 pb-10 pt-28 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="space-y-3">
              {portfolioData.nav.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="display block text-5xl text-fg"
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.04 * index }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
            <a
              href={portfolioData.resume}
              download="Hemant_Agrawal_Resume.docx"
              onClick={() => setOpen(false)}
              className="rounded-full bg-invert px-6 py-4 text-center text-sm text-invert-fg"
            >
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
