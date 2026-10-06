import React from "react";
import "./muse.css";
import { MuseAvatar } from "./avatar";
import { CheckBadgeIcon, CheckCircleIcon, CloseIcon, FingerprintIcon, GlobeIcon, HistoryIcon, ListIcon, NotesIcon, PanelIcon, PencilIcon, ShieldIcon } from "./icons";

export const MusePanel: React.FC<{ width?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ width = 460, children, style }) => (
  <div className="mu-panel" style={{ width, ...style }}>
    {children}
  </div>
);

export const MuseArtifactPanel: React.FC<{ title: string; width?: number; children?: React.ReactNode; style?: React.CSSProperties }> = ({ title, width = 1270, children, style }) => (
  <MusePanel width={width} style={style}>
    <div className="mu-panel-top">
      <PanelIcon size={26} />
      {title}
      <span className="x">
        <CloseIcon size={24} />
      </span>
    </div>
    <div className="mu-panel-body">{children ?? <div className="mu-panel-empty">Not found</div>}</div>
  </MusePanel>
);

export type ActivityRow = { title: string; sub: string; time: string; kind?: "check" | "note" | "web" };

const ROW_ICON = {
  check: <CheckCircleIcon size={22} />,
  note: <NotesIcon size={22} />,
  web: <GlobeIcon size={22} />,
};

export const MuseProfilePanel: React.FC<{
  name?: string;
  connected?: boolean;
  section?: string;
  rows: ActivityRow[];
  width?: number;
  style?: React.CSSProperties;
}> = ({ name = "Muse", connected = true, section = "Yesterday", rows, width = 460, style }) => (
  <MusePanel width={width} style={style}>
    <div className="mu-panel-top">
      <span className="x">
        <CloseIcon size={24} />
      </span>
    </div>
    <div className="mu-profile" style={{ paddingTop: 12 }}>
      <span style={{ position: "relative" }}>
        <MuseAvatar size={128} />
        <span style={{ position: "absolute", right: -6, bottom: -2, width: 40, height: 40, borderRadius: 999, background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <PencilIcon size={18} />
        </span>
      </span>
      <div className="mu-profile-name">{name}</div>
      <div className="mu-profile-status">
        <CheckBadgeIcon size={20} />
        {connected ? "Connected" : "Not connected"}
      </div>
      <div className="mu-tabs">
        <span className="mu-tab active">
          <ListIcon size={22} />
        </span>
        <span className="mu-tab">
          <ShieldIcon size={22} />
        </span>
        <span className="mu-tab">
          <HistoryIcon size={22} />
        </span>
        <span className="mu-tab">
          <FingerprintIcon size={22} />
        </span>
      </div>
      <div className="mu-section">{section}</div>
      {rows.map((r, i) => (
        <div key={i} className="mu-activity">
          <span className="mu-activity-icon">{ROW_ICON[r.kind ?? "check"]}</span>
          <span>
            <div className="mu-activity-title">{r.title}</div>
            <div className="mu-activity-sub">{r.sub}</div>
            <div className="mu-activity-time">{r.time}</div>
          </span>
        </div>
      ))}
    </div>
  </MusePanel>
);
