import { Caveat, Cormorant_Garamond, IBM_Plex_Mono, Inter } from "next/font/google";

export const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Cormorant Garamond — a high-contrast old-style serif with the refined,
 * museum-catalogue feel of the reference designs. Display use only; Inter
 * carries body copy and UI, where Cormorant's delicate strokes would suffer.
 */
export const fontDisplay = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

/**
 * IBM Plex Mono — stands in for the typewriter used on museum object labels
 * and exhibition checklists. Drives .text-label (eyebrows, metadata, nav)
 * throughout the site.
 */
export const fontMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

/**
 * Caveat — a natural pen hand. Used sparingly for hand-annotated accents
 * (stamps, marginalia, the hero note) — never for body copy or UI chrome.
 */
export const fontHand = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});
