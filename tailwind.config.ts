import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        "hero-fg": "var(--hero-fg)",
        bg: "var(--bg)",
        elevated: "var(--elevated)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        line: "var(--line)",
        invert: "var(--invert)",
        "invert-fg": "var(--invert-fg)",
        ink: "#111111",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
