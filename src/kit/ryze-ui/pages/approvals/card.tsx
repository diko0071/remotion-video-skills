import React from "react";
import { useClickPress } from "../../../../core/press-context";
import "./approvals.css";
import { Channel } from "./channel";
import { STATUS_META } from "./data";
import { CheckIcon, ChevronRightIcon } from "./icons";
import { Pill } from "./pill";
import { ApprovalRow } from "./types";

export const ApprovalCard: React.FC<{
  row: ApprovalRow;
  selectable?: boolean;
  style?: React.CSSProperties;
}> = ({ row, selectable = true, style }) => {
  const cardScale = useClickPress(`apr.card.${row.id}`);
  const progressScale = useClickPress(`apr.progress.${row.id}`);
  const approveScale = useClickPress(`apr.approve.${row.id}`);
  const rejectScale = useClickPress(`apr.reject.${row.id}`);
  const ackScale = useClickPress(`apr.ack.${row.id}`);
  const unblockScale = useClickPress(`apr.unblock.${row.id}`);
  const checkScale = useClickPress(`apr.check.${row.id}`);
  const proposed = row.status === "proposed";
  const meta = STATUS_META[row.status];
  return (
    <div
      className="appr-row"
      data-click={`apr.card.${row.id}`}
      style={{ scale: String(cardScale), ...style }}
    >
      {proposed && !row.blocked && selectable ? (
        <span
          className={`appr-ck${row.selected ? " on" : ""}`}
          data-click={`apr.check.${row.id}`}
          style={{ scale: String(checkScale) }}
        >
          {row.selected ? <CheckIcon /> : null}
        </span>
      ) : null}
      <div className="appr-row-main">
        <div className="appr-row-title">{row.title}</div>
        <div className="appr-meta">
          <Channel channel={row.channel} />
          {proposed && row.blocked ? <Pill tone="warn" label="Blocked" /> : null}
          <span className="pg-meta">{row.age}</span>
        </div>
      </div>
      {proposed && row.blocked ? (
        <div className="appr-row-btns">
          <span
            className="btn-outline btn-sm"
            data-click={`apr.ack.${row.id}`}
            style={{ scale: String(ackScale) }}
          >
            Acknowledge
          </span>
          <span
            className="btn-primary btn-sm"
            data-click={`apr.unblock.${row.id}`}
            style={{ scale: String(unblockScale) }}
          >
            Remove blocker
          </span>
        </div>
      ) : proposed ? (
        <div className="appr-row-btns">
          <span
            className="btn-outline btn-sm"
            data-click={`apr.reject.${row.id}`}
            style={{ scale: String(rejectScale) }}
          >
            Reject
          </span>
          <span
            className="btn-primary btn-sm"
            data-click={`apr.approve.${row.id}`}
            style={{ scale: String(approveScale) }}
          >
            Approve
          </span>
        </div>
      ) : (
        <div className="appr-row-status">
          {row.status === "applying" ? (
            <span
              className="appr-link"
              data-click={`apr.progress.${row.id}`}
              style={{ scale: String(progressScale) }}
            >
              View progress
            </span>
          ) : null}
          <Pill tone={meta.tone} label={meta.label} />
        </div>
      )}
      <span className="appr-chev">
        <ChevronRightIcon />
      </span>
    </div>
  );
};
