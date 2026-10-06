import React from "react";
import { useClickPress } from "../../../../core/press-context";
import { GlobeIcon } from "../../icons";
import "./technical-audit.css";
import { CheckBox, ChevronRight } from "./icons";
import { AuditRow, AuditSeverity, scoreTone } from "./types";

const SEV_LABEL: Record<AuditSeverity, string> = {
  critical: "Critical",
  warning: "Warning",
  notice: "Notice",
};

const SEV_DOT: Record<AuditSeverity, string> = {
  critical: "dot-danger",
  warning: "dot-warn",
  notice: "dot-neutral",
};

export const AuditIssuePill: React.FC<{ severity: AuditSeverity }> = ({
  severity,
}) => (
  <span className="ta-pill">
    <span className={`d ${SEV_DOT[severity]}`} />
    {SEV_LABEL[severity]}
  </span>
);

export const AuditIssueLine: React.FC<{
  name: string;
  severity?: AuditSeverity;
  fix?: string;
  passed?: boolean;
  style?: React.CSSProperties;
}> = ({ name, severity, fix, passed, style }) => (
  <div className="ta-issue" style={style}>
    <CheckBox on={passed} />
    <div className="ta-issue-body">
      <span className={`ta-issue-name${passed ? " passed" : ""}`}>
        {name}
        {severity ? <AuditIssuePill severity={severity} /> : null}
      </span>
      {fix ? (
        <span className={`ta-issue-fix${passed ? " passed" : ""}`}>{fix}</span>
      ) : null}
    </div>
  </div>
);

export const AuditIssueRow: React.FC<{
  row: AuditRow;
  style?: React.CSSProperties;
}> = ({ row, style }) => {
  const count = row.count ?? row.issues.length;
  const scale = useClickPress(`ta.row.${row.url}`);
  return (
    <div className="ta-row" style={style}>
      <div
        className="ta-row-head"
        data-click={`ta.row.${row.url}`}
        style={{ scale: String(scale) }}
      >
        <span className={`ta-chev${row.open ? " open" : ""}`}>
          <ChevronRight />
        </span>
        {row.site ? (
          <span className="ta-page site">
            <GlobeIcon />
            {row.url}
          </span>
        ) : (
          <span className="ta-page">{row.url}</span>
        )}
        <span className={`ta-score-cell ${scoreTone(row.score)}`}>
          {row.score}
          <span className="of">/100</span>
        </span>
        <span className="ta-count">{count}</span>
      </div>
      {row.open ? (
        <div className="ta-row-open">
          {row.issues.map((issue) => (
            <AuditIssueLine
              key={issue.name}
              name={issue.name}
              severity={issue.passed ? undefined : issue.severity}
              fix={issue.fix}
              passed={issue.passed}
            />
          ))}
          {(row.passed ?? []).map((check) => (
            <AuditIssueLine
              key={check.label}
              name={check.label}
              fix={check.description}
              passed
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};
