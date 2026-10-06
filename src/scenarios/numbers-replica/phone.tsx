import React from "react";
import { INTER } from "./font";

export const SCREEN_W = 393;
export const SCREEN_H = 852;
export const BEZEL = 12;
export const PHONE_W = SCREEN_W + BEZEL * 2;
export const PHONE_H = SCREEN_H + BEZEL * 2;
export const PHONE_SCALE = 2.2;
export const PHONE_X = 960 - (PHONE_W * PHONE_SCALE) / 2;
export const PHONE_TOP = 120;

export const toWorld = (sx: number, sy: number, top = PHONE_TOP) => ({
  x: PHONE_X + (BEZEL + sx) * PHONE_SCALE,
  y: top + (BEZEL + sy) * PHONE_SCALE,
});

const Signal: React.FC<{ color: string }> = ({ color }) => (
  <svg width={18} height={12} viewBox="0 0 18 12">
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={i * 4.6} y={9 - i * 3} width={3.2} height={3 + i * 3} rx={0.8} fill={color} />
    ))}
  </svg>
);

const Wifi: React.FC<{ color: string }> = ({ color }) => (
  <svg width={17} height={12} viewBox="0 0 17 12" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round">
    <path d="M1.5 4.2a10 10 0 0 1 14 0M4.2 7a6 6 0 0 1 8.6 0" />
    <circle cx={8.5} cy={10} r={1.3} fill={color} stroke="none" />
  </svg>
);

const Battery: React.FC<{ color: string }> = ({ color }) => (
  <svg width={27} height={13} viewBox="0 0 27 13">
    <rect x={0.8} y={0.8} width={22} height={11.4} rx={3.4} fill="none" stroke={color} strokeOpacity={0.4} strokeWidth={1.2} />
    <rect x={2.6} y={2.6} width={18.4} height={7.8} rx={2} fill={color} />
    <rect x={24.2} y={4.4} width={1.8} height={4.2} rx={0.9} fill={color} fillOpacity={0.45} />
  </svg>
);

export const StatusBar: React.FC<{ dark?: boolean }> = ({ dark }) => {
  const c = dark ? "#fff" : "#000";
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 54, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 30px 0 44px", fontFamily: INTER, fontWeight: 600, fontSize: 16.5, color: c }}>
      <span>9:41</span>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <Signal color={c} />
        <Wifi color={c} />
        <Battery color={c} />
      </div>
    </div>
  );
};

export const Phone: React.FC<{ dark?: boolean; top: number; opacity?: number; children: React.ReactNode }> = ({ dark, top, opacity = 1, children }) => (
  <div
    style={{
      position: "absolute",
      left: PHONE_X,
      top,
      width: PHONE_W,
      height: PHONE_H,
      transform: `scale(${PHONE_SCALE})`,
      transformOrigin: "0 0",
      opacity,
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: 66,
        background: dark ? "#1C1C1E" : "#1A1A1A",
        boxShadow: dark ? "inset 0 0 0 1.6px #6E6E73, 0 0 0 1px #2A2A2A" : "inset 0 0 0 1.6px #5A5A5E, 0 30px 70px rgba(0,0,0,0.12)",
      }}
    />
    <div style={{ position: "absolute", left: BEZEL, top: BEZEL, width: SCREEN_W, height: SCREEN_H, borderRadius: 55, overflow: "hidden", background: dark ? "#000" : "#fff" }}>
      {children}
      <div style={{ position: "absolute", left: SCREEN_W / 2 - 62, top: 11, width: 124, height: 36, borderRadius: 20, background: "#000" }} />
      <StatusBar dark={dark} />
    </div>
  </div>
);
