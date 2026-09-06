import React from "react";
import { packColumns } from "../../masonry-columns";
import "./creatives.css";
import { CREATIVES_COLUMN_COUNT } from "./data";
import { CreativeTile } from "./creative-tile";
import { Creative } from "./types";

const aspectOf = (creative: Creative) => {
  const [w, h] = creative.aspect.split("/").map((part) => Number(part.trim()));
  return w && h ? w / h : 0.8;
};

export const CreativesColumn: React.FC<{
  creatives: Creative[];
  style?: React.CSSProperties;
}> = ({ creatives, style }) => (
  <div className="crv-col" style={style}>
    {creatives.map((creative) => (
      <CreativeTile creative={creative} key={creative.id} />
    ))}
  </div>
);

export const CreativesMasonry: React.FC<{
  creatives: Creative[];
  columnCount?: number;
  style?: React.CSSProperties;
}> = ({ creatives, columnCount = CREATIVES_COLUMN_COUNT, style }) => (
  <div
    className="crv-masonry"
    style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)`, ...style }}
  >
    {packColumns(creatives, columnCount, aspectOf).map((column, i) => (
      <CreativesColumn creatives={column} key={column[0]?.id ?? i} />
    ))}
  </div>
);
