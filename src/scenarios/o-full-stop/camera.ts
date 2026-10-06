import { Easing } from "remotion";
import { ramp } from "../../core/motion";
import { CamKey } from "../../core/stage";
import { Y0 } from "./theme";
import { GROOVE, PAN, PUSH, STORM } from "./timings";

const io = Easing.inOut(Easing.cubic);
const lin = (t: number) => t;

const HOME = { x: 740, y: Y0 - 20 } as const;
const Z = 1.32;
const HOME_PUSH = 1.28;
export const SCENES = { a: { x: 2920, y: 494 }, b: { x: 4964, y: 429 }, c: { x: 7100, y: 492 } } as const;

export const CAMERA: CamKey[] = [
  { at: 0, zoom: 0.95, x: 965, y: Y0 - 30 },
  { at: STORM.freeze, zoom: 1, x: 995, y: Y0 - 30, ease: lin },
  { at: STORM.land + 3, zoom: 1, x: 995, y: Y0 - 30 },
  { at: GROOVE - 1, zoom: 1.12, ...HOME, ease: io },
  { at: PAN.a[0], zoom: HOME_PUSH, ...HOME, ease: io },
  { at: PAN.a[1], zoom: Z, ...SCENES.a, ease: io },
  { at: PAN.b[0], zoom: Z, ...SCENES.a },
  { at: PAN.b[1], zoom: Z, ...SCENES.b, ease: io },
  { at: PAN.c[0], zoom: Z, ...SCENES.b },
  { at: PAN.c[1], zoom: Z, ...SCENES.c, ease: io },
  { at: PUSH.from, zoom: Z, ...SCENES.c },
  { at: PUSH.to, zoom: PUSH.zoom, ...SCENES.c, ease: io },
];

export const tiltAt = (f: number) => (f < STORM.tiltFrom ? -4 : -4 * (1 - io(ramp(f, STORM.tiltFrom, STORM.tiltTo))));

export const shakeAt = (f: number) => {
  const d = f - STORM.land;
  if (d < 0 || d > 16) return { x: 0, y: 0 };
  const a = 14 * Math.exp(-d / 3.4);
  return { x: a * Math.sin(d * 2.3), y: a * 0.8 * Math.cos(d * 3.1) };
};
