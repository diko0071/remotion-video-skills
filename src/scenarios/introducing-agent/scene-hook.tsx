import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { measureText } from "@remotion/layout-utils";
import { keyedCamera } from "../../core/stage";
import { KeyedRig } from "../../kit/keyed-rig";
import { Bot, blinkTrack } from "./bot";
import { BotKey } from "./bots";
import { SANS } from "./font";
import { HOOK_BLOCK_X, HOOK_FLY_CX, HOOK_FLY_CY, HOOK_FLY_ROT, HOOK_FLY_SIZE } from "./curves";
import { INK, r, sample } from "./timings";

const ZF = 0.5;
const BIG = { size: 600, cy: 737, zoom: 2.9 } as const;
const FLY = r(11);
const FLY_END = r(36);
const LAND = r(48);
const CAM = [
  { at: 0, zoom: BIG.zoom, x: 960, y: 540 },
  { at: FLY, zoom: BIG.zoom, x: 960, y: 540 },
  { at: r(30), zoom: 1.05, x: 960, y: 540 },
  { at: LAND, zoom: ZF, x: 960, y: 540 },
] as const;
const toWorld = (sx: number, sy: number, z: number) => ({ x: 960 + (sx - 960) / z, y: 540 + (sy - 540) / z });
const finalWorld = (sx: number, sy: number) => toWorld(sx, sy, ZF);

const TITLE = { size: 150, y: 400 } as const;
const WORD = { size: 170, y: 570 } as const;
const tw = (text: string, size: number, weight: string) => measureText({ text, fontFamily: SANS, fontSize: size, fontWeight: weight, letterSpacing: "-0.02em" }).width;

