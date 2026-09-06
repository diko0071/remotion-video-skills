import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SPRINGS, typing, useSpringAt } from "../../../core/motion";
import { useClickPress } from "../../../core/press-context";
import "./reports-guide.css";

export const RECIPIENT = "anna@ember-and-oak.com";

export const SendEmailDialog: React.FC<{ at: number; visible: boolean }> = ({ at, visible }) => {
  const frame = useCurrentFrame();
  const p = useSpringAt(at, SPRINGS.panel, 18);
  const sendScale = useClickPress("rep.email.send");
  const typed = typing(frame, RECIPIENT, at + 14, at + 14 + Math.ceil(RECIPIENT.length / 0.9));
  return (
    <div className="repx-veil" style={{ opacity: visible ? p : 0 }}>
      <div
        className="repx-dialog"
        style={{ transform: `translateY(${interpolate(p, [0, 1], [12, 0])}px)` }}
      >
        <h4>Send report via email</h4>
        <p className="repx-sub">Recipients get a PDF of this report.</p>
        <div className="repx-field">
          <span className="repx-label">Recipients</span>
          <div className="repx-input">
            {typed}
            <span className="repx-caret" style={{ opacity: frame % 24 < 12 ? 1 : 0 }} />
          </div>
          <span className="repx-hint">Separate multiple emails with commas.</span>
        </div>
        <div className="repx-actions">
          <span
            className="btn-primary"
            data-click="rep.email.send"
            style={{ scale: String(sendScale) }}
          >
            Send
          </span>
          <span className="btn-outline">Cancel</span>
        </div>
      </div>
    </div>
  );
};
