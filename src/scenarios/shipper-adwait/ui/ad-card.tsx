import React from "react";
import { Img, interpolate, staticFile } from "remotion";
import { PALETTE } from "../timings";
import { UI_FONT } from "./composer";

export type AdBrand = "neon" | "higgsfield";

const Mark: React.FC<{ size: number; file: string }> = ({ size, file }) => (
  <Img
    src={staticFile(`shipper/icons/${file}`)}
    style={{ width: size, height: size, borderRadius: size * 0.26, flexShrink: 0 }}
  />
);

export const AdCard: React.FC<{
  brand: AdBrand;
  width: number;
  glow?: number;
  scale?: number;
}> = ({ brand, width, glow = 1, scale = 1 }) => {
  const size = 72 * scale;
  const isNeon = brand === "neon";

  return (
    <div
      style={{
        width,
        borderRadius: 20 * scale,
        background: "#141414",
        border: `1px solid ${PALETTE.line}`,
        padding: `${20 * scale}px ${26 * scale}px`,
        display: "flex",
        alignItems: "center",
        gap: 22 * scale,
        position: "relative",
        overflow: "hidden",
        fontFamily: UI_FONT,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(20,20,20,0) 18%, rgba(255,190,60,0.36) 38%, rgba(255,90,140,0.30) 52%, rgba(120,220,255,0.22) 66%, rgba(20,20,20,0) 84%)",
          filter: `blur(${26 * scale}px)`,
          opacity: interpolate(glow, [0, 1], [0, 1]),
        }}
      />
      <Mark size={size} file={isNeon ? "neon.png" : "higgsfield.png"} />
      <div style={{ position: "relative", lineHeight: 1.32 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8 * scale,
            color: "#8C8C8C",
            fontSize: 17 * scale,
            letterSpacing: "0.14em",
            fontWeight: 500,
          }}
        >
          <span style={{ fontSize: 15 * scale }}>●</span> SPONSORED
        </div>
        <div style={{ fontSize: 26 * scale, fontWeight: 600, letterSpacing: "-0.015em" }}>
          {isNeon ? (
            <span style={{ color: PALETTE.text }}>Neon · Serverless Postgres in seconds</span>
          ) : (
            <>
              <span style={{ color: "#F3F3F3" }}>Higgsfield </span>
              <span style={{ color: PALETTE.lime }}>· Create Viral AI Videos</span>
            </>
          )}
        </div>
      </div>
      <div
        style={{
          position: "relative",
          marginLeft: "auto",
          display: "flex",
          gap: 22 * scale,
          color: "#8A8A8A",
          fontSize: 30 * scale,
        }}
      >
        <span>↗</span>
        <span>✕</span>
      </div>
    </div>
  );
};
