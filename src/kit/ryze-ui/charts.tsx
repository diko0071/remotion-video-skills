import React from "react";

export type LinePoint = { x: number; y: number; label: string };

const LINE_POINTS: LinePoint[] = [
  { x: 46, y: 98.3, label: "Mon" },
  { x: 151, y: 82.8, label: "Tue" },
  { x: 256, y: 86.5, label: "Wed" },
  { x: 361, y: 62.9, label: "Thu" },
  { x: 466, y: 70.1, label: "Fri" },
  { x: 571, y: 43.8, label: "Sat" },
  { x: 676, y: 27.4, label: "Sun" },
];

const linePath = (points: LinePoint[]): string =>
  points
    .map((p, i) => {
      if (i === 0) return `M${p.x},${p.y}`;
      const prev = points[i - 1];
      const bend = (p.x - prev.x) / 3;
      return `C${prev.x + bend},${prev.y} ${p.x - bend},${p.y} ${p.x},${p.y}`;
    })
    .join(" ");

export const LineChart: React.FC<{ points?: LinePoint[] }> = ({ points = LINE_POINTS }) => {
  const stroke = linePath(points);
  const first = points[0];
  const last = points[points.length - 1];
  return (
    <svg className="chart-svg" viewBox="0 0 688 260" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="line-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C19767" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#C19767" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g stroke="oklch(0.91 0.015 80)" strokeOpacity="0.6">
        {[230, 175.5, 121, 66.5, 12].map((y) => (
          <line key={y} x1="46" y1={y} x2="676" y2={y} />
        ))}
      </g>
      <g textAnchor="end">
        {[
          [179.5, "600"],
          [125, "1.2K"],
          [70.5, "1.8K"],
          [16, "2.4K"],
        ].map(([y, label]) => (
          <text key={label} className="axis-label" x="40" y={y}>
            {label}
          </text>
        ))}
      </g>
      <path fill="url(#line-fill)" d={`${stroke} L${last.x},230 L${first.x},230 Z`} />
      <path fill="none" stroke="#C19767" strokeWidth="2.5" d={stroke} />
      <g fill="#C19767" stroke="#ffffff" strokeWidth="2">
        {points.map((p) => (
          <circle key={p.x} cx={p.x} cy={p.y} r="3" />
        ))}
      </g>
      <g textAnchor="middle">
        {points.map((p) => (
          <text key={p.x} className="axis-label" x={p.x} y="248">
            {p.label}
          </text>
        ))}
      </g>
    </svg>
  );
};

export type BarRow = {
  x: number;
  y: number;
  h: number;
  color: string;
  value: string;
  label: string;
};

const BARS: BarRow[] = [
  { x: 88.5, y: 34, h: 196, color: "#C19767", value: "4.2K", label: "Search" },
  { x: 193.5, y: 71.3, h: 158.7, color: "#3A3028", value: "3.4K", label: "PMax" },
  { x: 298.5, y: 94.7, h: 135.3, color: "#9a6e38", value: "2.9K", label: "Brand" },
  { x: 403.5, y: 132, h: 98, color: "#C97B5D", value: "2.1K", label: "Display" },
  { x: 508.5, y: 160, h: 70, color: "#7E8A6C", value: "1.5K", label: "Video" },
  { x: 613.5, y: 188, h: 42, color: "#A8B0BC", value: "900", label: "Shopping" },
];

export const BarChart: React.FC<{ rows?: BarRow[] }> = ({ rows = BARS }) => (
  <svg className="chart-svg" viewBox="0 0 688 260" xmlns="http://www.w3.org/2000/svg">
    <g stroke="oklch(0.91 0.015 80)" strokeOpacity="0.6">
      {[230, 160, 90, 20].map((y) => (
        <line key={y} x1="46" y1={y} x2="676" y2={y} />
      ))}
    </g>
    <g textAnchor="end">
      {[
        [164, "1.5K"],
        [94, "3K"],
        [24, "4.5K"],
      ].map(([y, label]) => (
        <text key={label} className="axis-label" x="40" y={y}>
          {label}
        </text>
      ))}
    </g>
    <g fill="oklch(0.96 0.012 80)" fillOpacity="0.55">
      {rows.map((b) => (
        <rect key={b.x} x={b.x} y="20" width="20" height="210" rx="10" />
      ))}
    </g>
    <g>
      {rows.map((b) => (
        <rect key={b.x} x={b.x} y={b.y} width="20" height={b.h} rx="10" fill={b.color} />
      ))}
    </g>
    <g textAnchor="middle">
      {rows.map((b) => (
        <text key={b.x} className="value-label" x={b.x + 10} y={b.y - 8}>
          {b.value}
        </text>
      ))}
    </g>
    <g textAnchor="middle">
      {rows.map((b) => (
        <text key={b.x} className="axis-label" x={b.x + 10} y="248">
          {b.label}
        </text>
      ))}
    </g>
  </svg>
);

