import React from "react";
import "./report-detail.css";

export const Bullet: React.FC<{
  children: React.ReactNode;
  tone?: "default" | "muted";
}> = ({ children, tone = "default" }) => (
  <li className={`rd-bullet${tone === "muted" ? " muted" : ""}`}>
    <span className="mark" />
    <span>{children}</span>
  </li>
);

export const Slide: React.FC<{
  order?: number;
  label?: string;
  cover?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ order, label, cover, children, style }) => (
  <div className={`rd-slide${cover ? " cover" : ""}`} style={style}>
    {cover ? null : (
      <div className="rd-slide-head">
        <div className="rd-slide-order">{String(order).padStart(2, "0")}</div>
        <h2 className="rd-slide-title">{label}</h2>
      </div>
    )}
    <div className="rd-slide-body">{children}</div>
  </div>
);
