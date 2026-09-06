import React from "react";
import { Img, staticFile } from "remotion";
import { useClickPress } from "../../../../core/press-context";
import "./competitor-ads.css";
import { CHIP_ALL, syncingChipLabel } from "./data";
import { BellGlyph, BellOffGlyph, SpinnerGlyph, TrashGlyph } from "./icons";
import { TrackedBrand } from "./types";

const BrandChip: React.FC<{ brand: TrackedBrand; active: boolean }> = ({
  brand,
  active,
}) => {
  const scale = useClickPress(`comp.chip.${brand.name}`);
  const bellScale = useClickPress(`comp.bell.${brand.name}`);
  return (
    <span
      className={`cmp-chip${active ? " on" : ""}`}
      data-click={`comp.chip.${brand.name}`}
      style={{ scale: String(scale) }}
    >
      <span className="cmp-chip-main">
        <Img src={staticFile(brand.favicon)} />
        {brand.syncing ? (
          <span className="cmp-chip-sync">
            <SpinnerGlyph />
            {syncingChipLabel(brand.name)}
          </span>
        ) : (
          brand.name
        )}
      </span>
      <span className="cmp-chip-acts">
        <span
          className={`cmp-chip-act${brand.notify ? " notify" : ""}`}
          data-click={`comp.bell.${brand.name}`}
          style={{ scale: String(bellScale) }}
        >
          {brand.notify ? <BellGlyph /> : <BellOffGlyph />}
        </span>
        <span className="cmp-chip-act" data-click={`comp.untrack.${brand.name}`}>
          <TrashGlyph />
        </span>
      </span>
    </span>
  );
};

export const CompetitorChips: React.FC<{
  brands: TrackedBrand[];
  activeBrand?: string;
  style?: React.CSSProperties;
}> = ({ brands, activeBrand = "all", style }) => {
  const allScale = useClickPress("comp.chip.all");
  return (
    <div className="cmp-chips" style={style}>
      <span
        className={`cmp-chip plain${activeBrand === "all" ? " on" : ""}`}
        data-click="comp.chip.all"
        style={{ scale: String(allScale) }}
      >
        <span className="cmp-chip-main">{CHIP_ALL}</span>
      </span>
      {brands.map((brand) => (
        <BrandChip key={brand.domain} brand={brand} active={activeBrand === brand.name} />
      ))}
    </div>
  );
};
