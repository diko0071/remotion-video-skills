import React from "react";
import { useClickPress } from "../../../../core/press-context";
import { SearchIcon } from "../../icons";
import "./integrations.css";

export const IntegrationsHead: React.FC<{
  title?: string;
  subtitle?: string;
  style?: React.CSSProperties;
}> = ({
  title = "Integrations",
  subtitle = "Connect data sources for your audits",
  style,
}) => (
  <div className="pg-head" style={style}>
    <div>
      <h1 className="pg-h1">{title}</h1>
      <p className="pg-sub">{subtitle}</p>
    </div>
  </div>
);

export const IntegrationsSearch: React.FC<{
  label?: string;
  style?: React.CSSProperties;
}> = ({ label = "Search integrations", style }) => (
  <div className="intg-search" style={style}>
    <SearchIcon />
    {label}
  </div>
);

const FilterChip: React.FC<{ label: string; active: boolean }> = ({
  label,
  active,
}) => {
  const scale = useClickPress(`intg-filter.${label}`);
  return (
    <span
      className={`fchip${active ? " active" : ""}`}
      data-click={`intg-filter.${label}`}
      style={{ scale: String(scale) }}
    >
      {label}
    </span>
  );
};

export const IntegrationsFilters: React.FC<{
  categories: string[];
  active?: string;
  style?: React.CSSProperties;
}> = ({ categories, active = "All", style }) => (
  <div className="chips intg-filters" style={style}>
    {categories.map((cat) => (
      <FilterChip key={cat} label={cat} active={cat === active} />
    ))}
  </div>
);
