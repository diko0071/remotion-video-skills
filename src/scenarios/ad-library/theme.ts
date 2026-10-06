import { staticFile } from "remotion";

export const CLAUDE_ACCENT = "#d97757";

export const ACCENT = "#B6EE3A";

const shadeRgb = (hex: string, k: number) =>
  [1, 3, 5].map((i) => Math.round(parseInt(hex.slice(i, i + 2), 16) * k)).join(",");

export const ACCENT_RGB = shadeRgb(ACCENT, 1);

export const ACCENT_SHADE = shadeRgb(ACCENT, 0.3);

export const CLAUDE_ICON_FILL = "linear-gradient(180deg, #E48C6B 0%, #D97757 48%, #C9653F 100%)";

export const META_ICON_FILL = "linear-gradient(180deg, #FFFFFF 0%, #F2F3F7 100%)";

export const W = {
  card: "#ffffff",
  foreground: "#0f172a",
  primary: "#171717",
  primaryFg: "#fafafa",
  muted: "#f6f1e9",
  mutedFg: "#7a726a",
  border: "#e7e0d6",
  radius: 3,
} as const;

export const liftShadow = (k: number, tint = "15,23,42") =>
  `0 ${20 * k}px ${44 * k}px -${14 * k}px rgba(${tint},${0.42 * k}), 0 ${6 * k}px ${14 * k}px -${6 * k}px rgba(${tint},${0.24 * k}), 0 0 0 1px rgba(15,23,42,${0.07 * k})`;

export const iconShadow = (alpha: number, px = 1, tint = "15,23,42") =>
  `0 ${26 * px}px ${56 * px}px -${20 * px}px rgba(${tint},${0.45 * alpha}), 0 ${9 * px}px ${20 * px}px -${9 * px}px rgba(${tint},${0.26 * alpha})`;

export const asset = (path: string) => staticFile(`ad-library/${path}`);
