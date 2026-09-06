import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { DitherField } from "../../kit/dither-field";

export const DITHER_LAB_TOTAL = 120;

const Quad: React.FC<{ x: number; y: number; children: React.ReactNode; bg: string }> = ({ x, y, children, bg }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 960, height: 540, overflow: "hidden", background: bg }}>{children}</div>
);

export const DitherLab: React.FC = () => {
  const frame = useCurrentFrame();
  const wipe = interpolate(frame, [0, 90], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: "#fff" }}>
      <Quad x={0} y={0} bg="#fff">
        <DitherField mode="posterize" palette={["#F4E2CF", "#E8B98C", "#D28A52", "#9A5C34", "#4A2E20"]} bands={5} scale={0.9} warp={0.7} grain={0.03} width={960} height={540} />
      </Quad>
      <Quad x={960} y={0} bg="#fff">
        <DitherField mode="posterize" palette={["#F4F4F4", "#BDBDBD", "#7A7A7A", "#3A3A3A", "#111111"]} bands={5} scale={0.9} warp={0.7} grain={0.03} seed={3} width={960} height={540} />
      </Quad>
      <Quad x={0} y={540} bg="#FBF6EE">
        <DitherField mode="ascii" palette={["#E9D9BF", "#D9BC8E", "#C29A5E", "#A87A3E", "#7A5628", "#4C3417"]} scale={0.7} cell={16} seed={5} width={960} height={540} />
      </Quad>
      <Quad x={960} y={540} bg="#fff">
        <DitherField mode="blocks" palette={["#1A1A1A", "#7F7F7F", "#BEBEBE", "#E4E4E4"]} cell={12} wipe={wipe} seed={7} width={960} height={540} />
      </Quad>
    </AbsoluteFill>
  );
};
