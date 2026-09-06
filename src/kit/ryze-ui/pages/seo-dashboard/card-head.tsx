import React from "react";
import "./seo-dashboard.css";
import { InfoGlyph } from "./icons";

export const CardHead: React.FC<{
  title: string;
  subtitle?: string;
  hint?: string;
  right?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ title, subtitle, hint, right, style }) => (
  <div className="sd-card-head" style={style}>
    <div>
      <div className="sd-card-title">{title}</div>
      {subtitle ? <div className="sd-card-hint">{subtitle}</div> : null}
    </div>
    <div className="sd-card-head-right">
      {hint ? <InfoGlyph /> : null}
      {right}
    </div>
  </div>
);
