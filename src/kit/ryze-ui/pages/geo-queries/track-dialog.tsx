import React from "react";
import { interpolate } from "remotion";
import { SPRINGS, useSpringAt } from "../../../../core/motion";
import { useClickPress } from "../../../../core/press-context";
import { useCurrentFrame } from "remotion";
import { typing } from "../../../../core/motion";
import "./geo-queries.css";

const DESCRIPTION =
  "One prompt per line — questions your buyers ask AI assistants. Each prompt is checked on ChatGPT, Claude, Gemini and Perplexity.";
const PLACEHOLDER = "best soundproof office pod for a startup office";

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

export const TrackPromptsDialog: React.FC<{
  at: number;
  visible?: boolean;
  lines?: string[];
  typeAt?: number;
  cursorOn?: boolean;
}> = ({ at, visible = true, lines = [], typeAt, cursorOn = false }) => {
  const frame = useCurrentFrame();
  const p = useSpringAt(at, SPRINGS.panel, 22);
  const submitScale = useClickPress("prompts.add");
  const full = lines.join("\n");
  const typed =
    typeAt === undefined
      ? full
      : typing(frame, full, typeAt, typeAt + Math.ceil(full.length / 0.9));
  return (
    <div className="gq-veil" style={{ opacity: visible ? p : 0 }}>
      <div
        className="gq-dlg"
        data-click="prompts.dialog"
        style={{ transform: `translateY(${interpolate(p, [0, 1], [14, 0])}px)` }}
      >
        <div className="gq-dlg-head">
          <div className="gq-dlg-title">Track prompts</div>
          <div className="gq-dlg-desc">{DESCRIPTION}</div>
        </div>
        <div className="gq-dlg-area" data-click="prompts.area">
          {typed.length === 0 ? (
            <span className="ph">{PLACEHOLDER}</span>
          ) : (
            <span>
              {typed}
              {cursorOn ? <span className="gq-caret" /> : null}
            </span>
          )}
        </div>
        <span className="gq-dlg-select">
          <span>No topic</span>
          <ChevronDown />
        </span>
        <div className="gq-dlg-foot">
          <span className="btn-outline">Suggest prompts</span>
          <span
            className="btn-primary"
            data-click="prompts.add"
            style={{ scale: String(submitScale) }}
          >
            Add prompts
          </span>
        </div>
      </div>
    </div>
  );
};

export const RunPromptsDialog: React.FC<{
  at: number;
  visible?: boolean;
  count?: number;
}> = ({ at, visible = true, count = 20 }) => {
  const p = useSpringAt(at, SPRINGS.panel, 22);
  const runScale = useClickPress("prompts.run");
  return (
    <div className="gq-veil" style={{ opacity: visible ? p : 0 }}>
      <div
        className="gq-dlg"
        style={{ transform: `translateY(${interpolate(p, [0, 1], [14, 0])}px)` }}
      >
        <div className="gq-dlg-head">
          <div className="gq-dlg-title">Re-ask AI assistants?</div>
          <div className="gq-dlg-desc">
            Runs all {count} prompts on ChatGPT, Claude, Gemini and Perplexity and
            updates the GEO dashboard.
          </div>
        </div>
        <div className="gq-dlg-foot">
          <span className="btn-outline">Cancel</span>
          <span
            className="btn-primary"
            data-click="prompts.run"
            style={{ scale: String(runScale) }}
          >
            Run prompts
          </span>
        </div>
      </div>
    </div>
  );
};
