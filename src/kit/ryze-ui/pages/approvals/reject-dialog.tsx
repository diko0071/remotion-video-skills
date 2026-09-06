import React from "react";
import { interpolate } from "remotion";
import { SPRINGS, useSpringAt } from "../../../../core/motion";
import { useClickPress } from "../../../../core/press-context";
import "./approvals.css";
import { REJECT_DIALOG } from "./data";

export const ApprovalRejectDialog: React.FC<{
  at: number;
  visible?: boolean;
  reasonText?: string;
}> = ({ at, visible = true, reasonText }) => {
  const p = useSpringAt(at, SPRINGS.panel, 22);
  const confirmScale = useClickPress("apr.rejectdlg.confirm");
  const cancelScale = useClickPress("apr.rejectdlg.cancel");
  return (
    <div className="appr-dlg-veil" style={{ opacity: visible ? p : 0 }}>
      <div
        className="appr-dlg"
        data-click="apr.rejectdlg"
        style={{ transform: `translateY(${interpolate(p, [0, 1], [14, 0])}px)` }}
      >
        <div className="appr-dlg-head">
          <div className="appr-dlg-title">{REJECT_DIALOG.title}</div>
          <div className="appr-dlg-desc">{REJECT_DIALOG.description}</div>
        </div>
        <div className={`appr-dlg-textarea${reasonText ? "" : " empty"}`}>
          {reasonText || REJECT_DIALOG.placeholder}
        </div>
        <div className="appr-dlg-foot">
          <span
            className="btn-outline btn-sm"
            data-click="apr.rejectdlg.cancel"
            style={{ scale: String(cancelScale) }}
          >
            {REJECT_DIALOG.cancel}
          </span>
          <span
            className="btn-primary btn-sm"
            data-click="apr.rejectdlg.confirm"
            style={{ scale: String(confirmScale) }}
          >
            {REJECT_DIALOG.confirm}
          </span>
        </div>
      </div>
    </div>
  );
};
