import React from "react";
import "./ad-templates.css";
import { AD_TEMPLATE_CATEGORIES } from "./data";

export const AdTemplatesCategoryFilter: React.FC<{
  categories?: string[];
  label?: string;
  style?: React.CSSProperties;
}> = ({ categories = AD_TEMPLATE_CATEGORIES, label = "Category", style }) => (
  <div className="adt-filter" style={style}>
    <div className="adt-filter-label">{label}</div>
    <div className="adt-chips">
      <span className="fchip active">All</span>
      {categories.map((c) => (
        <span key={c} className="fchip">
          {c}
        </span>
      ))}
    </div>
  </div>
);
