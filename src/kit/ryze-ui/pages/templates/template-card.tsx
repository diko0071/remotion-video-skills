import React from "react";
import { Img, staticFile } from "remotion";
import { useClickPress } from "../../../../core/press-context";
import "./templates.css";
import { Badge } from "./badge";
import { Item } from "./types";

export const TemplateCard: React.FC<{
  item: Item;
  badge?: boolean;
  style?: React.CSSProperties;
}> = ({ item, badge = true, style }) => {
  const scale = useClickPress(`tpl.${item.title}`);
  return (
    <div
      className="tpl-card"
      data-click={`tpl.${item.title}`}
      style={{ ...style, scale: String(scale) }}
    >
      <div className={`tpl-shot${item.imageAlign === "top" ? " top" : ""}`}>
        <Img src={staticFile(item.image)} alt="" />
        {badge ? <Badge item={item} /> : null}
      </div>
      <div className="tpl-body">
        <div className="tpl-title">{item.title}</div>
        <div className="tpl-desc">{item.description}</div>
      </div>
    </div>
  );
};
