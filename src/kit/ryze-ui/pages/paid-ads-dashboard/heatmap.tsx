import React from "react";
import "./paid-ads-dashboard.css";
import { DAY_LABELS, HOUR_LABELS } from "./data";

export const heatCell = (dow: number, hour: number) => {
  const daytime = Math.max(0, Math.sin(((hour - 5) / 24) * Math.PI * 1.05));
  const weekday = dow < 5 ? 1 : 0.72;
  const wobble = ((dow * 7 + hour * 3) % 11) / 34;
  return Math.min(1, daytime * weekday + wobble * 0.4);
};

export const Heatmap: React.FC<{
  title: string;
  note: string;
  tone: "positive" | "negative";
  sub?: string;
  hours?: string[];
  days?: string[];
  style?: React.CSSProperties;
}> = ({
  title,
  note,
  tone,
  sub = "Hourly data from Google and Meta only",
  hours = HOUR_LABELS,
  days = DAY_LABELS,
  style,
}) => (
  <div className="pa-card" style={style}>
    <div className="pa-card-head">
      <div>
        <div className="pa-card-title">{title}</div>
        <div className="pa-card-sub">{sub}</div>
      </div>
      <span className="pa-note">{note}</span>
    </div>
    <div className="pa-heat">
      <div className="pa-heat-hours">
        {hours.map((h) => (
          <span key={h}>{h}</span>
        ))}
      </div>
      {days.map((day, dow) => (
        <div className="pa-heat-row" key={`${day}-${dow}`}>
          <span className="pa-heat-day">{day}</span>
          <div className="pa-heat-cells">
            {Array.from({ length: 24 }, (unused, hour) => (
              <span
                key={hour}
                style={{
                  backgroundColor:
                    tone === "positive"
                      ? `rgb(16 122 74 / ${(0.08 + heatCell(dow, hour) * 0.8).toFixed(2)})`
                      : `rgb(192 43 30 / ${(0.08 + heatCell(dow, hour) * 0.88).toFixed(2)})`,
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);
