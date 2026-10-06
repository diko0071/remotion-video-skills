import { staticFile } from "remotion";
import { BallSkin } from "../../kit/glyph-ball";
import { C } from "../../kit/launch";

export type Mode = "grey" | "color";

export const PALETTE = {
  sky: { grey: "#E4E7EB", color: "#5CC2FF" },
  hills: { grey: "#D2D7DD", color: "#A6E6B2" },
  ground: { grey: "#BCC2CA", color: "#45C463" },
  edge: { grey: "#A9B0B9", color: "#2FA34E" },
  tuft: { grey: "#A3AAB3", color: "#2C9B48" },
} as const;

export const INK = C.ink;
export const GREY_FILTER = "grayscale(1) contrast(0.9) brightness(1.06)";

export const G = 860;
export const DOT = 120;
export const SUN = 180;
export const SUN_SKY = 460;

export const SKINS = {
  dot: { src: staticFile("plush-dots/hero.png"), eyeAt: { lx: 37, rx: 63, y: 46, scale: 1.25 } },
  sun: { src: staticFile("plush-dots/sun.png"), eyeAt: { lx: 39, rx: 61, y: 50, scale: 0.86 } },
} satisfies Record<string, BallSkin>;

export const LOGOS = {
  meta: staticFile("integrations/meta-ads.svg"),
  google: staticFile("integrations/google-ads.webp"),
  shopify: staticFile("integrations/shopify-color.svg"),
  ga4: staticFile("integrations/google-analytics.svg"),
} as const;

export const GOOGLE_BLUE = "#1A73E8";
export const META_BLUE = "#0866FF";
export const STAMP_RED = "#FF3B30";
export const OK_GREEN = "#1DB954";

export const RUN_MUSIC = staticFile("music/o-locked-out-run.mp3");
export const RISE_MUSIC = staticFile("music/o-locked-out-rise.mp3");
export const SNEAK_MUSIC = staticFile("music/o-locked-out-sneak.mp3");
export const HIT_MUSIC = staticFile("music/o-locked-out-hit.mp3");
