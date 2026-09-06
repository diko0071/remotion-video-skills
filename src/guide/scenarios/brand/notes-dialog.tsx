import React from "react";
import { interpolate } from "remotion";
import { SPRINGS, useSpringAt } from "../../../core/motion";
import { useClickPress } from "../../../core/press-context";
import "./brand-guide.css";

export const NOTES_TEXT =
  "We only sell B2B — never suggest consumer tactics. Always cite sources. Keep recommendations under 5 items.";

export const NotesDialog: React.FC<{
  at: number;
  visible?: boolean;
  typed: string;
}> = ({ at, visible = true, typed }) => {
  const p = useSpringAt(at, SPRINGS.panel, 22);
  const saveScale = useClickPress("brand.notes.save");
  return (
    <div className="bg-veil" style={{ opacity: visible ? p : 0 }}>
      <div
        className="bg-dlg"
        data-click="brand.notes.dialog"
        style={{ transform: `translateY(${interpolate(p, [0, 1], [14, 0])}px)` }}
      >
        <div className="bg-dlg-head">
          <div className="bg-dlg-title">Agent notes</div>
          <div className="bg-dlg-desc">
            Anything the agent should always remember when working with you. Used
            across chat and the agent.
          </div>
        </div>
        <div className="bg-dlg-area">
          {typed.length === 0 ? (
            <span className="bg-dlg-ph">
              e.g. We sell B2B only — never suggest consumer tactics. Always cite
              sources. Keep recommendations under 5 items.
            </span>
          ) : (
            <span>{typed}</span>
          )}
        </div>
        <div className="bg-dlg-foot">
          <span className="btn-ghost">Cancel</span>
          <span
            className="btn-primary"
            data-click="brand.notes.save"
            style={{ scale: String(saveScale) }}
          >
            Save
          </span>
        </div>
      </div>
    </div>
  );
};
