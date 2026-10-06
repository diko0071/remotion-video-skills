import { refFrame, sampleRef } from "../../core/measure";

export const REF_FPS = 24;
export const r = (f24: number) => refFrame(f24, REF_FPS);
export const sample = (values: readonly number[], frame: number, start30: number) => sampleRef(values, frame, start30, REF_FPS);

export const INK = "#171310";
export const GREY = "#8E8A84";
export const SOFT = "#C9C6C0";
export const GROUND = "#FDFDFD";
export const PANEL = "#1B1B1B";
export const ORANGE = "#F2A008";
export const BLUE = "#1AADF5";
export const PINK = "#E82D99";
export const GREEN = "#27C153";
export const PURPLE = "#9302EF";

export const CUT = {
  hook: r(0),
  lines: r(74),
  email: r(114),
  meeting: r(162),
  brief: r(201),
  org: r(262),
  chips: r(308),
  grid: r(340),
  cluster: r(391),
  tasks: r(438),
  reach: r(492),
  routes: r(558),
  routing: r(630),
  ladder: r(768),
  skills: r(896),
  within: r(965),
  tryAt: r(1024),
  lockup: r(1068),
  end: r(1104),
} as const;

export const TOTAL = CUT.end;
