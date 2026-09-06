import React from "react";
import "../../pages.css";
import "./technical-audit.css";
import { HealthGauge } from "./health-gauge";
import { AuditScoreRing } from "./score-ring";
import { InfoIcon } from "./icons";

export type ScoreRingSpec = {
  value: number;
  tone: string;
  stroke?: string;
  label: string;
  sub: string;
  displayValue?: number;
};

export const AuditScoresCard: React.FC<{
  health: number;
  rings: ScoreRingSpec[];
  progress?: number;
  healthDisplay?: number;
  style?: React.CSSProperties;
}> = ({ health, rings, progress = 1, healthDisplay, style }) => (
  <div className="pg-card ta-scores" style={style}>
    <div className="ta-health">
      <div className="ta-score-label-row">
        <span className="ta-score-label">Health Score</span>
        <span className="ta-info">
          <InfoIcon />
        </span>
      </div>
      <div className="ta-gauge-wrap">
        <HealthGauge value={healthDisplay ?? health} progress={progress} />
      </div>
    </div>
    {rings.map((ring) => (
      <AuditScoreRing key={ring.label} {...ring} progress={progress} />
    ))}
  </div>
);
