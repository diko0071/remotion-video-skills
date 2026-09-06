import React from "react";
import { RyzeApp } from "../../app-shell";
import "../../pages.css";
import "./approvals.css";
import { ApprovalsBoard } from "./board";
import { ApprovalsBulkBar } from "./bulk-bar";
import { ApprovalCard } from "./card";
import { COLUMNS, HISTORY_ROWS, PENDING_ROWS } from "./data";
import { ApprovalsPageHead } from "./page-head";
import { ApprovalsPager } from "./pager";
import { ApprovalsToolbar } from "./toolbar";
import { ApprovalRow, ApprovalStatus } from "./types";

type ApprovalsBodyProps = {
  tab?: "Pending" | "History";
  product?: string;
  view?: "list" | "board";
  rows?: ApprovalRow[];
  statusOverrides?: Record<string, string>;
  firstSelected?: boolean;
  scrollPx?: number;
};

export const ApprovalsBody: React.FC<ApprovalsBodyProps> = ({
  tab = "Pending",
  product = "All products",
  view = "list",
  rows,
  statusOverrides,
  firstSelected = false,
  scrollPx = 0,
}) => {
  const base = rows ?? (tab === "Pending" ? PENDING_ROWS : HISTORY_ROWS);
  const shown = base.map((row, i) => ({
    ...row,
    status: (statusOverrides?.[row.id] as ApprovalStatus | undefined) ?? row.status,
    selected: firstSelected && i === 0 ? true : row.selected,
  }));
  const selectedCount = shown.filter((row) => row.selected).length;
  return (
    <div className="pg">
      <div className="pg-scroll" style={{ overflow: "hidden" }}>
        <div className="pg-inner wide" style={{ marginTop: -scrollPx }}>
          <ApprovalsPageHead />
          <ApprovalsToolbar view={view} tab={tab} product={product} />
          {view === "board" ? (
            <ApprovalsBoard columns={COLUMNS} />
          ) : (
            <>
              {selectedCount > 0 ? <ApprovalsBulkBar count={selectedCount} /> : null}
              <div className="appr-list">
                {shown.map((row) => (
                  <ApprovalCard key={row.id} row={row} />
                ))}
              </div>
              <ApprovalsPager />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const ApprovalsPage: React.FC<ApprovalsBodyProps> = ({
  view = "board",
  ...rest
}) => (
  <RyzeApp workspace="ember-and-oak" page="Approvals" nav="Approvals" stretch>
    <ApprovalsBody view={view} {...rest} />
  </RyzeApp>
);

export const ApprovalsListPage: React.FC<Omit<ApprovalsBodyProps, "view">> = (
  props,
) => <ApprovalsPage view="list" {...props} />;
