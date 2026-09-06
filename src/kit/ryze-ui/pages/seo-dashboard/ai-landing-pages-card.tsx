import React from "react";
import "./seo-dashboard.css";
import { CardHead } from "./card-head";
import { LandingPageRow, fmtNumber } from "./types";

export const AiLandingPagesCard: React.FC<{
  title?: string;
  pages: LandingPageRow[];
  engineColors: string[];
  style?: React.CSSProperties;
}> = ({ title = "AI Landing Pages", pages, engineColors, style }) => {
  const totals = pages.map((p) => p.byEngine.reduce((s, v) => s + v, 0));
  const max = Math.max(...totals);
  return (
    <div className="sd-card" style={style}>
      <CardHead title={title} />
      <div className="sd-card-body">
        {pages.map((page, idx) => {
          const total = totals[idx];
          return (
            <div className="sd-lp" key={page.url}>
              <span className="u">{page.url}</span>
              <span className="track">
                <span
                  className="seg"
                  style={{ width: `${(total / max) * 100}%` }}
                >
                  {page.byEngine.map((sessions, i) => (
                    <i
                      key={engineColors[i]}
                      style={{
                        width: `${(sessions / total) * 100}%`,
                        background: engineColors[i],
                      }}
                    />
                  ))}
                </span>
              </span>
              <span className="v">{fmtNumber(total)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
