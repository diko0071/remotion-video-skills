import React from "react";
import { Easing } from "remotion";
import { SANS } from "../../kit/launch";
import { GroundShadow, Shards } from "./fx";
import { STAMP, stampBottom } from "./level";
import { STAMP_RED } from "./theme";
import { SMASH, STAMP_T } from "./timings";

const io = Easing.inOut(Easing.cubic);
const LIFT = 16;

export const stampDrop = (f: number) => {
  if (f < STAMP_T.slam) return 0;
  if (f < STAMP_T.hit) return ((f - STAMP_T.slam) / (STAMP_T.hit - STAMP_T.slam)) ** 2;
  if (f < STAMP_T.lift) return 1;
  if (f < STAMP_T.lift + LIFT) return 1 - io((f - STAMP_T.lift) / LIFT);
  if (f < SMASH.stamp - 4) return 0;
  if (f < SMASH.stamp) return (f - (SMASH.stamp - 4)) / 4;
  return 1;
};

export const handleTop = (f: number) => stampBottom(stampDrop(f)) - STAMP.base - STAMP.handle;

export const Stamp: React.FC<{ f: number }> = ({ f }) => {
  if (f >= SMASH.stamp) return null;
  const drop = stampDrop(f);
  const bottom = stampBottom(drop);
  const d = f - STAMP_T.hit;
  const squash = d >= 0 && d < 10 ? 0.07 * Math.exp(-d / 2.5) : 0;
  const sway = drop === 0 ? 1.4 * Math.sin(f / 11) : 0;
  return (
    <>
      <GroundShadow x={STAMP.x} width={STAMP.w * (0.55 + 0.45 * drop)} opacity={0.08 + 0.22 * drop} />
      <div
        style={{
          position: "absolute",
          left: STAMP.x - STAMP.w / 2,
          top: bottom - STAMP.base - STAMP.handle,
          width: STAMP.w,
          height: STAMP.base + STAMP.handle,
          transform: `rotate(${sway}deg) scaleY(${1 - squash})`,
          transformOrigin: "50% 100%",
        }}
      >
        <div style={{ position: "absolute", left: STAMP.w / 2 - 82, top: 0, width: 164, height: 74, borderRadius: 40, background: "#2B3240" }} />
        <div style={{ position: "absolute", left: STAMP.w / 2 - 36, top: 54, width: 72, height: STAMP.handle - 44, borderRadius: 12, background: "#3A4252" }} />
        <div style={{ position: "absolute", left: 30, top: STAMP.handle - 26, width: STAMP.w - 60, height: 34, borderRadius: 10, background: "#2B3240" }} />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: STAMP.handle,
            width: STAMP.w,
            height: STAMP.base,
            borderRadius: 22,
            background: STAMP_RED,
            boxShadow: "inset 0 -10px 0 rgba(0,0,0,0.12)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: SANS,
            color: "#FFFFFF",
          }}
        >
          <span style={{ fontSize: 92, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.95 }}>403</span>
          <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: "0.16em" }}>ACCESS DENIED</span>
        </div>
      </div>
    </>
  );
};

export const StampShards: React.FC<{ f: number }> = ({ f }) => {
  const b = stampBottom(1);
  return (
    <>
      <Shards f={f} at={SMASH.stamp} rect={{ x: STAMP.x - STAMP.w / 2, y: b - STAMP.base, w: STAMP.w, h: STAMP.base }} impact={{ x: STAMP.x, y: b - STAMP.base }} fill={STAMP_RED} stroke="#C8241B" cols={5} rows={2} push={0} life={22} />
      <Shards f={f} at={SMASH.stamp} rect={{ x: STAMP.x - 82, y: b - STAMP.base - STAMP.handle, w: 164, h: STAMP.handle }} impact={{ x: STAMP.x, y: b - STAMP.base - STAMP.handle }} fill="#2B3240" stroke="#1C2230" cols={2} rows={3} push={0} life={20} />
    </>
  );
};
