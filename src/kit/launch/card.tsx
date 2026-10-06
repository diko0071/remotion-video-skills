import React from "react";
import { Img } from "remotion";
import { C, SANS } from "./tokens";

export const LaunchCard: React.FC<{
  logo: string;
  title: string;
  sub: string;
  value: string;
  x: number;
  y: number;
  w: number;
  h: number;
  opacity: number;
  valueColor?: string;
  children?: React.ReactNode;
}> = ({ logo, title, sub, value, x, y, w, h, opacity, valueColor = C.ink, children }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: w,
      height: h,
      borderRadius: 20,
      background: C.white,
      border: `1.5px solid ${C.border}`,
      fontFamily: SANS,
      opacity,
      zIndex: 4,
    }}
  >
    <div style={{ position: "absolute", left: 36, top: 32, display: "flex", alignItems: "center", gap: 14 }}>
      <Img src={logo} style={{ width: 40, height: 40, objectFit: "contain" }} />
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
        <span style={{ fontSize: 26, fontWeight: 700, color: C.ink, letterSpacing: "-0.02em" }}>{title}</span>
        <span style={{ fontSize: 19, fontWeight: 500, color: C.mutedFg }}>{sub}</span>
      </div>
    </div>
    <div
      style={{
        position: "absolute",
        right: 36,
        top: 26,
        fontSize: 54,
        fontWeight: 800,
        letterSpacing: "-0.035em",
        color: valueColor,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {value}
    </div>
    {children}
  </div>
);
