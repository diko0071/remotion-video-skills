import { loadFont as loadGrotesk } from "@remotion/google-fonts/SchibstedGrotesk";
import { loadFont as loadSerif } from "@remotion/google-fonts/SourceSerif4";

const { fontFamily: grotesk } = loadGrotesk();
const { fontFamily: serif } = loadSerif();

export { grotesk, serif };
