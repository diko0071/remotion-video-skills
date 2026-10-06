import React from "react";
import { AbsoluteFill, Easing, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { ramp, springAt, SPRINGS } from "../../core/motion";
import { PLATE_BG } from "./assets";
import { INTER } from "./font";
import { GREEN, INK, PLATES } from "./timings";

const DOTS: React.CSSProperties = {
  backgroundImage: "radial-gradient(circle, #222 2px, transparent 2.4px)",
  backgroundSize: "24px 24px",
};

export const Plates: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = springAt(frame, fps, PLATES.from, SPRINGS.pop, 9);
  const shrink = ramp(frame, PLATES.shrink[0], PLATES.shrink[1], Easing.in(Easing.cubic));
  const scale = Math.max(0, 0.06 + 0.94 * pop) * (1 - shrink);
  const fade = ramp(frame, PLATES.crossfade[0], PLATES.crossfade[1]);
  const bgIn = ramp(frame, PLATES.bgIn[0], PLATES.bgIn[1]);
  const white = ramp(frame, PLATES.bgWhite[0], PLATES.bgWhite[1]);
  const drift = ramp(frame, PLATES.from + PLATES.popLen, PLATES.shrink[0]);
  const { dotted, right, green, box } = PLATES;
  return (
    <AbsoluteFill style={{ background: "#fff" }}>
      <Img src={staticFile(PLATE_BG[0])} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", transform: "scale(1.7)", opacity: (1 - fade) * bgIn }} />
      <Img src={staticFile(PLATE_BG[1])} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%", transform: "scale(1.7)", opacity: fade * bgIn }} />
      <AbsoluteFill style={{ background: "#fff", opacity: white }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: "960px 540px" }}>
        <div style={{ position: "absolute", left: dotted.x - 12 * drift, top: dotted.y, width: dotted.w, height: dotted.h, background: "#fff" }}>
          <div style={{ position: "absolute", left: dotted.dots.x - dotted.x, top: dotted.dots.y - dotted.y, width: dotted.dots.w, height: dotted.dots.h, ...DOTS }} />
        </div>
        <div style={{ position: "absolute", left: right.x + 12 * drift, top: right.y, width: right.w, height: right.h, background: "#fff" }} />
        <div style={{ position: "absolute", left: green.x, top: green.y, width: green.w, height: green.h, background: `linear-gradient(90deg, ${GREEN} 0 ${green.split}px, #eaf6a4 ${green.split}px, #8ee6c2 ${green.split + 260}px, #2fc0bf ${green.split + 400}px, #b6ff2c 100%)` }} />
        <div style={{ position: "absolute", left: box.x, top: box.y, width: box.w, height: box.h, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: INTER, fontWeight: 900, fontSize: PLATES.fontSize, letterSpacing: "-0.02em", color: INK }}>
          {PLATES.text}
        </div>
      </div>
    </AbsoluteFill>
  );
};
