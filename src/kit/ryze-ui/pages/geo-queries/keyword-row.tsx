import React from "react";
import "./geo-queries.css";
import { ArrowDownGlyph, ArrowUpGlyph } from "./icons";
import { Sparkline } from "./sparkline";
import { Keyword } from "./types";

export const KeywordRow: React.FC<{
  item: Keyword;
  style?: React.CSSProperties;
}> = ({ item, style }) => (
  <div className="gq-krow" style={style}>
    <span className="gq-ktext">{item.text}</span>
    <span className="gq-num">{item.volume}</span>
    <span className="gq-num">{item.difficulty}</span>
    <span className="gq-num">
      {item.position == null || item.delta === 0 ? (
        item.position == null ? (
          "—"
        ) : (
          item.position
        )
      ) : (
        <span className="gq-pos">
          {item.position}
          <span className={item.delta < 0 ? "gq-delta up" : "gq-delta down"}>
            {item.delta < 0 ? <ArrowUpGlyph /> : <ArrowDownGlyph />}
            {Math.abs(item.delta)}
          </span>
        </span>
      )}
    </span>
    <span className="gq-num gq-trendcell">
      <Sparkline
        values={item.trend}
        color={item.delta <= 0 ? "#10b981" : "#f43f5e"}
      />
    </span>
  </div>
);
