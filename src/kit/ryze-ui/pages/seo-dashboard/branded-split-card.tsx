import React from "react";
import "./seo-dashboard.css";
import { CardHead } from "./card-head";
import { Donut } from "./donut";
import { HeadMetric } from "./head-metric";
import { fmtCompact, fmtNumber, fmtPct } from "./types";

export const BrandedSplitCard: React.FC<{
  title?: string;
  metricLabel?: string;
  brandedLabel?: string;
  nonBrandedLabel?: string;
  donutSub?: string;
  branded: number;
  nonBranded: number;
  brandedColor: string;
  nonBrandedColor: string;
  style?: React.CSSProperties;
}> = ({
  title = "Branded vs Non-branded",
  metricLabel = "Non-branded share",
  brandedLabel = "Branded",
  nonBrandedLabel = "Non-branded",
  donutSub = "Total clicks",
  branded,
  nonBranded,
  brandedColor,
  nonBrandedColor,
  style,
}) => (
  <div className="sd-card" style={style}>
    <CardHead
      title={title}
      right={
        <HeadMetric
          label={metricLabel}
          value={fmtPct((nonBranded / (branded + nonBranded)) * 100)}
        />
      }
    />
    <div className="sd-card-body">
      <div className="sd-donut-wrap">
        <Donut
          size={188}
          thickness={17}
          data={[
            {
              label: nonBrandedLabel,
              value: nonBranded,
              color: nonBrandedColor,
            },
            { label: brandedLabel, value: branded, color: brandedColor },
          ]}
          center={fmtCompact(branded + nonBranded)}
          sub={donutSub}
        />
      </div>
      <div className="sd-split">
        <div className="left" style={{ borderColor: nonBrandedColor }}>
          <div className="b">{fmtNumber(nonBranded)}</div>
          <div className="l">{nonBrandedLabel}</div>
        </div>
        <div className="right" style={{ borderColor: brandedColor }}>
          <div className="b">{fmtNumber(branded)}</div>
          <div className="l">{brandedLabel}</div>
        </div>
      </div>
    </div>
  </div>
);
