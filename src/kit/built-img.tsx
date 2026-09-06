import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRINGS } from "../core/motion";

export const BuiltImg: React.FC<{
  src: string;
  start: number;
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
}> = ({ src, start, style, imgStyle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - start, fps, config: SPRINGS.smooth, durationInFrames: 30 });
  return (
    <div style={{ overflow: "hidden", ...style, opacity: p }}>
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${interpolate(p, [0, 1], [1.08, 1])})`,
          ...imgStyle,
        }}
      />
    </div>
  );
};
