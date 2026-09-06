import React from "react";
import { interpolate } from "remotion";

export const GSC_BLUE = "#4285f4";
export const GSC_PURPLE = "#7847e0";
const INK = "#202124";
const MUTED = "#5f6368";
const LINE = "#dadce0";
const SOFT = "#eceae4";

const Hamburger: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={MUTED}>
    <path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z" />
  </svg>
);

const Logo: React.FC = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <svg width="30" height="30" viewBox="0 0 24 24">
      <rect x="3" y="12" width="4" height="8" rx="1" fill="#1a73e8" />
      <rect x="10" y="7" width="4" height="13" rx="1" fill="#ea4335" />
      <rect x="17" y="3" width="4" height="17" rx="1" fill="#fbbc04" />
      <circle cx="7" cy="8" r="3.4" fill="#34a853" />
    </svg>
    <span style={{ fontSize: 22, color: MUTED }}>
      <span style={{ color: "#5f6368" }}>Google</span> Search Console
    </span>
  </div>
);

const SIDEBAR: { section?: string; icon: string; label: string; active?: boolean; sub?: boolean }[] = [
  { icon: "home", label: "Overview" },
  { icon: "bulb", label: "Insights" },
  { icon: "search", label: "URL inspection" },
  { section: "Performance", icon: "g", label: "Search results", active: true },
  { icon: "star", label: "Generative AI", sub: true },
  { icon: "disc", label: "Discover" },
  { section: "Indexing", icon: "pages", label: "Pages" },
  { icon: "video", label: "Videos" },
  { icon: "sitemap", label: "Sitemaps" },
  { icon: "removals", label: "Removals" },
  { section: "Experience", icon: "cwv", label: "Core Web Vitals" },
  { icon: "https", label: "HTTPS" },
];

const SideIcon: React.FC<{ kind: string }> = ({ kind }) => {
  const stroke = MUTED;
  switch (kind) {
    case "home":
      return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8"><path d="M3 10.5 12 3l9 7.5V21h-6v-7h-6v7H3z" /></svg>;
    case "bulb":
      return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.8.7 1 1.5 1 2.5h6c0-1 .2-1.8 1-2.5A6 6 0 0 0 12 3z" /></svg>;
    case "search":
      return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>;
    case "g":
      return <span style={{ fontSize: 15, fontWeight: 700, color: "#4285f4", fontFamily: "Arial" }}>G</span>;
    case "star":
      return <svg width="17" height="17" viewBox="0 0 24 24" fill={stroke}><path d="M12 2l2 7h7l-5.5 4.5L17.5 21 12 16.5 6.5 21l2-7.5L3 9h7z" /></svg>;
    case "disc":
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8"><path d="M12 3v18M3 12h18M6 6l12 12M18 6 6 18" /></svg>;
    case "pages":
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8"><rect x="5" y="3" width="12" height="16" rx="1.5" /><path d="M9 21h10V7" /></svg>;
    case "video":
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m10 9 5 3-5 3z" /></svg>;
    case "sitemap":
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8"><rect x="9" y="3" width="6" height="5" rx="1" /><rect x="3" y="16" width="6" height="5" rx="1" /><rect x="15" y="16" width="6" height="5" rx="1" /><path d="M12 8v4M6 16v-2h12v2" /></svg>;
    case "removals":
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8"><path d="M3 3l18 18M10.6 5.1A9 9 0 0 1 21 12a9 9 0 0 1-1.3 3.4M6.4 6.5A9 9 0 0 0 12 21a9 9 0 0 0 5.5-1.9" /></svg>;
    case "cwv":
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>;
    case "https":
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8"><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>;
    default:
      return null;
  }
};

