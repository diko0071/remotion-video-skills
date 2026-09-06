import React from "react";
import { interpolate } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { Starburst } from "./icons";

export const ClaudeVizCard: React.FC<{
  appName?: string;
  appInitial?: string;
  appearAt?: number;
  children: React.ReactNode;
}> = ({ appName = "visualize", appInitial = "V", appearAt = 0, children }) => {
  const p = useSpringAt(appearAt, SPRINGS.card);
  return (
    <div
      style={{
        borderRadius: 12,
        border: "0.5px solid rgba(20,20,19,0.16)",
        background: "#FFFFFF",
        overflow: "hidden",
        opacity: Math.min(1, p * 1.3),
        transform: `translateY(${interpolate(p, [0, 1], [26, 0])}px)`,
      }}
    >
      <div
        style={{
          height: 44,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 14px",
          borderBottom: "0.5px solid rgba(20,20,19,0.12)",
        }}
      >
        <span
          style={{
            width: 20,
            height: 20,
            borderRadius: 6,
            border: "0.5px solid rgba(20,20,19,0.16)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 600,
            color: "#5E5D59",
            boxShadow: "0 0.8px 1.6px rgba(0,0,0,0.05)",
          }}
        >
          {appInitial}
        </span>
        <span style={{ fontSize: 14, color: "#141413" }}>{appName}</span>
      </div>
      <div style={{ padding: 18 }}>{children}</div>
    </div>
  );
};

export type VizPoint = { label: string; value: number };

