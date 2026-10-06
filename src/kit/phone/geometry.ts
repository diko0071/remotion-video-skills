import { loadFont } from "@remotion/google-fonts/Inter";

export const PHONE_FONT = loadFont("normal", { weights: ["400", "500", "600", "700"], subsets: ["latin"] }).fontFamily;

export type PhoneGeometry = { w: number; h: number; r: number; bezel: number };

export const PHONE_GEOMETRY: PhoneGeometry = { w: 410, h: 860, r: 68, bezel: 12 };

export const phoneScreen = (g: PhoneGeometry) => ({ w: g.w - g.bezel * 2, h: g.h - g.bezel * 2, r: g.r - g.bezel });

export const PHONE_STATUS_H = 54;

export const PHONE_ISLAND = { w: 124, h: 36, top: 12 } as const;

export const PHONE_COLORS = { bezel: "#101012", label: "#0a0a0a" } as const;
