import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CamKey, keyedCamera } from "../core/stage";
import { DirectionalBlur } from "./directional-blur";

export const TiltRig: React.FC<{
  id: string;
  keys: readonly CamKey[];
  tilt: (f: number) => number;
  shake: (f: number) => { x: number; y: number };
  bg?: string;
  blur?: number;
  children: React.ReactNode;
}> = ({ id, keys, tilt, shake, bg = "transparent", blur = 1, children }) => {
  const f = useCurrentFrame();
  const cam = keyedCamera(keys, f);
  const s = shake(f);
  return (
    <AbsoluteFill style={{ background: bg, overflow: "hidden" }}>
      <DirectionalBlur id={id} x={cam.blurX * blur} y={cam.blurY * blur} style={{ position: "absolute", inset: 0 }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1920,
            height: 1080,
            transformOrigin: "960px 540px",
            transform: `translate(${s.x}px, ${s.y}px) rotate(${tilt(f)}deg)`,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 1920,
              height: 1080,
              transformOrigin: "0 0",
              transform: `translate(${960 - cam.x * cam.zoom}px, ${540 - cam.y * cam.zoom}px) scale(${cam.zoom})`,
            }}
          >
            {children}
          </div>
        </div>
      </DirectionalBlur>
    </AbsoluteFill>
  );
};
