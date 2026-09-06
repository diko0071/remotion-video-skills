import React from "react";
import { MenuDotsIcon } from "../../icons";
import "../../pages.css";
import "./reports.css";
import { LayoutDashboardGlyph, PresentationGlyph } from "./icons";
import { ReportRowData, STATUS_LABEL, STATUS_TONE } from "./types";

export const ReportRow: React.FC<{
  row: ReportRowData;
  style?: React.CSSProperties;
}> = ({ row, style }) => (
  <div
    className="rep-row"
    data-click={row.name ? `report.${row.name}` : undefined}
    style={style}
  >
    <div className="rep-lead">
      <span className="rep-icon">
        {row.type === "deck" ? <PresentationGlyph /> : <LayoutDashboardGlyph />}
      </span>
      <div className="rep-txt">
        <div className="rep-name">{row.name ?? row.created}</div>
        <div className="rep-sub">{row.created}</div>
      </div>
    </div>
    <div className="rep-right">
      {row.status === "completed" ? null : (
        <span className={`rep-pill ${STATUS_TONE[row.status]}`}>
          <i />
          {STATUS_LABEL[row.status]}
        </span>
      )}
      <span className="rep-more">
        <MenuDotsIcon size={16} />
      </span>
    </div>
  </div>
);

export const ReportsList: React.FC<{
  rows: ReportRowData[];
  style?: React.CSSProperties;
}> = ({ rows, style }) => (
  <div className="rep-list" style={style}>
    {rows.map((row) => (
      <ReportRow key={row.name ?? row.created} row={row} />
    ))}
  </div>
);
