import React from "react";
import { WidgetCard } from "../../ryze-ui/widget-card";

export const ArticleResult: React.FC<{
  title?: string;
  subtitle?: string;
  heading: string;
  meta?: string;
  paragraphs: string[];
}> = ({ title, subtitle, heading, meta, paragraphs }) => (
  <WidgetCard title={title} subtitle={subtitle}>
    <div style={{ maxWidth: 620 }}>
      <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.25 }}>
        {heading}
      </div>
      {meta ? (
        <div style={{ marginTop: 6, fontSize: 12, color: "var(--muted-foreground)" }}>{meta}</div>
      ) : null}
      {paragraphs.map((p, i) => (
        <p
          key={i}
          style={{
            marginTop: 14,
            fontSize: 14.5,
            lineHeight: 1.65,
            color: "rgba(15,23,42,0.82)",
          }}
        >
          {p}
        </p>
      ))}
    </div>
  </WidgetCard>
);
