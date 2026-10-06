import { loadFont as loadJakarta } from "@remotion/google-fonts/PlusJakartaSans";
import { staticFile } from "remotion";

export const SANS = loadJakarta("normal", { weights: ["400", "500", "600", "700", "800"], subsets: ["latin"] }).fontFamily;

export const C = {
  ink: "#0f172a",
  primary: "#171717",
  paper: "#ffffff",
  cream: "#FDFAF3",
  muted: "#f6f1e9",
  mutedFg: "#7a726a",
  border: "#e7e0d6",
  ring: "#a69f99",
  label: "#64748b",
  placeholder: "#b8a988",
  brand: "#C19767",
  brandLight: "#D6A56C",
  brandDeep: "#9a6e38",
  emerald: "#10b981",
  sky: "#0ea5e9",
  slate: "#94a3b8",
} as const;

export const S = 1.6;

export const R = { lg: 3 * S, md: 2.4 * S, card: 3 * S * 2 } as const;

export const SHADOW = {
  card: "0 0 0 1.5px rgba(15,23,42,0.10), 0 2px 4px rgba(74,53,29,0.06), 0 18px 44px rgba(20,40,80,0.18)",
  chip: "0 1px 3px rgba(74,53,29,0.10)",
  agent:
    "0 0 0 2px rgba(154,108,53,0.5), 0 0 0 7px rgba(193,151,103,0.2), 0 24px 70px rgba(20,40,80,0.28)",
  ring: "0 0 0 2px rgba(15,23,42,0.14), 0 0 0 7px rgba(193,151,103,0.12), 0 24px 70px rgba(20,40,80,0.24)",
} as const;


export const asset = (path: string) => staticFile(`prompt-to-meta/${path}`);
