import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { SPRINGS, useSpringAt, useVelocityBlur } from "../../core/motion";
import { Sfx } from "../../kit/sfx";
import { P } from "./timings";

export const AutopilotScene: React.FC = () => {
  const toggle = useSpringAt(P.toggleAt, SPRINGS.pop, 14);
  const knobBlur = useVelocityBlur(P.toggleAt, SPRINGS.pop, 14);
  const word = useSpringAt(P.word, SPRINGS.card, 16);
  const wordBlur = useVelocityBlur(P.word, SPRINGS.card, 16);
  const trackOn = interpolate(toggle, [0.3, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 44 }}>
      <Sfx name="mouse-click" at={P.toggleAt} />
      <div
        style={{
          width: 148,
          height: 80,
          borderRadius: 999,
          background: `color-mix(in oklab, #059669 ${trackOn * 100}%, rgba(23,19,16,0.14))`,
          display: "flex",
          alignItems: "center",
          padding: 8,
          boxSizing: "border-box",
          boxShadow: "inset 0 2px 6px rgba(20,15,10,0.12)",
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 999,
            background: "#ffffff",
            boxShadow: "0 4px 12px rgba(20,15,10,0.25)",
            transform: `translateX(${interpolate(toggle, [0, 1], [0, 68])}px)`,
            filter: knobBlur,
          }}
        />
      </div>
      <div
        style={{
          fontSize: 132,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          color: "#171310",
          whiteSpace: "nowrap",
          opacity: Math.min(1, word * 1.4),
          transform: `translateY(${interpolate(word, [0, 1], [40, 0])}px)`,
          filter: wordBlur,
        }}
      >
        Autopilot.
      </div>
      <SubLine />
    </AbsoluteFill>
  );
};

const SubLine: React.FC = () => {
  const p = useSpringAt(P.sub, SPRINGS.smooth, 20);
  return (
    <div
      style={{
        fontSize: 30,
        fontWeight: 600,
        color: "rgba(23,19,16,0.5)",
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [14, 0])}px)`,
      }}
    >
      Research 24/7. You just click Approve.
    </div>
  );
};
