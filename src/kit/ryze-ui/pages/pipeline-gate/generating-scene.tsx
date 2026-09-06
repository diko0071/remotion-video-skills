import React from "react";
import { useCurrentFrame } from "remotion";
import { SparkIcon } from "../../icons";
import "./pipeline-gate.css";

export const GateGenerating: React.FC<{
  text: string;
  hint: string;
  style?: React.CSSProperties;
}> = ({ text, hint, style }) => {
  const frame = useCurrentFrame();
  const pulse = 1 + 0.06 * Math.sin(frame / 7);
  return (
    <div className="gate-generating" style={style}>
      <div className="g-orb" style={{ scale: String(pulse) }}>
        <SparkIcon />
      </div>
      <div className="g-text">{text}…</div>
      <div className="g-hint">{hint}</div>
    </div>
  );
};
