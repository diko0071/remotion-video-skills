import React from "react";
import "./seo-dashboard.css";
import { ArrowDownGlyph, ArrowUpGlyph } from "./icons";

export const Delta: React.FC<{ value: number; goodWhenDown?: boolean }> = ({
  value,
  goodWhenDown,
}) => {
  const up = value >= 0;
  const good = up !== Boolean(goodWhenDown);
  return (
    <span className={`sd-delta ${good ? "up" : "down"}`}>
      {up ? <ArrowUpGlyph /> : <ArrowDownGlyph />}
      {Math.abs(value).toFixed(1)}%
    </span>
  );
};
