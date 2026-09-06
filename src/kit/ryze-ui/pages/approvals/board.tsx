import React from "react";
import "./approvals.css";
import { BoardCard } from "./board-card";
import { Pill } from "./pill";
import { Column } from "./types";

export const ApprovalsBoard: React.FC<{
  columns: Column[];
  style?: React.CSSProperties;
}> = ({ columns, style }) => (
  <div className="board" style={style}>
    {columns.map((col) => (
      <div key={col.status} className="board-col">
        <div className="board-col-head">
          <Pill tone={col.tone} label={col.status} />
          <span className="pg-meta">{col.total}</span>
        </div>
        <div className="board-cards">
          {col.cards.map((card) => (
            <BoardCard key={card.title} card={card} />
          ))}
          {col.more ? (
            <span className="board-more">Show {col.more} more</span>
          ) : null}
        </div>
      </div>
    ))}
  </div>
);
