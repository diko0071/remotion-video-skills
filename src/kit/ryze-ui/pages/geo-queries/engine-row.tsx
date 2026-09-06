import React from "react";
import { Img, staticFile } from "remotion";
import "./geo-queries.css";
import { ENGINES } from "./data";
import { Engines } from "./types";

export const EngineRow: React.FC<{
  engines: Engines;
  style?: React.CSSProperties;
}> = ({ engines, style }) => (
  <span className="gq-engines" style={style}>
    {ENGINES.map((e, i) => (
      <Img
        key={e.key}
        className={engines[i] ? "gq-eng" : "gq-eng dim"}
        src={staticFile(e.icon)}
      />
    ))}
  </span>
);
