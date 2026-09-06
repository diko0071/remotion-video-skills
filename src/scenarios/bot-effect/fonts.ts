import { loadFont as loadRoboto } from "@remotion/google-fonts/Roboto";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

export const ROBOTO = loadRoboto("normal", { weights: ["300", "400", "500"] }).fontFamily;
export const INTER = loadInter("normal", { weights: ["400", "500", "600"] }).fontFamily;
