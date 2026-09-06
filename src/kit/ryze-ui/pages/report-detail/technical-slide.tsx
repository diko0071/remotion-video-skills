import React from "react";
import "./report-detail.css";
import { Slide } from "./slide";
import { CHECK_LABEL, CHECK_TONE, ReportCheck } from "./types";

export const TechnicalSlide: React.FC<{
  checks: ReportCheck[];
  order?: number;
  label?: string;
  title?: string;
  style?: React.CSSProperties;
}> = ({
  checks,
  order = 5,
  label = "SEO — Technical",
  title = "Technical checklist",
  style,
}) => (
  <Slide order={order} label={label} style={style}>
    <div className="rd-checklist">
      <div className="rd-check-title">{title}</div>
      <ul>
        {checks.map((item) => (
          <li key={item.slug}>
            <div className="txt">
              <div className="name">{item.title}</div>
              <div className="desc">{item.description}</div>
              {item.blockReason ? (
                <div className="blocked">Blocked: {item.blockReason}</div>
              ) : null}
            </div>
            <span className={`spill ${CHECK_TONE[item.status]}`}>
              {CHECK_LABEL[item.status]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </Slide>
);
