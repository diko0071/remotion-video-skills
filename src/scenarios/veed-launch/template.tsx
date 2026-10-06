import React from "react";
import { AbsoluteFill, Easing, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { ramp } from "../../core/motion";
import { cursorAt } from "../../core/stage";
import { Cursor } from "../../kit/cursor";
import { FAN_CARDS } from "./assets";
import { INTER } from "./font";
import { DARK, FAN, TEMPLATE } from "./timings";

const DOT_GRID: React.CSSProperties = {
  backgroundImage: "radial-gradient(circle, #2a2a2a 1.6px, transparent 1.9px)",
  backgroundSize: "48px 48px",
  backgroundPosition: "24px 24px",
};

const W: React.FC<{ text: string; x: number; y: number; size: number; color?: string; italic?: boolean; weight?: number; center?: boolean }> = ({ text, x, y, size, color = "#fff", italic, weight = 400, center }) => (
  <div style={{ position: "absolute", left: center ? 0 : x, right: center ? 0 : undefined, top: y - size * 0.62, textAlign: center ? "center" : "left", fontFamily: INTER, fontSize: size, fontWeight: weight, fontStyle: italic ? "italic" : "normal", color, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>
    {text}
  </div>
);

type WordSpec = { text?: string; x: number; y: number; color: string; italic?: boolean; weight?: number; size?: number; center?: boolean };

const Words: React.FC = () => {
  const frame = useCurrentFrame();
  const T = TEMPLATE;
  if (frame >= T.fanAt) return null;
  if (frame < T.bigUntil) return <W text="start" x={0} y={532} size={T.bigSize} center />;
  const state = [...T.states].reverse().find((st) => frame >= st.from);
  if (!state) return null;
  const draw = (w: WordSpec | undefined, fallback: string) =>
    w ? <W text={w.text ?? fallback} x={w.x} y={w.y} size={w.size ?? T.size} color={w.color} italic={w.italic} weight={w.weight} center={w.center} /> : null;
  return (
    <>
      {draw("start" in state ? state.start : undefined, "start")}
      {draw("second" in state ? state.second : undefined, "")}
      {draw("third" in state ? state.third : undefined, "")}
    </>
  );
};

const Fan: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < FAN.born) return null;
  const out = ramp(frame, TEMPLATE.fanOut[0], TEMPLATE.fanOut[1], Easing.in(Easing.cubic));
  const camP = 1 - Math.pow(1 - ramp(frame, FAN.born, FAN.born + FAN.spreadLen + 3), 3);
  const cam = {
    x: FAN.camera.from.x + (FAN.camera.to.x - FAN.camera.from.x) * camP,
    y: FAN.camera.from.y + (FAN.camera.to.y - FAN.camera.from.y) * camP,
    z: FAN.camera.from.z + (FAN.camera.to.z - FAN.camera.from.z) * camP,
  };
  const drift = Math.max(0, frame - (FAN.born + FAN.spreadLen)) * FAN.drift;
  const cur = cursorAt(TEMPLATE.cursor, frame, fps);
  const cards = FAN_CARDS.slice(0, FAN.count).map((file, i) => {
    const e = 1 - Math.pow(1 - ramp(frame, FAN.born + i * FAN.stagger, FAN.born + i * FAN.stagger + FAN.spreadLen), 3);
    const fx = FAN.originX + i * FAN.stepX;
    const fy = FAN.originY + i * FAN.stepY;
    const fz = i * FAN.stepZ;
    const x = FAN.seed.x + (fx - FAN.seed.x) * e + drift;
    const y = FAN.seed.y + (fy - FAN.seed.y) * e;
    const z = fz * e;
    const depth = FAN.perspective / (FAN.perspective - z - cam.z);
    const sx = 960 + (x + cam.x - 960) * depth;
    return { file, i, x, y, z, e, dist: Math.abs(cur.x - sx) };
  });
  const nearest = cards.reduce((best, c) => (c.dist < best.dist ? c : best), cards[0]);
  const settled = frame > FAN.born + FAN.spreadLen;
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, perspective: FAN.perspective, perspectiveOrigin: "960px 540px", opacity: 1 - out }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 0, height: 0, transformStyle: "preserve-3d", transform: `translate3d(${cam.x}px, ${cam.y}px, ${cam.z}px) scale(${1 - out * 0.6})` }}>
        {cards.map(({ file, i, x, y, z, e, dist }) => {
          const away = Math.abs(i - nearest.i);
          const focusP = settled ? Math.max(0, 1 - Math.max(0, dist - FAN.stepX * 0.25) / (FAN.stepX * 0.5)) : 0;
          const w = FAN.cardW * (0.55 + 0.45 * e);
          const h = FAN.cardH * (0.55 + 0.45 * e);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: x - w / 2,
                top: y - h / 2 - FAN.focusLift * focusP,
                width: w,
                height: h,
                borderRadius: FAN.radius,
                overflow: "hidden",
                transform: `translateZ(${z + FAN.focusZ * focusP}px)`,
                zIndex: 100 - away,
                boxShadow: "0 12px 44px rgba(0,0,0,0.55)",
              }}
            >
              <Img src={staticFile(file)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Template: React.FC = () => (
  <AbsoluteFill style={{ background: DARK, ...DOT_GRID }}>
    <Words />
    <Fan />
    <Cursor stops={[...TEMPLATE.cursor]} appearAt={TEMPLATE.cursor[0].at + 4} scale={2.4} />
  </AbsoluteFill>
);
