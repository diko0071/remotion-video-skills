import React from "react";
import { Img, staticFile } from "remotion";
import "./templates.css";
import { SOURCE_LABEL, SOURCE_LOGO } from "./data";
import { LayersGlyph } from "./icons";
import { Item } from "./types";

export const Badge: React.FC<{ item: Item; style?: React.CSSProperties }> = ({
  item,
  style,
}) => {
  const showLabel = item.allPlatforms || item.sources.length <= 2;
  const label = item.allPlatforms
    ? "All platforms"
    : item.sources.map((s) => SOURCE_LABEL[s]).join(" + ");
  return (
    <span className="tpl-badge" style={style}>
      <span className="logos">
        {item.allPlatforms ? (
          <LayersGlyph />
        ) : (
          item.sources.map((s) => (
            <Img key={s} src={staticFile(SOURCE_LOGO[s])} alt="" />
          ))
        )}
      </span>
      {showLabel ? label : null}
    </span>
  );
};
