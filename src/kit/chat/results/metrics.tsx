import React from "react";
import { WidgetCard } from "../../ryze-ui/widget-card";
import type { MetricItem } from "../types";

export const MetricsResult: React.FC<{
  title: string;
  subtitle?: string;
  items: MetricItem[];
}> = ({ title, subtitle, items }) => (
  <WidgetCard title={title} subtitle={subtitle}>
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: 16 }}>
      {items.map((item) => (
        <div key={item.label}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted-foreground)" }}>
            {item.label}
          </div>
          <div
            style={{
              marginTop: 6,
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "-0.025em",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {item.value}
          </div>
          {item.note ? (
            <div style={{ marginTop: 2, fontSize: 11, color: "var(--muted-foreground)" }}>
              {item.note}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  </WidgetCard>
);