export type DonutSegment = {
  color: string;
  legend: string;
  dash: string;
  dashOffset: number;
  leader: { x1: number; y1: number; x2: number; y2: number };
  callout: { x: number; y: number; tx: number; ty: number; label: string };
};

const SEGMENTS: DonutSegment[] = [
  {
    color: "#C19767",
    legend: "Google Ads",
    dash: "280.2 546.6",
    dashOffset: -2,
    leader: { x1: 447.8, y1: 136.5, x2: 452, y2: 137.9 },
    callout: { x: 452, y: 126.9, tx: 472, ty: 141.9, label: "52%" },
  },
  {
    color: "#3A3028",
    legend: "Meta Ads",
    dash: "165.4 546.6",
    dashOffset: -288.2,
    leader: { x1: 251.3, y1: 177.2, x2: 246, y2: 182 },
    callout: { x: 211.7, y: 176.2, tx: 231.7, ty: 191.2, label: "31%" },
  },
  {
    color: "#9a6e38",
    legend: "TikTok Ads",
    dash: "88.9 546.6",
    dashOffset: -457.6,
    leader: { x1: 291, y1: 40.5, x2: 286, y2: 32 },
    callout: { x: 259.9, y: 10.5, tx: 279.9, ty: 25.5, label: "17%" },
  },
];

export const DonutChart: React.FC<{ segments?: DonutSegment[] }> = ({ segments = SEGMENTS }) => (
  <>
    <svg className="chart-svg" viewBox="0 0 688 260" xmlns="http://www.w3.org/2000/svg">
      <g transform="rotate(-90 344 130)" fill="none" strokeWidth="34">
        {segments.map((s) => (
          <circle
            key={s.legend}
            cx="344"
            cy="130"
            r="87"
            stroke={s.color}
            strokeDasharray={s.dash}
            strokeDashoffset={s.dashOffset}
          />
        ))}
      </g>
      <g stroke="oklch(0.91 0.015 80)">
        {segments.map((s) => (
          <line key={s.legend} x1={s.leader.x1} y1={s.leader.y1} x2={s.leader.x2} y2={s.leader.y2} />
        ))}
      </g>
      <g>
        {segments.map((s) => (
          <g key={s.callout.label}>
            <rect
              x={s.callout.x}
              y={s.callout.y}
              width="40"
              height="22"
              rx="11"
              fill="#ffffff"
              stroke="oklch(0.91 0.015 80)"
            />
            <text
              x={s.callout.tx}
              y={s.callout.ty}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill="#0f172a"
            >
              {s.callout.label}
            </text>
          </g>
        ))}
      </g>
    </svg>
    <div className="legend">
      {segments.map((s) => (
        <span key={s.legend} className="entry">
          <span className="dot" style={{ background: s.color }} />
          {s.legend}
        </span>
      ))}
    </div>
  </>
);

export type StatRow = {
  color: string;
  label: string;
  delta: string;
  up: boolean;
  value: string;
};

const STATS: StatRow[] = [
  { color: "#C19767", label: "Organic clicks", delta: "↑ 18%", up: true, value: "12,480" },
  { color: "#3A3028", label: "Paid clicks", delta: "↑ 6%", up: true, value: "8,214" },
  { color: "#9a6e38", label: "Impressions", delta: "↑ 4%", up: true, value: "402K" },
  { color: "#C97B5D", label: "Ad spend", delta: "↓ 6%", up: false, value: "$8,420" },
];

export const StatList: React.FC<{ rows?: StatRow[] }> = ({ rows = STATS }) => (
  <div className="stat-list">
    {rows.map((s) => (
      <div key={s.label} className="stat-row">
        <span className="dot" style={{ background: s.color }} />
        <span className="s-label">{s.label}</span>
        <span className={`s-delta ${s.up ? "up" : "down"}`}>{s.delta}</span>
        <span className="s-value">{s.value}</span>
      </div>
    ))}
  </div>
);
