import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export const AttachmentChip: React.FC<{
  name: string;
  image: string;
  meta?: string;
  start: number;
}> = ({ name, image, meta = "JPG · 2.4 MB", start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - start, fps, config: { damping: 14, mass: 0.8 } });
  if (frame < start) return null;
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        border: "1px solid var(--border)",
        borderRadius: 10,
        background: "var(--background)",
        padding: 6,
        paddingRight: 14,
        marginBottom: 12,
        opacity: Math.min(1, p * 1.4),
        transform: `scale(${interpolate(p, [0, 1], [0.7, 1])})`,
        transformOrigin: "left center",
      }}
    >
      <Img
        src={staticFile(image)}
        style={{ width: 44, height: 44, borderRadius: 7, objectFit: "contain", background: "#0A0E22" }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)" }}>{name}</span>
        <span style={{ fontSize: 11.5, color: "var(--muted-foreground)" }}>{meta}</span>
      </div>
    </div>
  );
};
