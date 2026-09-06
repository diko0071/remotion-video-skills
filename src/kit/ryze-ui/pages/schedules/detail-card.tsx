import React from "react";
import "../../pages.css";
import "./schedules.css";

export const ScheduleDetailCard: React.FC<{
  title: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  clickId?: string;
}> = ({ title, children, style, clickId }) => (
  <div className="pg-card sch-detail-card" style={style} data-click={clickId}>
    <div className="sch-card-head">
      <h2 className="sch-card-title">{title}</h2>
    </div>
    <div className="sch-card-body">{children}</div>
  </div>
);
