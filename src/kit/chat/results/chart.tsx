import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { WidgetCard, DownloadAction } from "../../ryze-ui/widget-card";
import "../../ryze-ui/pages/chat-artifact/chat-artifact.css";
import type {
  BarChartSpec,
  ChartSpec,
  DonutChartSpec,
  LineChartSpec,
  StatListSpec,
  TableSpec,
} from "../types";

export const CHAT_CHART_PALETTE = [
  "#C19767",
  "#3A3028",
  "#9a6e38",
  "#C97B5D",
  "#7E8A6C",
  "#A8B0BC",
];

export const seriesColor = (color: string | undefined, index: number): string =>
  color ?? CHAT_CHART_PALETTE[index % CHAT_CHART_PALETTE.length];

const W = 688;
const H = 260;
const LEFT = 52;
const RIGHT = 664;
const TOP = 14;
const BOTTOM = 224;
const GRID = [0, 0.25, 0.5, 0.75, 1];
const GRID_COLOR = "oklch(0.91 0.015 80)";

const num = (value: string | number | undefined): number =>
  typeof value === "number" ? value : Number(value ?? 0);

const Legend: React.FC<{ entries: { label: string; color: string }[] }> = ({ entries }) => (
  <div className="legend">
    {entries.map((e) => (
      <span key={e.label} className="entry">
        <span className="dot" style={{ background: e.color }} />
        {e.label}
      </span>
    ))}
  </div>
);

const GridLines: React.FC<{ axis: { ticks: string[] }; side: "left" | "right" }> = ({
  axis,
  side,
}) => (
  <g>
    {GRID.map((r, i) => {
      const y = BOTTOM - r * (BOTTOM - TOP);
      return (
        <g key={r}>
          {side === "left" ? (
            <line x1={LEFT} y1={y} x2={RIGHT} y2={y} stroke={GRID_COLOR} strokeOpacity={0.6} />
          ) : null}
          <text
            className="axis-label"
            x={side === "left" ? LEFT - 10 : RIGHT + 10}
            y={y + 4}
            textAnchor={side === "left" ? "end" : "start"}
          >
            {axis.ticks[i] ?? ""}
          </text>
        </g>
      );
    })}
  </g>
);

const smooth = (points: Array<[number, number]>): string =>
  points
    .map(([x, y], i) => {
      if (i === 0) return `M${x.toFixed(1)},${y.toFixed(1)}`;
      const [px, py] = points[i - 1];
      const dx = (x - px) / 2;
      return `C${(px + dx).toFixed(1)},${py.toFixed(1)} ${(x - dx).toFixed(1)},${y.toFixed(
        1,
      )} ${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

const LineFigure: React.FC<{ spec: LineChartSpec }> = ({ spec }) => {
  const xKey = spec.xKey ?? "label";
  const n = spec.data.length;
  const xAt = (i: number) => LEFT + (n < 2 ? 0 : (i / (n - 1)) * (RIGHT - LEFT));
  const dots = spec.dots ?? n <= 15;
  const labelEvery = Math.max(1, Math.ceil(n / 7));

  return (
    <>
      <svg className="chart-svg" viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
        <defs>
          {spec.series.map((s, i) => (
            <linearGradient key={s.key} id={`chat-fill-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={seriesColor(s.color, i)} stopOpacity="0.14" />
              <stop offset="100%" stopColor={seriesColor(s.color, i)} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
        <GridLines axis={spec.left} side="left" />
        {spec.right ? <GridLines axis={spec.right} side="right" /> : null}
        {spec.series.map((s, i) => {
          const axis = s.axis === "right" && spec.right ? spec.right : spec.left;
          const points = spec.data.map(
            (d, k) =>
              [xAt(k), BOTTOM - (num(d[s.key]) / axis.max) * (BOTTOM - TOP)] as [number, number],
          );
          const path = smooth(points);
          const color = seriesColor(s.color, i);
          return (
            <g key={s.key}>
              {spec.kind === "area" ? (
                <path
                  d={`${path} L${xAt(n - 1).toFixed(1)},${BOTTOM} L${LEFT},${BOTTOM} Z`}
                  fill={`url(#chat-fill-${s.key})`}
                />
              ) : null}
              <path d={path} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
              {dots
                ? points.map(([x, y]) => (
                    <circle
                      key={x}
                      cx={x}
                      cy={y}
                      r={3}
                      fill={color}
                      stroke="var(--card)"
                      strokeWidth={2}
                    />
                  ))
                : null}
            </g>
          );
        })}
        <g textAnchor="middle">
          {spec.data.map((d, i) =>
            i % labelEvery === 0 ? (
              <text key={i} className="axis-label" x={xAt(i)} y={BOTTOM + 26}>
                {String(d[xKey] ?? "")}
              </text>
            ) : null,
          )}
        </g>
      </svg>
      {spec.legend === false ? null : (
        <Legend
          entries={spec.series.map((s, i) => ({
            label: s.label,
            color: seriesColor(s.color, i),
          }))}
        />
      )}
    </>
  );
};

