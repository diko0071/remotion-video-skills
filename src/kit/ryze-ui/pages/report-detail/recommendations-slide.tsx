import React from "react";
import "./report-detail.css";
import { Bullet, Slide } from "./slide";
import { ReportRec } from "./types";

export const RecommendationsSlide: React.FC<{
  recs: ReportRec[];
  order?: number;
  label?: string;
  style?: React.CSSProperties;
}> = ({ recs, order = 4, label = "CRO & merchandising", style }) => (
  <Slide order={order} label={label} style={style}>
    <div className="rd-recs">
      {recs.map((r) => (
        <div key={r.title} className="rd-rec">
          <h3>{r.title}</h3>
          <div className="rd-rec-cols">
            <div>
              <div className="rd-rec-label">Problem</div>
              <ul className="rd-bullets">
                {r.why.map((line) => (
                  <Bullet key={line} tone="muted">
                    {line}
                  </Bullet>
                ))}
              </ul>
            </div>
            <div>
              <div className="rd-rec-label">How to fix</div>
              <ul className="rd-bullets">
                {r.nextSteps.map((line) => (
                  <Bullet key={line}>{line}</Bullet>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  </Slide>
);
