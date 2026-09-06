import React from "react";
import "./usage.css";
import { ChevronGlyph } from "./icons";
import { USAGE_BALANCE, USAGE_RESET_NOTE, USAGE_SPENT } from "./data";
import { formatCount } from "./types";

export const UsageHead: React.FC<{
  title?: string;
  sub?: string;
  style?: React.CSSProperties;
}> = ({
  title = "Usage",
  sub = "Credit consumption across this organization",
  style,
}) => (
  <div className="us-head" style={style}>
    <div className="pg-h1">{title}</div>
    <div className="pg-sub">{sub}</div>
  </div>
);

export const UsageQuota: React.FC<{
  balance?: number;
  spent?: number;
  note?: string;
  style?: React.CSSProperties;
}> = ({
  balance = USAGE_BALANCE,
  spent = USAGE_SPENT,
  note = USAGE_RESET_NOTE,
  style,
}) => (
  <div className="us-quota" style={style}>
    <div className="pg-card us-quota-card">
      <div className="us-cap">Credit balance</div>
      <div className="us-big">{formatCount(balance)}</div>
    </div>
    <div className="pg-card us-quota-card">
      <div className="us-cap">Spent this period</div>
      <div className="us-big">{formatCount(spent)}</div>
      <div className="us-note">{note}</div>
    </div>
  </div>
);

export const UsageFilters: React.FC<{
  labels?: string[];
  style?: React.CSSProperties;
}> = ({ labels = ["All workspaces", "All users"], style }) => (
  <div className="us-filters" style={style}>
    {labels.map((label) => (
      <span className="us-select" key={label}>
        {label}
        <ChevronGlyph />
      </span>
    ))}
  </div>
);
