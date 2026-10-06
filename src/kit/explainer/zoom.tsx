import React from "react";
import { STAGE } from "./stage";

export const zoomLeft = (w: number, s: number) => (STAGE.w - w * s) / 2;

export const zoomPoint = (w: number, s: number, top: number, x: number, y: number) => ({
  x: zoomLeft(w, s) + x * s,
  y: top + y * s,
});

export const Zoom: React.FC<{ w: number; s: number; top: number; style?: React.CSSProperties; children: React.ReactNode }> = ({ w, s, top, style, children }) => (
  <div style={{ position: "absolute", left: zoomLeft(w, s), top, width: w, transform: `scale(${s})`, transformOrigin: "0 0", ...style }}>{children}</div>
);
