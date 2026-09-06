import React from "react";
import { AbsoluteFill } from "remotion";

export const FocusCamera: React.FC<{
  zoom: number;
  focus: { x: number; y: number };
  width?: number;
  height?: number;
  viewport?: { w: number; h: number };
  children: React.ReactNode;
}> = ({ zoom, focus, width = 1920, height = 1080, viewport = { w: 1920, h: 1080 }, children }) => (
  <AbsoluteFill style={{ overflow: "hidden" }}>
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width,
        height,
        transformOrigin: "0 0",
        transform: `translate(${viewport.w / 2 - focus.x * zoom}px, ${viewport.h / 2 - focus.y * zoom}px) scale(${zoom})`,
      }}
    >
      {children}
    </div>
  </AbsoluteFill>
);
