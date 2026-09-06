import React from "react";
import { ChevronRight } from "../../icons";
import "./geo-queries.css";
import { EngineRow } from "./engine-row";
import { PromptRow } from "./prompt-row";
import { Topic } from "./types";

export const TopicRow: React.FC<{
  topic: Topic;
  style?: React.CSSProperties;
}> = ({ topic, style }) => (
  <div className="gq-topic-block" style={style}>
    <div className="gq-row gq-topic-head">
      <span className={`gq-chev${topic.open ? " open" : ""}`}>
        <ChevronRight />
      </span>
      <span className="gq-topic-name">
        <span className="name">{topic.name}</span>
        <span className="gq-count">
          {topic.prompts.length}{" "}
          {topic.prompts.length === 1 ? "prompt" : "prompts"}
        </span>
      </span>
      <span className="gq-num gq-vis">{topic.visibility}</span>
      <span className="gq-num">{topic.position}</span>
      <span className="gq-num">
        <EngineRow engines={topic.engines} />
      </span>
      <span className="gq-num">{topic.lastRun}</span>
      <span />
    </div>
    {topic.open ? (
      <div className="gq-prompts">
        {topic.prompts.map((p) => (
          <PromptRow key={p.text} prompt={p} />
        ))}
      </div>
    ) : null}
  </div>
);
