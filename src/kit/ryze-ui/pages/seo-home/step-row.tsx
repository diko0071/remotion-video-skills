import React from "react";
import { Img, staticFile } from "remotion";
import { ArrowUpRightIcon } from "../../icons";
import "./seo-home.css";
import { ChevronDown } from "./icons";
import { StateMark } from "./state-mark";
import { SetupStep, SetupSub } from "./types";

export const SubRow: React.FC<{
  sub: SetupSub;
  style?: React.CSSProperties;
}> = ({ sub, style }) => {
  const state = sub.state;
  const logo = sub.logo;
  return (
    <div className="sh-sub" style={style}>
      <span className="sh-sub-rail">
        <span className="sh-sub-connector" />
        <StateMark state={state} />
      </span>
      {logo ? (
        <span
          className={
            logo.includes("shopify") ? "sh-sub-logo shopify" : "sh-sub-logo"
          }
        >
          <Img src={staticFile(logo)} />
        </span>
      ) : null}
      <span className={`sh-sub-label${state === "pending" ? " pending" : ""}`}>
        {sub.label}
      </span>
      <span className="sh-sub-arrow">
        <ArrowUpRightIcon />
      </span>
    </div>
  );
};

export const StepRow: React.FC<{
  step: SetupStep;
  style?: React.CSSProperties;
}> = ({ step, style }) => (
  <div className="sh-step" style={style}>
    <div className="sh-step-head">
      <StateMark state={step.state} />
      <span className={`sh-step-count${step.state === "done" ? " done" : ""}`}>
        {step.n} of 5
      </span>
      <span className="sh-step-title">{step.title}</span>
      <span className="sh-step-right">
        {step.logos ? (
          <span className="sh-logos">
            {step.logos.map((l) => (
              <span
                key={l}
                className={
                  l.includes("shopify") ? "sh-logo shopify" : "sh-logo"
                }
              >
                <Img src={staticFile(l)} />
              </span>
            ))}
          </span>
        ) : null}
        {step.state === "done" ? (
          <span className="sh-progress">
            <i />
            <b>100%</b>
          </span>
        ) : null}
        {step.subs.length > 0 ? (
          <span className="sh-chev">
            <ChevronDown />
          </span>
        ) : null}
      </span>
    </div>
    {step.subs.length > 0 ? (
      <div className="sh-subs">
        {step.subs.map((sub) => (
          <SubRow key={sub.label} sub={sub} />
        ))}
      </div>
    ) : null}
  </div>
);
