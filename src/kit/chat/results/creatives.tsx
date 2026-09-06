import React from "react";
import { Img, staticFile } from "remotion";
import { CreativeCard } from "../../ryze-ui/creative";
import { WidgetCard } from "../../ryze-ui/widget-card";
import type { CreativeItem } from "../types";

export const CreativeGridResult: React.FC<{
  title: string;
  subtitle?: string;
  items: CreativeItem[];
  tile?: number;
}> = ({ title, subtitle, items, tile }) => (
  <WidgetCard title={title} subtitle={subtitle}>
    <div
      className="creative-grid"
      style={{
        marginTop: 0,
        gridTemplateColumns: `repeat(${Math.min(items.length, 3)}, ${tile ? `minmax(0, ${tile}px)` : "1fr"})`,
      }}
    >
      {items.map((item) => (
        <CreativeCard
          key={item.name}
          name={item.name}
          caption={item.caption}
          actions={Boolean(item.annotateId)}
          annotateId={item.annotateId}
          image={
            <Img
              src={staticFile(item.file)}
              style={{ width: "100%", height: "100%", objectFit: "contain", background: "#0A0E22", display: "block" }}
            />
          }
        />
      ))}
    </div>
  </WidgetCard>
);
