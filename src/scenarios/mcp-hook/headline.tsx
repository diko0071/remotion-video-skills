import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { DirectionalBlur } from "../../kit/directional-blur";
import { BIG_LEFT, LINE1_SHIFT, LINE2_LEFT, LINE2_LIFT, sample } from "./curves";
import { ramp } from "../../core/motion";
import { RiseLetters } from "../../kit/rise-letters";
import { SANS } from "./font";
import { BIG, INK, INK_SOFT, LINE, LINE1, LINE2 } from "./timings";

const lineStyle: React.CSSProperties = {
  fontFamily: SANS,
  fontSize: LINE.size,
  fontWeight: 600,
  letterSpacing: "-0.03em",
  color: INK,
  whiteSpace: "pre",
  lineHeight: 1,
};

const tone = (p: number) => {
  const c = Math.round(232 - p * (232 - 23));
  return `rgb(${c},${c},${c})`;
};

const LINE1_WORDS = ["Show", "up", "in", "AI", "answers"];

export const LineOne: React.FC = () => {
  const frame = useCurrentFrame();
  const shift = sample(LINE1_SHIFT, frame, LINE1.shiftFrom);
  const shiftPrev = sample(LINE1_SHIFT, frame - 1, LINE1.shiftFrom);
  const fade = ramp(frame, LINE1.shiftFrom + 6, LINE1.gone);
  if (frame > LINE1.gone) return null;
  return (
    <AbsoluteFill style={{ alignItems: "center", pointerEvents: "none" }}>
      <DirectionalBlur id="mh-line1" x={Math.abs(shift - shiftPrev) * 0.5} style={{ position: "absolute", top: LINE.y, transform: `translate(${shift}px, -50%)`, opacity: 1 - fade }}>
        <RiseLetters
          text={LINE1_WORDS}
          from={LINE1.words}
          len={9}
          rise={0.4}
          blur={5}
          style={{ ...lineStyle, display: "block" }}
          scale={(p, i) => 1 + 0.04 * Math.sin(Math.min(1, ramp(frame, LINE1.words[i] + 4, LINE1.words[i] + 16)) * Math.PI)}
          letterStyle={(p) => ({ color: tone(p) })}
          letter={(w, p, i) => (
            <>
              {w}
              {i < LINE1_WORDS.length - 1 ? " " : ""}
            </>
          )}
        />
      </DirectionalBlur>
    </AbsoluteFill>
  );
};

const TEXT = "By just talking to it";

export const BigType: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < BIG.from || frame >= BIG.gone) return null;
  const left = sample(BIG_LEFT, frame, BIG.from);
  const leftPrev = sample(BIG_LEFT, frame - 1, BIG.from);
  const speed = Math.abs(left - leftPrev);
  const fade = ramp(frame, BIG.fade, BIG.gone);
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <DirectionalBlur id="mh-big" x={speed * 0.28} style={{ position: "absolute", left, top: BIG.y, transform: "translateY(-50%)", opacity: 1 - fade }}>
        <div style={{ fontFamily: SANS, fontSize: BIG.size, fontWeight: 500, letterSpacing: "-0.04em", whiteSpace: "pre", lineHeight: 1 }}>
          {TEXT.split("").map((ch, i) => {
            const at = BIG.from + 2 + i / BIG.charsPerFrame;
            const p = ramp(frame, at, at + 4);
            return (
              <span key={i} style={{ color: tone(p), opacity: p > 0 ? 1 : 0 }}>
                {ch}
              </span>
            );
          })}
        </div>
      </DirectionalBlur>
    </AbsoluteFill>
  );
};

export const LineTwo: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < LINE2.from || frame >= LINE2.gone) return null;
  const left = sample(LINE2_LEFT, frame, LINE2.from);
  const lift = sample(LINE2_LIFT, frame, LINE2.lift);
  const liftPrev = sample(LINE2_LIFT, frame - 1, LINE2.lift);
  const fade = ramp(frame, LINE2.lift + 4, LINE2.gone);
  const itTone = ramp(frame, LINE2.softUntil, LINE2.softUntil + 8);
  const itStart = TEXT.length - 2;
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <DirectionalBlur id="mh-line2" y={Math.abs(lift - liftPrev) * 0.6} style={{ position: "absolute", left, top: LINE.y - lift, transform: "translateY(-50%)", opacity: 1 - fade }}>
        <div style={lineStyle}>
          {TEXT.split("").map((ch, i) => {
            const at = LINE2.from + i / LINE2.charsPerFrame;
            const p = ramp(frame, at, at + 4);
            const soft = i >= itStart ? itTone : 1;
            return (
              <span key={i} style={{ color: p === 0 ? "transparent" : soft < 1 ? INK_SOFT : tone(p) }}>
                {ch}
              </span>
            );
          })}
        </div>
      </DirectionalBlur>
    </AbsoluteFill>
  );
};

export const Headlines: React.FC = () => (
  <>
    <LineOne />
    <BigType />
    <LineTwo />
  </>
);
