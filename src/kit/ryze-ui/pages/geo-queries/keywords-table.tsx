import React from "react";
import "./geo-queries.css";
import { KeywordRow } from "./keyword-row";
import { Keyword } from "./types";

export const KeywordsTableHead: React.FC = () => (
  <div className="gq-krow gq-kthead">
    <span>Keyword</span>
    <span className="gq-num">Volume</span>
    <span className="gq-num">Difficulty</span>
    <span className="gq-num">Position</span>
    <span className="gq-num">Trend</span>
  </div>
);

export const KeywordsTable: React.FC<{
  keywords: Keyword[];
  rowStyle?: React.CSSProperties;
}> = ({ keywords, rowStyle }) => (
  <>
    <KeywordsTableHead />
    {keywords.map((k) => (
      <KeywordRow key={k.text} item={k} style={rowStyle} />
    ))}
  </>
);
