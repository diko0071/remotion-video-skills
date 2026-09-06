import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const BRAND_FONT_FAMILY = "Cabinet Grotesk";

void loadFont({
  family: BRAND_FONT_FAMILY,
  url: staticFile("fonts/CabinetGrotesk-Bold.woff2"),
  weight: "700",
});
