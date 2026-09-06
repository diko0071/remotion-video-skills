import React from "react";
import "./templates.css";

export const Section: React.FC<{
  label: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  cols?: number;
}> = ({ label, children, style, cols }) => (
  <section className="tpl-section" style={style}>
    <div className="tpl-section-head">
      <h2>{label}</h2>
      <i />
    </div>
    <div
      className="tpl-grid"
      style={cols ? { gridTemplateColumns: `repeat(${cols}, 1fr)` } : undefined}
    >
      {children}
    </div>
  </section>
);
