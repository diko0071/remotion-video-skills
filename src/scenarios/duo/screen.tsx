import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, staticFile, useCurrentFrame } from "remotion";
import { CORNERS as corners } from "./corners";
import { matrix3d, Pt } from "./homography";

export const CANVAS = { w: 1600, h: 1200 } as const;
export const DUO_TOTAL = 174;
const FOLDED = 0.67;
const OPEN = 1.42;

export const foldAt = (frame: number) => {
  const q = corners[Math.min(corners.length - 1, Math.max(0, frame))];
  const w = (q[1][0] - q[0][0] + q[2][0] - q[3][0]) / 2;
  const h = (q[3][1] - q[0][1] + q[2][1] - q[1][1]) / 2;
  return Math.min(1, Math.max(0, (w / h - FOLDED) / (OPEN - FOLDED)));
};

export const DuoScreen: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const i = Math.min(corners.length - 1, Math.max(0, frame));
  const q = corners[i];
  const f = foldAt(frame);
  const sx = CANVAS.w / 2 - (CANVAS.w / 2) * f;
  const src: Pt[] = [[sx, 0], [CANVAS.w, 0], [CANVAS.w, CANVAS.h], [sx, CANVAS.h]];
  const cx = (q[0][0] + q[1][0] + q[2][0] + q[3][0]) / 4;
  const cy = (q[0][1] + q[1][1] + q[2][1] + q[3][1]) / 4;
  const grow = (p: readonly [number, number]): Pt => [cx + (p[0] - cx) * 1.14, cy + (p[1] - cy) * 1.08];
  const dst: Pt[] = [grow(q[0]), grow(q[1]), grow(q[2]), grow(q[3])];
  const mask = staticFile(`duo/mask/${String(i).padStart(4, "0")}.png`);
  return (
    <AbsoluteFill style={{ background: "#F4F4F2" }}>
      <OffthreadVideo src={staticFile("duo/src.mp4")} style={{ width: 1920, height: 1080 }} muted />
      <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, WebkitMaskImage: `url(${mask})`, maskImage: `url(${mask})`, WebkitMaskSize: "1920px 1080px", maskSize: "1920px 1080px", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat" }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: CANVAS.w, height: CANVAS.h, transformOrigin: "0 0", transform: matrix3d(src, dst), overflow: "hidden", background: "#FDFAF3" }}>
          {children}
        </div>
        <Img src={staticFile("duo/mask/0000.png")} style={{ display: "none" }} />
      </div>
    </AbsoluteFill>
  );
};
