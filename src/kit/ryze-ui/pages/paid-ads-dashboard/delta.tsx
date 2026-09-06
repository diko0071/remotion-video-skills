import React from "react";
import "./paid-ads-dashboard.css";
import { ArrowDownGlyph, ArrowUpGlyph } from "./icons";

export const Delta: React.FC<{
  value: number;
  goodWhenDown?: boolean;
  style?: React.CSSProperties;
}> = ({ value, goodWhenDown, style }) => {
  const up = value >= 0;
  const good = up !== Boolean(goodWhenDown);
  return (
    <span className={`pa-delta ${good ? "up" : "down"}`} style={style}>
      {up ? <ArrowUpGlyph /> : <ArrowDownGlyph />}
      {Math.abs(value).toFixed(1)}%
    </span>
  );
};

export const DeltaCell: React.FC<{
  value: number | null;
  goodWhenDown?: boolean;
  style?: React.CSSProperties;
}> = ({ value, goodWhenDown, style }) => {
  if (value === null)
    return (
      <span className="pa-dash" style={style}>
        —
      </span>
    );
  const good = value < 0 === Boolean(goodWhenDown);
  return (
    <span
      className={`pa-dtext ${value === 0 ? "" : good ? "good" : "bad"}`}
      style={style}
    >
      {value > 0 ? "+" : ""}
      {value}%
    </span>
  );
};
