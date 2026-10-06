import React from "react";
import { Img } from "remotion";

export const LogoBadge: React.FC<{ src: string; size: number; tilt?: number; aspect?: number }> = ({ src, size, tilt = -10, aspect = 1 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      background: "#FFFFFF",
      boxShadow: `0 ${size * 0.08}px ${size * 0.22}px rgba(20,16,10,0.25)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transform: `rotate(${tilt}deg)`,
    }}
  >
    <Img src={src} style={{ width: size * 0.58, height: size * 0.58 * aspect, objectFit: "contain" }} />
  </div>
);
