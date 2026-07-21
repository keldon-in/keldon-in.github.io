import { Fraunces, Inter } from "next/font/google";

// Editorial display serif — warm, timeless, optically sized.
export const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
});

// Quiet neutral text/UI face.
export const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
});
