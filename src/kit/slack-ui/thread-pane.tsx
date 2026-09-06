import React from "react";
import "./slack.css";
import { SlackIcon } from "./icons";

export const SlackThreadSeparator: React.FC<{ count: number }> = ({ count }) => (
  <div className="sk-thread-sep">
    <span className="cnt">{count === 1 ? "1 reply" : `${count} replies`}</span>
    <span className="line" />
  </div>
);

export const SlackThreadPane: React.FC<{
  channel?: string;
  children: React.ReactNode;
  composer?: React.ReactNode;
  width?: number;
  style?: React.CSSProperties;
}> = ({ channel = "social", children, composer, width, style }) => (
  <div className="sk-pane secondary" style={{ ...(width ? { width } : null), ...style }}>
    <div className="sk-pane-header">
      <span className="title" style={{ fontSize: 16.8 }}>Thread</span>
      <span className="subtitle" style={{ display: "flex", alignItems: "center" }}>
        <SlackIcon name="channel" size={12} />
        {channel}
      </span>
      <span className="spacer" />
      <span className="hbtn"><SlackIcon name="ellipsis-vertical-filled" size={18} /></span>
      <span className="hbtn"><SlackIcon name="close" size={18} /></span>
    </div>
    <div className="sk-thread-body">
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "flex-start", overflow: "hidden" }}>
        {children}
      </div>
      {composer ? <div className="sk-composer-wrap" style={{ paddingTop: 8 }}>{composer}</div> : null}
    </div>
  </div>
);
