import { Easing } from "remotion";
import { CamKey, keyedCamera } from "../../core/stage";
import { SKY } from "./level";
import { G } from "./theme";
import { BLOCK_T, DOOR_T, DROP, FALL, LIFT, LO_TOTAL, RING_T, RISE, SMASH, STAMP_T, UP } from "./timings";

const io = Easing.inOut(Easing.cubic);
const outE = Easing.out(Easing.cubic);
const inE = Easing.in(Easing.cubic);
const lin = (t: number) => t;
const Y = G - 324;

export const CAMERA: CamKey[] = [
  { at: 0, zoom: 1.1, x: 680, y: Y },
  { at: DOOR_T.splat, zoom: 1.1, x: 1200, y: Y, ease: outE },
  { at: DOOR_T.leave, zoom: 1.12, x: 1250, y: Y, ease: lin },
  { at: BLOCK_T.on + 6, zoom: 1.1, x: 2170, y: Y, ease: io },
  { at: BLOCK_T.off - 4, zoom: 1.12, x: 2210, y: Y, ease: lin },
  { at: RING_T.under + 2, zoom: 1.1, x: 2960, y: Y - 16, ease: io },
  { at: RING_T.wake - 2, zoom: 1.13, x: 2940, y: Y - 16, ease: lin },
  { at: STAMP_T.under + 2, zoom: 1.1, x: 3960, y: Y - 16, ease: io },
  { at: RISE.from, zoom: 1.12, x: 3990, y: Y - 16, ease: lin },
  { at: RISE.top, zoom: 0.95, x: 4330, y: 470, ease: io },
  { at: RISE.jump, zoom: 0.96, x: 4320, y: 470, ease: lin },
  { at: RISE.land, zoom: 1, x: 4120, y: Y - 16, ease: io },
  { at: DROP, zoom: 1, x: 4100, y: Y - 16, ease: lin },
  { at: DROP + 8, zoom: 0.95, x: 3990, y: 430, ease: io },
  { at: SMASH.stamp + 2, zoom: 1, x: 3900, y: 500, ease: io },
  { at: 396, zoom: 1, x: 3050, y: 470, ease: lin },
  { at: SMASH.block, zoom: 1, x: 2200, y: Y - 16, ease: lin },
  { at: SMASH.door, zoom: 1, x: 1300, y: Y - 16, ease: lin },
  { at: LIFT.launch, zoom: 1, x: 1180, y: Y - 16, ease: io },
  { at: LIFT.sky, zoom: 1, x: SKY.x, y: SKY.y, ease: io },
  { at: FALL.from, zoom: 1.03, x: SKY.x, y: SKY.y, ease: lin },
  { at: FALL.land, zoom: 0.85, x: 1200, y: 378, ease: inE },
  { at: UP.from, zoom: 0.88, x: 1200, y: 372, ease: lin },
  { at: UP.to, zoom: 1, x: SKY.x, y: -1000, ease: io },
  { at: LO_TOTAL, zoom: 1.04, x: SKY.x, y: -1000, ease: lin },
];

export const cameraAt = (f: number) => keyedCamera(CAMERA, f);

const HITS: readonly { at: number; amp: number }[] = [
  { at: DOOR_T.splat, amp: 8 },
  { at: STAMP_T.hit, amp: 22 },
  { at: RISE.land, amp: 18 },
  { at: SMASH.stamp, amp: 24 },
  { at: SMASH.ring, amp: 6 },
  { at: SMASH.block, amp: 10 },
  { at: SMASH.door, amp: 12 },
  { at: FALL.land, amp: 30 },
];

export const shakeAt = (f: number) => {
  let x = 0;
  let y = 0;
  for (const h of HITS) {
    const d = f - h.at;
    if (d < 0 || d > 18) continue;
    const a = h.amp * Math.exp(-d / 3.4);
    x += a * 0.6 * Math.sin(d * 2.3);
    y += a * Math.cos(d * 2.9);
  }
  return { x, y };
};

export const toScreen = (f: number, x: number, y: number) => {
  const cam = cameraAt(f);
  const s = shakeAt(f);
  return { x: 960 + (x - cam.x) * cam.zoom + s.x, y: 540 + (y - cam.y) * cam.zoom + s.y, zoom: cam.zoom };
};

export const noTilt = () => 0;
