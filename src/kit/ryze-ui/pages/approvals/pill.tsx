import React from "react";
import "./approvals.css";
import { Tone } from "./types";

export const Pill: React.FC<{
  tone: Tone;
  label: string;
  style?: React.CSSProperties;
}> = ({ tone, label, style }) => (
  <span className={`spill ${tone}`} style={style}>
    <span className="dot" />
    {label}
  </span>
);
