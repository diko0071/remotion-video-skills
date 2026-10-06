import { staticFile } from "remotion";

export const INK_NIGHT = "#F7F5F0";
export const MUTED_NIGHT = "rgba(247,245,240,0.56)";
export const PLATE = "#B6EE3A";

export const GROUND = {
  night: "#0B0F1C",
  meta: "#0A1A3D",
  google: "#06261A",
  shopify: "#180F31",
  ga: "#2A1407",
  tiktok: "#131317",
  gsc: "#08213D",
} as const;

export const integration = (file: string) => staticFile(`integrations/${file}`);
export const store = (file: string) => staticFile(file);
export const RYZE_SUN = staticFile("ryze-sun.png");
export const RYZE_SUN_LIGHT = staticFile("ryze-sun-light.png");
export const SUN_ASPECT = 731 / 714;
