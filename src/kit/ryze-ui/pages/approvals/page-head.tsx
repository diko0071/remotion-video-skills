import React from "react";
import { useClickPress } from "../../../../core/press-context";
import "./approvals.css";
import { APPROVALS_SUB, APPROVALS_TITLE } from "./data";
import { BellIcon } from "./icons";

export const ApprovalsPageHead: React.FC<{
  title?: string;
  sub?: string;
  action?: string;
  style?: React.CSSProperties;
}> = ({ title = APPROVALS_TITLE, sub = APPROVALS_SUB, action = "Notifications", style }) => {
  const notifyScale = useClickPress("apr.notify");
  return (
    <div className="pg-head" style={style}>
      <div>
        <h1 className="pg-h1 plain">{title}</h1>
        <p className="pg-sub plain">{sub}</p>
      </div>
      <div className="pg-actions">
        <span
          className="btn-outline appr-notify"
          data-click="apr.notify"
          style={{ scale: String(notifyScale) }}
        >
          <BellIcon />
          {action}
        </span>
      </div>
    </div>
  );
};
