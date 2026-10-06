import { loadFont } from "@remotion/google-fonts/PlusJakartaSans";

export const SANS = loadFont("normal", { weights: ["400", "500", "600", "700", "800"], subsets: ["latin"] }).fontFamily;

export const C = {
  ink: "#0f172a",
  primary: "#171717",
  cream: "#FDFAF3",
  white: "#ffffff",
  mutedFg: "#7a726a",
  border: "#e7e0d6",
  brand: "#C19767",
  brandLight: "#D6A56C",
  brandDeep: "#9a6e38",
  emerald: "#10b981",
} as const;
