import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Klentra-inspired palette: cream, deep pine green, soft sage.
        paper: {
          DEFAULT: "#F4F1E7", // warm cream
          soft: "#ECE8DA", // slightly deeper cream
          deep: "#E1DCCB", // panels
        },
        ink: {
          DEFAULT: "#22302A", // dark green-charcoal (near-black, green undertone)
          soft: "#3A473E",
          mute: "#5E685C",
          faint: "#949B8C",
        },
        evergreen: {
          DEFAULT: "#2F4A3A", // deep pine — primary green
          deep: "#213529", // footer / darkest
          soft: "#4C6553",
        },
        sage: {
          DEFAULT: "#C4CFB4", // muted sage — section bands, accents
          soft: "#DBE2CE",
          deep: "#A7B795",
        },
        // Product tints — used sparingly for product identity
        pear: {
          DEFAULT: "#6E1E2E", // HB+ prickly-pear burgundy
          soft: "#8A3A48",
          wash: "#EFE6DE",
        },
        honey: {
          DEFAULT: "#9B7B2E", // multivitamin amber-olive
          soft: "#B79B57",
          wash: "#ECE7D3",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        widest: "0.28em",
      },
      maxWidth: {
        prose: "38rem",
        editorial: "44rem",
        container: "80rem",
      },
      transitionTimingFunction: {
        calm: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "grain-shift": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-2%, 1%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
