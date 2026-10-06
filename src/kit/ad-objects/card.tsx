import React from "react";
import { Img } from "remotion";
import { C, SANS } from "../launch";
import { CARD_SHADOW } from "./tokens";

export const Card: React.FC<{ w: number; h?: number; pad?: string; shadow?: string; children: React.ReactNode }> = ({
  w,
  h,
  pad = "26px 30px",
  shadow = CARD_SHADOW,
  children,
}) => (
  <div
    style={{
      width: w,
      height: h,
      padding: pad,
      boxSizing: "border-box",
      borderRadius: 22,
      background: C.white,
      boxShadow: shadow,
      fontFamily: SANS,
      color: C.ink,
    }}
  >
    {children}
  </div>
);

export const CardHead: React.FC<{ logo: string; title: string; sub?: string }> = ({ logo, title, sub }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
    <Img src={logo} style={{ width: 36, height: 36, objectFit: "contain" }} />
    <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
      <span style={{ fontSize: 25, fontWeight: 700, letterSpacing: "-0.02em" }}>{title}</span>
      {sub ? <span style={{ fontSize: 18, fontWeight: 500, color: C.mutedFg }}>{sub}</span> : null}
    </div>
  </div>
);

export const LogoTile: React.FC<{ src: string; size?: number; shadow?: string }> = ({ src, size = 124, shadow = CARD_SHADOW }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.24,
      background: C.white,
      boxShadow: shadow,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Img src={src} style={{ width: size * 0.56, height: size * 0.56, objectFit: "contain" }} />
  </div>
);

export const Thumb: React.FC<{ src: string; size: number; h?: number; dim?: number; shadow?: string }> = ({ src, size, h, dim = 0, shadow = CARD_SHADOW }) => (
  <div style={{ position: "relative", width: size, height: h ?? size, borderRadius: 18, overflow: "hidden", boxShadow: shadow }}>
    <Img src={src} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    <div style={{ position: "absolute", inset: 0, background: `rgba(11,15,28,${0.55 * dim})` }} />
  </div>
);
