import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { staticFile } from "remotion";

export const IOS_FONT = loadInter("normal", { weights: ["400", "500", "600", "700"], subsets: ["latin"] }).fontFamily;

export const IOS = {
  green: "#34C759",
  red: "#FF3B30",
  blue: "#007AFF",
  bubble: "#E9E9EB",
  label: "#0a0a0a",
  secondary: "#8E8E93",
  separator: "#D8D8DC",
  grouped: "#F2F2F7",
  bezel: "#101012",
} as const;

export const asset = (path: string) => staticFile(`instinct-calls/${path}`);