const ReplaceLine: React.FC<{ text: string; size: number; weight: number; left: number; top: number; lineIn: number; letterAt: (i: number) => number; swaps: { idx: number; kind: BotKey; at: number }[] }> = ({ text, size, weight, left, top, lineIn, letterAt, swaps }) => {
  const frame = useCurrentFrame();
  const botW = size * 0.8;
  return (
    <div style={{ position: "absolute", left, top, fontFamily: SANS, fontSize: size, fontWeight: weight, letterSpacing: "-0.02em", color: INK, lineHeight: 1, whiteSpace: "pre", display: "flex", alignItems: "flex-end", opacity: lineIn, transform: `translateY(${(1 - lineIn) * 20}px)` }}>
      {text.split("").map((ch, i) => {
        const swap = swaps.find((sw) => sw.idx === i);
        const gw = tw(ch, size, String(weight));
        const lp = interpolate(frame, [letterAt(i), letterAt(i) + 3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(2)) });
        const sp = swap ? interpolate(frame, [swap.at, swap.at + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.6)) }) : 0;
        const w = gw + (botW + 6 - gw) * Math.min(1, Math.max(0, sp));
        return (
          <span key={i} style={{ position: "relative", display: "inline-block", width: w, height: size, opacity: lp, transform: `scale(${0.6 + 0.4 * lp})` }}>
            <span style={{ position: "absolute", left: 0, bottom: 0, opacity: 1 - Math.min(1, sp * 3) }}>{ch}</span>
            {swap ? (
              <span style={{ position: "absolute", left: 3, top: size * 0.22, transform: `scale(${Math.max(0, sp)})`, transformOrigin: "50% 50%", opacity: sp > 0 ? 1 : 0 }}>
                <Bot kind={swap.kind} size={botW} />
              </span>
            ) : null}
          </span>
        );
      })}
    </div>
  );
};

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const z = keyedCamera(CAM, frame).zoom;
  const titleW = tw("introducing", TITLE.size, "500");
  const wordW = tw("Ryze AI", WORD.size, "600");
  const wordLeft = 960 - (wordW + 120) / 2 + 120;
  const introLeft = 960 - titleW / 2;
  const slotScreen = { x: wordLeft - 80, y: WORD.y + 78 };
  const slotW = finalWorld(slotScreen.x, slotScreen.y);
  const textW = finalWorld(0, 0);
  const big = frame < FLY;
  const fly = frame >= FLY && frame < FLY_END;
  const flyCx = sample(HOOK_FLY_CX, frame, FLY);
  const flyCy = sample(HOOK_FLY_CY, frame, FLY);
  const flySize = sample(HOOK_FLY_SIZE, frame, FLY);
  const flyRot = sample(HOOK_FLY_ROT, frame, FLY);
  const blockX = sample(HOOK_BLOCK_X, frame, FLY);
  const zAt = (f: number) => keyedCamera(CAM, f).zoom;
  const exitW = toWorld(-260, 120, zAt(FLY_END));
  const exitSize = 260 / zAt(FLY_END);
  const arc = interpolate(frame, [FLY_END, LAND], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const arcX = interpolate(arc, [0, 1], [exitW.x, slotW.x], { easing: Easing.inOut(Easing.quad) });
  const lift = Math.sin(arc * Math.PI) * -260;
  const arcY = interpolate(arc, [0, 1], [exitW.y, slotW.y], { easing: Easing.in(Easing.quad) }) + lift;
  const dropSize = interpolate(arc, [0, 0.7, 1], [exitSize, 100 / ZF, 100 / ZF], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const dropRot = interpolate(arc, [0, 1], [-40, 360]);
  const squash = interpolate(frame, [LAND, LAND + 2, LAND + 6], [0, 0.9, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const landed = frame >= LAND;
  const flyW = toWorld(flyCx, flyCy, z);
  const blockW = toWorld(blockX, 812, z);
  const beat = 1 + 0.05 * Math.max(0, Math.sin(Math.max(0, frame - r(2)) / 2.2)) * (frame < r(9) ? 1 : 0);
  const titleIn = interpolate(frame, [r(38), r(44)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const letterAt = (i: number) => r(40) + i * 2;
  return (
    <AbsoluteFill>
      <KeyedRig id="hook-rig" keys={CAM} bg="#FDFDFD">
        {fly ? <div style={{ position: "absolute", left: blockW.x, top: blockW.y, width: 388 / z, height: 268 / z, background: "#000" }} /> : null}
        {big ? (
          <div style={{ position: "absolute", left: 960 - BIG.size / 2, top: BIG.cy - BIG.size / 2, transform: `scale(${beat})`, transformOrigin: "50% 100%" }}>
            <Bot kind="hero" size={BIG.size} mood={frame >= r(7) ? "happy" : "open"} blink={blinkTrack(frame, [r(4)])} gaze={{ x: 0, y: 0 }} />
          </div>
        ) : null}
        {fly ? (
          <div style={{ position: "absolute", left: flyW.x - flySize / z / 2, top: flyW.y - flySize / z / 2 }}>
            <Bot kind="hero" size={flySize / z} mood="happy" rotate={flyRot} />
          </div>
        ) : null}
        {frame >= FLY_END ? (
          <div style={{ position: "absolute", left: arcX - dropSize / 2, top: arcY - dropSize / 2 }}>
            <Bot kind="hero" size={dropSize} rotate={landed ? 0 : dropRot} squash={squash} gaze={{ x: 0, y: landed ? 0 : 0.4 }} blink={blinkTrack(frame, [r(66)])} />
          </div>
        ) : null}
        <div style={{ position: "absolute", left: textW.x, top: textW.y, width: 1920, height: 1080, transform: `scale(${1 / ZF})`, transformOrigin: "0 0" }}>
          <ReplaceLine text="introducing" size={TITLE.size} weight={500} left={introLeft} top={TITLE.y} lineIn={titleIn} letterAt={() => -100} swaps={[{ idx: 1, kind: "ads", at: r(48) }, { idx: 4, kind: "geo", at: r(52) }, { idx: 9, kind: "sales", at: r(54) }]} />
          <ReplaceLine text="Ryze AI" size={WORD.size} weight={600} left={wordLeft} top={WORD.y} lineIn={1} letterAt={letterAt} swaps={[{ idx: 3, kind: "creative", at: r(58) }]} />
        </div>
      </KeyedRig>
    </AbsoluteFill>
  );
};
