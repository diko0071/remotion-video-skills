import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CamKey, keyedCamera } from "../core/stage";
import { DirectionalBlur } from "./directional-blur";
import { FocusCamera } from "./focus-camera";

export const KeyedRig: React.FC<{ id: string; keys: readonly CamKey[]; bg: string; children: React.ReactNode }> = ({ id, keys, bg, children }) => {
  const frame = useCurrentFrame();
  const cam = keyedCamera(keys, frame);
  return (
    <AbsoluteFill style={{ background: bg }}>
      <FocusCamera zoom={cam.zoom} focus={{ x: cam.x, y: cam.y }}>
        <DirectionalBlur id={id} x={cam.blurX / cam.zoom} y={cam.blurY / cam.zoom} style={{ position: "absolute", inset: 0, background: bg }}>
          {children}
        </DirectionalBlur>
      </FocusCamera>
    </AbsoluteFill>
  );
};

export const projectThroughKeys = (keys: readonly CamKey[], frame: number, x: number, y: number) => {
  const cam = keyedCamera(keys, frame);
  return { x: 960 + (x - cam.x) * cam.zoom, y: 540 + (y - cam.y) * cam.zoom };
};
