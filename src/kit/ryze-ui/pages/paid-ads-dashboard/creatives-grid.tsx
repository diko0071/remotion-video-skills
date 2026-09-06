import React from "react";
import "./paid-ads-dashboard.css";
import { CreativeCard } from "./creative-card";
import { GridGlyph, ListGlyph } from "./icons";
import { Creative } from "./types";

export const CreativeViewToggle: React.FC<{
  cardsLabel?: string;
  tableLabel?: string;
  style?: React.CSSProperties;
}> = ({ cardsLabel = "Cards", tableLabel = "Table", style }) => (
  <div className="pa-cr-views" style={style}>
    <span className="pa-cr-view on">
      <GridGlyph />
      {cardsLabel}
    </span>
    <span className="pa-cr-view">
      <ListGlyph />
      {tableLabel}
    </span>
  </div>
);

export const CreativesGrid: React.FC<{
  items: Creative[];
  topHookId?: string;
  style?: React.CSSProperties;
}> = ({ items, topHookId, style }) => (
  <div className="pa-cr-grid" style={style}>
    {items.map((item) => (
      <CreativeCard key={item.id} item={item} topHook={item.id === topHookId} />
    ))}
  </div>
);
