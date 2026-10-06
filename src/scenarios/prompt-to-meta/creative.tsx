import React from "react";
import { Img } from "remotion";
import { ChevronRight } from "lucide-react";
import { MOSAIC_LEVELS } from "./story";
import { asset, C } from "./theme";

export const creativeSrc = (id: string, level = MOSAIC_LEVELS) =>
  asset(level >= MOSAIC_LEVELS ? `gen/${id}.jpg` : `gen/${id}_m${Math.max(0, level)}.jpg`);

export const AdCreative: React.FC<{
  id: string;
  copy: string;
  width: number;
  level?: number;
  copyOpacity?: number;
  radius?: number;
}> = ({ id, copy, width, level = MOSAIC_LEVELS, copyOpacity = 1, radius = 14 }) => {
  const u = width / 100;
  return (
    <div style={{ position: "absolute", inset: 0, borderRadius: radius, overflow: "hidden", background: C.muted }}>
      <Img
        src={creativeSrc(id, level)}
        style={{ width: "100%", height: "100%", objectFit: "cover", imageRendering: level < MOSAIC_LEVELS ? "pixelated" : "auto" }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "46%",
          background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.58) 72%, rgba(0,0,0,0.66) 100%)",
          opacity: copyOpacity,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 6.4 * u,
          right: 6.4 * u,
          bottom: 6.4 * u,
          display: "flex",
          flexDirection: "column",
          gap: 3.4 * u,
          opacity: copyOpacity,
          transform: `translateY(${(1 - copyOpacity) * 3 * u}px)`,
        }}
      >
        <div
          style={{
            color: C.paper,
            fontWeight: 800,
            fontSize: 8.6 * u,
            lineHeight: 1.04,
            letterSpacing: "-0.03em",
            textShadow: "0 2px 14px rgba(0,0,0,0.35)",
          }}
        >
          {copy}
        </div>
        <div
          style={{
            alignSelf: "flex-start",
            display: "flex",
            alignItems: "center",
            gap: 0.8 * u,
            padding: `${1.9 * u}px ${2.8 * u}px`,
            borderRadius: 1.8 * u,
            background: C.paper,
            color: C.ink,
            fontWeight: 700,
            fontSize: 4.2 * u,
            letterSpacing: "-0.01em",
          }}
        >
          Shop now
          <ChevronRight size={4.4 * u} color={C.ink} strokeWidth={2.4} />
        </div>
      </div>
    </div>
  );
};
