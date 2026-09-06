import React from "react";
import "./blog-studio.css";
import { ChevronGlyph, WandGlyph } from "./icons";
import { CornerTile, LayoutTile, ThemeTile } from "./tiles";
import { BlogColor, BlogCorner, BlogLayout, BlogTheme } from "./types";

export const StudioPanel: React.FC<{
  themes: BlogTheme[];
  colors: BlogColor[];
  corners: BlogCorner[];
  layouts: BlogLayout[];
  activeTheme?: string;
  activeCorner?: string;
  activeLayout?: string;
  style?: React.CSSProperties;
}> = ({
  themes,
  colors,
  corners,
  layouts,
  activeTheme = "warm",
  activeCorner = "extra",
  activeLayout = "magazine",
  style,
}) => (
  <div className="bs-panel" style={style}>
    <div className="bs-sec match">
      <span className="btn-outline btn-sm btn-block" data-click="bs.match">
        <WandGlyph />
        Match my website style
      </span>
      <p className="bs-hint">
        Pull the colors, fonts and header/footer from your live site.
      </p>
    </div>

    <div className="bs-sec">
      <div className="bs-sec-head">
        <span className="bs-sec-title">Identity</span>
      </div>
      <div className="bs-group">
        <span className="bs-label">Logo</span>
        <div className="bs-logo-row">
          <span className="bs-logo-mark">E</span>
          <span className="btn-outline btn-sm">Upload</span>
          <span className="btn-ghost">Remove</span>
        </div>
      </div>
      <div className="bs-group">
        <span className="bs-label">Site name</span>
        <div className="bs-field">Ember &amp; Oak</div>
      </div>
      <div className="bs-group">
        <div className="bs-label-row">
          <span className="bs-label">Meta description</span>
          <span className="bs-count">98 / 160</span>
        </div>
        <div className="bs-area">
          Hand-poured soy candles from a small Portland studio — burn guides,
          scent notes and gifting ideas.
        </div>
      </div>
    </div>

    <div className="bs-sec">
      <div className="bs-sec-head">
        <span className="bs-sec-title">Theme</span>
      </div>
      <div className="bs-tiles three">
        {themes.map((item) => (
          <ThemeTile
            key={item.key}
            item={item}
            active={item.key === activeTheme}
          />
        ))}
      </div>
    </div>

    <div className="bs-sec">
      <div className="bs-sec-head">
        <span className="bs-sec-title">Colors</span>
        <span className="bs-sec-action">Reset</span>
      </div>
      {colors.map((c) => (
        <div key={c.label} className="bs-color-row">
          <span>{c.label}</span>
          <span className="bs-color-chip" style={{ background: c.hex }} />
        </div>
      ))}
    </div>

    <div className="bs-sec">
      <div className="bs-sec-head">
        <span className="bs-sec-title">Typography</span>
      </div>
      <div className="bs-group">
        <span className="bs-label">Headings</span>
        <div className="bs-select">
          Fraunces
          <ChevronGlyph />
        </div>
      </div>
      <div className="bs-group">
        <span className="bs-label">Body</span>
        <div className="bs-select">
          Inter
          <ChevronGlyph />
        </div>
      </div>
    </div>

    <div className="bs-sec">
      <div className="bs-sec-head">
        <span className="bs-sec-title">Corners</span>
      </div>
      <div className="bs-tiles">
        {corners.map((item) => (
          <CornerTile
            key={item.key}
            item={item}
            active={item.key === activeCorner}
          />
        ))}
      </div>
    </div>

    <div className="bs-sec">
      <div className="bs-sec-head">
        <span className="bs-sec-title">Layout</span>
      </div>
      <div className="bs-tabs">
        <span className="on">Blog index</span>
        <span>Article page</span>
      </div>
      <div className="bs-tiles two">
        {layouts.map((item) => (
          <LayoutTile
            key={item.key}
            item={item}
            active={item.key === activeLayout}
          />
        ))}
      </div>
    </div>
  </div>
);
