import { loadFont } from "@remotion/google-fonts/PlusJakartaSans";
import { staticFile } from "remotion";
import { BallSkin } from "../../kit/glyph-ball";
import { C } from "../../kit/launch";

export const FONT = loadFont("normal", { weights: ["800"], subsets: ["latin"] });

export const PAPER = "#FFFFFF";
export const INK = C.ink;
export const FOG = "#C9CDD3";

export const F = 104;
export const X0 = 170;
export const Y0 = 470;
export const BALL = 50;
export const GAP = 7;
export const TRACK = "-0.035em";
export const LINE_BOX = 1.08;
export const BASELINE = 0.86;
export const CAP = 0.71;
export const XH = 0.53;

export const SKINS = {
  hero: { src: staticFile("plush-dots/hero.png"), eyeAt: { lx: 37, rx: 63, y: 46, scale: 1.25 } },
  boxer: { src: staticFile("plush-dots/boxer.png"), eyeAt: { lx: 40, rx: 60, y: 49, scale: 1.2 } },
  builder: { src: staticFile("plush-dots/builder.png"), eyeAt: { lx: 41, rx: 59, y: 54, scale: 1.2 } },
  skater: { src: staticFile("plush-dots/skater.png"), eyeAt: { lx: 41, rx: 59, y: 60, scale: 1.2 } },
  star: { src: staticFile("plush-dots/star.png"), eyeAt: { lx: 43, rx: 57, y: 53, scale: 1.05 } },
} satisfies Record<string, BallSkin>;

export const STORM_MUSIC = staticFile("music/o-full-stop-storm.mp3");
export const GROOVE_MUSIC = staticFile("music/o-full-stop-groove.mp3");
export const THUNK = staticFile("sfx/thunk.wav");
