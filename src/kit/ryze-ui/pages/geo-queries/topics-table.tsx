import React from "react";
import "./geo-queries.css";
import { TopicRow } from "./topic-row";
import { Topic } from "./types";

export const TopicsTableHead: React.FC = () => (
  <div className="gq-row gq-thead">
    <span />
    <span>Topic</span>
    <span className="gq-num">Visibility</span>
    <span className="gq-num">Position</span>
    <span className="gq-num">Assistants</span>
    <span className="gq-num">Last run</span>
    <span />
  </div>
);

export const TopicsTable: React.FC<{
  topics: Topic[];
  rowStyle?: React.CSSProperties;
}> = ({ topics, rowStyle }) => (
  <>
    <TopicsTableHead />
    {topics.map((t) => (
      <TopicRow key={t.name} topic={t} style={rowStyle} />
    ))}
  </>
);
