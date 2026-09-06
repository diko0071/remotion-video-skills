import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SPRINGS, typing, useSpringAt } from "../../../core/motion";
import { HandCursor } from "../ui/hand-cursor";
import { Camera } from "../camera";
import { PALETTE } from "../timings";
import { AdCard } from "../ui/ad-card";
import { CodePanel, Sidebar } from "../ui/app-shell";
import { ShipperComposer } from "../ui/composer";
import { Mascot } from "../ui/mascot";

export const AppStage: React.FC<{
  text: string;
  caret?: boolean;
  codeAt?: number;
  adAt?: number;
  adOpacity?: number;
}> = ({ text, caret = true, codeAt = 40, adAt, adOpacity }) => {
  const frame = useCurrentFrame();
  const code = interpolate(frame, [codeAt, codeAt + 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const codeLines = interpolate(frame, [codeAt, codeAt + 26], [0, 11], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const adSpring = useSpringAt(adAt ?? 0, SPRINGS.card, 16);
  const ad = adOpacity ?? (adAt === undefined ? 0 : adSpring);

  return (
    <div
      style={{
        width: 1780,
        height: 1000,
        borderRadius: 20,
        background: "#0C0C0C",
        border: "1px solid #1A1A1A",
        display: "flex",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Sidebar />
      <div style={{ flex: 1, position: "relative" }}>
        <div style={{ opacity: 1 - code, position: "absolute", inset: 0, display: "grid", placeItems: "center", paddingBottom: 560, paddingRight: 60 }}>
          <Mascot width={400} />
        </div>
        <div style={{ opacity: code, position: "absolute", inset: 0 }}>
          <CodePanel lines={codeLines} />
        </div>

        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: 120,
            transform: "translateX(-50%)",
            width: 1170,
          }}
        >
          <div
            style={{
              height: interpolate(ad, [0, 1], [0, 74]),
              overflow: "hidden",
              marginBottom: -12,
            }}
          >
            <div style={{ transform: `translateY(${interpolate(ad, [0, 1], [-74, 0])}px)` }}>
              <AdCard brand="neon" width={1170} glow={ad} scale={0.62} />
            </div>
          </div>
          <ShipperComposer value={text} width={1170} caret={caret} scale={0.61} />
        </div>
      </div>
    </div>
  );
};

export const AppWorkShot: React.FC = () => {
  const frame = useCurrentFrame();
  const text = typing(frame, "hi claude, pls make me $10k/mo, no mistakes", 0, 12);

  return (
    <AbsoluteFill style={{ background: PALETTE.black }}>
      <Camera
        keys={[
          { frame: 0, zoom: 0.9, y: 6 },
          { frame: 64, zoom: 0.87, y: 0 },
        ]}
      >
        <div style={{ position: "relative" }}>
          <AppStage text={text} codeAt={23} adAt={21} />
          <HandCursor
            stops={[
              { x: 1230, y: 742, at: 0 },
              { x: 1286, y: 700, at: 22 },
              { x: 1272, y: 716, at: 46 },
            ]}
            scale={1.5}
          />
        </div>
      </Camera>
    </AbsoluteFill>
  );
};
