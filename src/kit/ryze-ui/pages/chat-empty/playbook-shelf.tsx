import React from "react";
import { ArrowRightIcon } from "../../icons";
import "./chat-empty.css";
import { PlaybookCard } from "./playbook-card";
import { Card } from "./types";

export const ChatEmptyShelf: React.FC<{
  title: string;
  allLabel: string;
  cards: Card[];
  style?: React.CSSProperties;
}> = ({ title, allLabel, cards, style }) => (
  <div className="ce-shelf" style={style}>
    <div className="ce-shelf-head">
      <div className="ce-shelf-title">{title}</div>
      <span className="ce-shelf-all">
        {allLabel}
        <ArrowRightIcon size={14} />
      </span>
    </div>
    <div className="ce-shelf-grid">
      {cards.map((card) => (
        <PlaybookCard key={card.title} card={card} />
      ))}
    </div>
  </div>
);
