import React from "react";
import { Img, staticFile } from "remotion";
import "./seo-home.css";
import { StepRow } from "./step-row";
import { SetupStep } from "./types";

export const SetupCard: React.FC<{
  steps: SetupStep[];
  title?: string;
  description?: React.ReactNode;
  hero?: string;
  style?: React.CSSProperties;
}> = ({
  steps,
  title = "2 Steps Left to Full Autopilot!",
  description = (
    <>
      Finish these steps and your growth engine runs on autopilot &mdash;
      articles, backlinks and fixes ship themselves.
    </>
  ),
  hero = "home/setup-path.webp",
  style,
}) => (
  <div className="setup-card sh-card" style={style}>
    <div className="setup-head">
      <div className="txt">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <Img className="sh-hero" src={staticFile(hero)} />
    </div>
    <div className="setup-steps">
      {steps.map((s) => (
        <StepRow key={s.n} step={s} />
      ))}
    </div>
  </div>
);
