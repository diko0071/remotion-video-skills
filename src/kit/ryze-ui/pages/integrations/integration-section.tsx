import React from "react";
import "./integrations.css";
import { IntegrationCard } from "./integration-card";
import { IntegrationGroup } from "./types";

export const IntegrationSection: React.FC<{
  group: IntegrationGroup;
  style?: React.CSSProperties;
}> = ({ group, style }) => (
  <section className="intg-section" style={style}>
    <h2 className="intg-group-label">{group.category}</h2>
    <div className="intg-grid">
      {group.items.map((item) => (
        <IntegrationCard key={item.name} item={item} />
      ))}
    </div>
  </section>
);
