import React from "react";
import { useClickPress } from "../../../../core/press-context";
import "./competitor-ads.css";
import { COMPETITOR_TABS } from "./data";

const Tab: React.FC<{ label: string; active: boolean }> = ({ label, active }) => {
  const scale = useClickPress(`comp.tab.${label}`);
  return (
    <span
      className={`cmp-tab${active ? " on" : ""}`}
      data-click={`comp.tab.${label}`}
      style={{ scale: String(scale) }}
    >
      {label}
    </span>
  );
};

export const CompetitorAdsTabs: React.FC<{
  tabs?: string[];
  active?: string;
  style?: React.CSSProperties;
}> = ({ tabs = COMPETITOR_TABS, active = "Explore", style }) => (
  <div className="cmp-tabs" style={style}>
    {tabs.map((t) => (
      <Tab key={t} label={t} active={t === active} />
    ))}
  </div>
);
