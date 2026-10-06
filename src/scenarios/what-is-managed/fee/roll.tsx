import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { measureText } from "@remotion/layout-utils";
import { ramp } from "../../../core/motion";

const SPAN = 8;

export type RollFont = { fontFamily: string; fontSize: number; fontWeight: number; letterSpacing: string; lineHeight: number };

export const Roll: React.FC<{ values: readonly string[]; marks: readonly number[]; font: RollFont; color: string; fitWidth?: boolean }> = ({
  values,
  marks,
  font,
  color,
  fitWidth,
}) => {
  const f = useCurrentFrame();
  let idx = 0;
  for (let i = 0; i < marks.length; i++) if (f >= marks[i]) idx = i + 1;
  const since = idx === 0 ? SPAN : f - marks[idx - 1];
  const p = ramp(since, 0, SPAN, Easing.out(Easing.cubic));
  const prev = idx === 0 ? values[0] : values[idx - 1];
  const measure = (text: string) =>
    measureText({ text, fontFamily: font.fontFamily, fontSize: font.fontSize, fontWeight: String(font.fontWeight), letterSpacing: font.letterSpacing }).width;
  const width = fitWidth ? measure(prev) + (measure(values[idx]) - measure(prev)) * p : undefined;
  const text: React.CSSProperties = {
    position: "absolute",
    left: 0,
    top: 0,
    whiteSpace: "nowrap",
    fontFamily: font.fontFamily,
    fontSize: font.fontSize,
    fontWeight: font.fontWeight,
    letterSpacing: font.letterSpacing,
    lineHeight: `${font.lineHeight}px`,
    color,
  };
  return (
    <span style={{ position: "relative", display: "inline-block", width: width ?? "100%", height: font.lineHeight, overflow: "hidden", verticalAlign: "bottom" }}>
      <span style={{ ...text, transform: `translateY(${(1 - p) * font.lineHeight}px)` }}>{values[idx]}</span>
      {p < 1 ? <span style={{ ...text, transform: `translateY(${-p * font.lineHeight}px)` }}>{prev}</span> : null}
    </span>
  );
};
