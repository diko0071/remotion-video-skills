import React from "react";
import { AbsoluteFill, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/PlusJakartaSans";
import { CANVAS, DuoScreen, DUO_TOTAL, foldAt } from "./screen";

const { fontFamily } = loadFont();
const INK = "#171310";
const VIDEO_FROM = 78;

export const DUO_TEAM_GEN_TOTAL = DUO_TOTAL;

export const DuoTeamGen: React.FC = () => {
  const frame = useCurrentFrame();
  const f = foldAt(frame);
  const swap = interpolate(f, [0.25, 0.6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cap = interpolate(frame, [104, 114], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <DuoScreen>
        <div style={{ position: "absolute", inset: 0, background: "#FDFAF3", opacity: swap }}>
          <Sequence from={VIDEO_FROM} layout="none">
            <OffthreadVideo src={staticFile("duo/screen-b.mp4")} muted style={{ position: "absolute", left: 0, top: 0, width: CANVAS.w, height: CANVAS.h, objectFit: "cover" }} />
          </Sequence>
          <div style={{ position: "absolute", left: 80, top: 56, width: 100, height: 76, background: "#FBF5EA", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: 8 }}>
            <Img src={staticFile("ryze-sun.png")} style={{ width: 42, height: 42 }} />
          </div>
        </div>
        <div style={{ position: "absolute", left: CANVAS.w / 2, top: 0, width: CANVAS.w / 2, height: CANVAS.h, opacity: 1 - swap }}>
          <div style={{ position: "absolute", inset: 0, background: "#FDFAF3" }} />
          <Img src={staticFile("duo/screen-a.png")} style={{ position: "absolute", left: 0, top: 66, width: CANVAS.w / 2, height: (CANVAS.w / 2) * (2400 / 1792), objectFit: "cover", display: "block" }} />
        </div>
      </DuoScreen>
      <div style={{ position: "absolute", left: 0, right: 0, top: 80, textAlign: "center", fontFamily, fontSize: 48, fontWeight: 600, letterSpacing: "-0.02em", color: INK, opacity: cap, transform: `translateY(${(1 - cap) * 14}px)` }}>Your marketing team fits in your pocket. Unfolds when you need it.</div>
    </AbsoluteFill>
  );
};
