import React from "react";
import { Img, random } from "remotion";

export const PixelWipe: React.FC<{
  src: string;
  w: number;
  h: number;
  reveal: number;
  hide: number;
  cover: string;
  cell?: number;
  spread?: number;
  radius?: number;
  objectPosition?: string;
  seed?: string;
}> = ({ src, w, h, reveal, hide, cover, cell = 34, spread = 0.72, radius = 24, objectPosition = "50% 50%", seed = "p" }) => {
  if (reveal <= 0 || hide >= 1) return null;
  const cols = Math.ceil(w / cell);
  const rows = Math.ceil(h / cell);
  let path = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const inAt = (c / cols) * spread + random(`${seed}i${c}-${r}`) * (1 - spread);
      const outAt = ((cols - 1 - c) / cols) * spread + random(`${seed}o${c}-${r}`) * (1 - spread);
      if (reveal <= inAt || hide > outAt) path += `M${c * cell} ${r * cell}h${cell}v${cell}h${-cell}Z`;
    }
  }
  return (
    <div style={{ position: "relative", width: w, height: h, borderRadius: radius, overflow: "hidden" }}>
      <Img src={src} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition }} />
      <svg width={w} height={h} style={{ position: "absolute", left: 0, top: 0 }}>
        <path d={path} fill={cover} />
      </svg>
    </div>
  );
};