export const ClaudeLineChart: React.FC<{
  points: VizPoint[];
  drawAt?: number;
  height?: number;
  color?: string;
  valuePrefix?: string;
  title?: string;
  subtitle?: string;
}> = ({
  points,
  drawAt = 10,
  height = 240,
  color = "#D97757",
  valuePrefix = "$",
  title,
  subtitle,
}) => {
  const draw = useSpringAt(drawAt, SPRINGS.smooth, 44);
  const dots = useSpringAt(drawAt + 26, SPRINGS.smooth, 20);
  const W = 640;
  const PAD_X = 40;
  const PAD_TOP = 32;
  const PAD_BOT = 30;
  const max = Math.max(1, ...points.map((p) => p.value));
  const x = (i: number) => PAD_X + (i / Math.max(1, points.length - 1)) * (W - PAD_X * 2);
  const y = (v: number) => PAD_TOP + (1 - v / max) * (height - PAD_TOP - PAD_BOT);
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(p.value)}`).join(" ");
  const pathLength = 1600;

  return (
    <div>
      {title ? (
        <div style={{ fontSize: 15, fontWeight: 600, color: "#141413" }}>{title}</div>
      ) : null}
      {subtitle ? (
        <div style={{ fontSize: 12, color: "#91908A", marginTop: 2, marginBottom: 10 }}>
          {subtitle}
        </div>
      ) : null}
      <svg width="100%" viewBox={`0 0 ${W} ${height}`}>
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <line
            key={f}
            x1={PAD_X}
            x2={W - PAD_X}
            y1={y(max * f)}
            y2={y(max * f)}
            stroke="rgba(20,20,19,0.07)"
          />
        ))}
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLength}
          strokeDashoffset={pathLength - pathLength * draw}
        />
        {points.map((p, i) => (
          <g key={p.label} opacity={dots}>
            <circle cx={x(i)} cy={y(p.value)} r={3.5} fill={color} stroke="#fff" strokeWidth={1.5} />
            <text
              x={x(i)}
              y={height - 8}
              textAnchor="middle"
              fontSize={11}
              fill="#91908A"
            >
              {p.label}
            </text>
          </g>
        ))}
        <g opacity={dots}>
          <text
            x={x(points.length - 1) - 6}
            y={y(points[points.length - 1].value) - 12}
            textAnchor="end"
            fontSize={13}
            fontWeight={700}
            fill="#141413"
          >
            {valuePrefix}
            {points[points.length - 1].value}
          </text>
        </g>
      </svg>
    </div>
  );
};

export const ClaudeSparkStatus: React.FC<{ text: string }> = ({ text }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#91908A" }}>
    <span style={{ color: "#D97757", display: "inline-flex" }}>
      <Starburst size={17} />
    </span>
    <span>{text}</span>
  </div>
);

type Stat = { label: string; value: string; delta?: string; up?: boolean };

const StatCell: React.FC<{ stat: Stat; at: number }> = ({ stat, at }) => {
  const sp = useSpringAt(at, SPRINGS.smooth, 20);
  const m = stat.value.match(/[\d.,]+/);
  const target = m ? parseFloat(m[0].replace(/,/g, "")) : 0;
  const shown = m
    ? stat.value.replace(
        m[0],
        (target * Math.min(1, sp)).toLocaleString("en-US", {
          maximumFractionDigits: m[0].includes(".") ? 2 : 0,
        }),
      )
    : stat.value;
  return (
    <div
      style={{
        border: "0.5px solid rgba(20,20,19,0.12)",
        borderRadius: 10,
        padding: "12px 14px",
        background: "#FDFDFC",
        opacity: sp,
        transform: `translateY(${interpolate(sp, [0, 1], [14, 0])}px)`,
      }}
    >
      <div style={{ fontSize: 11.5, fontWeight: 600, color: "#91908A", textTransform: "uppercase", letterSpacing: "0.04em" }}>
        {stat.label}
      </div>
      <div style={{ fontSize: 24, fontWeight: 700, color: "#141413", marginTop: 3 }}>{shown}</div>
      {stat.delta ? (
        <div style={{ fontSize: 12, fontWeight: 600, marginTop: 2, color: stat.up ? "#2C7A4B" : "#C2410C" }}>
          {stat.delta}
        </div>
      ) : null}
    </div>
  );
};

export const ClaudeStatCards: React.FC<{ stats: Stat[]; appearAt?: number }> = ({
  stats,
  appearAt = 0,
}) => (
  <div style={{ display: "grid", gridTemplateColumns: `repeat(${stats.length}, 1fr)`, gap: 10 }}>
    {stats.map((stat, i) => (
      <StatCell key={stat.label} stat={stat} at={appearAt + i * 5} />
    ))}
  </div>
);

export const ClaudeBarChart: React.FC<{
  bars: Array<{ label: string; value: number }>;
  drawAt?: number;
  height?: number;
  color?: string;
  title?: string;
  subtitle?: string;
  valuePrefix?: string;
}> = ({ bars, drawAt = 0, height = 230, color = "#D97757", title, subtitle, valuePrefix = "$" }) => {
  const max = Math.max(1, ...bars.map((b) => b.value));
  return (
    <div>
      {title ? <div style={{ fontSize: 15, fontWeight: 600, color: "#141413" }}>{title}</div> : null}
      {subtitle ? (
        <div style={{ fontSize: 12, color: "#91908A", marginTop: 2, marginBottom: 12 }}>{subtitle}</div>
      ) : null}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 26, height, padding: "0 8px" }}>
        {bars.map((bar, i) => (
          <BarColumn
            key={bar.label}
            bar={bar}
            at={drawAt + i * 5}
            max={max}
            height={height}
            color={color}
            valuePrefix={valuePrefix}
          />
        ))}
      </div>
    </div>
  );
};

const BarColumn: React.FC<{
  bar: { label: string; value: number };
  at: number;
  max: number;
  height: number;
  color: string;
  valuePrefix: string;
}> = ({ bar, at, max, height, color, valuePrefix }) => {
  const bp = useSpringAt(at, SPRINGS.smooth, 26);
  const h = (bar.value / max) * (height - 54) * bp;
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{ fontSize: 12.5, fontWeight: 700, color: "#141413", opacity: bp }}>
        {valuePrefix}
        {Math.round(bar.value * Math.min(1, bp)).toLocaleString("en-US")}
      </div>
      <div style={{ width: "100%", maxWidth: 54, height: h, background: color, borderRadius: 7, opacity: 0.92 }} />
      <div style={{ fontSize: 11.5, color: "#91908A" }}>{bar.label}</div>
    </div>
  );
};

export const ClaudeDonut: React.FC<{
  segments: Array<{ label: string; value: number; color: string }>;
  drawAt?: number;
  size?: number;
  title?: string;
  centerLabel?: string;
}> = ({ segments, drawAt = 0, size = 210, title, centerLabel }) => {
  const p = useSpringAt(drawAt, SPRINGS.smooth, 40);
  const total = Math.max(1e-9, segments.reduce((sum, s) => sum + s.value, 0));
  const r = size / 2 - 20;
  const C = 2 * Math.PI * r;
  let acc = 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          {segments.map((seg) => {
            const frac = (seg.value / total) * p;
            const dash = `${C * frac} ${C}`;
            const offset = -C * (acc / total) * p;
            acc += seg.value;
            return (
              <circle
                key={seg.label}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={seg.color}
                strokeWidth={26}
                strokeDasharray={dash}
                strokeDashoffset={offset}
              />
            );
          })}
        </svg>
        {centerLabel ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 21,
              fontWeight: 700,
              color: "#141413",
              opacity: p,
            }}
          >
            {centerLabel}
          </div>
        ) : null}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {title ? <div style={{ fontSize: 15, fontWeight: 600, color: "#141413", marginBottom: 2 }}>{title}</div> : null}
        {segments.map((seg) => (
          <div key={seg.label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#5E5D59", opacity: p }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: seg.color, flexShrink: 0 }} />
            {seg.label}
            <b style={{ color: "#141413" }}>{Math.round((seg.value / total) * 100 * Math.min(1, p))}%</b>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ClaudeAreaChart: React.FC<{
  points: VizPoint[];
  drawAt?: number;
  height?: number;
  color?: string;
  title?: string;
  subtitle?: string;
  valueSuffix?: string;
}> = ({ points, drawAt = 0, height = 190, color = "#7E8A6C", title, subtitle, valueSuffix = "" }) => {
  const draw = useSpringAt(drawAt, SPRINGS.smooth, 30);
  const W = 640;
  const PAD_X = 36;
  const PAD_TOP = 30;
  const PAD_BOT = 26;
  const max = Math.max(1, ...points.map((p) => p.value));
  const x = (i: number) => PAD_X + (i / Math.max(1, points.length - 1)) * (W - PAD_X * 2);
  const y = (v: number) => PAD_TOP + (1 - v / max) * (height - PAD_TOP - PAD_BOT);
  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(p.value)}`).join(" ");
  return (
    <div>
      {title ? <div style={{ fontSize: 15, fontWeight: 600, color: "#141413" }}>{title}</div> : null}
      {subtitle ? (
        <div style={{ fontSize: 12, color: "#91908A", marginTop: 2, marginBottom: 8 }}>{subtitle}</div>
      ) : null}
      <svg width="100%" viewBox={`0 0 ${W} ${height}`}>
        <defs>
          <linearGradient id={`area-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <g style={{ clipPath: `inset(0 ${(1 - draw) * 100}% 0 0)` }}>
          <path d={`${line} L${x(points.length - 1)},${height - PAD_BOT} L${x(0)},${height - PAD_BOT} Z`} fill={`url(#area-${color.replace("#", "")})`} />
          <path d={line} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
        </g>
        {points.map((p, i) => (
          <text key={p.label} x={x(i)} y={height - 6} textAnchor="middle" fontSize={11} fill="#91908A" opacity={draw}>
            {p.label}
          </text>
        ))}
        <text
          x={x(points.length - 1) - 4}
          y={y(points[points.length - 1].value) - 10}
          textAnchor="end"
          fontSize={13}
          fontWeight={700}
          fill="#141413"
          opacity={draw}
        >
          {points[points.length - 1].value}
          {valueSuffix}
        </text>
      </svg>
    </div>
  );
};

export const ClaudeMiniTable: React.FC<{
  headers: string[];
  rows: string[][];
  appearAt?: number;
  title?: string;
}> = ({ headers, rows, appearAt = 0, title }) => {
  return (
    <div>
      {title ? (
        <div style={{ fontSize: 15, fontWeight: 600, color: "#141413", marginBottom: 10 }}>{title}</div>
      ) : null}
      <div style={{ border: "0.5px solid rgba(20,20,19,0.12)", borderRadius: 10, overflow: "hidden" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `1.6fr repeat(${headers.length - 1}, 1fr)`,
            background: "#F5F4F0",
            padding: "9px 14px",
            fontSize: 11.5,
            fontWeight: 600,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "#91908A",
          }}
        >
          {headers.map((h) => (
            <span key={h}>{h}</span>
          ))}
        </div>
        {rows.map((row, i) => (
          <TableRow key={row[0]} row={row} at={appearAt + i * 5} columns={headers.length} />
        ))}
      </div>
    </div>
  );
};

const TableRow: React.FC<{ row: string[]; at: number; columns: number }> = ({
  row,
  at,
  columns,
}) => {
  const rp = useSpringAt(at, SPRINGS.smooth, 18);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `1.6fr repeat(${columns - 1}, 1fr)`,
        padding: "10px 14px",
        fontSize: 13.5,
        color: "#141413",
        borderTop: "0.5px solid rgba(20,20,19,0.08)",
        opacity: rp,
        transform: `translateX(${interpolate(rp, [0, 1], [-10, 0])}px)`,
      }}
    >
      {row.map((cell, j) => (
        <span key={j} style={{ fontWeight: j === 0 ? 600 : 400 }}>
          {cell}
        </span>
      ))}
    </div>
  );
};
