import React from "react";
import { Img, staticFile } from "remotion";
import { useClickPress } from "../../../../core/press-context";
import { CheckIcon } from "../../icons";
import "./ad-templates.css";
import { AdTemplate } from "./types";

export const AdTemplateCard: React.FC<{
  item: AdTemplate;
  style?: React.CSSProperties;
  clickId?: string;
}> = ({ item, style, clickId }) => {
  const scale = useClickPress(clickId ?? "");
  return (
  <div
    className={`adt-card${item.selected ? " sel" : ""}`}
    {...(clickId ? { "data-click": clickId, style: { ...style, scale: String(scale) } } : { style })}
  >
    {item.selected ? (
      <span className="adt-check">
        <CheckIcon />
      </span>
    ) : null}
    <div className="adt-img" style={{ aspectRatio: item.aspect }}>
      <Img src={staticFile(`ad-templates/${item.file}`)} alt="" />
    </div>
    <span className="adt-label">{item.category}</span>
  </div>
  );
};
