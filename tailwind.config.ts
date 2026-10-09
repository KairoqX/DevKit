import type { Config } from "tailwindcss";

// Design tokens: every colour used on the site is defined here once.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#f7f8f9", // page background
        surface: "#ffffff", // cards and inputs
        ink: "#1f2328", // main text (charcoal)
        muted: "#59616b", // secondary text
        line: "#dde1e6", // borders
        accent: "#1d6b57", // the one accent colour
        "accent-strong": "#155242",
        "accent-soft": "#e8f3ef",
        danger: "#a4262c",
        "danger-soft": "#fbeceb",
        "added-bg": "#e4f4ea",
        "removed-bg": "#fbe9e8",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
