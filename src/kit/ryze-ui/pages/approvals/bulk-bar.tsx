import React from "react";
import "./approvals.css";

export const ApprovalsBulkBar: React.FC<{
  count?: number;
  style?: React.CSSProperties;
}> = ({ count = 2, style }) => (
  <div className="appr-bulk" style={style}>
    <span className="appr-bulk-count">{count} selected</span>
    <span className="appr-link">Clear</span>
    <div className="appr-bulk-btns">
      <span className="btn-outline btn-sm">Reject ({count})</span>
      <span className="btn-primary btn-sm">Approve ({count})</span>
    </div>
  </div>
);
