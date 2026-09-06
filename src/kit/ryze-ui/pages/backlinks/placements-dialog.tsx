import React from "react";
import { interpolate } from "remotion";
import { SPRINGS, useSpringAt } from "../../../../core/motion";
import "./backlinks.css";
import { PLACEMENT_DOMAINS } from "./data";
import { ExternalLinkIcon } from "./icons";

export const PlacementsDialog: React.FC<{
  at: number;
  visible?: boolean;
  domains?: string[];
  scrollAt?: number;
  scrollBy?: number;
}> = ({ at, visible = true, domains = PLACEMENT_DOMAINS, scrollAt, scrollBy = 0 }) => {
  const p = useSpringAt(at, SPRINGS.panel, 22);
  const scroll = useSpringAt(scrollAt ?? -1e6, SPRINGS.smooth, 50);
  const shift = interpolate(scroll, [0, 1], [0, -scrollBy]);
  return (
    <div className="mn-veil" style={{ opacity: visible ? p : 0 }}>
      <div
        className="mn-dlg"
        data-click="placements.dialog"
        style={{ transform: `translateY(${interpolate(p, [0, 1], [14, 0])}px)` }}
      >
        <div className="mn-dlg-title">Published on {domains.length} sites</div>
        <div className="mn-dlg-list">
          <div style={{ transform: `translateY(${shift}px)` }}>
            {domains.map((d) => (
              <div key={d} className="mn-dlg-row">
                <span className="mn-dlg-domain">{d}</span>
                <span className="mn-dlg-open">
                  Open
                  <ExternalLinkIcon />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
