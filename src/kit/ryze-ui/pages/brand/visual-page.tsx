import React from "react";
import "./brand.css";
import { BrandCard } from "./brand-card";
import { BrandShell, BrandShellBody } from "./brand-shell";
import { BRAND_COLORS, BRAND_FONTS } from "./data";
import { BrandFontRow } from "./font-row";
import { BrandSwatch } from "./swatch";

export const BrandVisualBody: React.FC = () => (
  <BrandShellBody tab="Visual">
    <div className="br-grid">
      <BrandCard title="Colors">
        <div className="br-swatches">
          {BRAND_COLORS.map((c) => (
            <BrandSwatch hex={c.hex} role={c.role} key={c.hex} />
          ))}
        </div>
      </BrandCard>

      <BrandCard title="Fonts">
        <div className="br-fonts">
          {BRAND_FONTS.map((f) => (
            <BrandFontRow family={f.family} role={f.role} key={f.family} />
          ))}
        </div>
      </BrandCard>
    </div>
  </BrandShellBody>
);

export const BrandPage: React.FC = () => (
  <BrandShell tab="Visual">
    <div className="br-grid">
      <BrandCard title="Colors">
        <div className="br-swatches">
          {BRAND_COLORS.map((c) => (
            <BrandSwatch hex={c.hex} role={c.role} key={c.hex} />
          ))}
        </div>
      </BrandCard>

      <BrandCard title="Fonts">
        <div className="br-fonts">
          {BRAND_FONTS.map((f) => (
            <BrandFontRow family={f.family} role={f.role} key={f.family} />
          ))}
        </div>
      </BrandCard>
    </div>
  </BrandShell>
);
