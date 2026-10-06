import React from "react";
import { Img, interpolate, staticFile } from "remotion";
import "./muse.css";
import { CheckBadgeIcon } from "./icons";
import type { DocStat } from "./artifact-doc";

export type BarGroup = { label: string; icon?: string; before: number; after: number };
export type FixRow = { name: string; sub: string };

const BEFORE = "#C9CBD1";
const AFTER = "#2F7CF6";

export const MuseDashboardDoc: React.FC<{
  title: string;
  sub?: string;
  logo?: string;
  stats: DocStat[];
  chartTitle?: string;
  groups: BarGroup[];
  max: number;
  progress?: number;
  fixesTitle?: string;
  fixes: FixRow[];
  style?: React.CSSProperties;
}> = ({ title, sub, logo, stats, chartTitle = "Purchases by source, last 14 days", groups, max, progress = 1, fixesTitle = "What Ryze fixed", fixes, style }) => (
  <div className="mu-dash" style={style}>
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      {logo ? <Img src={staticFile(logo)} style={{ width: 44, height: 44, borderRadius: 12, display: "block" }} /> : null}
      <span>
        <div className="mu-dash-h">{title}</div>
        {sub ? <div className="mu-dash-sub">{sub}</div> : null}
      </span>
    </div>
    <div className="mu-stats">
      {stats.map((s) => (
        <div key={s.label} className="mu-stat">
          <div className="mu-stat-lab">{s.label}</div>
          <div className="mu-stat-val">{s.value}</div>
          {s.delta ? <div className={"mu-stat-delta" + (s.tone ? " " + s.tone : "")}>{s.delta}</div> : null}
        </div>
      ))}
    </div>
    <div className="mu-dash-grid">
      <div className="mu-dash-card">
        <div className="mu-dash-card-h">{chartTitle}</div>
        <div className="mu-bars">
          {groups.map((g) => (
            <div key={g.label} className="mu-bar-group">
              <div className="mu-bar-pair">
                <div className="mu-bar" style={{ background: BEFORE, height: `${(g.before / max) * 100 * progress}%` }}>
                  <span className="mu-bar-val" style={{ color: "#8A8C93", opacity: progress > 0.9 ? 1 : 0 }}>{g.before}</span>
                </div>
                <div className="mu-bar" style={{ background: AFTER, height: `${(g.after / max) * 100 * interpolate(progress, [0.3, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%` }}>
                  <span className="mu-bar-val" style={{ color: AFTER, opacity: progress > 0.95 ? 1 : 0 }}>{g.after}</span>
                </div>
              </div>
              <div className="mu-bar-lab">
                {g.icon ? <Img src={staticFile(g.icon)} /> : null}
                {g.label}
              </div>
            </div>
          ))}
        </div>
        <div className="mu-legend">
          <span style={{ ["--sw" as string]: BEFORE }}>Before</span>
          <span style={{ ["--sw" as string]: AFTER }}>After fix</span>
        </div>
      </div>
      <div className="mu-dash-card">
        <div className="mu-dash-card-h">{fixesTitle}</div>
        {fixes.map((f) => (
          <div key={f.name} className="mu-fix">
            <CheckBadgeIcon size={24} />
            <span>
              <div>{f.name}</div>
              <div className="sub">{f.sub}</div>
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
