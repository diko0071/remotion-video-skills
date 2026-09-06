import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";

export const INTER = loadInter("normal", { weights: ["400", "500", "600"] }).fontFamily;
export const SERIF = loadPlayfair("normal", { weights: ["700"] }).fontFamily;
