import React from "react";
import "./usage.css";
import { UsageEntry, formatCount, initials } from "./types";

export const UsageBreakdownCard: React.FC<{
  title: string;
  entries: UsageEntry[];
  withAvatar?: boolean;
  style?: React.CSSProperties;
}> = ({ title, entries, withAvatar, style }) => (
  <div className="pg-card us-break-card" style={style}>
    <div className="us-cap">{title}</div>
    <div className="us-rows">
      {entries.map((e) => (
        <div key={e.id} className="us-row">
          {withAvatar ? (
            <span className="us-av">{initials(e.label)}</span>
          ) : null}
          <span className="us-name">{e.label}</span>
          <span className="us-count">{formatCount(e.count)}</span>
        </div>
      ))}
    </div>
    <div className="us-total">
      <span>Total</span>
      <b>{formatCount(entries.reduce((sum, e) => sum + e.count, 0))}</b>
    </div>
  </div>
);
