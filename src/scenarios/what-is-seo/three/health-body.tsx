import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { ramp } from "../../../core/motion";
import { AuditScoreRing } from "../../../kit/ryze-ui/pages/technical-audit";
import { HEALTH } from "../data";

export const HealthBody: React.FC<{ at: number }> = ({ at }) => {
  const f = useCurrentFrame();
  const p = ramp(f, at, at + 26, Easing.out(Easing.cubic));
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <AuditScoreRing value={HEALTH.after} tone="#059669" stroke="#10b981" label="Site health" sub="No critical issues" progress={p} displayValue={Math.round(HEALTH.after * p)} />
    </div>
  );
};
