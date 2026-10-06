import { Easing } from "remotion";
import { ramp } from "../../core/motion";
import { glide, lerp, RING_BURSTS, T } from "./timeline";

export const PHONE = { w: 410, h: 860, r: 68, bezel: 12, top: 244 } as const;
export const SCREEN = { w: PHONE.w - PHONE.bezel * 2, h: PHONE.h - PHONE.bezel * 2, r: PHONE.r - PHONE.bezel } as const;
export const PHONE_X = { center: 960, right: 1440 } as const;

export const phoneCenterX = (f: number) => lerp(PHONE_X.center, PHONE_X.right, glide(f, T.toRight, 110));

export const phoneExit = (f: number) => ramp(f, T.exit, T.exit + 22, Easing.in(Easing.cubic));

export const buzz = (f: number) => {
  if (f >= T.tap) return 0;
  const b = RING_BURSTS.find((s) => f >= s && f < s + 12);
  if (b === undefined) return 0;
  const env = Math.sin((Math.PI * (f - b)) / 12);
  return Math.sin(f * 2.7) * env;
};

export const phoneRect = (f: number) => {
  const cx = phoneCenterX(f);
  return { x: cx - PHONE.w / 2, y: PHONE.top + phoneExit(f) * 1150, w: PHONE.w, h: PHONE.h };
};

export const CARD = { x: 130, y: 318, w: 860, h: 500 } as const;
export const PANEL = { x: 330, y: 300, w: 640, h: 640 } as const;
export const HANDSET = { x: 0.585, y: 0.455 } as const;