export const GscTopbar: React.FC<{ domain: string }> = ({ domain }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 26, padding: "14px 26px", background: "#fff", borderBottom: `1px solid ${SOFT}` }}>
    <Hamburger />
    <Logo />
    <div
      style={{
        flex: 1,
        maxWidth: 860,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        gap: 14,
        background: "#e8f0fe",
        borderRadius: 999,
        padding: "13px 22px",
        fontSize: 17,
        color: MUTED,
      }}
    >
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
      Inspect any URL in “{domain}”
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.4 2.3c-.8.3-.9 1-.9 1.7M12 17h.01" /></svg>
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="1.8"><path d="M12 3a4 4 0 0 1 4 4c0 2.5-4 7-4 7s-4-4.5-4-7a4 4 0 0 1 4-4zM4 21c2-3 5-4 8-4s6 1 8 4" /></svg>
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="1.8"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8M10 21a2 2 0 0 0 4 0" /></svg>
      <svg width="20" height="20" viewBox="0 0 24 24" fill={MUTED}><circle cx="5" cy="5" r="1.6" /><circle cx="12" cy="5" r="1.6" /><circle cx="19" cy="5" r="1.6" /><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /><circle cx="5" cy="19" r="1.6" /><circle cx="12" cy="19" r="1.6" /><circle cx="19" cy="19" r="1.6" /></svg>
      <div style={{ width: 34, height: 34, borderRadius: 999, background: "linear-gradient(135deg,#C19767,#8a6a43)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700 }}>
        D
      </div>
    </div>
  </div>
);

export const GscSidebar: React.FC<{ domain: string; favicon?: React.ReactNode }> = ({ domain, favicon }) => (
  <div style={{ width: 300, flex: "none", padding: "18px 14px", display: "flex", flexDirection: "column", gap: 2, background: "#fff" }}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        border: `1px solid ${LINE}`,
        borderRadius: 999,
        padding: "10px 18px",
        marginBottom: 18,
        fontSize: 17,
        color: INK,
      }}
    >
      {favicon ?? <span style={{ width: 20, height: 20, borderRadius: 999, background: "#e8eaed" }} />}
      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{domain}</span>
      <svg style={{ marginLeft: "auto" }} width="14" height="14" viewBox="0 0 24 24" fill={MUTED}><path d="M7 10l5 5 5-5z" /></svg>
    </div>
    {SIDEBAR.map((item) => (
      <React.Fragment key={item.label + (item.sub ? "-sub" : "")}>
        {item.section ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "16px 12px 6px", fontSize: 15, color: INK, fontWeight: 500, borderTop: `1px solid ${SOFT}`, marginTop: 10 }}>
            {item.section}
            <svg width="12" height="12" viewBox="0 0 24 24" fill={MUTED}><path d="M7 14l5-5 5 5z" /></svg>
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "9px 12px",
            paddingLeft: item.sub ? 44 : 12,
            borderRadius: 999,
            background: item.active ? "#d3e3fd" : "transparent",
            fontSize: 16,
            color: item.active ? "#0b57d0" : MUTED,
            fontWeight: item.active ? 600 : 400,
          }}
        >
          <span style={{ width: 20, display: "flex", justifyContent: "center" }}>
            <SideIcon kind={item.icon} />
          </span>
          {item.label}
        </div>
      </React.Fragment>
    ))}
  </div>
);

export const GscChip: React.FC<{ label: string; checked?: boolean; dropdown?: boolean }> = ({ label, checked, dropdown }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      border: `1px solid ${LINE}`,
      background: checked ? "#d3e3fd" : "#fff",
      borderColor: checked ? "#d3e3fd" : LINE,
      borderRadius: 8,
      padding: "8px 16px",
      fontSize: 15,
      color: INK,
      whiteSpace: "nowrap",
    }}
  >
    {checked ? (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0b57d0" strokeWidth="2.6"><path d="M4 12l5 5L20 6" /></svg>
    ) : null}
    {label}
    {dropdown ? <svg width="13" height="13" viewBox="0 0 24 24" fill={MUTED}><path d="M7 10l5 5 5-5z" /></svg> : null}
  </span>
);

