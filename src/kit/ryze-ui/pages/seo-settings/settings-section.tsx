import React from "react";
import "../../pages.css";
import "./seo-settings.css";

export const SettingsSection: React.FC<{
  title: string;
  hint: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ title, hint, children, style }) => (
  <section className="st-section" style={style}>
    <div className="st-section-head">
      <h2 className="st-section-title">{title}</h2>
      <p className="st-section-hint">{hint}</p>
    </div>
    <div className="st-card">{children}</div>
  </section>
);

export const SectionRow: React.FC<{
  label: string;
  hint?: string;
  control: React.ReactNode;
  stacked?: boolean;
}> = ({ label, hint, control, stacked }) => (
  <div className={`st-row${stacked ? " stacked" : ""}`}>
    <div className="st-row-text">
      <span className="st-row-label">{label}</span>
      {hint ? <span className="st-row-hint">{hint}</span> : null}
    </div>
    <div className="st-row-control">{control}</div>
  </div>
);
