import React from "react";
import { Img, interpolate, staticFile } from "remotion";
import { SPRINGS, useSpringAt } from "../../../../core/motion";
import { useClickPress } from "../../../../core/press-context";
import "./competitor-ads.css";
import { DISCOVER_DIALOG, DISCOVERED_BRANDS } from "./data";
import { CheckGlyph } from "./icons";
import { DiscoveredBrand } from "./types";

const BrandRow: React.FC<{ brand: DiscoveredBrand; picked: boolean }> = ({
  brand,
  picked,
}) => {
  const scale = useClickPress(`comp.discover.brand.${brand.name}`);
  return (
    <span
      className={`cmp-pick-row${picked ? " on" : ""}`}
      data-click={`comp.discover.brand.${brand.name}`}
      style={{ scale: String(scale) }}
    >
      <Img src={staticFile(brand.favicon)} className="cmp-pick-favicon" />
      <span className="cmp-pick-text">
        <span className="cmp-pick-name">{brand.name}</span>
        <span className="cmp-pick-domain">{brand.domain}</span>
      </span>
      <span className={`cmp-pick-check${picked ? " on" : ""}`}>
        {picked ? <CheckGlyph /> : null}
      </span>
    </span>
  );
};

export const DiscoverCompetitorsDialog: React.FC<{
  at: number;
  visible?: boolean;
  brands?: DiscoveredBrand[];
  picked?: string[];
}> = ({ at, visible = true, brands = DISCOVERED_BRANDS, picked }) => {
  const p = useSpringAt(at, SPRINGS.panel, 22);
  const saveScale = useClickPress("comp.discover.save");
  const isPicked = (brand: DiscoveredBrand) =>
    picked ? picked.includes(brand.name) : Boolean(brand.picked);
  return (
    <div className="cmp-veil" style={{ opacity: visible ? p : 0 }}>
      <div
        className="cmp-dlg"
        data-click="comp.discover.dialog"
        style={{ transform: `translateY(${interpolate(p, [0, 1], [14, 0])}px)` }}
      >
        <div className="cmp-dlg-head">
          <div className="cmp-dlg-title">{DISCOVER_DIALOG.title}</div>
          <div className="cmp-dlg-desc">{DISCOVER_DIALOG.description}</div>
        </div>
        <div className="cmp-pick-list">
          {brands.map((brand) => (
            <BrandRow key={brand.domain} brand={brand} picked={isPicked(brand)} />
          ))}
        </div>
        <div className="cmp-dlg-foot">
          <span className="btn-ghost" data-click="comp.discover.manual">
            {DISCOVER_DIALOG.addManually}
          </span>
          <span className="cmp-dlg-foot-spacer" />
          <span className="btn-ghost" data-click="comp.discover.cancel">
            {DISCOVER_DIALOG.cancel}
          </span>
          <span
            className="btn-primary"
            data-click="comp.discover.save"
            style={{ scale: String(saveScale) }}
          >
            {DISCOVER_DIALOG.save}
          </span>
        </div>
      </div>
    </div>
  );
};
