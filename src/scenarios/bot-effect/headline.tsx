import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { INTER } from "./fonts";
import { CUT_HEADLINE, ROBOT_AT, WORDS } from "./timings";

const Robot: React.FC = () => {
  const p = useSpringAt(ROBOT_AT - CUT_HEADLINE, SPRINGS.pop, 12);
  return (
    <Img
      src={staticFile("bot-effect/android-head.svg")}
      style={{
        position: "absolute",
        left: "50%",
        top: -66,
        width: 112,
        height: 71,
        marginLeft: -56,
        display: "block",
        opacity: Math.min(1, p * 2),
        transform: `scale(${interpolate(p, [0, 1], [0.4, 1])})`,
      }}
    />
  );
};

export const HeadlineScene: React.FC = () => {
  const frame = useCurrentFrame() + CUT_HEADLINE;
  return (
    <AbsoluteFill style={{ background: "#fff", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", gap: 19, fontFamily: INTER, fontSize: 90, fontWeight: 500, letterSpacing: "-0.035em", color: "#0a0a0c", lineHeight: 1 }}>
        {WORDS.map(([word, at], i) => {
          const o = interpolate(frame, [at, at + 2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const last = i === WORDS.length - 1;
          return (
            <span key={word} style={{ position: "relative", opacity: o, display: "inline-block" }}>
              {word}
              {last ? <Robot /> : null}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
