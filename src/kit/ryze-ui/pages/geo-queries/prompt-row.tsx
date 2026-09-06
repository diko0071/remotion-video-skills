import React from "react";
import "./geo-queries.css";
import { EngineRow } from "./engine-row";
import { Prompt } from "./types";

export const PromptRow: React.FC<{
  prompt: Prompt;
  style?: React.CSSProperties;
}> = ({ prompt, style }) => {
  const named = prompt.engines.filter(Boolean).length;
  return (
    <div className="gq-row gq-prompt-row" style={style}>
      <span />
      <span className="gq-prompt-text">{prompt.text}</span>
      <span className="gq-num">{`${named}/4`}</span>
      <span className="gq-num">
        {prompt.position == null ? "—" : `#${prompt.position}`}
      </span>
      <span className="gq-num">
        <EngineRow engines={prompt.engines} />
      </span>
      <span className="gq-num">{prompt.lastRun}</span>
      <span />
    </div>
  );
};
