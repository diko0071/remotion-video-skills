import React from "react";
import { Img, staticFile } from "remotion";
import { useClickPress } from "../../../../core/press-context";
import "./templates.css";
import { FILTER_ORDER, SOURCE_LABEL, SOURCE_LOGO, TABS } from "./data";
import { Source } from "./types";

const FilterTab: React.FC<{ label: string; active: boolean }> = ({
  label,
  active,
}) => {
  const scale = useClickPress(`tab.${label}`);
  return (
    <span
      className={`tpl-tab${active ? " on" : ""}`}
      data-click={`tab.${label}`}
      style={{ scale: String(scale) }}
    >
      {label}
    </span>
  );
};

export const TemplatesFilterBar: React.FC<{
  tabs?: string[];
  sources?: Source[];
  style?: React.CSSProperties;
  active?: string;
}> = ({ tabs = TABS, sources = FILTER_ORDER, style, active = "All" }) => (
  <div className="tpl-bar" style={style}>
    <div className="tpl-tabs">
      {tabs.map((t) => (
        <FilterTab key={t} label={t} active={t === active} />
      ))}
    </div>
    <div className="tpl-plats">
      {sources.map((s) => (
        <span key={s} className="fchip">
          <Img src={staticFile(SOURCE_LOGO[s])} alt="" />
          {SOURCE_LABEL[s]}
        </span>
      ))}
    </div>
  </div>
);
