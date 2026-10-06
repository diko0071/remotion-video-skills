import React from "react";
import { useCurrentFrame } from "remotion";
import { Eyes, GlyphBall, GlyphBallName, LogoBadge } from "../../kit/glyph-ball";
import { hopAt, landSquash } from "./bounce";


export const ChannelBall: React.FC<{
  ball: GlyphBallName;
  size: number;
  logo: string;
  stress: Eyes;
  happyAt: number;
  eyeColor?: string;
  lookX?: number;
}> = ({ ball, size, logo, stress, happyAt, eyeColor, lookX = -0.8 }) => {
  const f = useCurrentFrame();
  const j = f - happyAt;
  const hop = hopAt(f, happyAt, size * 0.24);
  const worried = f < happyAt;
  const jitter = worried ? Math.sin(f * 1.7) * 3 : 0;
  const squash = landSquash(f, happyAt + 14) + (j < 0 && j > -4 ? 0.07 : 0) + (worried ? Math.sin(f * 0.8) * 0.03 : 0);
  return (
    <div style={{ transform: `translate(${jitter}px, ${hop}px)` }}>
      <GlyphBall
        f={f}
        size={size}
        ball={ball}
        eyeColor={eyeColor}
        track={[{ at: -99, eyes: stress }, { at: happyAt, eyes: "happy" }]}
        gaze={worried ? { x: lookX, y: 0.25 } : { x: 0.1, y: -0.3 }}
        squash={squash}
        tilt={worried ? Math.sin(f * 1.1) * 4 : 0}
        blinks={[happyAt + 20]}
        shadow={0}
        badge={<LogoBadge src={logo} size={size * 0.3} />}
      />
    </div>
  );
};
