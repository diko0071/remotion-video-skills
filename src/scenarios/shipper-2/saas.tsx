import React from "react";
import { AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Video } from "@remotion/media";
import { INTER } from "./fonts";
import { CUT_SAAS, MEME, ORANGE } from "./timings";

const GRID = "rgba(0,0,0,0.07)";

export const SaasScene: React.FC = () => {
  const frame = useCurrentFrame() + CUT_SAAS;
  const slide = interpolate(frame, [MEME.from, MEME.from + 9], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.exp) });
  const shrink = interpolate(frame, [MEME.shrinkAt, MEME.to], [1, 0.02], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  const spread = interpolate(slide, [0, 1], [14, 470]);
  const w = 800;
  const h = 450;
  return (
    <AbsoluteFill style={{ background: "#fff", fontFamily: INTER }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 200, height: 1, background: GRID }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 200 + h + 40, height: 1, background: GRID }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 560, width: 1, background: GRID }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 560 + w, width: 1, background: GRID }} />
      <div style={{ position: "absolute", right: 960 + spread, top: 330, fontSize: 200, fontWeight: 500, color: ORANGE, lineHeight: 1 }}>Sa</div>
      <div style={{ position: "absolute", left: 960 + spread, top: 330, fontSize: 200, fontWeight: 500, color: ORANGE, lineHeight: 1 }}>aS</div>
      <div
        style={{
          position: "absolute",
          left: 560,
          top: 220,
          width: w,
          height: h,
          overflow: "hidden",
          transformOrigin: "center",
          transform: `translateX(${(1 - slide) * -1500}px) scale(${shrink})`,
          opacity: frame >= MEME.from ? 1 : 0,
        }}
      >
        <Video src={staticFile("shipper-2/meme.mp4")} objectFit="cover" style={{ width: "100%", height: "100%" }} />
      </div>
    </AbsoluteFill>
  );
};
