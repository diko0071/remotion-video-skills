import React from "react";
import { useCurrentFrame } from "remotion";
import { useClickPress } from "../../../../core/press-context";
import "./pipeline-gate.css";

export const RunSetupButton: React.FC<{ pending?: boolean }> = ({ pending }) => {
  const frame = useCurrentFrame();
  const scale = useClickPress("setup.run");
  return (
    <span
      className="btn-primary btn-sm"
      data-click="setup.run"
      style={{ scale: String(scale), opacity: pending ? 0.75 : 1 }}
    >
      {pending ? (
        <span
          className="gate-spinner"
          style={{ rotate: `${(frame * 14) % 360}deg` }}
        />
      ) : null}
      Run setup
    </span>
  );
};
