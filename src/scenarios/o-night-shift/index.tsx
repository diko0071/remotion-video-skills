import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { CamKey } from "../../core/stage";
import { KeyedRig } from "../../kit/keyed-rig";
import { C, CornerLockup, SANS } from "../../kit/launch";
import { SfxTrack } from "../../kit/sfx";
import { ClockPlate } from "./clock";
import { EndLead } from "./end";
import { FlashWorld } from "./montage";
import { Sunrise } from "./sunrise";
import { GROUND } from "./theme";
import { SCENES, SUNRISE, TONIGHT } from "./timings";
import { Tonight } from "./tonight";
import { GoogleWorld } from "./world-google";
import { MetaWorld } from "./world-meta";
import { ShopifyWorld } from "./world-shopify";

export { NS_TOTAL } from "./timings";

const lin = (t: number) => t;

const drift = (len: number, z1: number, x0 = 950, x1 = 985): CamKey[] => [
  { at: 0, zoom: 1, x: x0, y: 540 },
  { at: len, zoom: z1, x: x1, y: 540, ease: lin },
];

const World: React.FC<{ id: string; bg: string; len: number; z1?: number; children: React.ReactNode }> = ({ id, bg, len, z1 = 1.05, children }) => (
  <KeyedRig id={id} keys={drift(len, z1)} bg={bg}>
    {children}
  </KeyedRig>
);

const SunriseWorld: React.FC = () => {
  const f = useCurrentFrame();
  const bg = f >= SUNRISE.cream - SCENES.sunrise.from ? C.cream : GROUND.night;
  return (
    <KeyedRig id="ns-sunrise" keys={MORNING_CAM} bg={bg}>
      <Sunrise />
    </KeyedRig>
  );
};

const MORNING_CAM: CamKey[] = [
  { at: 0, zoom: 1, x: 960, y: 560 },
  { at: SUNRISE.sunCover - SCENES.sunrise.from, zoom: 1.04, x: 960, y: 560, ease: lin },
  { at: SUNRISE.card - SCENES.sunrise.from + 14, zoom: 1.22, x: 960, y: 556 },
  { at: SCENES.sunrise.len, zoom: 1.27, x: 960, y: 556, ease: lin },
];

const Lockups: React.FC = () => {
  const f = useCurrentFrame();
  const t = ramp(f, SUNRISE.lockupFrom, SUNRISE.lockupFrom + 6);
  return (
    <>
      <AbsoluteFill style={{ filter: "invert(1)", opacity: 1 - t }}>
        <CornerLockup />
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: t }}>
        <CornerLockup pulseAt={SUNRISE.lockupFrom + 4} />
      </AbsoluteFill>
    </>
  );
};

const seq = (k: keyof typeof SCENES) => ({ from: SCENES[k].from, durationInFrames: SCENES[k].len });

export const ONightShift: React.FC = () => (
  <AbsoluteFill style={{ background: GROUND.night, fontFamily: SANS, overflow: "hidden" }}>
    <Sequence {...seq("tonight")}>
      <World id="ns-tonight" bg={GROUND.night} len={SCENES.tonight.len} z1={1.06}>
        <Tonight />
      </World>
    </Sequence>
    <Sequence {...seq("meta")}>
      <World id="ns-meta" bg={GROUND.meta} len={SCENES.meta.len}>
        <MetaWorld />
      </World>
    </Sequence>
    <Sequence {...seq("google")}>
      <World id="ns-google" bg={GROUND.google} len={SCENES.google.len}>
        <GoogleWorld />
      </World>
    </Sequence>
    <Sequence {...seq("shopify")}>
      <World id="ns-shopify" bg={GROUND.shopify} len={SCENES.shopify.len}>
        <ShopifyWorld />
      </World>
    </Sequence>
    <Sequence {...seq("ga")}>
      <World id="ns-ga" bg={GROUND.ga} len={SCENES.ga.len} z1={1.03}>
        <FlashWorld which="ga" />
      </World>
    </Sequence>
    <Sequence {...seq("tiktok")}>
      <World id="ns-tiktok" bg={GROUND.tiktok} len={SCENES.tiktok.len} z1={1.03}>
        <FlashWorld which="tiktok" />
      </World>
    </Sequence>
    <Sequence {...seq("gsc")}>
      <World id="ns-gsc" bg={GROUND.gsc} len={SCENES.gsc.len} z1={1.03}>
        <FlashWorld which="gsc" />
      </World>
    </Sequence>
    <Sequence {...seq("sunrise")}>
      <SunriseWorld />
    </Sequence>
    <Sequence {...seq("end")}>
      <AbsoluteFill style={{ background: C.cream }} />
    </Sequence>
    <EndLead />
    <Lockups />
    <ClockPlate />
    <SfxTrack
      hits={[
        { name: "mouse-click", at: TONIGHT.send },
        { name: "mouse-click", at: SUNRISE.click },
      ]}
    />
  </AbsoluteFill>
);
