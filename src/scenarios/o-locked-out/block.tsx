import React from "react";
import { Img } from "remotion";
import { clamp01, springAt } from "../../core/motion";
import { SANS } from "../../kit/launch";
import { Check, Padlock } from "./icons";
import { BLOCK } from "./level";
import { G, GOOGLE_BLUE, LOGOS } from "./theme";
import { BLOCK_T, SMASH } from "./timings";

const sinceLast = (f: number, marks: readonly number[]) => {
  const hit = [...marks].reverse().find((t) => f >= t);
  return hit === undefined ? 99 : f - hit;
};

export const blockHeight = (f: number) => {
  const p = clamp01((f - SMASH.block) / 6);
  return BLOCK.h - (BLOCK.h - BLOCK.pressed) * p;
};

export const Block: React.FC<{ f: number }> = ({ f }) => {
  const h = blockHeight(f);
  const on = f >= SMASH.block;
  const s = sinceLast(f, [BLOCK_T.on, ...BLOCK_T.stomps]);
  const wob = f < BLOCK_T.off && s < 12 ? 0.025 * Math.exp(-s / 3) * Math.cos(s * 1.7) : 0;
  const fly = f - SMASH.block;
  return (
    <>
      <div style={{ position: "absolute", left: BLOCK.x - BLOCK.w / 2, top: G - h, width: BLOCK.w, height: h, transform: `scaleY(${1 - wob})`, transformOrigin: "50% 100%" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 28,
            background: on ? GOOGLE_BLUE : "#ECEFF3",
            border: `4px solid ${on ? "#1557B0" : "#D3D9E0"}`,
            boxShadow: "0 24px 50px rgba(15,23,42,0.14)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            fontFamily: SANS,
            boxSizing: "border-box",
          }}
        >
          <div style={{ width: 62, height: 62, borderRadius: 14, background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={LOGOS.google} style={{ width: 40, height: 40, objectFit: "contain" }} />
          </div>
          <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.02em", color: on ? "#FFFFFF" : "#A1A8B2" }}>{on ? "Applied" : "Apply changes"}</span>
          {on ? <Check size={44} color="#FFFFFF" /> : null}
        </div>
      </div>
      {fly < 24 ? (
        <div
          style={{
            position: "absolute",
            left: BLOCK.x + BLOCK.w / 2 - 34 + (fly > 0 ? -fly * 12 : 0),
            top: G - BLOCK.h - 40 + (fly > 0 ? -fly * 16 + 1.4 * fly * fly : 0),
            transform: `rotate(${fly > 0 ? -fly * 22 : 0}deg)`,
            opacity: fly > 0 ? 1 - clamp01((fly - 12) / 12) : 1,
          }}
        >
          <Padlock size={58} />
        </div>
      ) : null}
    </>
  );
};

export const Tooltip: React.FC<{ f: number; fps: number }> = ({ f, fps }) => {
  if (f < BLOCK_T.tip || f >= BLOCK_T.off + 4) return null;
  const p = springAt(f, fps, BLOCK_T.tip, { damping: 12, stiffness: 190, mass: 0.7 });
  return (
    <div
      style={{
        position: "absolute",
        left: BLOCK.x + 92,
        top: G - BLOCK.h - 112,
        transform: `scale(${0.6 + 0.4 * p})`,
        transformOrigin: "0% 100%",
        opacity: clamp01(p * 2),
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "16px 24px 18px",
        borderRadius: 16,
        background: "#1C2230",
        color: "#FFFFFF",
        fontFamily: SANS,
        fontSize: 27,
        fontWeight: 700,
        whiteSpace: "nowrap",
        boxShadow: "0 18px 40px rgba(15,23,42,0.25)",
      }}
    >
      <Padlock size={26} color="#FFFFFF" hole="#1C2230" />
      You don't have permission
      <div style={{ position: "absolute", left: 26, bottom: -12, width: 0, height: 0, borderLeft: "12px solid transparent", borderRight: "12px solid transparent", borderTop: "13px solid #1C2230" }} />
    </div>
  );
};