export const GscMetricTile: React.FC<{
  label: string;
  value: string;
  color?: string;
  selected?: boolean;
  width?: number;
}> = ({ label, value, color = GSC_PURPLE, selected, width = 252 }) => (
  <div
    style={{
      width,
      background: selected ? color : "#fff",
      color: selected ? "#fff" : INK,
      border: selected ? "none" : `1px solid ${LINE}`,
      padding: "16px 18px 14px",
      display: "flex",
      flexDirection: "column",
      gap: 6,
      position: "relative",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 15, opacity: selected ? 0.95 : 0.75 }}>
      <span
        style={{
          width: 16,
          height: 16,
          borderRadius: 3,
          border: selected ? "2px solid rgba(255,255,255,0.9)" : `2px solid #b9bdc4`,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 11,
          fontWeight: 800,
        }}
      >
        {selected ? "✓" : ""}
      </span>
      {label}
    </div>
    <div style={{ fontSize: 38, fontWeight: 500, letterSpacing: "-0.01em", fontVariantNumeric: "tabular-nums" }}>{value}</div>
    <svg style={{ position: "absolute", right: 12, bottom: 12, opacity: selected ? 0.8 : 0.4 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={selected ? "#fff" : MUTED} strokeWidth="1.6"><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.4 2.3c-.8.3-.9 1-.9 1.7M12 17h.01" /></svg>
  </div>
);

export interface GscSeries {
  color: string;
  level: (t: number) => number;
}

export const GscChart: React.FC<{
  width: number;
  height: number;
  progress: number;
  series: GscSeries[];
  yLabels: string[];
  xLabels: string[];
  annotation?: { t: number; label: string; on: boolean };
}> = ({ width, height, progress, series, yLabels, xLabels, annotation }) => {
  const n = 120;
  const path = (level: (t: number) => number) => {
    const count = Math.max(2, Math.floor(n * progress));
    let d = "";
    for (let i = 0; i < count; i++) {
      const t = i / (n - 1);
      d += `${i === 0 ? "M" : "L"}${(t * width).toFixed(1)},${(height - level(t) * height).toFixed(1)}`;
    }
    return d;
  };
  return (
    <div style={{ position: "relative", paddingLeft: 64, paddingBottom: 34 }}>
      <div style={{ position: "absolute", left: 0, top: -24, fontSize: 14, color: MUTED }}>Impressions</div>
      {yLabels.map((label, i) => (
        <div key={label} style={{ position: "absolute", left: 0, top: (i / (yLabels.length - 1)) * height - 9, fontSize: 14, color: MUTED, width: 52, textAlign: "right" }}>
          {label}
        </div>
      ))}
      <svg width={width} height={height} style={{ display: "block", overflow: "visible" }}>
        {yLabels.map((_, i) => (
          <line key={i} x1={0} x2={width} y1={(i / (yLabels.length - 1)) * height} y2={(i / (yLabels.length - 1)) * height} stroke={i === yLabels.length - 1 ? LINE : "#f0f1f3"} strokeWidth={1} />
        ))}
        {series.map((s, i) => (
          <path key={i} d={path(s.level)} fill="none" stroke={s.color} strokeWidth={2.6} />
        ))}
        {annotation?.on ? (
          <g>
            <line x1={annotation.t * width} x2={annotation.t * width} y1={0} y2={height} stroke="#d93025" strokeWidth={2} strokeDasharray="6 6" />
            <g transform={`translate(${annotation.t * width - 236} 10)`}>
              <rect width={222} height={40} rx={6} fill="#d93025" />
              <text x={14} y={26} fill="#fff" fontSize={17} fontWeight={700}>{annotation.label}</text>
            </g>
          </g>
        ) : null}
      </svg>
      {xLabels.map((label, i) => (
        <div key={label} style={{ position: "absolute", left: 64 + (i / (xLabels.length - 1)) * (width - 40), bottom: 4, fontSize: 14, color: MUTED }}>
          {label}
        </div>
      ))}
    </div>
  );
};

export const GscTable: React.FC<{
  tabs?: string[];
  activeTab?: number;
  header: [string, string, string?];
  rows: { label: string; a: string; b?: string; aColor?: string }[];
  revealCount?: number;
}> = ({ tabs = ["QUERIES", "PAGES", "COUNTRIES", "DEVICES"], activeTab = 0, header, rows, revealCount = rows.length }) => (
  <div style={{ background: "#fff", border: `1px solid ${SOFT}`, borderRadius: 12 }}>
    <div style={{ display: "flex", gap: 44, padding: "18px 28px 0", borderBottom: `1px solid ${SOFT}`, position: "relative" }}>
      {tabs.map((tab, i) => (
        <span key={tab} style={{ paddingBottom: 14, fontSize: 15, letterSpacing: "0.06em", color: i === activeTab ? INK : MUTED, fontWeight: i === activeTab ? 600 : 400, borderBottom: i === activeTab ? `3px solid ${INK}` : "3px solid transparent" }}>
          {tab}
        </span>
      ))}
      <svg style={{ marginLeft: "auto", marginBottom: 12 }} width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="1.8"><path d="M4 6h16M7 12h10M10 18h4" /></svg>
    </div>
    <div style={{ display: "flex", padding: "13px 28px", fontSize: 15, color: MUTED, borderBottom: `1px solid ${SOFT}` }}>
      <span>{header[0]}</span>
      <span style={{ marginLeft: "auto", width: 130, textAlign: "right" }}>{header[1]}</span>
      {header[2] ? <span style={{ width: 130, textAlign: "right" }}>{header[2]}</span> : null}
    </div>
    {rows.slice(0, revealCount).map((row) => (
      <div key={row.label} style={{ display: "flex", alignItems: "center", padding: "14px 28px", fontSize: 16, color: INK, borderBottom: `1px solid #f3f4f6` }}>
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "62%" }}>{row.label}</span>
        <span style={{ marginLeft: "auto", width: 130, textAlign: "right", color: row.aColor ?? GSC_BLUE, fontVariantNumeric: "tabular-nums" }}>{row.a}</span>
        {row.b != null ? <span style={{ width: 130, textAlign: "right", color: GSC_PURPLE, fontVariantNumeric: "tabular-nums" }}>{row.b}</span> : null}
      </div>
    ))}
  </div>
);

export const gscWave = (seed: number, drop: number | null, base = 0.52, growth = 0.28) => (t: number) => {
  const wave = Math.sin(t * 44 + seed) * 0.05 + Math.sin(t * 21 + seed * 2.3) * 0.035;
  if (drop == null || t < drop) return base + t * growth + wave;
  const fall = Math.min(1, (t - drop) / 0.05);
  return interpolate(fall, [0, 1], [base + drop * growth, 0.06 + wave * 0.2]);
};
