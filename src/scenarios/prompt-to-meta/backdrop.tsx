import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { MOSAICS } from "./mosaic-data";
import { MosaicView } from "./mosaic-view";
import { logZoom, ramp, T } from "./timeline";

const SCENES = [
  { from: T.drop, to: T.make, mosaic: MOSAICS.sunflowers },
  { from: T.make, to: T.launch, mosaic: MOSAICS.lemons },
  { from: T.launch, to: T.phone, mosaic: MOSAICS.harbor },
  { from: T.phone, to: T.handoff, mosaic: MOSAICS.wheat },
];

export const HOOK_EASE = Easing.bezier(0.8, 0, 0.2, 1);

export const hookZoom = (f: number) =>
  logZoom(f, 0, T.zoomEnd, 20, 1, HOOK_EASE) * (1 + 0.05 * ramp(f, T.zoomEnd, T.drop - T.zoomEnd, Easing.linear));

export const Backdrop: React.FC = () => {
  const f = useCurrentFrame();
  if (f < T.drop) return <MosaicView mosaic={MOSAICS.sun} z={hookZoom(f)} />;
  const scene = SCENES.find((s) => f >= s.from && f < s.to);
  if (!scene) return null;
  return <MosaicView mosaic={scene.mosaic} z={1 + 0.07 * ramp(f, scene.from, scene.to - scene.from, Easing.linear)} />;
};
