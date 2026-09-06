import React from "react";
import { interpolate } from "remotion";
import { SPRINGS, useSpringAt } from "../../../../core/motion";
import { useClickPress } from "../../../../core/press-context";
import "./competitor-ads.css";
import { NOTIFY_CONFIRM } from "./data";

export const NotifyConfirmDialog: React.FC<{
  at: number;
  brand: string;
  visible?: boolean;
}> = ({ at, brand, visible = true }) => {
  const p = useSpringAt(at, SPRINGS.panel, 22);
  const enableScale = useClickPress("comp.notify.enable");
  return (
    <div className="cmp-veil" style={{ opacity: visible ? p : 0 }}>
      <div
        className="cmp-dlg"
        data-click="comp.notify.dialog"
        style={{ transform: `translateY(${interpolate(p, [0, 1], [14, 0])}px)` }}
      >
        <div className="cmp-dlg-head">
          <div className="cmp-dlg-title">{NOTIFY_CONFIRM.enableTitle}</div>
          <div className="cmp-dlg-desc">{NOTIFY_CONFIRM.enableDescription(brand)}</div>
        </div>
        <div className="cmp-dlg-foot">
          <span className="cmp-dlg-foot-spacer" />
          <span className="btn-ghost" data-click="comp.notify.cancel">
            {NOTIFY_CONFIRM.cancel}
          </span>
          <span
            className="btn-primary"
            data-click="comp.notify.enable"
            style={{ scale: String(enableScale) }}
          >
            {NOTIFY_CONFIRM.confirm}
          </span>
        </div>
      </div>
    </div>
  );
};
