import React from "react";
import { Img } from "remotion";
import { C } from "../launch";
import { AD_GREEN, AD_RED, CARD_SHADOW } from "./tokens";

export const ProductTile: React.FC<{ name: string; src: string; live: boolean; pop: number; shadow?: string; badge?: boolean }> = ({
  name,
  src,
  live,
  pop,
  shadow = CARD_SHADOW,
  badge = true,
}) => (
  <div style={{ width: 214, borderRadius: 20, background: C.white, boxShadow: shadow, overflow: "hidden" }}>
    <div style={{ height: 184, filter: `grayscale(${live ? 0 : 0.85})`, opacity: live ? 1 : 0.7 }}>
      <Img src={src} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
    <div style={{ padding: "12px 16px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{ fontSize: 21, fontWeight: 700, letterSpacing: "-0.02em", color: C.ink }}>{name}</span>
      <span
        style={{
          alignSelf: "flex-start",
          padding: "3px 12px 5px",
          borderRadius: 8,
          background: live ? AD_GREEN : AD_RED,
          color: C.white,
          fontSize: 17,
          fontWeight: 700,
          opacity: badge ? 1 : 0,
          transform: `scale(${live ? 0.8 + 0.2 * Math.min(1.15, pop) : 1})`,
          transformOrigin: "0 50%",
        }}
      >
        {live ? "Live" : "404"}
      </span>
    </div>
  </div>
);
