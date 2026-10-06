import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { measureText } from "@remotion/layout-utils";
import { loadFont } from "@remotion/google-fonts/Outfit";
import { Deco, DecoKind } from "./deco";

export const HEADLINE_FONT = loadFont().fontFamily;
const SANS = HEADLINE_FONT;
export const INK = "#171310";
export const GREY = "#8E8A84";

export type LineDeco = { kind: DecoKind; color: string; at: number; word: number; chars?: readonly [number, number]; dx?: number; dy?: number; rotate?: number; scale?: number };

export type WordSpec = { text: string; at?: number; color?: string; node?: React.ReactNode; nodeAt?: number };

export type HeadLine = { at: number; words: readonly WordSpec[]; decos?: readonly LineDeco[]; color?: string };

const eo = Easing.out(Easing.cubic);

export const lineStyle = (size: number, color = INK, weight = 500): React.CSSProperties => ({
  fontFamily: SANS,
  fontSize: size,
  fontWeight: weight,
  letterSpacing: "-0.02em",
  color,
  lineHeight: 1.2,
  whiteSpace: "pre",
});

export const textWidth = (text: string, size: number, weight: number) => measureText({ text, fontFamily: SANS, fontSize: size, fontWeight: String(weight), letterSpacing: "-0.02em" }).width;

const NODE_W = 96;

const InlineNode: React.FC<{ at: number; width: number; children: React.ReactNode }> = ({ at, width, children }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at, at + 7], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.6)) });
  return (
    <span style={{ display: "inline-block", width: width * Math.max(0, p), verticalAlign: "-0.1em", whiteSpace: "nowrap", overflow: "visible" }}>
      <span style={{ display: "inline-block", transform: `scale(${Math.max(0, p)})`, transformOrigin: "center" }}>{children}</span>
    </span>
  );
};

const hex = (c: string) => [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];
export const mix = (a: string, b: string, t: number) => {
  const A = hex(a);
  const B = hex(b);
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(",")})`;
};

const Word: React.FC<{ w: WordSpec; lineAt: number; last: boolean; ink: string }> = ({ w, lineAt, last, ink }) => {
  const frame = useCurrentFrame();
  const at = w.at ?? lineAt;
  const p = interpolate(frame, [at, at + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: eo });
  const tone = interpolate(frame, [at + 2, at + 9], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const c = w.color ?? (tone < 1 ? mix(GREY, ink, tone) : ink);
  return (
    <span style={{ display: "inline-block", opacity: p, transform: `translateY(${(1 - p) * 18}px)`, color: c }}>
      {w.node ? <InlineNode at={w.nodeAt ?? at} width={NODE_W}>{w.node}</InlineNode> : null}
      {w.text}
      {last ? "" : " "}
    </span>
  );
};

const decoPlace = (line: HeadLine, d: LineDeco, size: number, weight: number, frame: number) => {
  let x = 0;
  for (let i = 0; i < d.word; i++) {
    const w = line.words[i];
    x += textWidth(w.text + " ", size, weight);
    if (w.node && frame >= (w.nodeAt ?? w.at ?? line.at)) x += NODE_W;
  }
  const w = line.words[d.word];
  if (w.node && frame >= (w.nodeAt ?? w.at ?? line.at)) x += NODE_W;
  const ww = textWidth(w.text, size, weight);
  if (d.kind === "under") {
    const [a, b] = d.chars ?? [0, w.text.length];
    const x0 = x + textWidth(w.text.slice(0, a), size, weight);
    const x1 = x + textWidth(w.text.slice(0, b), size, weight);
    return { x: x0 + (d.dx ?? 0), y: size * 1.06 + (d.dy ?? 0), width: x1 - x0 };
  }
  if (d.kind === "tick") return { x: x + ww + 2 + (d.dx ?? 0), y: size * 0.12 - 8 + (d.dy ?? 0), width: undefined };
  return { x: x + ww + 4 + (d.dx ?? 0), y: size * 0.16 + (d.dy ?? 0), width: undefined };
};

export const Headline: React.FC<{ lines: readonly HeadLine[]; size?: number; y?: number; x?: number; weight?: number; ink?: string; exitAt?: number; exitLen?: number; liftTo?: number; liftAt?: number; zoom?: { at: number; to: number; len: number } }> = ({ lines, size = 96, y = 540, x = 960, weight = 500, ink = INK, exitAt, exitLen = 6, liftTo, liftAt, zoom }) => {
  const frame = useCurrentFrame();
  const lineH = size * 1.2;
  let visible = 0;
  for (const l of lines) visible += interpolate(frame, [l.at, l.at + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: eo });
  const blockH = Math.max(1, visible) * lineH;
  const lift = liftAt !== undefined && liftTo !== undefined ? interpolate(frame, [liftAt, liftAt + 14], [0, liftTo - y], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: eo }) : 0;
  const exit = exitAt !== undefined ? interpolate(frame, [exitAt, exitAt + exitLen], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
  const z = zoom ? interpolate(frame, [zoom.at, zoom.at + zoom.len], [1, zoom.to], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: eo }) : 1;
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity: 1 - exit }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: y + lift - blockH / 2, textAlign: "center", transform: `scale(${z})`, transformOrigin: `${x}px 50%` }}>
        {lines.map((line, li) => (
          <div key={li} style={{ ...lineStyle(size, line.color ?? ink, weight), height: lineH }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              {line.words.map((w, i) => (
                <Word key={i} w={w} lineAt={line.at} last={i === line.words.length - 1} ink={line.color ?? ink} />
              ))}
              {line.decos?.map((d, i) => {
                const pl = decoPlace(line, d, size, weight, frame);
                return <Deco key={i} kind={d.kind} color={d.color} at={d.at} x={pl.x} y={pl.y} width={pl.width} rotate={d.rotate} scale={d.scale} />;
              })}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
