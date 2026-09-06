import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SPRINGS, typing, useSpringAt } from "../../../core/motion";
import { Cursor } from "../../../kit/cursor";
import { Camera, CamKey } from "../camera";
import { PALETTE } from "../timings";
import { AdCard } from "../ui/ad-card";
import { CursorComposer, CursorWindow } from "../ui/cursor-app";

export const CursorStage: React.FC<{
  text: string;
  ad: number;
  caret?: boolean;
  scale?: number;
}> = ({ text, ad, caret = true, scale = 0.62 }) => (
  <CursorWindow>
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
        width: 1180 * scale + 380,
      }}
    >
      <div
        style={{
          opacity: ad,
          transform: `translateY(${interpolate(ad, [0, 1], [20, 0])}px)`,
          marginBottom: -8,
          position: "relative",
          zIndex: 2,
        }}
      >
        <AdCard brand="higgsfield" width={1180 * scale + 380} glow={ad} scale={scale} />
      </div>
      <CursorComposer value={text} width={1180 * scale + 380} caret={caret} scale={scale} />
    </div>
  </CursorWindow>
);

const wash = (frame: number, from: number, to: number, peak: number) =>
  interpolate(frame, [from, peak, to], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const WideSessionShot: React.FC = () => {
  const frame = useCurrentFrame();
  const text = typing(frame, "clone cluely and make it better.", 10, 46);
  const keys: CamKey[] = [
    { frame: 0, zoom: 0.88 },
    { frame: 59, zoom: 1.02 },
  ];
  return (
    <AbsoluteFill style={{ background: PALETTE.black }}>
      <Camera keys={keys}>
        <CursorStage text={text} ad={0} />
      </Camera>
    </AbsoluteFill>
  );
};

export const AdArrivesShot: React.FC = () => {
  const frame = useCurrentFrame();
  const ad = useSpringAt(4, SPRINGS.card, 16);
  return (
    <AbsoluteFill style={{ background: PALETTE.black }}>
      <Camera
        keys={[
          { frame: 0, zoom: 1.02 },
          { frame: 30, zoom: 2.5, x: 24, y: -34 },
        ]}
      >
        <CursorStage text="clone cluely and make it better." ad={ad} caret={false} />
      </Camera>
      <AbsoluteFill
        style={{
          background: `radial-gradient(120% 95% at 22% 108%, ${PALETTE.limeSoft}ee 0%, ${PALETTE.limeSoft}66 44%, transparent 78%)`,
          opacity: wash(frame, 2, 26, 12) * 0.62,
        }}
      />
    </AbsoluteFill>
  );
};

export const AdHoldShot: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: PALETTE.black }}>
      <Camera
        keys={[
          { frame: 0, zoom: 2.5, x: 24, y: -34 },
          { frame: 36, zoom: 2.82, x: 18, y: -44 },
        ]}
      >
        <CursorStage text="clone cluely and make it better." ad={1} caret={false} />
      </Camera>
      <AbsoluteFill
        style={{
          background: `radial-gradient(120% 95% at 22% 108%, ${PALETTE.limeSoft}cc 0%, ${PALETTE.limeSoft}55 44%, transparent 76%)`,
          opacity: interpolate(frame, [0, 16], [0.5, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Cursor
        stops={[
          { x: 1160, y: 560, at: 0 },
          { x: 806, y: 348, at: 24, click: true },
        ]}
        scale={2.1}
      />
    </AbsoluteFill>
  );
};
