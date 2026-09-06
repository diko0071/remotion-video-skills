import React from "react";
import { Img, staticFile } from "remotion";
import "./paid-ads-dashboard.css";
import { AccountRow } from "./types";

const FUNNEL_COLORS = ["#0F172A", "#1E293B", "#334155"];

export const FunnelCard: React.FC<{
  row: AccountRow;
  style?: React.CSSProperties;
}> = ({ row, style }) => {
  const idle = row.spendValue === 0 && row.impressions === 0;
  const stages = [
    { label: "Impressions", value: row.impressions, note: "" },
    {
      label: "Clicks",
      value: row.clicks,
      note: `${((row.clicks / Math.max(row.impressions, 1)) * 100).toFixed(1)}% CTR`,
    },
    {
      label: "Conversions",
      value: row.conversions,
      note: `${((row.conversions / Math.max(row.clicks, 1)) * 100).toFixed(1)}% of prev`,
    },
  ];
  const top = Math.max(row.impressions, 1);
  return (
    <div className="pa-card pa-fn" style={style}>
      <div className="pa-card-head">
        <span className="pa-chan">
          <Img src={staticFile(row.logo)} />
          <b className="pa-fn-name">{row.account}</b>
        </span>
      </div>
      {idle ? (
        <div className="pa-fn-idle">
          <b>No spend in this account yet.</b>
          <span>Connected and idle — no campaigns running.</span>
        </div>
      ) : (
        <div className="pa-fn-body">
          <svg
            viewBox="0 0 320 176"
            style={{ display: "block", width: "100%" }}
          >
            <defs>
              <pattern
                id="pa-fn-hatch"
                width={6}
                height={6}
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <rect
                  width={6}
                  height={6}
                  fill="currentColor"
                  fillOpacity={0.1925}
                />
                <line
                  x1={0}
                  y1={0}
                  x2={0}
                  y2={6}
                  stroke="currentColor"
                  strokeWidth={1.4}
                  strokeOpacity={0.55}
                />
              </pattern>
            </defs>
            {stages.slice(0, -1).map((s, i) => {
              const next = stages[i + 1];
              const hl = Math.max(6, (s.value / top) * 116);
              const hr = Math.max(6, (next.value / top) * 116);
              const x1 = 26 + i * 112 + 44;
              const x2 = 26 + (i + 1) * 112;
              const drop = (1 - next.value / Math.max(s.value, 1)) * 100;
              return (
                <g key={s.label} style={{ color: "var(--muted-foreground)" }}>
                  <path
                    d={`M ${x1} ${136 - hl} L ${x2} ${136 - hr} L ${x2} 136 L ${x1} 136 Z`}
                    fill="url(#pa-fn-hatch)"
                    fillOpacity={0.45}
                  />
                  <text
                    x={(x1 + x2) / 2}
                    y={Math.max(12, 136 - (hl + hr) / 2 - 7)}
                    textAnchor="middle"
                    className="pa-fn-drop"
                  >
                    {`−${drop.toFixed(drop >= 10 ? 0 : 1)}%`}
                  </text>
                </g>
              );
            })}
            {stages.map((s, i) => {
              const h = Math.max(6, (s.value / top) * 116);
              const x = 26 + i * 112;
              return (
                <g key={s.label}>
                  <rect
                    x={x}
                    y={136 - h}
                    width={44}
                    height={h}
                    rx={Math.min(6, h / 2)}
                    fill={FUNNEL_COLORS[i]}
                  />
                  <text
                    x={x + 22}
                    y={136 - h - 7}
                    textAnchor="middle"
                    className="pa-fn-svgval"
                  >
                    {s.value >= 1000
                      ? `${(s.value / 1000).toFixed(1)}K`
                      : s.value}
                  </text>
                  <text
                    x={x + 22}
                    y={152}
                    textAnchor="middle"
                    className="pa-fn-svglab"
                  >
                    {s.label}
                  </text>
                  <text
                    x={x + 22}
                    y={165}
                    textAnchor="middle"
                    className="pa-fn-svgnote"
                  >
                    {s.note}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      )}
    </div>
  );
};
