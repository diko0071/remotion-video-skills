import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { cascade } from "../../core/schedule";
import { ChromeFrame } from "../../kit/chrome-ui";
import { DirectionalBlur } from "../../kit/directional-blur";
import { HEADLINE_FONT } from "../../kit/headline";
import { KeyedRig } from "../../kit/keyed-rig";
import { AGENTS, CAM_SWARM, CORAL, GROUND, INK, SWARM } from "./timings";

const seed = (i: number, k: number) => {
  const s = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return s - Math.floor(s);
};

const gaps = Array.from({ length: SWARM.count - 1 }, (_, i) => Math.max(SWARM.last, Math.round(SWARM.first - (SWARM.first - SWARM.last) * (i / (SWARM.count - 2)) ** 0.6)));
const MARKS = cascade(SWARM.from, gaps);
const FLY = 12;
const SIZE = 92;

const Visitor: React.FC<{ i: number }> = ({ i }) => {
  const frame = useCurrentFrame();
  const at = MARKS[i];
  const p = ramp(frame, at - FLY, at, Easing.out(Easing.cubic));
  const prev = ramp(frame - 1, at - FLY, at, Easing.out(Easing.cubic));
  const edge = i % 4;
  const land = { x: 180 + seed(i, 1) * 1480, y: 240 + seed(i, 2) * 700 };
  const from = edge === 0 ? { x: -160, y: land.y + (seed(i, 3) - 0.5) * 300 } : edge === 1 ? { x: 2080, y: land.y + (seed(i, 3) - 0.5) * 300 } : edge === 2 ? { x: land.x + (seed(i, 3) - 0.5) * 400, y: 1240 } : { x: land.x + (seed(i, 3) - 0.5) * 400, y: -160 };
  const x = from.x + (land.x - from.x) * p;
  const y = from.y + (land.y - from.y) * p;
  const speed = Math.hypot(land.x - from.x, land.y - from.y) * Math.abs(p - prev);
  const settle = ramp(frame, at, at + 6);
  const bump = settle > 0 && settle < 1 ? 1 + 0.18 * Math.sin(settle * Math.PI) : 1;
  if (p <= 0) return null;
  return (
    <DirectionalBlur id={`sa-v-${i}`} x={speed * 0.2} y={speed * 0.2} style={{ position: "absolute", left: x - SIZE / 2, top: y - SIZE / 2, width: SIZE, height: SIZE, borderRadius: 24, background: "#FFFFFF", boxShadow: "0 16px 36px rgba(15,23,42,0.22), 0 0 0 1px rgba(15,23,42,0.06)", display: "flex", alignItems: "center", justifyContent: "center", transform: `rotate(${(seed(i, 4) - 0.5) * 18}deg) scale(${bump})` }}>
      <Img src={staticFile(AGENTS[i % AGENTS.length])} style={{ width: 56, height: 56, objectFit: "contain" }} />
    </DirectionalBlur>
  );
};

const Counter: React.FC = () => {
  const frame = useCurrentFrame();
  const landed = MARKS.filter((m) => frame >= m).length;
  const value = Math.round(interpolate(landed, [0, SWARM.count], [9, 50]));
  const inP = ramp(frame, SWARM.counterAt, SWARM.counterAt + 8, Easing.out(Easing.back(1.6)));
  return (
    <div style={{ position: "absolute", left: 960, top: 170, transform: `translateX(-50%) scale(${0.6 + 0.4 * inP})`, opacity: inP, display: "flex", alignItems: "center", gap: 16, padding: "14px 30px", borderRadius: 999, background: INK, color: "#FFFFFF", fontFamily: HEADLINE_FONT, fontSize: 40, fontWeight: 500, boxShadow: "0 20px 50px rgba(15,23,42,0.3)", whiteSpace: "nowrap" }}>
      <span style={{ width: 14, height: 14, borderRadius: 7, background: CORAL }} />
      AI agents on your site
      <span style={{ color: "#F2B8A2", fontWeight: 600, fontVariantNumeric: "tabular-nums", minWidth: 96, textAlign: "right" }}>{value}%</span>
    </div>
  );
};

export const SwarmScene: React.FC = () => {
  const frame = useCurrentFrame();
  const dim = ramp(frame, SWARM.dim[0], SWARM.dim[1]);
  return (
    <AbsoluteFill style={{ background: GROUND }}>
      <KeyedRig id="sa-swarm" keys={CAM_SWARM} bg={GROUND}>
        <ChromeFrame host="shopify.com" tab={{ title: "Start and grow your e-commerce business | Shopify", favicon: "chrome-ext/favicons/shopify.png" }} pageStyle={{ filter: dim > 0.01 ? `blur(${dim * 8}px)` : undefined }}>
          <Img src={staticFile("chrome-ext/sites/shopify.png")} />
        </ChromeFrame>
        {Array.from({ length: SWARM.count }, (_, i) => (
          <Visitor key={i} i={i} />
        ))}
        <Counter />
      </KeyedRig>
    </AbsoluteFill>
  );
};
