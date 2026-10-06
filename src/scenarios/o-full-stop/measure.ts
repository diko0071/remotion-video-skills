import { measureText } from "@remotion/layout-utils";
import { SANS } from "../../kit/launch";
import { BALL, CAP, F, GAP, TRACK, XH } from "./theme";

export const textW = (text: string, size: number) =>
  measureText({ text, fontFamily: SANS, fontSize: size, fontWeight: "800", letterSpacing: TRACK }).width;

export const spaceW = (size: number) => textW("a a", size) - textW("aa", size);

const TALL = /[A-Z0-9bdfhklt$%/]/;

export const wordTop = (text: string, size: number) => (TALL.test(text) ? CAP : XH) * size;

export type Word = { text: string; x: number; w: number; top: number };
export type Line = { words: Word[]; baseline: number; x: number; end: number; slotX: number };

export const layoutLine = (text: string, x: number, baseline: number, size = F, ball = BALL): Line => {
  const sp = spaceW(size);
  let cx = x;
  const words = text.split(" ").map((t) => {
    const w = textW(t, size);
    const word = { text: t, x: cx, w, top: wordTop(t, size) };
    cx += w + sp;
    return word;
  });
  const last = words[words.length - 1];
  const end = last.x + last.w;
  return { words, baseline, x, end, slotX: end + GAP * (size / F) + ball / 2 };
};
