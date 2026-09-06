import React from "react";
import { interpolate } from "remotion";
import { SPRINGS, useSpringAt } from "../../../../core/motion";
import { useClickPress } from "../../../../core/press-context";
import "./approvals.css";
import { Channel } from "./channel";
import { STATUS_META } from "./data";
import { Pill } from "./pill";
import { ApprovalRow, ApprovalStatus } from "./types";

const ExternalGlyph: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);

const Section: React.FC<{
  label: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
}> = ({ label, aside, children }) => (
  <div className="appr-sec">
    <div className="appr-sec-head">
      <span className="appr-sec-label">{label}</span>
      {aside}
    </div>
    {children}
  </div>
);

export const ApprovalDetailSheet: React.FC<{
  at: number;
  visible?: boolean;
  row: ApprovalRow;
  statusOverride?: ApprovalStatus;
  showApplyLink?: boolean;
}> = ({ at, visible = true, row, statusOverride, showApplyLink }) => {
  const p = useSpringAt(at, SPRINGS.panel, 26);
  const approveScale = useClickPress("apr.sheet.approve");
  const rejectScale = useClickPress("apr.sheet.reject");
  const fixedScale = useClickPress("apr.sheet.fixed");
  const ackScale = useClickPress("apr.sheet.ack");
  const detail = row.detail;
  const status = statusOverride ?? row.status;
  const proposed = status === "proposed";
  const meta = STATUS_META[status];
  return (
    <div className="appr-sheet-veil" style={{ opacity: visible ? p : 0 }}>
      <div
        className="appr-sheet"
        data-click="apr.sheet"
        style={{ transform: `translateX(${interpolate(p, [0, 1], [100, 0])}%)` }}
      >
        <div className="appr-sheet-scroll">
          <div className="appr-sheet-head">
            <div className="appr-sheet-meta">
              <Channel channel={row.channel} />
              {detail ? (
                <span className="appr-sec-label">{detail.product}</span>
              ) : null}
              {proposed && row.blocked ? (
                <Pill tone="warn" label="Blocked" />
              ) : (
                <Pill tone={meta.tone} label={meta.label} />
              )}
              <span className="pg-meta">{row.age}</span>
            </div>
            <div className="appr-sheet-title">{row.title}</div>
            {detail ? (
              <div className="appr-sheet-desc">{detail.description}</div>
            ) : null}
          </div>
          {detail ? (
            <div className="appr-sheet-body">
              {proposed && row.blocked && detail.blocker ? (
                <Section label="Blocker">
                  <div className="appr-blocker">
                    <p>{detail.blocker}</p>
                    <span
                      className="btn-outline btn-sm"
                      data-click="apr.sheet.fixed"
                      style={{ scale: String(fixedScale) }}
                    >
                      I fixed it
                    </span>
                  </div>
                </Section>
              ) : null}
              <Section label="Entity">
                <div className="appr-entity">
                  {Object.entries(detail.entity).map(([key, value]) => (
                    <div key={key} className="appr-entity-row">
                      <span className="appr-sec-label">
                        {key.split("_").join(" ")}
                      </span>
                      <span className="appr-entity-value">{value}</span>
                    </div>
                  ))}
                </div>
              </Section>
              <Section label="Proposed changes">
                <div className="appr-changes">
                  <div className="appr-change-row head">
                    <span className="appr-sec-label">Change</span>
                    <span className="appr-sec-label">Before</span>
                    <span className="appr-sec-label">After</span>
                  </div>
                  {detail.changes.map((change) => (
                    <div key={change.label} className="appr-change-row">
                      <span>{change.label}</span>
                      <span className="from">{change.from ?? "—"}</span>
                      <span className="to">{change.to}</span>
                    </div>
                  ))}
                </div>
              </Section>
              <Section
                label="Evidence"
                aside={
                  detail.evidence.window ? (
                    <span className="pg-meta">{detail.evidence.window}</span>
                  ) : null
                }
              >
                <ul className="appr-evid">
                  {detail.evidence.points.map((point) => (
                    <li key={point}>
                      <span className="appr-evid-dot">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Section>
              {detail.impact ? (
                <Section label="Expected impact">
                  <div className="appr-impact">
                    <b>{detail.impact.label}</b>{" "}
                    <span>
                      ({detail.impact.kind === "measured" ? "measured" : "est."})
                    </span>
                  </div>
                </Section>
              ) : null}
              <Section label="Tracing">
                <div className="appr-tracing">
                  <span className="appr-run-link" data-click="apr.sheet.research">
                    View research run
                    <ExternalGlyph />
                  </span>
                  {showApplyLink ? (
                    <span className="appr-run-link" data-click="apr.sheet.apply">
                      View apply run
                      <ExternalGlyph />
                    </span>
                  ) : null}
                </div>
              </Section>
            </div>
          ) : null}
        </div>
        {proposed && row.blocked ? (
          <div className="appr-sheet-foot">
            <span
              className="btn-outline"
              data-click="apr.sheet.ack"
              style={{ scale: String(ackScale) }}
            >
              Acknowledge
            </span>
          </div>
        ) : proposed ? (
          <div className="appr-sheet-foot">
            <span
              className="btn-outline"
              data-click="apr.sheet.reject"
              style={{ scale: String(rejectScale) }}
            >
              Reject
            </span>
            <span
              className="btn-primary"
              data-click="apr.sheet.approve"
              style={{ scale: String(approveScale) }}
            >
              Approve
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};
