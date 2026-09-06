import React from "react";
import { ArrowRightIcon, CheckIcon } from "./icons";

export const ProposalRow: React.FC<{
  label: string;
  detail: string;
  current: string;
  proposed: string;
  checked?: boolean;
  approved?: boolean;
}> = ({ label, detail, current, proposed, checked, approved }) => (
  <div className={`prop-row${approved ? " approved" : ""}`}>
    <span className={`checkbox${checked ? " checked" : ""}`}>
      {checked ? <CheckIcon size={14} strokeWidth={3} /> : null}
    </span>
    <span className="prop-body">
      <span className="prop-label">{label}</span>
      <span className="prop-detail">{detail}</span>
      <span className="prop-change">
        <span className="prop-current">{current}</span>
        <span className="prop-arrow">
          <ArrowRightIcon size={14} />
        </span>
        <span className="prop-proposed">{proposed}</span>
      </span>
    </span>
    {approved ? <span className="prop-approved-tag">Approved</span> : null}
  </div>
);
