import React from "react";
import { useClickPress } from "../../../../core/press-context";
import "./blog-studio.css";
import { BlogCorner, BlogLayout, BlogTheme } from "./types";

export const ThemeTile: React.FC<{ item: BlogTheme; active: boolean }> = ({
  item,
  active,
}) => {
  const scale = useClickPress(`bs.theme.${item.key}`);
  return (
  <span
    className={`bs-tile${active ? " on" : ""}`}
    data-click={`bs.theme.${item.key}`}
    style={{ scale: String(scale) }}
  >
    <span className="bs-dots3">
      <i style={{ background: item.bg }} />
      <i style={{ background: item.text }} />
      <i style={{ background: item.link }} />
    </span>
    {item.label}
  </span>
  );
};

export const CornerTile: React.FC<{ item: BlogCorner; active: boolean }> = ({
  item,
  active,
}) => (
  <span className={`bs-tile${active ? " on" : ""}`}>
    <span className="bs-corner" style={{ borderRadius: item.radius }} />
    {item.label}
  </span>
);

const Scheme: React.FC<{ item: BlogLayout }> = ({ item }) => {
  if (item.key === "list") {
    return (
      <span className="bs-scheme list">
        {Array.from({ length: item.cells }).map((_, i) => (
          <u key={i}>
            <i />
            <i />
          </u>
        ))}
      </span>
    );
  }
  if (item.key === "minimal") {
    return (
      <span className="bs-scheme minimal">
        {Array.from({ length: item.cells }).map((_, i) => (
          <i key={i} style={{ width: `${100 - i * 12}%` }} />
        ))}
      </span>
    );
  }
  return (
    <span className={`bs-scheme ${item.key}`}>
      {Array.from({ length: item.cells }).map((_, i) => (
        <i key={i} />
      ))}
    </span>
  );
};

export const LayoutTile: React.FC<{ item: BlogLayout; active: boolean }> = ({
  item,
  active,
}) => (
  <span className={`bs-tile wide${active ? " on" : ""}`}>
    <Scheme item={item} />
    {item.label}
  </span>
);
