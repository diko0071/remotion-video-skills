import React from "react";
import { ArrowUpRightIcon } from "../../icons";
import "../../pages.css";
import "./chat-artifact.css";

export const ArtifactCard: React.FC<{
  name: string;
  typeLabel: string;
  icon: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ name, typeLabel, icon, style }) => (
  <span className="ca-card" style={style}>
    <span className="ca-card-icon">{icon}</span>
    <span className="ca-card-text">
      <span className="ca-card-name">{name}</span>
      <span className="ca-card-type">{typeLabel}</span>
    </span>
    <ArrowUpRightIcon size={16} />
  </span>
);
