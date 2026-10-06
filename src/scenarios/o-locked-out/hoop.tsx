import React from "react";
import { Img } from "remotion";
import { clamp01, springAt } from "../../core/motion";
import { SANS } from "../../kit/launch";
import { Check } from "./icons";
import { HOOP, HOOP_Y } from "./level";
import { LOGOS, OK_GREEN, STAMP_RED } from "./theme";
import { RING_T, SMASH } from "./timings";

const FLIP = SMASH.ring - 4;
const DONE_AT = SMASH.ring + 10;
const POP = { damping: 11, stiffness: 190, mass: 0.7 };

const Cross: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: "block" }}>
    <circle cx={50} cy={50} r={50} fill={STAMP_RED} />
    <path d="M34 34 L66 66 M66 34 L34 66" stroke="#FFFFFF" strokeWidth={12} strokeLinecap="round" />
  </svg>
);

const hitKick = (f: number) => {
  const d = f - RING_T.hit;
  return d >= 0 && d < 16 ? 0.09 * Math.exp(-d / 3.2) * Math.cos(d * 1.1) : 0;
};

export const HoopInside: React.FC<{ f: number; fps: number }> = ({ f, fps }) => {
  const blocked = f >= RING_T.hit && f < FLIP;
  const blockPop = springAt(f, fps, RING_T.hit, POP);
  const fade = clamp01((f - FLIP) / 4);
  const done = springAt(f, fps, DONE_AT, POP);
  return (
    <div
      style={{
        position: "absolute",
        left: HOOP.x - HOOP.r,
        top: HOOP_Y - HOOP.r,
        width: HOOP.r * 2,
        height: HOOP.r * 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: SANS,
        transform: `scale(${1 + hitKick(f)})`,
      }}
    >
      {f < RING_T.hit ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <Img src={LOGOS.shopify} style={{ width: 92, height: 92, objectFit: "contain" }} />
          <span style={{ fontSize: 28, fontWeight: 800, color: "#4B5563", textAlign: "center", lineHeight: 1.2 }}>
            Connecting to
            <br />
            your store…
          </span>
        </div>
      ) : f < DONE_AT ? (
        <div style={{ opacity: blocked ? 1 : 1 - fade, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, transform: `scale(${0.6 + 0.4 * blockPop})` }}>
          <Cross size={104} />
          <span style={{ fontSize: 28, fontWeight: 800, color: STAMP_RED, textAlign: "center", lineHeight: 1.15 }}>
            Connection
            <br />
            blocked
          </span>
        </div>
      ) : (
        <div style={{ transform: `scale(${0.4 + 0.6 * done})`, opacity: clamp01(done * 2), display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <Check size={120} color="#FFFFFF" bg={OK_GREEN} />
          <span style={{ fontSize: 28, fontWeight: 800, color: "#1F7A3A" }}>Connected</span>
        </div>
      )}
    </div>
  );
};

export const HoopRing: React.FC<{ f: number }> = ({ f }) => {
  const r = HOOP.r;
  const circ = 2 * Math.PI * r;
  const spinning = f < RING_T.hit;
  const green = f >= FLIP;
  const track = green ? OK_GREEN : spinning ? "#DCE0E5" : STAMP_RED;
  const k = 1 + hitKick(f);
  const wave = f - RING_T.hit;
  const flash = f - FLIP;
  return (
    <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width={1} height={1}>
      <g transform={`translate(${HOOP.x} ${HOOP_Y}) scale(${k}) translate(${-HOOP.x} ${-HOOP_Y})`}>
        <circle cx={HOOP.x} cy={HOOP_Y} r={r} fill="none" stroke={track} strokeWidth={HOOP.stroke} />
        {spinning ? (
          <circle
            cx={HOOP.x}
            cy={HOOP_Y}
            r={r}
            fill="none"
            stroke="#2B3240"
            strokeWidth={HOOP.stroke}
            strokeLinecap="round"
            strokeDasharray={`${(100 / 360) * circ} ${circ}`}
            transform={`rotate(${f * 11} ${HOOP.x} ${HOOP_Y})`}
          />
        ) : null}
      </g>
      {wave >= 0 && wave < 14 ? (
        <circle cx={HOOP.x} cy={HOOP_Y} r={r + 20 + wave * 12} fill="none" stroke={STAMP_RED} strokeWidth={Math.max(2, 12 - wave * 0.8)} opacity={1 - wave / 14} />
      ) : null}
      {flash >= 0 && flash < 14 ? (
        <circle cx={HOOP.x} cy={HOOP_Y} r={r + 20 + flash * 12} fill="none" stroke={OK_GREEN} strokeWidth={Math.max(2, 12 - flash * 0.8)} opacity={1 - flash / 14} />
      ) : null}
    </svg>
  );
};
