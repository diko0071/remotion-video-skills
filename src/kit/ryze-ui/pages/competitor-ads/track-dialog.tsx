import React from "react";
import { interpolate } from "remotion";
import { SPRINGS, useSpringAt } from "../../../../core/motion";
import { useClickPress } from "../../../../core/press-context";
import "./competitor-ads.css";
import { TRACK_DIALOG } from "./data";

const Field: React.FC<{ label: string; placeholder: string; value?: string }> = ({
  label,
  placeholder,
  value,
}) => (
  <div className="cmp-dlg-field">
    <span className="cmp-dlg-label">{label}</span>
    <span className={`cmp-dlg-input${value ? "" : " empty"}`}>
      {value || placeholder}
    </span>
  </div>
);

export const TrackCompetitorDialog: React.FC<{
  at: number;
  visible?: boolean;
  nameText?: string;
  domainText?: string;
}> = ({ at, visible = true, nameText, domainText }) => {
  const p = useSpringAt(at, SPRINGS.panel, 22);
  const submitScale = useClickPress("comp.track.submit");
  return (
    <div className="cmp-veil" style={{ opacity: visible ? p : 0 }}>
      <div
        className="cmp-dlg"
        data-click="comp.track.dialog"
        style={{ transform: `translateY(${interpolate(p, [0, 1], [14, 0])}px)` }}
      >
        <div className="cmp-dlg-head">
          <div className="cmp-dlg-title">{TRACK_DIALOG.title}</div>
          <div className="cmp-dlg-desc">{TRACK_DIALOG.description}</div>
        </div>
        <div className="cmp-dlg-body">
          <Field
            label={TRACK_DIALOG.nameLabel}
            placeholder={TRACK_DIALOG.namePlaceholder}
            value={nameText}
          />
          <Field
            label={TRACK_DIALOG.domainLabel}
            placeholder={TRACK_DIALOG.domainPlaceholder}
            value={domainText}
          />
        </div>
        <div className="cmp-dlg-foot">
          <span className="btn-ghost" data-click="comp.track.cancel">
            {TRACK_DIALOG.cancel}
          </span>
          <span
            className="btn-primary"
            data-click="comp.track.submit"
            style={{ scale: String(submitScale) }}
          >
            {TRACK_DIALOG.submit}
          </span>
        </div>
      </div>
    </div>
  );
};
