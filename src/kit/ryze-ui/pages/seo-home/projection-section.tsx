import React from "react";
import "./seo-home.css";
import { PhaseCard } from "./phase-card";
import { GrowthPhase } from "./types";

export const ProjectionSection: React.FC<{
  phases: GrowthPhase[];
  title?: string;
  description?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({
  phases,
  title = "Your Next 12 Months, Projected by AI",
  description = (
    <>
      We simulated hundreds of accounts like yours to map exactly what our work
      delivers &mdash; month by month.
    </>
  ),
  style,
}) => (
  <div className="sh-expect" style={style}>
    <div className="sh-expect-head">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
    <div className="phase-list">
      {phases.map((p) => (
        <PhaseCard key={p.key} phase={p} />
      ))}
    </div>
  </div>
);
