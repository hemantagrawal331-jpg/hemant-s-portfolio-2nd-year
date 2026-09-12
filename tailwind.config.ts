import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        "hero-fg": "var(--hero-fg)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        bg: "var(--background)",
        elevated: "var(--card)",
        card: "var(--card)",
        fg: "var(--foreground)",
        muted: "var(--muted)",
        border: "var(--border)",
        line: "var(--border)",
        invert: "var(--invert)",
        "invert-fg": "var(--invert-fg)",
        ink: "var(--hero-fg)",
        accent: "var(--accent)",
      },
      transitionDuration: {
        token: "var(--duration)",
      },
      borderRadius: {
        token: "var(--radius)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
