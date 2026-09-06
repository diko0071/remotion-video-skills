import React from "react";
import { Img, staticFile } from "remotion";
import "./chat-empty.css";
import { PLATFORM_LABEL, PLATFORM_LOGO } from "./data";
import { LayersIcon } from "./icons";
import { Card } from "./types";

export const PlaybookCard: React.FC<{
  card: Card;
  style?: React.CSSProperties;
}> = ({ card, style }) => {
  const label =
    card.platforms.length === 0
      ? "All platforms"
      : card.platforms.map((p) => PLATFORM_LABEL[p]).join(" + ");
  return (
    <div className="ce-card" style={style}>
      <div className="ce-card-cover">
        <Img src={staticFile(card.image)} />
        <span className="ce-card-badge">
          <span className="ce-card-badge-icons">
            {card.platforms.length === 0 ? (
              <span className="ce-layers">
                <LayersIcon />
              </span>
            ) : (
              card.platforms.map((p) => (
                <Img
                  key={p}
                  src={staticFile(PLATFORM_LOGO[p])}
                  className="ce-badge-logo"
                />
              ))
            )}
          </span>
          {label}
        </span>
      </div>
      <div className="ce-card-body">
        <div className="ce-card-title">{card.title}</div>
        <div className="ce-card-desc">{card.description}</div>
      </div>
    </div>
  );
};
