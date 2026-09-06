import React from "react";
import "./ad-templates.css";
import { AdTemplateCard } from "./template-card";
import { AdTemplate } from "./types";

export const AdTemplateColumn: React.FC<{
  items: AdTemplate[];
  style?: React.CSSProperties;
}> = ({ items, style }) => (
  <div className="adt-col" style={style}>
    {items.map((item) => (
      <AdTemplateCard item={item} key={item.file} clickId={`adt.card.${item.file}`} />
    ))}
  </div>
);

export const AdTemplatesMasonry: React.FC<{
  columns: AdTemplate[][];
  style?: React.CSSProperties;
}> = ({ columns, style }) => (
  <div className="adt-masonry" style={style}>
    {columns.map((column, i) => (
      <AdTemplateColumn items={column} key={column[0]?.file ?? i} />
    ))}
  </div>
);