const ColumnFigure: React.FC<{ spec: BarChartSpec }> = ({ spec }) => {
  const xKey = spec.xKey ?? "label";
  const n = spec.data.length;
  const step = (RIGHT - LEFT) / n;
  const stacked = spec.stacked ?? spec.series.length > 1;
  const groupCount = stacked ? 1 : spec.series.length;
  const barWidth = Math.min(26, (step * 0.62) / groupCount);
  const ticks = spec.ticks ?? ["", "", "", "", ""];
  const showValues = spec.valueLabels ?? (!stacked && n * spec.series.length <= 8);

  return (
    <>
      <svg className="chart-svg" viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
        <GridLines axis={{ ticks }} side="left" />
        {spec.data.map((d, i) => {
          const center = LEFT + step * i + step / 2;
          let cursor = BOTTOM;
          return (
            <g key={i}>
              {spec.series.map((s, k) => {
                const value = num(d[s.key]);
                const h = Math.max(1, (value / spec.max) * (BOTTOM - TOP));
                const x = stacked
                  ? center - barWidth / 2
                  : center - (barWidth * groupCount) / 2 + k * barWidth;
                const y = stacked ? cursor - h : BOTTOM - h;
                if (stacked) cursor -= h;
                return (
                  <g key={s.key}>
                    <rect
                      x={x}
                      y={y}
                      width={barWidth - (stacked ? 0 : 2)}
                      height={h}
                      rx={4}
                      fill={seriesColor(s.color, k)}
                    />
                    {showValues ? (
                      <text
                        className="value-label"
                        x={x + (barWidth - (stacked ? 0 : 2)) / 2}
                        y={y - 8}
                        textAnchor="middle"
                      >
                        {String(d[`${s.key}Label`] ?? value.toLocaleString())}
                      </text>
                    ) : null}
                  </g>
                );
              })}
              <text className="axis-label" x={center} y={BOTTOM + 26} textAnchor="middle">
                {String(d[xKey] ?? "")}
              </text>
            </g>
          );
        })}
        <line x1={LEFT} y1={BOTTOM} x2={RIGHT} y2={BOTTOM} stroke={GRID_COLOR} />
      </svg>
      {spec.legend && spec.series.length > 1 ? (
        <Legend
          entries={spec.series.map((s, i) => ({ label: s.label, color: seriesColor(s.color, i) }))}
        />
      ) : null}
    </>
  );
};

