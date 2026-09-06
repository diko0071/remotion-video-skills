import React from "react";
import { Img, staticFile } from "remotion";
import "./seo-home.css";
import { ChevronDown } from "./icons";
import { GrowthPhase } from "./types";

export const PhaseCard: React.FC<{
  phase: GrowthPhase;
  style?: React.CSSProperties;
}> = ({ phase, style }) => (
  <div className="phase-card" style={style}>
    <div className="phase-head">
      <Img src={staticFile(phase.icon)} />
      <span className="phase-txt">
        <span className="phase-months">{phase.months}</span>
        <span className="phase-title">{phase.title}</span>
        <span className="phase-outcome">{phase.outcome}</span>
      </span>
      <span className="phase-vol">
        <b>{phase.volume}</b>
        <span>search volume targeted</span>
      </span>
      <span className={`sh-chev${phase.open ? " open" : ""}`}>
        <ChevronDown />
      </span>
    </div>
    {phase.open ? (
      <div className="phase-open">
        <p>{phase.description}</p>
        <div className="phase-cols">
          <div>
            <h4>What&apos;s happening:</h4>
            <ul>
              {phase.milestones.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>What you&apos;ll get:</h4>
            <ul>
              {phase.results.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    ) : null}
  </div>
);
