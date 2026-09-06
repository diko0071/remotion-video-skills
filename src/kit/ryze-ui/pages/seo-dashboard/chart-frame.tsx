import "./seo-dashboard.css";

export const CW = 640;
export const CH = 300;
export const PL = 46;
export const PR = 46;
export const PT = 12;
export const PB = 26;

export const gridLines = (
  ticks: string[],
  rightTicks?: string[],
  vw: number = CW,
) =>
  ticks.map((t, i) => {
    const y = PT + (i / (ticks.length - 1)) * (CH - PT - PB);
    return (
      <g key={t + String(i)}>
        <line
          x1={PL}
          y1={y}
          x2={vw - PR}
          y2={y}
          stroke="var(--border)"
          strokeOpacity={0.6}
        />
        <text x={PL - 8} y={y + 3} className="sd-axis" textAnchor="end">
          {t}
        </text>
        {rightTicks ? (
          <text
            x={vw - PR + 8}
            y={y + 3}
            className="sd-axis"
            textAnchor="start"
          >
            {rightTicks[i]}
          </text>
        ) : null}
      </g>
    );
  });

export const linePath = (
  values: number[],
  min: number,
  max: number,
  h: number,
) =>
  values
    .map((v, i) => {
      const x = PL + (i / (values.length - 1)) * (CW - PL - PR);
      const y = h - PB - ((v - min) / (max - min || 1)) * (h - PT - PB);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
