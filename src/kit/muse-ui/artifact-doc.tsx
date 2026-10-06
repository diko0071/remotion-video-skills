import React from "react";
import { Img, staticFile } from "remotion";
import "./muse.css";

export type DocStat = { label: string; value: string; delta?: string; tone?: "bad" | "good" };
export type DocLeak = { name: string; sub: string; amount: string; severity?: "high" | "mid" | "low"; fix?: string };

const SEV = { high: "#D2412E", mid: "#E8A33D", low: "#9C9CA1" };

export const MuseArtifactDoc: React.FC<{
  title: string;
  sub?: string;
  logo?: string;
  stats: DocStat[];
  section?: string;
  leaks: DocLeak[];
  style?: React.CSSProperties;
}> = ({ title, sub, logo, stats, section = "Spend leaks", leaks, style }) => (
  <div className="mu-doc" style={style}>
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      {logo ? <Img src={staticFile(logo)} style={{ width: 44, height: 44, borderRadius: 12, display: "block" }} /> : null}
      <span>
        <div className="mu-doc-h">{title}</div>
        {sub ? <div className="mu-doc-sub">{sub}</div> : null}
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
    <div className="mu-doc-section">{section}</div>
    <div>
      {leaks.map((l) => (
        <div key={l.name} className="mu-leak">
          <span className="mu-leak-sev" style={{ background: SEV[l.severity ?? "mid"] }} />
          <span>
            <div className="mu-leak-name">{l.name}</div>
            <div className="mu-leak-sub">{l.sub}</div>
          </span>
          <span className="mu-leak-amt">{l.amount}</span>
          {l.fix ? <span className="mu-leak-fix">{l.fix}</span> : null}
        </div>
      ))}
    </div>
  </div>
);
