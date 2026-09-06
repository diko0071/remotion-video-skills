import React from "react";
import "./article-editor.css";
import {
  ARTICLE_EDITOR_CHECKS,
  ARTICLE_EDITOR_SCORE,
  ARTICLE_SCORE_OF_MAX,
  ARTICLE_SCORE_TITLE,
  articleChecksPassed,
} from "./data";
import { CheckTickIcon, ChevronDownIcon } from "./icons";
import { SCORE_BAND_STROKE, scoreBand, type ArticleScoreRow } from "./types";

const SIZE = 120;
const STROKE = 10;
const R = SIZE / 2 - STROKE - 1;
const C = 2 * Math.PI * R;

export const ArticleScoreRing: React.FC<{ score: number }> = ({ score }) => (
  <div className="ae-ring" style={{ width: SIZE, height: SIZE }}>
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      width={SIZE}
      height={SIZE}
      className="ae-ring-svg"
    >
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={R}
        fill="none"
        strokeWidth={STROKE}
        stroke="rgba(15,23,42,0.06)"
      />
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={R}
        fill="none"
        strokeWidth={STROKE}
        strokeLinecap="round"
        stroke={SCORE_BAND_STROKE[scoreBand(score)]}
        strokeDasharray={C}
        strokeDashoffset={C - (C * Math.min(Math.max(score, 0), 100)) / 100}
      />
    </svg>
    <span className="ae-ring-val">
      <b>{score}</b>
      <span>{ARTICLE_SCORE_OF_MAX}</span>
    </span>
  </div>
);

export const ArticleScoreCard: React.FC<{
  score?: number;
  checks?: ArticleScoreRow[];
  style?: React.CSSProperties;
}> = ({
  score = ARTICLE_EDITOR_SCORE,
  checks = ARTICLE_EDITOR_CHECKS,
  style,
}) => (
  <aside className="ae-score" style={style}>
    <span className="ae-score-title">{ARTICLE_SCORE_TITLE}</span>
    <div className="ae-score-ring-row">
      <ArticleScoreRing score={score} />
    </div>
    <div className="ae-score-trigger">
      {articleChecksPassed(
        checks.filter((c) => c.passed).length,
        checks.length,
      )}
      <ChevronDownIcon />
    </div>
    <div className="ae-score-checks">
      {checks.map((c) => (
        <div className="ae-score-check" key={c.check}>
          {c.passed ? (
            <span className="ae-check-on">
              <CheckTickIcon />
            </span>
          ) : (
            <span className="ae-check-off" />
          )}
          <span className={`ae-check-label${c.passed ? "" : " off"}`}>
            {c.label}
          </span>
        </div>
      ))}
    </div>
  </aside>
);
