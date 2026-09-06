import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../../../core/motion";
import { Camera } from "../camera";
import { PALETTE } from "../timings";
import { AppStage } from "./app-work";
import { UI_FONT } from "../ui/composer";

export const MoneyBloomShot: React.FC = () => {
  const frame = useCurrentFrame();
  const pop = useSpringAt(2, SPRINGS.pop, 14);
  const glow = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const reveal = interpolate(frame, [1, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: PALETTE.black }}>
      <Camera
        keys={[
          { frame: 0, zoom: 0.87, blur: 4 },
          { frame: 9, zoom: 0.94, blur: 9 },
          { frame: 43, zoom: 1.0, blur: 11 },
        ]}
      >
        <AppStage
          text="hi claude, pls make me $10k/mo, no mistakes"
          codeAt={-60}
          adOpacity={1}
        />
      </Camera>

      <AbsoluteFill
        style={{
          background: `radial-gradient(130% 85% at 32% 128%, ${PALETTE.limeSoft}ee 0%, ${PALETTE.limeSoft}55 42%, transparent 72%)`,
          opacity: glow,
        }}
      />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingBottom: 190 }}>
        <div
          style={{
            fontFamily: UI_FONT,
            fontSize: 116,
            fontWeight: 500,
            letterSpacing: "-0.03em",
            color: PALETTE.lime,
            opacity: Math.min(1, pop * 1.4),
            transform: `scale(${interpolate(pop, [0, 1], [0.88, 1])}) translateX(${interpolate(pop, [0, 1], [46, 0])}px)`,
          }}
        >
          <span
            style={{
              display: "inline-block",
              clipPath: `inset(0 ${interpolate(reveal, [0, 1], [100, 0])}% 0 0)`,
              backgroundImage:
                "linear-gradient(180deg, #F0FF7A 0%, #CBF52B 46%, #A8D414 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            + $158,43
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
