import React from "react";
import { useClickPress } from "../../../../core/press-context";
import "./competitor-ads.css";
import { COMPETITOR_FILTERS, COMPETITOR_SORT } from "./data";
import { ChevronDownGlyph } from "./icons";

const FilterSelect: React.FC<{
  id: string;
  label: string;
  wide?: boolean;
  sort?: boolean;
}> = ({ id, label, wide = false, sort = false }) => {
  const scale = useClickPress(`comp.filter.${id}`);
  return (
    <span
      className={`cmp-select${wide ? " wide" : ""}${sort ? " sort" : ""}`}
      data-click={`comp.filter.${id}`}
      style={{ scale: String(scale) }}
    >
      {label}
      <ChevronDownGlyph />
    </span>
  );
};

export const CompetitorFilterBar: React.FC<{
  values?: Partial<Record<string, string>>;
  sort?: string;
  style?: React.CSSProperties;
}> = ({ values = {}, sort = COMPETITOR_SORT, style }) => (
  <div className="cmp-filters" style={style}>
    {COMPETITOR_FILTERS.map((f) => (
      <FilterSelect
        key={f.id}
        id={f.id}
        label={values[f.id] ?? f.label}
        wide={f.id === "industry"}
      />
    ))}
    <FilterSelect id="sort" label={sort} sort />
  </div>
);
