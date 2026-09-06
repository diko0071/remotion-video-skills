import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { MARK_EYES, MARK_HEAD, MARK_VIEWBOX } from "./mark-paths";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { INTER } from "./fonts";
import { BALL, BALL_CENTER, CUT_ENDCARD, LOCKUP } from "./timings";

const inOut = Easing.inOut(Easing.cubic);

const Word: React.FC<{ at: number; children: string }> = ({ at, children }) => {
  const p = useSpringAt(at - CUT_ENDCARD, SPRINGS.pop, 10);
  return (
    <span style={{ display: "inline-block", opacity: Math.min(1, p * 2), transform: `scale(${interpolate(p, [0, 1], [0.7, 1])})` }}>
      {children}
    </span>
  );
};

export const EndcardScene: React.FC = () => {
  const frame = useCurrentFrame() + CUT_ENDCARD;
  const pop = useSpringAt(BALL.popAt - CUT_ENDCARD, SPRINGS.card, BALL.popLen);
  const shrink = interpolate(frame, [BALL.shrinkAt, BALL.shrinkAt + BALL.shrinkLen], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: inOut,
  });
  const size = interpolate(shrink, [0, 1], [BALL.big, BALL.small]) * interpolate(pop, [0, 1], [0.35, 1]);
  const cx = interpolate(shrink, [0, 1], [BALL_CENTER.x, LOCKUP.markX]);
  const cy = interpolate(shrink, [0, 1], [BALL_CENTER.y, 540]);
  const roll = interpolate(frame, [BALL.popAt, BALL.shrinkAt, BALL.shrinkAt + BALL.shrinkLen + 6], [-95, -70, -24], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const look = interpolate(frame, [274, 282, 290, 298], [0, 0.45, 0.45, 0.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  return (
    <AbsoluteFill style={{ background: "#fff" }}>
      <div
        style={{
          position: "absolute",
          left: cx - size / 2,
          top: cy - size / 2,
          width: size,
          height: size,
          opacity: Math.min(1, pop * 3),
          transform: `rotate(${roll}deg)`,
        }}
      >
        <svg width={size} height={size} viewBox={MARK_VIEWBOX} style={{ display: "block", overflow: "visible" }}>
          <path d={MARK_HEAD} fill="#0a0a0c" />
          <g transform={`translate(${look * 40} ${look * 10})`}>
            {MARK_EYES.map((d) => (
              <path key={d.slice(0, 12)} d={d} fill="#ffffff" />
            ))}
          </g>
        </svg>
      </div>
      <div
        style={{
          position: "absolute",
          left: LOCKUP.markX + BALL.small / 2 + LOCKUP.gap,
          top: 0,
          height: 1080,
          display: "flex",
          alignItems: "center",
          gap: 28,
          fontFamily: INTER,
          fontSize: LOCKUP.fontSize,
          fontWeight: 600,
          letterSpacing: "-0.03em",
          color: "#0a0a0c",
          lineHeight: 1,
        }}
      >
        <Word at={LOCKUP.wordAt[0]}>Grok</Word>
        <Word at={LOCKUP.wordAt[1]}>Bot</Word>
      </div>
    </AbsoluteFill>
  );
};
