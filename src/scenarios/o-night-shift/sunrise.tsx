import React from "react";
import { Easing, Img, useCurrentFrame } from "remotion";
import { clamp01, ramp } from "../../core/motion";
import { Cursor } from "../../kit/cursor";
import { landSquash } from "./bounce";
import { APPROVE, AVATAR, MorningCard } from "./morning-card";
import { OHero } from "./o-hero";
import { RYZE_SUN_LIGHT, SUN_ASPECT } from "./theme";
import { SCENES, SUNRISE } from "./timings";

const L = (g: number) => g - SCENES.sunrise.from;
const eIn = Easing.in(Easing.cubic);
const eOut = Easing.out(Easing.cubic);
const eio = Easing.inOut(Easing.cubic);

const O_START = { cx: 960, cy: 600, size: 320 };
const SUN = { x: 960, y0: 1400, y1: 610, s0: 380, s1: 7400, spin: 60 };

export const SunDisc: React.FC = () => {
  const f = useCurrentFrame();
  const t = ramp(f, L(SUNRISE.sunFrom), L(SUNRISE.sunCover));
  if (f < L(SUNRISE.sunFrom) || f > L(SUNRISE.cream) + 1) return null;
  const size = SUN.s0 + (SUN.s1 - SUN.s0) * eIn(t);
  const y = SUN.y0 + (SUN.y1 - SUN.y0) * eOut(clamp01(t * 1.25));
  return (
    <Img
      src={RYZE_SUN_LIGHT}
      style={{
        position: "absolute",
        left: SUN.x - size / 2,
        top: y - (size * SUN_ASPECT) / 2,
        width: size,
        height: size * SUN_ASPECT,
        transform: `rotate(${SUN.spin * eOut(t)}deg)`,
        zIndex: 1,
      }}
    />
  );
};

export const Sunrise: React.FC = () => {
  const f = useCurrentFrame();
  const fall = eIn(clamp01(f / 8));
  const move = eio(ramp(f, L(SUNRISE.oToCard), L(SUNRISE.oToCard) + SUNRISE.oToCardLen));
  const size = O_START.size + (AVATAR.size - O_START.size) * move;
  const cx = O_START.cx + (AVATAR.cx - O_START.cx) * move;
  const cy = O_START.cy + (AVATAR.cy - O_START.cy) * move - (1 - fall) * 260;
  const look = eio(ramp(f, L(SUNRISE.oLook), L(SUNRISE.sunCover)));
  const gaze = move > 0 ? { x: 0.5, y: -0.2 } : { x: 0, y: 0.7 - 1.3 * look };
  const squash = landSquash(f, 8, 0.14) + landSquash(f, L(SUNRISE.oToCard) + SUNRISE.oToCardLen, 0.1);
  return (
    <>
      <SunDisc />
      <MorningCard popAt={L(SUNRISE.card)} stats={SUNRISE.stats.map(L)} approvalAt={L(SUNRISE.approval)} clickAt={L(SUNRISE.click)} />
      <div style={{ position: "absolute", left: cx - size / 2, top: cy - size / 2, zIndex: 6 }}>
        <OHero
          f={f}
          size={size}
          track={[
            { at: -99, eyes: "star" },
            { at: L(SUNRISE.oHappy), eyes: "happy" },
            { at: L(SUNRISE.wink), eyes: "wink" },
            { at: L(SUNRISE.wink) + 16, eyes: "happy" },
          ]}
          gaze={gaze}
          blinks={[L(SUNRISE.oHappy) + 40]}
          squash={squash}
          shadow={f >= L(SUNRISE.cream) ? clamp01(1 - move * 2) : 0}
        />
      </div>
      <Cursor
        stops={[
          { x: 1700, y: 1040, at: L(SUNRISE.cursorIn) },
          { x: APPROVE.x + APPROVE.w / 2 - 6, y: APPROVE.y + APPROVE.h / 2 - 4, at: L(SUNRISE.click) - 5 },
          { x: APPROVE.x + APPROVE.w / 2 - 6, y: APPROVE.y + APPROVE.h / 2 - 4, at: L(SUNRISE.click), click: true },
          { x: 1180, y: 900, at: L(SUNRISE.click) + 34 },
        ]}
        appearAt={L(SUNRISE.cursorIn)}
        scale={1.25}
      />
    </>
  );
};