const BarFigure: React.FC<{ spec: BarChartSpec }> = ({ spec }) => {
  const frame = useCurrentFrame();
  const xKey = spec.xKey ?? "label";
  const key = spec.series[0].key;
  const rowHeight = 34;
  const height = spec.data.length * rowHeight + 16;
  const labelWidth = 190;
  const valueWidth = 90;
  const track = W - labelWidth - valueWidth;
  const format = (v: number) =>
    spec.format === "usd" ? `$${v.toLocaleString()}` : v.toLocaleString();

  return (
    <svg
      className="chart-svg"
      viewBox={`0 0 ${W} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {spec.data.map((d, i) => {
        const y = 8 + i * rowHeight;
        const value = num(d[key]);
        const grow = spec.growFrom === undefined
          ? 1
          : interpolate(frame, [spec.growFrom + i * 8, spec.growFrom + i * 8 + 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            });
        const w = Math.max(2, ((track * value) / spec.max) * grow);
        const note = d.note ? ` · ${String(d.note)}` : "";
        const hot = spec.tooltip && spec.tooltip.index === i && frame >= spec.tooltip.at;
        const growing = grow > 0.02 && grow < 0.98;
        const tail = Math.min(w, 46);
        return (
          <g key={i}>
            <text className="axis-label" x={0} y={y + 15} textAnchor="start">
              {String(d[xKey] ?? "")}
            </text>
            <rect
              x={labelWidth}
              y={y + 2}
              width={w}
              height={16}
              rx={4}
              fill={seriesColor(spec.series[0].color, i)}
              opacity={hot ? 0.55 : 1}
            />
            {growing ? (
              <rect
                x={labelWidth + w - tail}
                y={y + 2}
                width={tail}
                height={16}
                rx={4}
                fill="url(#bar-draw-tail)"
              />
            ) : null}
            <text
              className="value-label"
              x={labelWidth + w + 10}
              y={y + 15}
              opacity={grow > 0.9 ? 1 : 0}
            >
              {`${format(value)}${note}`}
            </text>
          </g>
        );
      })}
      <defs>
        <linearGradient id="bar-draw-tail" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#C97B5D" stopOpacity="0" />
          <stop offset="1" stopColor="#C97B5D" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      {spec.tooltip && frame >= spec.tooltip.at
        ? (() => {
            const t = spec.tooltip;
            const y = 8 + t.index * rowHeight;
            const value = num(spec.data[t.index][key]);
            const w = Math.max(2, (track * value) / spec.max);
            return (
              <g>
                <rect
                  x={labelWidth + w * 0.55}
                  y={y - 20}
                  width={186}
                  height={40}
                  rx={5}
                  fill="#0f0d0b"
                />
                <text x={labelWidth + w * 0.55 + 12} y={y - 5} fill="#ffffff" fontSize={12.5} fontWeight={600}>
                  {t.label}
                </text>
                <text x={labelWidth + w * 0.55 + 12} y={y + 12} fill="rgba(255,255,255,0.72)" fontSize={11.5}>
                  {t.value}
                </text>
              </g>
            );
          })()
        : null}
    </svg>
  );
};

const TAU = Math.PI * 2;

const DonutFigure: React.FC<{ spec: DonutChartSpec }> = ({ spec }) => {
  const total = spec.slices.reduce((a, s) => a + s.value, 0) || 1;
  const cx = W / 2;
  const cy = 118;
  const r = 84;
  const width = 34;
  const circumference = TAU * r;
  let offset = 0;

  return (
    <>
      <svg className="chart-svg" viewBox={`0 0 ${W} 250`} xmlns="http://www.w3.org/2000/svg">
        <g transform={`rotate(-90 ${cx} ${cy})`} fill="none" strokeWidth={width}>
          {spec.slices.map((s, i) => {
            const length = (s.value / total) * circumference;
            const dash = `${length - 2} ${circumference}`;
            const dashOffset = -offset;
            offset += length;
            return (
              <circle
                key={s.label}
                cx={cx}
                cy={cy}
                r={r}
                stroke={seriesColor(s.color, i)}
                strokeDasharray={dash}
                strokeDashoffset={dashOffset}
              />
            );
          })}
        </g>
        {spec.centerValue ? (
          <text
            x={cx}
            y={cy + 4}
            textAnchor="middle"
            fontSize={30}
            fontWeight={700}
            fill="var(--foreground)"
          >
            {spec.centerValue}
          </text>
        ) : null}
        {spec.centerLabel ? (
          <text
            x={cx}
            y={cy + 26}
            textAnchor="middle"
            fontSize={12}
            fontWeight={600}
            fill="var(--muted-foreground)"
          >
            {spec.centerLabel}
          </text>
        ) : null}
      </svg>
      {spec.legend === false ? null : (
        <Legend
          entries={spec.slices.map((s, i) => ({
            label: `${s.label} · ${Math.round((s.value / total) * 100)}%`,
            color: seriesColor(s.color, i),
          }))}
        />
      )}
    </>
  );
};

const StatListFigure: React.FC<{ spec: StatListSpec }> = ({ spec }) => (
  <div>
    {spec.items.map((item, i) => (
      <div key={item.label} className="stat-row">
        <span className="dot" style={{ background: seriesColor(item.color, i) }} />
        <span className="s-label">{item.label}</span>
        {item.delta ? (
          <span className={`s-delta ${item.dir === "down" ? "down" : "up"}`}>
            {item.dir === "down" ? "↓" : "↑"} {item.delta}
          </span>
        ) : null}
        <span className="s-value">{item.value}</span>
      </div>
    ))}
  </div>
);

const TableFigure: React.FC<{ spec: TableSpec }> = ({ spec }) => (
  <table className="rd-table">
    <thead>
      <tr>
        {spec.columns.map((c) => (
          <th key={c.key} className={c.align === "right" ? "num" : undefined}>
            {c.label}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {spec.rows.map((row, i) => (
        <tr key={i}>
          {spec.columns.map((c, k) => {
            const value = row[c.key] ?? "";
            const signed = (spec.positive ?? []).includes(c.key);
            const tone = signed ? (value.startsWith("-") ? " rd-down" : " rd-up") : "";
            return (
              <td
                key={c.key}
                className={`${c.align === "right" ? "num" : k === 0 ? "rd-row-name" : ""}${tone}`}
              >
                {value}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  </table>
);

export const ChartFigure: React.FC<{ spec: ChartSpec }> = ({ spec }) => {
  if (spec.kind === "table") return <TableFigure spec={spec} />;
  if (spec.kind === "stat_list") return <StatListFigure spec={spec} />;
  if (spec.kind === "donut") return <DonutFigure spec={spec} />;
  if (spec.kind === "bar") return <BarFigure spec={spec} />;
  if (spec.kind === "column") return <ColumnFigure spec={spec} />;
  if (spec.kind === "line" || spec.kind === "area") return <LineFigure spec={spec} />;
  return null;
};

export const ChartResult: React.FC<{
  title?: string;
  subtitle?: string;
  spec: ChartSpec;
}> = ({ title, subtitle, spec }) => (
  <WidgetCard title={title} subtitle={subtitle} headerAction={<DownloadAction />}>
    <ChartFigure spec={spec} />
  </WidgetCard>
);
