import React from "react";
import "./approvals.css";
import { Channel } from "./channel";
import { Pill } from "./pill";
import { Card } from "./types";

export const BoardCard: React.FC<{
  card: Card;
  style?: React.CSSProperties;
}> = ({ card, style }) => (
  <div className="appr-card" style={style}>
    <div className="appr-title">{card.title}</div>
    <div className="appr-meta">
      <Channel channel={card.channel} />
      {card.blocked ? <Pill tone="warn" label="Blocked" /> : null}
      <span className="pg-meta">{card.age}</span>
    </div>
    {card.actions === "decide" ? (
      <div className="appr-btns">
        <span className="btn-outline btn-sm">Reject</span>
        <span className="btn-primary btn-sm">Approve</span>
      </div>
    ) : null}
    {card.actions === "blocked" ? (
      <div className="appr-btns">
        <span className="btn-outline btn-sm">Acknowledge</span>
        <span className="btn-primary btn-sm">Remove blocker</span>
      </div>
    ) : null}
  </div>
);
