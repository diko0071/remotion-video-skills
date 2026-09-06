import React from "react";
import { ProposalRow } from "../../ryze-ui/proposal";
import { WidgetCard } from "../../ryze-ui/widget-card";
import type { ProposalItem } from "../types";

export const ProposalResult: React.FC<{
  title: string;
  subtitle?: string;
  rows: ProposalItem[];
  approveLabel?: string;
  rejectLabel?: string;
}> = ({ title, subtitle, rows, approveLabel = "Approve", rejectLabel = "Reject" }) => (
  <WidgetCard
    title={title}
    subtitle={subtitle}
    body={false}
    footer={
      <>
        <span className="btn-outline" style={{ marginRight: 8 }}>
          {rejectLabel}
        </span>
        <span className="btn-primary">{approveLabel}</span>
      </>
    }
  >
    {rows.map((row) => (
      <ProposalRow
        key={row.label}
        label={row.label}
        detail={row.detail}
        current={row.current}
        proposed={row.proposed}
        approved={row.approved}
        checked={!row.approved}
      />
    ))}
  </WidgetCard>
);
