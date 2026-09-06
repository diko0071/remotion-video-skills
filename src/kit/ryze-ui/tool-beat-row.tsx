import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRINGS } from "../../core/motion";
import { Shimmer } from "../../core/motion";
import { CheckIcon, ChevronRight } from "./icons";

export const ToolBeatRow: React.FC<{ label: string; start: number; doneAt: number }> = ({
  label,
  start,
  doneAt,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - start, fps, config: SPRINGS.smooth, durationInFrames: 18 });
  if (frame < start) return null;
  const done = frame >= doneAt;
  return (
    <div
      className="tool-row"
      style={{
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [10, 0])}px)`,
        fontSize: 15,
      }}
    >
      <span className="chev" style={{ color: done ? "var(--emerald-600)" : undefined }}>
        {done ? <CheckIcon size={15} /> : <ChevronRight size={15} />}
      </span>
      {done ? <span style={{ color: "rgba(15,23,42,0.7)" }}>{label}</span> : <Shimmer text={label} />}
    </div>
  );
};
