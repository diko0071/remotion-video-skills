import React from "react";
import { interpolate } from "remotion";
import { SPRINGS, useSpringAt } from "../../../../core/motion";
import { useClickPress } from "../../../../core/press-context";
import { CheckIcon } from "../../icons";
import "./content-plan.css";
import { REPUBLISH, REPUBLISH_PLATFORM } from "./data";

const ChevronDown: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const RepublishDialog: React.FC<{
  at: number;
  platform?: string;
  removeFromPlatform?: boolean;
  visible?: boolean;
  confirming?: boolean;
}> = ({
  at,
  platform = REPUBLISH_PLATFORM,
  removeFromPlatform = true,
  visible = true,
  confirming,
}) => {
  const p = useSpringAt(at, SPRINGS.panel, 22);
  const platformScale = useClickPress("republish.platform");
  const confirmScale = useClickPress("republish.confirm");
  return (
    <div className="cp-veil" style={{ opacity: visible ? p : 0 }}>
      <div
        className="cp-dlg"
        data-click="republish.dialog"
        style={{
          transform: `translateY(${interpolate(p, [0, 1], [14, 0])}px)`,
        }}
      >
        <div className="cp-dlg-head">
          <div className="cp-dlg-title">{REPUBLISH.title}</div>
          <div className="cp-dlg-desc">{REPUBLISH.description}</div>
        </div>
        <div className="cp-dlg-body">
          <div className="cp-dlg-row">
            <span className="cp-dlg-label">{REPUBLISH.platformLabel}</span>
            <span
              className="cp-dlg-select"
              data-click="republish.platform"
              style={{ scale: String(platformScale) }}
            >
              <span>{platform}</span>
              <ChevronDown />
            </span>
          </div>
          <div className="cp-dlg-check">
            <span className={`cp-checkbox${removeFromPlatform ? " on" : ""}`}>
              {removeFromPlatform ? <CheckIcon size={11} /> : null}
            </span>
            <div className="cp-dlg-check-text">
              <span className="cp-dlg-check-label">
                {REPUBLISH.removeLabel.replace("{platform}", platform)}
              </span>
              <span className="cp-dlg-hint">{REPUBLISH.removeHint}</span>
            </div>
          </div>
          <span className="cp-dlg-hint">{REPUBLISH.samePlatformHint}</span>
        </div>
        <div className="cp-dlg-foot">
          <span className="btn-outline">{REPUBLISH.cancel}</span>
          <span
            className="btn-primary"
            data-click="republish.confirm"
            style={{ scale: String(confirmScale) }}
          >
            {confirming ? (
              <>
                <CheckIcon size={14} />
                {REPUBLISH.confirm}
              </>
            ) : (
              REPUBLISH.confirm
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
