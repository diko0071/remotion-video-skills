import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { INTER } from "./font";
import { IconBubble, IconPhone, IconVideo } from "./icons";
import { OrbitMark } from "./mark";
import { BRAND, INK, LIGHT, LINE, TITLE } from "./timings";

const CX = 960;
const CY = 540;

const CHIPS = [
  { ring: 1, angle: -60, Icon: IconVideo, speed: 0.55 },
  { ring: 1, angle: 20, Icon: IconPhone, speed: 0.55 },
  { ring: 2, angle: 170, Icon: IconBubble, speed: -0.32 },
  { ring: 3, angle: 40, Icon: IconPhone, speed: 0.2 },
] as const;

const SQUARES = [
  { ring: 1, angle: -135, speed: 0.55 },
  { ring: 1, angle: 110, speed: 0.55 },
  { ring: 2, angle: -40, speed: -0.32 },
  { ring: 2, angle: 60, speed: -0.32 },
  { ring: 3, angle: -95, speed: 0.2 },
] as const;

const polar = (r: number, deg: number) => ({ x: CX + r * Math.cos((deg * Math.PI) / 180), y: CY + r * Math.sin((deg * Math.PI) / 180) });

const titleText = (frame: number) => {
  const w = TITLE.firstWord;
  if (frame < TITLE.deleteFrom) {
    const n = Math.floor(interpolate(frame, [TITLE.typeFrom, TITLE.typeTo], [0, w.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
    return { mark: false, text: w.slice(0, n) };
  }
  if (frame < TITLE.markAt) {
    const n = Math.ceil(interpolate(frame, [TITLE.deleteFrom, TITLE.deleteTo], [w.length, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
    return { mark: false, text: w.slice(0, n) };
  }
  const n = Math.floor(interpolate(frame, [TITLE.nameFrom, TITLE.nameTo], [0, BRAND.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  return { mark: true, text: BRAND.slice(0, n) };
};

const Ring: React.FC<{ r: number; dash: boolean; draw: number; rot: number }> = ({ r, dash, draw, rot }) => {
  const c = 2 * Math.PI * r;
  return (
    <circle
      cx={CX}
      cy={CY}
      r={r}
      fill="none"
      stroke={LINE}
      strokeWidth={dash ? 2.2 : 2.4}
      strokeDasharray={dash ? "12 10" : `${c * draw} ${c}`}
      strokeDashoffset={dash ? -rot * r * 0.02 : 0}
      opacity={dash ? draw : 1}
      transform={`rotate(${-90 + rot} ${CX} ${CY})`}
    />
  );
};

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [TITLE.creep[0], TITLE.creep[1]], [TITLE.creep[2], TITLE.creep[3]], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.sin) });
  const [t0, t1, t2, a0, a1] = TITLE.tilt;
  const tilt = interpolate(frame, [t0, t1, t2], [a0, a0, a1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const { mark, text } = titleText(frame);
  const eat = ramp(frame, TITLE.collapse.at, TITLE.collapse.eat, Easing.in(Easing.quad));
  const holeR = 6 + eat * 200;
  const swell = ramp(frame, TITLE.collapse.swell[0], TITLE.collapse.swell[1], Easing.in(Easing.cubic));
  const collapsing = frame >= TITLE.collapse.eat;
  const worldOpacity = 1 - ramp(frame, TITLE.collapse.eat - 2, TITLE.collapse.eat + 3);
  const markSize = TITLE.fontSize * 0.78;

  return (
    <AbsoluteFill style={{ background: LIGHT, overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: `${CX}px ${CY}px` }}>
        <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity: worldOpacity }}>
          {TITLE.rings.map((ring, i) => {
            const draw = ramp(frame, i * 3, 14 + i * 4, Easing.out(Easing.cubic));
            return <Ring key={i} r={ring.r} dash={ring.dash} draw={draw} rot={frame * ring.spin} />;
          })}
          <g transform={`rotate(${tilt} ${CX} ${CY})`} opacity={ramp(frame, 2, 12)}>
            <line x1={CX - 1100} y1={CY} x2={CX - 200} y2={CY} stroke={LINE} strokeWidth={2.2} />
            <line x1={CX + 200} y1={CY} x2={CX + 1100} y2={CY} stroke={LINE} strokeWidth={2.2} />
          </g>
          {SQUARES.map((s, i) => {
            const ring = TITLE.rings[s.ring];
            const p = polar(ring.r, s.angle + frame * s.speed);
            return <rect key={i} x={p.x - 8} y={p.y - 8} width={16} height={16} fill={INK} opacity={ramp(frame, 6 + i * 2, 12 + i * 2)} />;
          })}
        </svg>
        {CHIPS.map((c, i) => {
          const ring = TITLE.rings[c.ring];
          const p = polar(ring.r, c.angle + frame * c.speed);
          const o = ramp(frame, 8 + i * 3, 14 + i * 3) * worldOpacity;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: p.x - 34,
                top: p.y - 34,
                width: 68,
                height: 68,
                borderRadius: 34,
                background: LIGHT,
                border: `2px solid ${LINE}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: o,
                color: INK,
              }}
            >
              <c.Icon size={32} stroke={1.9} />
            </div>
          );
        })}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: CY - TITLE.fontSize * 0.62,
            height: TITLE.fontSize * 1.24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 18,
            fontFamily: INTER,
            fontSize: TITLE.fontSize,
            fontWeight: 450,
            letterSpacing: -2.5,
            color: INK,
            whiteSpace: "nowrap",
            opacity: collapsing ? 0 : 1,
          }}
        >
          {mark ? <OrbitMark size={markSize} /> : null}
          <span>{text}</span>
        </div>
        {frame >= TITLE.collapse.at && !collapsing ? (
          <div
            style={{
              position: "absolute",
              left: CX - holeR,
              top: CY - holeR,
              width: holeR * 2,
              height: holeR * 2,
              borderRadius: "50%",
              background: LIGHT,
              border: `2px solid ${LINE}`,
              boxShadow: `0 0 0 5px ${LIGHT}, 0 0 0 7px ${LINE}`,
            }}
          />
        ) : null}
      </AbsoluteFill>
      {collapsing ? (
        <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
          <circle cx={CX} cy={CY} r={200 * zoom + swell * 900} fill="none" stroke={LINE} strokeWidth={2} opacity={1 - swell} />
        </svg>
      ) : null}
    </AbsoluteFill>
  );
};
