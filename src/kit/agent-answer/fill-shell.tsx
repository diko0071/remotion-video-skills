import React from "react";
import { useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { riseP } from "../rise-letters";

export type FillShellProps = {
  at: number;
  len?: number;
  rise?: number;
  fill?: readonly [number, number];
  skeleton?: React.ReactNode;
  skeletonStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  children: React.ReactNode | ((fill: number) => React.ReactNode);
};

export const FillShell: React.FC<FillShellProps & { len: number; rise: number }> = ({ at, len, rise, fill, skeleton, skeletonStyle, contentStyle, style, children }) => {
  const frame = useCurrentFrame();
  const p = riseP(frame, at, len);
  const f = fill ? ramp(frame, fill[0], fill[1]) : 1;
  const body = typeof children === "function" ? children(f) : children;
  return (
    <div style={{ ...style, opacity: p, transform: `translateY(${(1 - p) * rise}px)` }}>
      {skeleton ? <div style={{ ...skeletonStyle, opacity: 1 - f }}>{skeleton}</div> : null}
      {contentStyle ? <div style={{ ...contentStyle, opacity: f }}>{body}</div> : body}
    </div>
  );
};
