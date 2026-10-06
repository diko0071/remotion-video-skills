import React from "react";
import { Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { DirectionalBlur } from "../../kit/directional-blur";
import { SANS } from "./font";
import { INK, PANEL, r } from "./timings";

export const CARD = { x: 353, y: 250, w: 1214, h: 860 } as const;
export const PANEL_BOX = { x: 383, bottom: 1040, w: 1154, h: 310 } as const;

const eo = Easing.out(Easing.cubic);

export const WindowCard: React.FC<{ at: number; x?: number; y?: number; width?: number; height?: number; exitAt?: number; children: React.ReactNode }> = ({ at, x = CARD.x, y = CARD.y, width = CARD.w, height = CARD.h, exitAt, children }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at, at + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: eo });
  const ex = exitAt !== undefined ? interpolate(frame, [exitAt, exitAt + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) }) : 0;
  return (
    <DirectionalBlur id={`wc-${at}`} x={(1 - p) * 6} y={ex * 16} style={{ position: "absolute", left: x + (1 - p) * 26, top: y - ex * 70, width, height, opacity: p, transform: `scale(${1 - ex * 0.1})`, transformOrigin: "50% 0%" }}>
      <div style={{ position: "absolute", inset: 0, background: "#FFFFFF", borderRadius: 26, border: "1.5px solid #ECECEC", boxShadow: "0 30px 70px rgba(23,19,16,0.08)", overflow: "hidden", fontFamily: SANS, color: INK }}>
        <div style={{ display: "flex", gap: 10, padding: "22px 26px 0" }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <span key={c} style={{ width: 16, height: 16, borderRadius: 8, background: c }} />
          ))}
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 60, height: 1.5, background: "#F0F0F0" }} />
        {children}
      </div>
    </DirectionalBlur>
  );
};

export const Skeleton: React.FC<{ rows: number; x: number; y: number; width: number; gap?: number }> = ({ rows, x, y, width, gap = 34 }) => (
  <>
    {Array.from({ length: rows }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: x, top: y + i * gap, width: width * (i === rows - 1 ? 0.55 : 1), height: 16, borderRadius: 8, background: "#F1F1F1" }} />
    ))}
  </>
);

export const StatusPill: React.FC<{ at: number; label: string; x: number; y: number; hide?: number; typeFrom?: number }> = ({ at, label, x, y, hide = 999999, typeFrom }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at, at + 7], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.7)) });
  const out = interpolate(frame, [hide, hide + 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const typed = typeFrom === undefined ? label.length : Math.min(label.length, Math.floor(Math.max(0, frame - typeFrom) / 0.6));
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) scale(${Math.max(0, p)})`, opacity: p > 0 ? 1 - out : 0, background: PANEL, color: "#FFF", borderRadius: 999, padding: "18px 32px 18px 24px", display: "flex", alignItems: "center", gap: 14, fontFamily: SANS, fontSize: 30, fontWeight: 500, whiteSpace: "pre" }}>
      <svg width={22} height={22} viewBox="0 0 16 16"><rect x={3} y={7} width={10} height={7} rx={2} fill="#FFF" /><path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="#FFF" strokeWidth={1.8} fill="none" /></svg>
      {label.slice(0, typed)}
    </div>
  );
};

export const DarkPanel: React.FC<{ height: number; icon: string; label: string; title: string; meta: string; body: string; bodyAt: number }> = ({ height, icon, label, title, meta, body, bodyAt }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", left: PANEL_BOX.x, top: PANEL_BOX.bottom - height, width: PANEL_BOX.w, height, overflow: "hidden", background: PANEL, color: "#FFF", borderRadius: 22, boxShadow: "0 24px 60px rgba(0,0,0,0.28)", fontFamily: SANS }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: PANEL_BOX.w, padding: "28px 36px 30px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#9A9A9A", fontSize: 24 }}>
          <Img src={staticFile(icon)} style={{ width: 28, height: 28, objectFit: "contain" }} />
          {label}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 16 }}>
          <span style={{ fontSize: 30, fontWeight: 600 }}>{title}</span>
          <span style={{ fontSize: 22, color: "#9A9A9A" }}>{meta}</span>
        </div>
        <div style={{ marginTop: 14, fontSize: 26, lineHeight: 1.4, color: "#D6D6D6", opacity: interpolate(frame, [bodyAt, bodyAt + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>{body}</div>
      </div>
    </div>
  );
};

export const cardExitAt = (cut: number) => cut - r(5);
