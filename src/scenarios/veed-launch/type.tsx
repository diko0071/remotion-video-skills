import React from "react";
import { AbsoluteFill, Easing, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { INTER } from "./font";
import { GREY, INK, TYPE } from "./timings";

const DOT_GRID: React.CSSProperties = {
  backgroundImage: "radial-gradient(circle, #DADADA 1.6px, transparent 1.9px)",
  backgroundSize: "48px 48px",
  backgroundPosition: "24px 24px",
};

const IBeam: React.FC<{ h: number; w: number; bar: number }> = ({ h, w, bar }) => (
  <div style={{ position: "relative", width: w, height: h }}>
    <div style={{ position: "absolute", left: (w - bar) / 2, top: 0, width: bar, height: h, background: INK }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: w, height: bar, background: INK }} />
    <div style={{ position: "absolute", left: 0, bottom: 0, width: w, height: bar, background: INK }} />
  </div>
);

const Line: React.FC<{ frame: number }> = ({ frame }) => {
  const T = TYPE;
  if (frame >= T.lineUntil) return null;
  let text = "";
  let italic = false;
  let color = INK;
  let size: number = T.or.size;
  let weight = 400;
  if (frame < T.or.bigUntil) {
    text = "or";
    size = T.or.bigSize;
    weight = 700;
  } else if (frame < T.or.until) {
    text = "or";
  } else {
    const typed = [...T.typed].reverse().find((t) => frame >= t.at);
    text = typed ? typed.t : "just";
    if (frame < T.just.blackAt) {
      italic = true;
      color = GREY;
    }
  }
  const caret = frame >= T.just.at + 9 && frame < T.caretUntil && Math.floor((frame - T.just.at) / 16) % 2 === 0;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 529 - size * 0.62, display: "flex", justifyContent: "center", alignItems: "center", fontFamily: INTER, fontSize: size, fontWeight: weight, fontStyle: italic ? "italic" : "normal", color, letterSpacing: "-0.01em", whiteSpace: "pre" }}>
      <span>{text}</span>
      {caret && <span style={{ marginLeft: 6, display: "inline-block" }}><IBeam h={size * 0.98} w={size * 0.32} bar={Math.max(4, size * 0.05)} /></span>}
    </div>
  );
};

const BigCaret: React.FC<{ frame: number }> = ({ frame }) => {
  const C = TYPE.bigCaret;
  if (frame < C.at) return null;
  if (frame >= C.offAt && frame < C.onAt) return null;
  const grow = ramp(frame, C.at, C.growTo, Easing.out(Easing.cubic));
  const h = C.h0 + (C.h1 - C.h0) * grow;
  const w = 118 + 42 * grow;
  const typing = frame >= TYPE.prompt.at;
  const text = typing ? typedPrompt(frame) : "";
  const size = promptSize(text.length);
  return (
    <div style={{ position: "absolute", left: typing ? TYPE.prompt.left : 0, right: typing ? undefined : 0, top: 528, display: "flex", alignItems: "center", justifyContent: typing ? "flex-start" : "center", transform: "translateY(-50%)", fontFamily: INTER, fontSize: size, color: INK, letterSpacing: "-0.02em", whiteSpace: "pre" }}>
      {typing && <span>{text}</span>}
      <IBeam h={typing ? Math.max(size * 1.1, 120) : h} w={typing ? size * 0.3 : w} bar={typing ? Math.max(6, size * 0.05) : 22} />
    </div>
  );
};

const typedPrompt = (frame: number) => {
  const n = Math.max(0, Math.floor((frame - TYPE.prompt.at) * TYPE.prompt.cps * 2.2));
  return TYPE.prompt.text.slice(0, n);
};

export const promptSize = (chars: number) => Math.max(TYPE.prompt.sizeMin, TYPE.prompt.size0 - Math.max(0, chars - 9) * 16);

export const TypeScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#fff", ...DOT_GRID }}>
      <Line frame={frame} />
      <BigCaret frame={frame} />
    </AbsoluteFill>
  );
};
