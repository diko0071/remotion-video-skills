import React from "react";
import { RyzeApp } from "../../app-shell";
import "./templates.css";
import { AUTOMATE, CREATE, DASHBOARDS, DECKS, OPTIMIZE, REPORTS } from "./data";
import { TemplatesFilterBar } from "./filter-bar";
import { Section } from "./section";
import { TemplateCard } from "./template-card";
import type { Item } from "./types";

const ALL_SECTIONS: { label: string; items: Item[]; decksFirst?: boolean }[] = [
  { label: "Monitor", items: DASHBOARDS },
  { label: "Create", items: CREATE },
  { label: "Optimize", items: OPTIMIZE },
  { label: "Automate", items: AUTOMATE },
  { label: "Report", items: [...DECKS, ...REPORTS] },
];

export const TemplatesBody: React.FC<{
  offsetY?: number;
  active?: string;
  only?: string[];
  cols?: number;
  scrollPx?: number;
}> = ({ offsetY = 0, active = "All", only, cols, scrollPx = 0 }) => (
  <div className="pg">
    <div className="pg-scroll" style={{ overflow: "hidden" }}>
      <div
        className="pg-inner wide"
        style={
          offsetY + scrollPx ? { marginTop: -(offsetY + scrollPx) } : undefined
        }
      >
        <TemplatesFilterBar active={active} />
        {ALL_SECTIONS.filter((s) => !only || only.includes(s.label)).map(
          (s) => (
            <Section label={s.label} key={s.label} cols={cols}>
              {s.items.map((item) => (
                <TemplateCard
                  item={item}
                  key={item.title}
                  badge={!DECKS.includes(item)}
                />
              ))}
            </Section>
          ),
        )}
      </div>
    </div>
  </div>
);

export const TemplatesPage: React.FC = () => (
  <RyzeApp workspace="ember-and-oak" page="Templates" nav="Templates" stretch>
    <TemplatesBody />
  </RyzeApp>
);
